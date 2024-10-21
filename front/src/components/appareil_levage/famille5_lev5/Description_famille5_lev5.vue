<template>

    <div class="descriptions">

        <table>
            <tr>
                <td>B-1</td>
                <td :class="[description.marquage.length != 0 ? 'saved' : 'not-saved']">MARQUAGE</td>
                <td>
                    <input type="text" :value="description.marquage" disabled>
                </td>
            </tr>

            <tr>
                <td>B-2</td>
                <td :class="[colorCaracteristiques == true ? 'saved' : 'not-saved']">
                    CARACTERISTIQUES DIMENSIONNELLES ET DE CHARGE
                </td>
                <td>
                    <p>Charge maximale utile (kg) : <input type="text" @input="saisirChargeMaximaleUtile($event)"
                            :value="description.chargeMaximaleUtile"> A la portée minimale de (m) : <input type="text"
                            @input="saisirPorteeMinimale($event)" :value="description.porteeMinimale"></p>
                    <p>Distance du centre de gravité (m) : <input type="text" :value="description.distanceCentreGravite"
                            @input="saisirDistanceCentreGravite($event)"></p>
                    <p>Course (m) : <input type="text" :value="description.course" @input="saisirCourse($event)"></p>
                    <p>Hauteur de levage (m) : <input type="text" :value="description.hauteurLevage"
                            @input="saisirHauteurLevage($event)"></p>
                    <p>Portée (m) : <input type="text" :value="description.portee" @input="saisirPortee($event)"></p>
                    <p>Porte a faux ou déport (m) : <input type="text" :value="description.porteFauxDeport"
                            @input="saisirPorteFauxDeport($event)"></p>
                    <p>Longueur de chemin de roulement (m) : <input type="text"
                            :value="description.longueurCheminRoulement" @input="saisirLongueurCheminRoulement($event)">
                    </p>
                    <p>Dimension du plateau (m) : <input type="text" :value="description.dimensionPlateau"
                            @input="saisirDimensionPlateau($event)"></p>
                    <p>
                        Mode d'installation:
                        <select @change="saisirModeInstallation($event)" :value="description.modeInstallation">
                            <option value=""></option>
                            <option value="Pont roulant">Pont roulant</option>
                            <option value="Poutre roulante">Poutre roulante</option>
                            <option value="Palan">Palan</option>
                            <option value="Treuil">Treuil</option>
                            <option value="Vérin">Vérin</option>
                            <option value="Autre :">Autre</option>
                        </select>
                        <input type="text" v-if="description.modeInstallation == 'Autre :'"
                            :value="description.suiveModeInstallation" @input="saisirSuiveModeInstallation($event)">
                    </p>

                </td>
            </tr>

            <tr>
                <td>B-4</td>
                <td :class="[colorSuspentes == true ? 'saved' : 'not-saved']">SUSPENTES DE LEVAGE</td>
                <td>
                </td>
            </tr>

            <tr>
                <td>B-3</td>
                <td :class="[description.mecanisme.length != 0 ? 'saved' : 'not-saved']">MECANISME ET MOUVEMENT</td>
                <td>
                </td>
            </tr>



        </table>

        <div class="sauvegarder">
            <button :class="[watched_sauvegarder == true ? 'watch' : 'not-watch']" @click="sauvegarde">
                {{ watched_sauvegarder == true ? "Déjà enregistré" : "Non enregistré" }}
            </button>
        </div>

        <div class="reset">
            <button @click="reset">Reset</button>
        </div>

    </div>

</template>

<script>
import Descriptions from "@/requests/appareil_levage/famille5_lev5/Descriptions"
import Observateurs from "@/requests/Observateurs"
export default {
    name: 'renseignement-component',
    data() {
        return {
            colorSuspentes : false,
            colorCaracteristiques: false,
            counter_watched: 0,
            watched_sauvegarder: false,
            flagReset: false,

            description: {

                marquage: "",

                chargeMaximaleUtile: "",
                porteeMinimale: "",
                distanceCentreGravite: "",
                course: "Sans objet",
                hauteurLevage: "Sans objet",
                portee: "Sans objet",
                porteFauxDeport: "Sans objet",
                longueurCheminRoulement: "Sans objet",
                dimensionPlateau: "Sans objet",
                modeInstallation: "",
                suiveModeInstallation: "",

                mecanisme: "",
                suiveMecanisme: "",

                suspentes: [
                    {

                        hasCable: false,
                        cable: "Câble :",
                        hasDetailsCable: false,
                        detailsCable: [
                            { a: "Nombre :", valA: "", b: "Composition :", valB: "", c: "Diamètre (mm) :", valC: "" },
                            { a: "Moufflage :", valA: "Sans objet", b: "Nombre de brins :", valB: "", c: "", valC: "" }
                        ],

                        hasChaineRouleau: false,
                        chaineRouleau: "Chaîne(s) a rouleau ou mailles jointives :",
                        hasDetailsChaineRouleau: false,
                        detailsChaineRouleau: [
                            { a: "Nombre :", valA: "", b: "Type :", valB: "", c: "", valC: "" },
                            { a: "Pas théorique :", valA: "", b: "Combinaison :", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "Sans objet", b: "Nombre de brins :", valB: "", c: "", valC: "" }
                        ],

                        hasChaineMaillons: false,
                        chaineMaillons: "Chaîne(s) à maillons calibrés :",
                        hasDetailsChaineMaillons: false,
                        detailsChaineMaillons: [
                            { a: "Nombre :", valA: "", b: "Type :", valB: "", c: "", valC: "" },
                            { a: "Pas théorique :", valA: "", b: "Diamètre :", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "Sans Objet", b: "Nombre de brins :", valB: "", c: "", valC: "" },
                        ],

                        hasSangle: false,
                        sangle: "Sangle de levage :",
                        hasDetailsSangle: false,
                        detailsSangle: [
                            { a: "Nombre :", valA: "", b: "Composition :", valB: "", c: "", valC: "" },
                            { a: "Section (mm2):", valA: "", b: "", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "Sans Objet", b: "Nombre de brins :", valB: "", c: "", valC: "" },
                        ],
                    }
                ],


                observateurId: ""
            },

            duplicate_description: {
                
                marquage: "",

                chargeMaximaleUtile: "",
                porteeMinimale: "",
                distanceCentreGravite: "",
                course: "Sans objet",
                hauteurLevage: "Sans objet",
                portee: "Sans objet",
                porteFauxDeport: "Sans objet",
                longueurCheminRoulement: "Sans objet",
                dimensionPlateau: "Sans objet",
                modeInstallation: "",
                suiveModeInstallation: "",

                mecanisme: "",
                suiveMecanisme: "",

                suspentes: [
                    {

                        hasCable: false,
                        cable: "Câble :",
                        hasDetailsCable: false,
                        detailsCable: [
                            { a: "Nombre :", valA: "", b: "Composition :", valB: "", c: "Diamètre (mm) :", valC: "" },
                            { a: "Moufflage :", valA: "Sans objet", b: "Nombre de brins :", valB: "", c: "", valC: "" }
                        ],

                        hasChaineRouleau: false,
                        chaineRouleau: "Chaîne(s) a rouleau ou mailles jointives :",
                        hasDetailsChaineRouleau: false,
                        detailsChaineRouleau: [
                            { a: "Nombre :", valA: "", b: "Type :", valB: "", c: "", valC: "" },
                            { a: "Pas théorique :", valA: "", b: "Combinaison :", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "Sans objet", b: "Nombre de brins :", valB: "", c: "", valC: "" }
                        ],

                        hasChaineMaillons: false,
                        chaineMaillons: "Chaîne(s) à maillons calibrés :",
                        hasDetailsChaineMaillons: false,
                        detailsChaineMaillons: [
                            { a: "Nombre :", valA: "", b: "Type :", valB: "", c: "", valC: "" },
                            { a: "Pas théorique :", valA: "", b: "Diamètre :", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "Sans Objet", b: "Nombre de brins :", valB: "", c: "", valC: "" },
                        ],

                        hasSangle: false,
                        sangle: "Sangle de levage :",
                        hasDetailsSangle: false,
                        detailsSangle: [
                            { a: "Nombre :", valA: "", b: "Composition :", valB: "", c: "", valC: "" },
                            { a: "Section (mm2):", valA: "", b: "", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "Sans Objet", b: "Nombre de brins :", valB: "", c: "", valC: "" },
                        ],
                    }
                ],


                observateurId: ""
            }

        }
    },

    props: {
        observateurId: String
    },


    components: {
    },

    watch: {
        description: {
            handler() {
                const count = this.counter_watched++;
                if (count != 0 && count != 1 && count != 2) {
                    this.watched_sauvegarder = false;
                }

                this.notEmpty();
            },
            deep: true
        }
    },

    methods: {

        checkeSuspentes() {
            const arr = [
                this.description["suspentes"][0]["hasCable"],
                this.description["suspentes"][0]["hasChaineRouleau"],
                this.description["suspentes"][0]["hasChaineMaillons"],
                this.description["suspentes"][0]["hasSangle"],
            ]

            if(arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkCaracterstiques() {

            if (this.description.chargeMaximaleUtile == "") {
                return false;
            }

            if (this.description.porteeMinimale == "") {
                return false;
            }

            if (this.description.distanceCentreGravite == "") {
                return false;
            }

            if (this.description.course == "") {
                return false;
            }

            if (this.description.hauteurLevage == "") {
                return false;
            }

            if (this.description.portee == "") {
                return false;
            }

            if (this.description.porteFauxDeport == "") {
                return false;
            }

            if (this.description.longueurCheminRoulement == "") {
                return false;
            }


            if (this.description.dimensionPlateau == "") {
                return false;
            }

            if (this.description.modeInstallation == "") {
                return false;
            }

            return true;
        },

        checkProperties() {


            if (this.description.marquage == "") {
                return false;
            }


            if (this.description.chargeMaximaleUtile == "") {
                return false;
            }

            if (this.description.porteeMinimale == "") {
                return false;
            }

            if (this.description.distanceCentreGravite == "") {
                return false;
            }

            if (this.description.course == "") {
                return false;
            }

            if (this.description.hauteurLevage == "") {
                return false;
            }

            if (this.description.portee == "") {
                return false;
            }

            if (this.description.porteFauxDeport == "") {
                return false;
            }

            if (this.description.longueurCheminRoulement == "") {
                return false;
            }


            if (this.description.dimensionPlateau == "") {
                return false;
            }

            if (this.description.modeInstallation == "") {
                return false;
            }

            if (this.description.mecanisme == "") {
                return false;
            }

            return true;
        },

        notEmpty() {
            this.$emit("changeColorDescription_famille5_lev5", this.checkProperties());
        },

        saisirChargeMaximaleUtile(e) {
            this.description.chargeMaximaleUtile = e.target.value;

        },

        saisirPorteeMinimale(e) {
            this.description.porteeMinimale = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        saisirDistanceCentreGravite(e) {
            this.description.distanceCentreGravite = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        saisirCourse(e) {
            this.description.course = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        saisirHauteurLevage(e) {
            this.description.hauteurLevage = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        saisirPortee(e) {
            this.description.portee = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        saisirPorteFauxDeport(e) {
            this.description.porteFauxDeport = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        saisirLongueurCheminRoulement(e) {
            this.description.longueurCheminRoulement = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        saisirDimensionPlateau(e) {
            this.description.dimensionPlateau = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },


        saisirModeInstallation(e) {
            this.description.modeInstallation = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },


        saisirSuiveModeInstallation(e) {
            this.description.suiveModeInstallation = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        saisirMecanisme(e) {
            this.description.mecanisme = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        saisirSuiveMecanisme(e) {
            this.description.suiveMecanisme = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        saisirCable() {
            this.description["suspentes"][0]["hasCable"] = Boolean(!this.description["suspentes"][0]["hasCable"]);
            this.description["suspentes"][0]["hasDetailsCable"] = Boolean(!this.description["suspentes"][0]["hasDetailsCable"]);
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        chaineRouleau() {
            this.description["suspentes"][0]["hasChaineRouleau"] = Boolean(!this.description["suspentes"][0]["hasChaineRouleau"]);
            this.description["suspentes"][0]["hasDetailsChaineRouleau"] = Boolean(!this.description["suspentes"][0]["hasDetailsChaineRouleau"]);
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        chaineMaillons() {
            this.description["suspentes"][0]["hasChaineMaillons"] = Boolean(!this.description["suspentes"][0]["hasChaineMaillons"]);
            this.description["suspentes"][0]["hasDetailsChaineMaillons"] = Boolean(!this.description["suspentes"][0]["hasDetailsChaineMaillons"]);
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        sangle() {
            this.description["suspentes"][0]["hasSangle"] = Boolean(!this.description["suspentes"][0]["hasSangle"]);
            this.description["suspentes"][0]["hasDetailsSangle"] = Boolean(!this.description["suspentes"][0]["hasDetailsSangle"]);
            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorSuspentes = this.checkeSuspentes();
        },

        sauvegarde() {

            Descriptions.create(this.description)
                .then((result) => {
                    if (result) {
                        this.watched_sauvegarder = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        reset() {
            Descriptions.reset(this.observateurId)
                .then(() => {

                    this.description = this.duplicate_description;

                    this.flagReset = false;
                    this.colorCaracteristiques = this.checkCaracterstiques();
                    this.colorSuspentes = this.checkeSuspentes();
                    this.$emit("changeColorDescription_famille5_lev5", false);

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },


    created() {


        this.description.observateurId = this.observateurId;
        this.duplicate_description.observateurId = this.observateurId;

        Observateurs.selected(this.observateurId)
            .then((result) => {
                this.description.marquage = result.data.marquage;
                this.duplicate_description.marquage = result.data.marquage;
            })
            .catch((error) => {
                console.log(error)
            });


        Descriptions.select(this.observateurId)
            .then((result) => {

                if (result.data.description != null) {
                    this.flagReset = true;
                    this.description = result.data.description;
                }

                this.colorCaracteristiques = this.checkCaracterstiques();
                this.colorSuspentes = this.checkeSuspentes();
                this.watched_sauvegarder = true;
                return this.notEmpty();
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
</script>

<style scoped>

.descriptions {
    margin-top: 10px;
    margin-bottom: 100px;
    width: inherit;
}


.descriptions table {
    border-collapse: collapse;
    border: none;
}

tr {
    border-top: 1px solid black;
}

tr:first-child {
    border-top: none;
}

td {
    text-align: start;
    border: none !important;
    padding-top: 10px;
    padding-bottom: 10px;
}


table tr td:nth-child(1) {
    width: 40px;
}


table>tr:nth-child(3)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table>tr:nth-child(3)>td:nth-child(3) label {
    margin-top: 3px;
    margin-bottom: 3px;
}

table>tr:nth-child(4)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table>tr:nth-child(4)>td:nth-child(3) label {
    margin-top: 3px;
    margin-bottom: 3px;
}

table>tr:nth-child(5)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table>tr:nth-child(6)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}


.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}

input , select {
    height: 25px;
    font-size: medium;
}

td div p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.sauvegarder , .reset {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-top: 5px;
}

.sauvegarder .watch {
    background-color: green;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .not-watch {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}


.reset button {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
}

</style>