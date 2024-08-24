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
                <td>CARACTERISTIQUES DIMENSIONNELLES ET DE CHARGE</td>
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
                <td>B-3</td>
                <td :class="[description.mecanisme.length != 0 ? 'saved' : 'not-saved']">MECANISME ET MOUVEMENT</td>
                <td>
                    <p>
                        <select @change="saisirMecanisme($event)" :value="description.mecanisme">
                            <option value=""></option>
                            <option value="Hydraulique">Hydraulique</option>
                            <option value="Treuil">Treuil</option>
                            <option value="Tambour">Tambour</option>
                            <option value="Autre :">Autre</option>
                        </select>
                        <input type="text" v-if="description.mecanisme == 'Autre :'" :value="description.suiveMecanisme"
                            @input="saisirSuiveMecanisme($event)">
                    </p>
                </td>
            </tr>

            <tr>
                <td>B-4</td>
                <td>SUSPENTES DE LEVAGE</td>
                <td>
                    <div>
                        <p><input type="checkbox" @input="saisirCable">Câble :</p>
                        <p v-if='description["suspentes"]["hasCable"]'>
                            Nombre : <input type="text" v-model="description['suspentes']['detailsCable'][0]['valA']">
                            Composition : <input type="text"
                                v-model="description['suspentes']['detailsCable'][0]['valB']">
                            Diamètre (mm) : <input type="text"
                                v-model="description['suspentes']['detailsCable'][0]['valC']"></p>
                        <p v-if='description["suspentes"]["hasCable"]'>
                            Moufflage : <input type="text"
                                v-model="description['suspentes']['detailsCable'][1]['valA']">
                            Nombre de brins : <input type="text"
                                v-model="description['suspentes']['detailsCable'][1]['valB']"></p>
                    </div>

                    <div>
                        <p><input type="checkbox" @input="chaineRouleau">Chaîne(s) a rouleau ou mailles jointives :</p>
                        <p v-if='description["suspentes"]["hasChaineRouleau"]'>
                            Nombre : <input type="text" v-model="description['suspentes']['detailsChaineRouleau'][0]['valA']">
                            Type : <select v-model="description['suspentes']['detailsChaineRouleau'][0]['valB']">
                                <option value=""></option>
                                <option value="A rouleau">A rouleau</option>
                                <option value="A rouleau">A maille jointive</option>
                            </select>
                        </p>
                        <p v-if='description["suspentes"]["hasChaineRouleau"]'>
                            Pas théorique : <input type="text" v-model="description['suspentes']['detailsChaineRouleau'][1]['valA']">
                            Combinaison : <input type="text" v-model="description['suspentes']['detailsChaineRouleau'][1]['valB']">
                        </p>
                        <p v-if='description["suspentes"]["hasChaineRouleau"]'>
                            Moufflage : <input type="text"
                                v-model="description['suspentes']['detailsChaineRouleau'][2]['valA']">
                            Nombre de brins : <input type="text"
                                v-model="description['suspentes']['detailsChaineRouleau'][2]['valB']">
                        </p>
                    </div>

                    <div>
                        <p><input type="checkbox">Chaîne(s) à maillons calibrés :</p>
                        <p>
                            Nombre : <input type="text"> 
                            Type : <input type="checkbox">A maillons courts<input
                                type="checkbox"> A maillons longs</p>
                        <p>Pas: <input type="text"> Diamètre : <input type="text"></p>
                        <p>Moufflage :
                            <select>
                                <option value="Sans objet">Sans objet</option>
                                <option value="Nombre de brins">Nombre de brins</option>
                            </select>
                            <input type="text" value="">
                        </p>
                    </div>
                    <div>
                        <p><input type="checkbox">Sangle de levage :</p>
                        <p>Nombre : <input type="text"> Composition : <input type="text">;</p>
                        <p>Section (mm2): <input type="text"></p>
                        <p>Moufflage :
                            <select>
                                <option value="Sans objet">Sans objet</option>
                                <option value="Nombre de brins">Nombre de brins</option>
                            </select>
                            <input type="text" value="">
                        </p>

                    </div>

                </td>
            </tr>

        </table>

        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>


    </div>

</template>

<script>
import Descriptions from "@/requests/appareil_levage/famille1_lev1/Descriptions"
import Observateurs from "@/requests/Observateurs"
export default {
    name: 'renseignement-component',
    data() {
        return {

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


                suspentes: {

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
                },


                observateurId: ""
            }

        }
    },

    props: {
        observateurId: String
    },


    components: {
    },

    methods: {

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
            this.$emit("changeColorDescription_famille1_lev1", this.checkProperties());
        },

        saisirChargeMaximaleUtile(e) {
            this.description.chargeMaximaleUtile = e.target.value;
            this.sauvegarde();
        },

        saisirPorteeMinimale(e) {
            this.description.porteeMinimale = e.target.value;
            this.sauvegarde();
        },

        saisirDistanceCentreGravite(e) {
            this.description.distanceCentreGravite = e.target.value;
            this.sauvegarde();
        },

        saisirCourse(e) {
            this.description.course = e.target.value;
            this.sauvegarde();
        },

        saisirHauteurLevage(e) {
            this.description.hauteurLevage = e.target.value;
            this.sauvegarde();
        },

        saisirPortee(e) {
            this.description.portee = e.target.value;
            this.sauvegarde();
        },

        saisirPorteFauxDeport(e) {
            this.description.porteFauxDeport = e.target.value;
            this.sauvegarde();
        },

        saisirLongueurCheminRoulement(e) {
            this.description.longueurCheminRoulement = e.target.value;
            this.sauvegarde();
        },

        saisirDimensionPlateau(e) {
            this.description.dimensionPlateau = e.target.value;
            this.sauvegarde();
        },


        saisirModeInstallation(e) {
            this.description.modeInstallation = e.target.value;
            this.sauvegarde();
        },


        saisirSuiveModeInstallation(e) {
            this.description.suiveModeInstallation = e.target.value;
            this.sauvegarde();
        },

        saisirMecanisme(e) {
            this.description.mecanisme = e.target.value;
            this.sauvegarde();
        },

        saisirSuiveMecanisme(e) {
            this.description.suiveMecanisme = e.target.value;
            this.sauvegarde();
        },

        saisirCable() {
            this.description["suspentes"]["hasCable"] = Boolean(!this.description["suspentes"]["hasCable"]);
            this.description["suspentes"]["hasDetailsCable"] = Boolean(!this.description["suspentes"]["hasDetailsCable"]);
        },

        chaineRouleau() {
            this.description["suspentes"]["hasChaineRouleau"] = Boolean(!this.description["suspentes"]["hasChaineRouleau"]);
            this.description["suspentes"]["hasDetailsChaineRouleau"] = Boolean(!this.description["suspentes"]["hasDetailsChaineRouleau"]);
        },

        sauvegarde() {

            Descriptions.create(this.description)
                .then(() => {
                    this.flagReset = true;
                    this.notEmpty();
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        reset() {
            Descriptions.reset(this.observateurId)
                .then(() => {

                    this.description = {
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


                        suspentes: {

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
                        },
                    }

                    this.flagReset = false;
                    this.$emit("changeColorDescription_famille1_lev1", false);

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },

    created() {


        this.description.observateurId = this.observateurId;
        Observateurs.selected(this.observateurId)
            .then((result) => {
                this.description.marquage = result.data.marquage;
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

                this.$emit("changeColorDescription_famille1_lev1", this.checkProperties());

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


.sauvegarde {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.sauvegarde button {
    background-color: #040faa;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.reset {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.reset button {
    background-color: #aa1704;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}
</style>