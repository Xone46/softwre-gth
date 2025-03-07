<template>

    <div class="descriptions">
        
        <div class="sauvegarder">
            <button @click="sauvegarde" :class="[watched_sauvegarder == true ? 'watch' : 'not-watch']" >
                <font-awesome-icon v-if="watched_sauvegarder == false" icon="lock-open" />
                <font-awesome-icon v-if="watched_sauvegarder == true" icon="lock" />
            </button>

                <button class="reset" @click="reset" v-if="watched_sauvegarder == true">
                    <font-awesome-icon icon="trash" />
                </button>
        </div>


        <table>

            <tr>
                <td>B-1</td>
                <td :class="[description.marquage.length != 0 ? 'saved' : 'not-saved']">MARQUAGE</td>
                <td class="first">
                    <input type="text" :value="description.marquage" disabled>
                </td>
            </tr>

            <tr>
                <td>B-2</td>
                <td :class="[colorCaracteristiques == true ? 'saved' : 'not-saved']">CARACTERISTIQUES DIMENSIONNELLES ET
                    DE CHARGE</td>
                <td class="second">
                    <p>Charge maximale utile (kg) : <input type="text" @input="saisirChargeMaximaleUtile($event)"
                            :value="description.chargeMaximaleUtile"></p>
                    <p>A la portée minimale de (m) : <input type="text" @input="saisirPorteeMinimale($event)"
                            :value="description.porteeMinimale"></p>
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
                <td class="third">

                    <div>
                        <p><input type="checkbox" @input="saisirCable"
                                :checked='description["suspentes"][0]["hasCable"]'>Câble :</p>
                        <p v-if='description["suspentes"][0]["hasCable"]'>
                            Nombre : <input type="text"
                                v-model="description['suspentes'][0]['detailsCable'][0]['valA']">
                            Composition : <input type="text"
                                v-model="description['suspentes'][0]['detailsCable'][0]['valB']">
                            Diamètre (mm) : <input type="text"
                                v-model="description['suspentes'][0]['detailsCable'][0]['valC']"></p>
                        <p v-if='description["suspentes"][0]["hasCable"]'>
                            Moufflage : <input type="text"
                                v-model="description['suspentes'][0]['detailsCable'][1]['valA']">
                            Nombre de brins : <input type="text"
                                v-model="description['suspentes'][0]['detailsCable'][1]['valB']">
                        </p>
                    </div>

                    <div>
                        <p><input type="checkbox" @input="chaineRouleau"
                                :checked='description["suspentes"][0]["hasChaineRouleau"]'>Chaîne(s) a rouleau ou
                            mailles jointives :</p>
                        <p v-if='description["suspentes"][0]["hasChaineRouleau"]'>
                            Nombre : <input type="text"
                                v-model="description['suspentes'][0]['detailsChaineRouleau'][0]['valA']">
                            Type : <select v-model="description['suspentes'][0]['detailsChaineRouleau'][0]['valB']">
                                <option value=""></option>
                                <option value="A rouleau">A rouleau</option>
                                <option value="A rouleau">A maille jointive</option>
                            </select>
                        </p>
                        <p v-if='description["suspentes"][0]["hasChaineRouleau"]'>
                            Pas théorique : <input type="text"
                                v-model="description['suspentes'][0]['detailsChaineRouleau'][1]['valA']">
                            Combinaison : <input type="text"
                                v-model="description['suspentes'][0]['detailsChaineRouleau'][1]['valB']">
                        </p>
                        <p v-if='description["suspentes"][0]["hasChaineRouleau"]'>
                            Moufflage : <input type="text"
                                v-model="description['suspentes'][0]['detailsChaineRouleau'][2]['valA']">
                            Nombre de brins : <input type="text"
                                v-model="description['suspentes'][0]['detailsChaineRouleau'][2]['valB']">
                        </p>
                    </div>

                    <div>
                        <p><input type="checkbox" @input="chaineMaillons"
                                :checked='description["suspentes"][0]["hasChaineMaillons"]'>Chaîne(s) à maillons
                            calibrés :</p>
                        <p v-if='description["suspentes"][0]["hasChaineMaillons"]'>
                            Nombre : <input type="text"
                                v-model="description['suspentes'][0]['detailsChaineMaillons'][0]['valA']">
                            Type :
                            <select v-model="description['suspentes'][0]['detailsChaineMaillons'][0]['valB']">
                                <option value=""></option>
                                <option value="A maillons courts">A maillons courts</option>
                                <option value="A maillons longs">A maillons longs</option>
                            </select>
                        </p>
                        <p v-if='description["suspentes"][0]["hasChaineMaillons"]'>
                            Pas: <input type="text"
                                v-model="description['suspentes'][0]['detailsChaineMaillons'][1]['valA']">
                            Diamètre :<input type="text"
                                v-model="description['suspentes'][0]['detailsChaineMaillons'][1]['valB']">
                        </p>
                        <p v-if='description["suspentes"][0]["hasChaineMaillons"]'>
                            Moufflage : <input type="text"
                                v-model="description['suspentes'][0]['detailsChaineMaillons'][2]['valA']">
                            Nombre de brins : <input type="text"
                                v-model="description['suspentes'][0]['detailsChaineMaillons'][2]['valB']">
                        </p>
                    </div>


                    <div>
                        <p><input type="checkbox" @input="sangle"
                                :checked='description["suspentes"][0]["hasSangle"]'>Sangle de levage :</p>
                        <p v-if='description["suspentes"][0]["hasSangle"]'>hasSangle
                            Nombre : <input type="text"
                                v-model="description['suspentes'][0]['detailsSangle'][0]['valA']">
                            Composition :<input type="text"
                                v-model="description['suspentes'][0]['detailsSangle'][0]['valB']">
                        </p>
                        <p v-if='description["suspentes"][0]["hasSangle"]'>
                            Section (mm2): <input type="text"
                                v-model="description['suspentes'][0]['detailsSangle'][1]['valA']">
                        </p>
                        <p v-if='description["suspentes"][0]["hasSangle"]'>
                            Moufflage : <input type="text"
                                v-model="description['suspentes'][0]['detailsSangle'][2]['valA']">
                            Nombre de brins : <input type="text"
                                v-model="description['suspentes'][0]['detailsSangle'][2]['valB']">
                        </p>

                    </div>

                </td>
            </tr>

            <tr>
                <td>B-3</td>
                <td :class="[description.mecanisme.length != 0 ? 'saved' : 'not-saved']">MECANISME ET MOUVEMENT</td>
                <td class="fourth">
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



        </table>

        <Loading v-if="flagLoading" />

    </div>

</template>

<script>

import Descriptions from "@/requests/appareil_levage/famille1_lev1/Descriptions"
import Observateurs from "@/requests/Observateurs"
import Loading from '@/components/models/Loading.vue'

export default {
    name: 'renseignement-component',
    data() {
        return {
            flagLoading: false,
            colorSuspentes: false,
            colorCaracteristiques: false,
            counter_watched: 0,
            watched_sauvegarder: false,
            flagReset: false,

            description: {

                marquage: "",

                chargeMaximaleUtile: "",
                porteeMinimale: "",
                distanceCentreGravite: "",
                course: "",
                hauteurLevage: "",
                portee: "",
                porteFauxDeport: "",
                longueurCheminRoulement: "",
                dimensionPlateau: "",
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
                            { a: "Moufflage :", valA: "", b: "Nombre de brins :", valB: "", c: "", valC: "" }
                        ],

                        hasChaineRouleau: false,
                        chaineRouleau: "Chaîne(s) a rouleau ou mailles jointives :",
                        hasDetailsChaineRouleau: false,
                        detailsChaineRouleau: [
                            { a: "Nombre :", valA: "", b: "Type :", valB: "", c: "", valC: "" },
                            { a: "Pas théorique :", valA: "", b: "Combinaison :", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "", b: "Nombre de brins :", valB: "", c: "", valC: "" }
                        ],

                        hasChaineMaillons: false,
                        chaineMaillons: "Chaîne(s) à maillons calibrés :",
                        hasDetailsChaineMaillons: false,
                        detailsChaineMaillons: [
                            { a: "Nombre :", valA: "", b: "Type :", valB: "", c: "", valC: "" },
                            { a: "Pas théorique :", valA: "", b: "Diamètre :", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "", b: "Nombre de brins :", valB: "", c: "", valC: "" },
                        ],

                        hasSangle: false,
                        sangle: "Sangle de levage :",
                        hasDetailsSangle: false,
                        detailsSangle: [
                            { a: "Nombre :", valA: "", b: "Composition :", valB: "", c: "", valC: "" },
                            { a: "Section (mm2):", valA: "", b: "", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "", b: "Nombre de brins :", valB: "", c: "", valC: "" },
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
                course: "",
                hauteurLevage: "",
                portee: "",
                porteFauxDeport: "",
                longueurCheminRoulement: "",
                dimensionPlateau: "",
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
                            { a: "Moufflage :", valA: "", b: "Nombre de brins :", valB: "", c: "", valC: "" }
                        ],

                        hasChaineRouleau: false,
                        chaineRouleau: "Chaîne(s) a rouleau ou mailles jointives :",
                        hasDetailsChaineRouleau: false,
                        detailsChaineRouleau: [
                            { a: "Nombre :", valA: "", b: "Type :", valB: "", c: "", valC: "" },
                            { a: "Pas théorique :", valA: "", b: "Combinaison :", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "", b: "Nombre de brins :", valB: "", c: "", valC: "" }
                        ],

                        hasChaineMaillons: false,
                        chaineMaillons: "Chaîne(s) à maillons calibrés :",
                        hasDetailsChaineMaillons: false,
                        detailsChaineMaillons: [
                            { a: "Nombre :", valA: "", b: "Type :", valB: "", c: "", valC: "" },
                            { a: "Pas théorique :", valA: "", b: "Diamètre :", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "", b: "Nombre de brins :", valB: "", c: "", valC: "" },
                        ],

                        hasSangle: false,
                        sangle: "Sangle de levage :",
                        hasDetailsSangle: false,
                        detailsSangle: [
                            { a: "Nombre :", valA: "", b: "Composition :", valB: "", c: "", valC: "" },
                            { a: "Section (mm2):", valA: "", b: "", valB: "", c: "", valC: "" },
                            { a: "Moufflage :", valA: "", b: "Nombre de brins :", valB: "", c: "", valC: "" },
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
        Loading
    },

    watch: {
        description: {
            handler() {
                const count = this.counter_watched++;
                console.log(count)
                
                if (count == 0 || count == 1) {
                    this.watched_sauvegarder = false;
                }

                if(count == 2) {
                    this.watched_sauvegarder = true;
                }
                
                if(count > 2) {
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

            if (arr.includes(true)) {
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
            this.$emit("changeColorDescription_famille1_lev1", this.checkProperties());
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
                        if(this.checkProperties() == true) {
                            this.$emit("handelTerminer");
                        }
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
                    this.$emit("changeColorDescription_famille1_lev1", false);
                    this.$emit("resetTerminer");

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },


    created() {

        this.flagLoading = true;
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
                    this.flagLoading = false;
                    this.flagReset = true;
                    this.description = result.data.description;
                } else {
                    this.flagLoading = false;
                }

                this.colorCaracteristiques = this.checkCaracterstiques();
                this.colorSuspentes = this.checkeSuspentes();
                this.watched_sauvegarder = false;
                return this.notEmpty();
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
</script>

<style scoped>
/* Start Cofiguration All */
.descriptions {
    margin-top: 10px;
    margin-bottom: 150px;
    width: inherit;
}

.descriptions table {
    border-collapse: collapse;
    border: none;
    overflow: scroll;
}

.descriptions table tr td:nth-child(1) {
    font-size: x-large;
    width: 40px;
    border-right: 1px solid black;
}

.descriptions table tr td:nth-child(2) {
    font-size: large;
}

/* End Configuration All */


/* Strat First  */
.descriptions table tr td.first {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

/* End First */


/* Strat Second  */
.descriptions table tr td.second {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.descriptions table tr td.second p {
    margin: 0;
    margin-top: 1px;
    font-size: small;
}

/* End Second */


/* Strat Third  */
.descriptions table tr td.third {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.descriptions table tr td.third div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.descriptions table tr td.third div p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    margin-top: 1px;
    font-size: small;
}

.descriptions table tr td.third div p input[type="text"]{
    height: 25px;
    width: 50px;
    font-size: medium;
}


/* End Third */

/* Strat Fourth  */
.descriptions table tr td.fourth {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

/* End Fourth */


/* Start Configuration */

.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}

input[type="text"],
select {
    height: 25px;
    width: 120px;
    font-size: medium;
}

.sauvegarder {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 5px;
    margin-top: 5px;
    padding: 5px;
    border-bottom: 1px solid #141293;
    /* overflow-y: auto; */
}

.sauvegarder button {
    margin-left: 5px;
    margin-right: 5px;
}

.sauvegarder .watch {
    background-color: green;
    color: white;
    height: 30px;
    width: fit-content;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .watch:hover {
    background-color: rgb(2, 49, 2);
}

.sauvegarder .not-watch {
    background-color: red;
    color: white;
    height: 30px;
    width:  fit-content;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .not-watch:hover {
    background-color: rgb(84, 1, 1);
}

.sauvegarder .reset {
    background-color: red;
    color: white;
    height: 30px;
    width: fit-content;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
}

.sauvegarder .reset:hover {
    background-color: rgb(84, 1, 1);
}


.spinner {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* End Configuration */


tr {
    border-bottom: 1pt solid black;
}
</style>