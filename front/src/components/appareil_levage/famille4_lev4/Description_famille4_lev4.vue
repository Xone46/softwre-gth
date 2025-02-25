<template>

    <div class="descriptions">

                
        <div class="sauvegarder">
            <button :class="[watched_sauvegarder == true ? 'watch' : 'not-watch']" @click="sauvegarde">
                {{ watched_sauvegarder == true ? "Déjà envoyé" : "Envoyer" }}
            </button>
            <button @click="reset">Initialiser</button>
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
                <td :class="[colorCaracteristiques === true ? 'saved' : 'not-saved']">CARACTERISTIQUES DIMENSIONNELLES
                    ET
                    DE CHARGE</td>
                <td class="second">
                    <p>Charge maximale utile (kg) : <input type="text" :value="description.chargeMaximaleUtile"
                            @input="saisirChargeMaximaleUtile($event)"></p>

                    <p>Hauteur d'élévation (m) : <input type="text" :value="description.hauteurElevation"
                            @input="saisirHauteurElevation($event)"></p>

                    <p>Extension de plate forme : <input type="text" :value="description.extensionPlateforme"
                            @input="saisirExtensionPlateforme($event)"></p>

                    <p>Dévers autorisé : <input type="text" :value="description.deversAutorise"
                            @input="saisirDeversAutorise($event)"></p>

                    <p>Nombre de personnes : <input type="text" :value="description.nombrePersonnes"
                            @input="saisirNombrePersonnes($event)"></p>

                    <p>Portée : <input type="text" :value="description.portee" @input="saisirPortee($event)"></p>

                </td>
            </tr>


            <tr>
                <td>B-3</td>
                <td :class="[colorMecanismes == true ? 'saved' : 'not-saved']">MECANISMES</td>
                <td class="third">
                    <div>
                        <p v-for="item in description.mecanismes" :key="item.index">
                            <input type="checkbox" @input="saisirMecanisme(item.index)" :value="item.status"
                                :checked="item.status">{{
                                    item.titre }}
                        <ul v-if="item.status">
                            <li v-for="el in item.tab" :key="el.index">
                                <input type="checkbox" @input="saisirSousMecanisme(item.index, el.index)"
                                    :checked="el.status">
                                {{ el.titre }}
                                <input v-if="el.status && el.titre == 'en degrés :'" type="text" :value="el.content"
                                    @input="saisirContentMecanisme($event, item.index, el.index)">
                            </li>
                        </ul>
                        </p>
                    </div>
                </td>
            </tr>


            <tr>
                <td>B-4</td>
                <td :class="[colorSourceEnergie == true ? 'saved' : 'not-saved']">SOURCE D'ENERGIE</td>
                <td class="fourth">
                    <div>
                        <p v-for="item in description.sourceEnergie" :key="item.index">
                            <input type="checkbox" @input="saisirSourceEnergie(item.index)" :value="item.status"
                                :checked="item.status">{{
                                    item.titre }}
                            <input v-if="item.status && item.content !== undefined" type="text" :value="item.content"
                                @input="saisirContentSourceEnergie($event, item.index)">
                        </p>
                    </div>
                </td>
            </tr>


            <tr>
                <td>B-5</td>
                <td :class="[colorTranslation == true ? 'saved' : 'not-saved']">TRANSLATION</td>
                <td class="fifth">
                    <div>
                        <p v-for="item in description.translation" :key="item.index">
                            <input type="checkbox" @input="saisirTranslation(item.index)" :value="item.status"
                                :checked="item.status">{{
                                    item.titre }}
                            <input v-if="item.status && item.content !== undefined" type="text" :value="item.content"
                                @input="saisirContentTranslation($event, item.index)">
                        </p>
                    </div>
                </td>
            </tr>

            <tr>
                <td>B-6</td>
                <td :class="[colorChainesCablesElevation == true ? 'saved' : 'not-saved']">CHAINES OU CABLES D'ELEVATION
                </td>
                <td class="sixth">
                    <div>
                        <p v-for="item in description.chainesCablesElevation" :key="item.index">
                            <input type="checkbox" @input="saisirChainesCablesElevation(item.index)"
                                :value="item.status" :checked="item.status">{{ item.titre }}
                        </p>
                    </div>
                </td>
            </tr>

            <tr>
                <td>B-6-1</td>
                <td :class="[colorCaracteristiquesSuspenteOne == true ? 'saved' : 'not-saved']">Caractéristiques
                    Suspente 1</td>
                <td class="sixth-first">
                    <div>
                        <p v-for="item in description.caracteristiquesSuspenteOne" :key="item.index">
                            <input type="checkbox" @input="saisirCaracteristiquesSuspenteOne(item.index)"
                                :value="item.status" :checked="item.status">
                            {{ item.titre }}
                        <ul v-if="item.status">
                            <li v-for="el in item.tab" :key="el.index">
                                <input type="checkbox"
                                    @input="saisirSousCaracteristiquesSuspenteOne(item.index, el.index)"
                                    :checked="el.status">
                                {{ el.titre }}
                                <input v-if="el.status && el.content !== undefined" type="text" :value="el.content"
                                    @input="saisirContentCaracteristiquesSuspenteOne($event, item.index, el.index)">
                            </li>
                        </ul>
                        </p>
                    </div>
                </td>
            </tr>

            <tr>
                <td>B-6-2</td>
                <td :class="[colorCaracteristiquesSuspenteTow == true ? 'saved' : 'not-saved']">Caractéristiques
                    Suspente 2</td>
                <td class="sixth-second">
                    <div>
                        <p v-for="item in description.caracteristiquesSuspenteTow" :key="item.index">
                            <input type="checkbox" @input="saisirCaracteristiquesSuspenteTow(item.index)"
                                :value="item.status" :checked="item.status">
                            {{ item.titre }}
                        <ul v-if="item.status">
                            <li v-for="el in item.tab" :key="el.index">
                                <input type="checkbox"
                                    @input="saisirSousCaracteristiquesSuspenteTow(item.index, el.index)"
                                    :checked="el.status">
                                {{ el.titre }}
                                <input v-if="el.status && el.content !== undefined" type="text" :value="el.content"
                                    @input="saisirContentCaracteristiquesSuspenteTow($event, item.index, el.index)">
                            </li>
                        </ul>
                        </p>
                    </div>
                </td>
            </tr>



        </table>

        <Loading v-if="flagLoading" />



    </div>

</template>

<script>
import Descriptions from "@/requests/appareil_levage/famille4_lev4/Descriptions"
import Observateurs from "@/requests/Observateurs"
import Loading from '@/components/models/Loading.vue'


export default {
    name: 'renseignement-component',
    data() {
        return {

            flagLoading: false,

            colorCaracteristiques: false,
            colorMecanismes: false,
            colorSourceEnergie: false,
            colorTranslation: false,
            colorChainesCablesElevation: false,
            colorCaracteristiquesSuspenteOne: false,
            colorCaracteristiquesSuspenteTow: false,

            counter_watched: 0,
            watched_sauvegarder: false,
            flagReset: false,

            description: {

                marquage: "",

                chargeMaximaleUtile: "",
                hauteurElevation: "",
                extensionPlateforme: "",
                deversAutorise: "",
                nombrePersonnes: "",
                portee: "",


                mecanismes: [
                    {
                        index: 0,
                        titre: "Elévation :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Hydraulique", status: false, content: " " },
                            { index: 1, titre: "Mécanique", status: false, content: " " },
                            { index: 2, titre: "Electro-hydraulique", status: false, content: " " },
                            { index: 3, titre: "Câbles", status: false, content: " " },
                            { index: 4, titre: "Chaînes", status: false, content: " " },
                            { index: 5, titre: "Sans objet", status: false, content: " " }
                        ]
                    },
                    {
                        index: 1,
                        titre: "Télescopage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Hydraulique", status: false, content: " " },
                            { index: 1, titre: "Mécanique", status: false, content: " " },
                            { index: 2, titre: "Electro-hydraulique", status: false, content: " " },
                            { index: 3, titre: "Câbles", status: false, content: " " },
                            { index: 4, titre: "Chaînes", status: false, content: " " },
                            { index: 5, titre: "Sans objet", status: false, content: " " }
                        ]
                    },
                    {
                        index: 2,
                        titre: "Orientation :",
                        status: false,
                        tab: [
                            { index: 0, titre: "en degrés :", status: false, content: " " },
                            { index: 1, titre: "Sans objet", status: false, content: " " }
                        ]
                    },
                    {
                        index: 3,
                        titre: "Pendulaire :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Sans objet", status: false, content: " " }
                        ]
                    },
                    {
                        index: 4,
                        titre: "Rotation du poste de travail :",
                        status: false,
                        tab: [
                            { index: 0, titre: "poste fixe", status: false, content: " " }
                        ]
                    },
                ],

                sourceEnergie: [
                    { index: 0, titre: "Electrique", status: false },
                    { index: 1, titre: "Thermique", status: false },
                    { index: 2, titre: "Autre", status: false, content: " " },
                ],

                translation: [
                    { index: 0, titre: "Electrique", status: false },
                    { index: 1, titre: "Thermique", status: false },
                    { index: 2, titre: "Manuelle", status: false },
                    { index: 3, titre: "Autre", status: false, content: " " },
                ],

                chainesCablesElevation: [
                    { index: 0, titre: "Sans objet", status: false },
                    { index: 1, titre: "Elevation", status: false },
                    { index: 2, titre: "Relevage", status: false },
                    { index: 3, titre: "Téléscopage", status: false },
                ],

                caracteristiquesSuspenteOne: [
                    {
                        index: 0,
                        titre: "Suspentes de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de chaînes ou câbles :", status: false, content: " " },
                            { index: 1, titre: "Sans objet", status: false },
                        ]
                    },
                    {
                        index: 1,
                        titre: "Câble(s) de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Composition :", status: false, content: " " },
                            { index: 1, titre: "Diamètre théorique (mm) :", status: false, content: " " },
                        ]
                    },
                    {
                        index: 2,
                        titre: "Chaînes(s) de levage / Caractéristiques :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Type de chaine :", status: false, content: " " },
                            { index: 1, titre: "Pas théorique :", status: false, content: " " },
                        ]
                    }
                ],

                caracteristiquesSuspenteTow: [
                    {
                        index: 0,
                        titre: "Suspentes de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de chaînes ou câbles :", status: false, content: " " },
                            { index: 1, titre: "Sans objet", status: false },
                        ]
                    },
                    {
                        index: 1,
                        titre: "Câble(s) de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Composition :", status: false, content: " " },
                            { index: 1, titre: "Diamètre théorique (mm) :", status: false, content: " " },
                        ]
                    },
                    {
                        index: 2,
                        titre: "Chaînes(s) de levage / Caractéristiques :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Type de chaine :", status: false, content: " " },
                            { index: 1, titre: "Pas théorique :", status: false, content: " " },
                        ]
                    }
                ],

                siPresence: "",

                observateurId: ""
            },

            duplicate_description: {

                marquage: "",

                chargeMaximaleUtile: "",
                hauteurElevation: "",
                extensionPlateforme: "",
                deversAutorise: "",
                nombrePersonnes: "",
                portee: "",


                mecanismes: [
                    {
                        index: 0,
                        titre: "Elévation :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Hydraulique", status: false, content: " " },
                            { index: 1, titre: "Mécanique", status: false, content: " " },
                            { index: 2, titre: "Electro-hydraulique", status: false, content: " " },
                            { index: 3, titre: "Câbles", status: false, content: " " },
                            { index: 4, titre: "Chaînes", status: false, content: " " },
                            { index: 5, titre: "Sans objet", status: false, content: " " }
                        ]
                    },
                    {
                        index: 1,
                        titre: "Télescopage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Hydraulique", status: false, content: " " },
                            { index: 1, titre: "Mécanique", status: false, content: " " },
                            { index: 2, titre: "Electro-hydraulique", status: false, content: " " },
                            { index: 3, titre: "Câbles", status: false, content: " " },
                            { index: 4, titre: "Chaînes", status: false, content: " " },
                            { index: 5, titre: "Sans objet", status: false, content: " " }
                        ]
                    },
                    {
                        index: 2,
                        titre: "Orientation :",
                        status: false,
                        tab: [
                            { index: 0, titre: "en degrés :", status: false, content: " " },
                            { index: 1, titre: "Sans objet", status: false, content: " " }
                        ]
                    },
                    {
                        index: 3,
                        titre: "Pendulaire :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Sans objet", status: false, content: " " }
                        ]
                    },
                    {
                        index: 4,
                        titre: "Rotation du poste de travail :",
                        status: false,
                        tab: [
                            { index: 0, titre: "poste fixe", status: false, content: " " }
                        ]
                    },
                ],

                sourceEnergie: [
                    { index: 0, titre: "Electrique", status: false },
                    { index: 1, titre: "Thermique", status: false },
                    { index: 2, titre: "Autre", status: false, content: " " },
                ],

                translation: [
                    { index: 0, titre: "Electrique", status: false },
                    { index: 1, titre: "Thermique", status: false },
                    { index: 2, titre: "Manuelle", status: false },
                    { index: 3, titre: "Autre", status: false, content: " " },
                ],

                chainesCablesElevation: [
                    { index: 0, titre: "Sans objet", status: false },
                    { index: 1, titre: "Elevation", status: false },
                    { index: 2, titre: "Relevage", status: false },
                    { index: 3, titre: "Téléscopage", status: false },
                ],

                caracteristiquesSuspenteOne: [
                    {
                        index: 0,
                        titre: "Suspentes de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de chaînes ou câbles :", status: false, content: " " },
                            { index: 1, titre: "Sans objet", status: false },
                        ]
                    },
                    {
                        index: 1,
                        titre: "Câble(s) de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Composition :", status: false, content: " " },
                            { index: 1, titre: "Diamètre théorique (mm) :", status: false, content: " " },
                        ]
                    },
                    {
                        index: 2,
                        titre: "Chaînes(s) de levage / Caractéristiques :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Type de chaine :", status: false, content: " " },
                            { index: 1, titre: "Pas théorique :", status: false, content: " " },
                        ]
                    }
                ],

                caracteristiquesSuspenteTow: [
                    {
                        index: 0,
                        titre: "Suspentes de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de chaînes ou câbles :", status: false, content: " " },
                            { index: 1, titre: "Sans objet", status: false },
                        ]
                    },
                    {
                        index: 1,
                        titre: "Câble(s) de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Composition :", status: false, content: " " },
                            { index: 1, titre: "Diamètre théorique (mm) :", status: false, content: " " },
                        ]
                    },
                    {
                        index: 2,
                        titre: "Chaînes(s) de levage / Caractéristiques :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Type de chaine :", status: false, content: " " },
                            { index: 1, titre: "Pas théorique :", status: false, content: " " },
                        ]
                    }
                ],

                siPresence: "",

                observateurId: ""
            },
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
                if (count == 2) {
                    this.watched_sauvegarder = true;
                } else if(count > 2) {
                    this.watched_sauvegarder = false;
                }
                this.notEmpty();
            },
            deep: true
        }
    },

    methods: {

        checkCaracterstiques() {

            if (this.description.chargeMaximaleUtile == "") {
                return false;
            }

            if (this.description.hauteurElevation == "") {
                return false;
            }

            if (this.description.extensionPlateforme == "") {
                return false;
            }

            if (this.description.deversAutorise == "") {
                return false;
            }

            if (this.description.nombrePersonnes == "") {
                return false;
            }

            if (this.description.portee == "") {
                return false;
            }

            return true;
        },

        checkMecanismes() {


            const arr = [
                this.description.mecanismes[0].status,
                this.description.mecanismes[1].status,
                this.description.mecanismes[2].status,
                this.description.mecanismes[3].status,
                this.description.mecanismes[4].status
            ]

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkSourceEnergie() {

            const arr = [
                this.description.sourceEnergie[0].status,
                this.description.sourceEnergie[1].status,
                this.description.sourceEnergie[2].status
            ]

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkTranslation() {
            const arr = [
                this.description.translation[0].status,
                this.description.translation[1].status,
                this.description.translation[2].status,
                this.description.translation[3].status
            ]

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkChainesCablesElevation() {
            const arr = [
                this.description.chainesCablesElevation[0].status,
                this.description.chainesCablesElevation[1].status,
                this.description.chainesCablesElevation[2].status,
                this.description.chainesCablesElevation[3].status
            ]

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkCaracteristiquesSuspenteOne() {

            const arr = [
                this.description.caracteristiquesSuspenteOne[0].status,
                this.description.caracteristiquesSuspenteOne[1].status,
                this.description.caracteristiquesSuspenteOne[2].status
            ]

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkCaracteristiquesSuspenteTow() {

            const arr = [
                this.description.caracteristiquesSuspenteTow[0].status,
                this.description.caracteristiquesSuspenteTow[1].status,
                this.description.caracteristiquesSuspenteTow[2].status
            ];

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkProperties() {

            const arr = [
                this.checkCaracterstiques(),
                this.checkMecanismes(),
                this.checkSourceEnergie(),
                this.checkTranslation(),
                this.checkChainesCablesElevation(),
                this.checkCaracteristiquesSuspenteOne(),
                this.checkCaracteristiquesSuspenteTow(),
            ];

            let checker = arr => arr.every(Boolean);


            if (checker(arr) == true) {
                return true
            } else {
                return false;
            }

        },

        notEmpty() {

            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorMecanismes = this.checkMecanismes();
            this.colorSourceEnergie = this.checkSourceEnergie();
            this.colorTranslation = this.checkTranslation();
            this.colorChainesCablesElevation = this.checkChainesCablesElevation();
            this.colorCaracteristiquesSuspenteOne = this.checkCaracteristiquesSuspenteOne();
            this.colorCaracteristiquesSuspenteTow = this.checkCaracteristiquesSuspenteTow();

            this.$emit("changeColorDescription_famille4_lev4", this.checkProperties());
        },

        saisirChargeMaximaleUtile(e) {
            this.description.chargeMaximaleUtile = e.target.value;
        },

        saisirHauteurElevation(e) {
            this.description.hauteurElevation = e.target.value;
        },

        saisirExtensionPlateforme(e) {
            this.description.extensionPlateforme = e.target.value;
        },

        saisirDeversAutorise(e) {
            this.description.deversAutorise = e.target.value;
        },

        saisirNombrePersonnes(e) {
            this.description.nombrePersonnes = e.target.value;
        },

        saisirPortee(e) {
            this.description.portee = e.target.value;
        },


        saisirMecanisme(index) {
            this.description.mecanismes[index].status = !this.description.mecanismes[index].status;
            this.notEmpty();
        },

        saisirSousMecanisme(index, i) {
            this.description.mecanismes[index].tab[i].status = !this.description.mecanismes[index].tab[i].status;
            this.notEmpty();
        },

        saisirContentMecanisme(e, index, i) {
            this.description.mecanismes[index].tab[i].content = e.target.value;
            this.notEmpty();
        },

        saisirSourceEnergie(index) {
            this.description.sourceEnergie[index].status = !this.description.sourceEnergie[index].status;
            this.notEmpty();
        },

        saisirContentSourceEnergie(e, index) {
            this.description.sourceEnergie[index].content = e.target.value;
            this.notEmpty();
        },

        saisirTranslation(index) {
            this.description.translation[index].status = !this.description.translation[index].status;
            this.notEmpty();
        },

        saisirContentTranslation(e, index) {
            this.description.translation[index].content = e.target.value;
            this.notEmpty();
        },

        saisirChainesCablesElevation(index) {
            this.description.chainesCablesElevation[index].status = !this.description.chainesCablesElevation[index].status;
            this.notEmpty();
        },

        saisirCaracteristiquesSuspenteOne(index) {
            this.description.caracteristiquesSuspenteOne[index].status = !this.description.caracteristiquesSuspenteOne[index].status;
        },

        saisirSousCaracteristiquesSuspenteOne(index, i) {
            this.description.caracteristiquesSuspenteOne[index].tab[i].status = !this.description.caracteristiquesSuspenteOne[index].tab[i].status;
        },

        saisirContentCaracteristiquesSuspenteOne(e, index, i) {
            this.description.caracteristiquesSuspenteOne[index].tab[i].content = e.target.value;
        },

        saisirCaracteristiquesSuspenteTow(index) {
            this.description.caracteristiquesSuspenteTow[index].status = !this.description.caracteristiquesSuspenteTow[index].status;
        },

        saisirSousCaracteristiquesSuspenteTow(index, i) {
            this.description.caracteristiquesSuspenteTow[index].tab[i].status = !this.description.caracteristiquesSuspenteTow[index].tab[i].status;
        },

        saisirContentCaracteristiquesSuspenteTow(e, index, i) {
            this.description.caracteristiquesSuspenteTow[index].tab[i].content = e.target.value;
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
                    this.$emit("changeColorDescription_famille4_lev4", false);
                    return this.notEmpty();
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
                    this.flagReset = true;
                    this.description = result.data.description;
                    this.watched_sauvegarder = true;
                }

                this.flagLoading = false;
                this.notEmpty();

            })
            .catch((error) => {
                console.log(error)
            });
    }
}
</script>

<style scoped>
.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}

input,
select {
    height: 25px;
    font-size: medium;
}

/* Start Configration body */
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

/* End Configration body */


/* Start first */
.descriptions table tr td.first {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

/* End first */

/* Start Second */
.descriptions table tr td.second {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.second p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin-top: 5px;
    margin-bottom: 5px;
}

/* End Second */

/* Start third */
.descriptions table tr td.third div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.third div p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.third div p ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.third div p ul li {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin-top: 0;
}

/* End third */

/* Start fourth */
.descriptions table tr td.fourth {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin-top: 0;
}

.descriptions table tr td.fourth p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin-top: 0;
}

/* End fourth */

/* Start fifth */
.descriptions table tr td.fifth {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin-top: 0;
}

.descriptions table tr td.fifth p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin-top: 0;
}

/* End fifth */

/* Start sixth */
.descriptions table tr td.sixth {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin-top: 0;
}

.descriptions table tr td.sixth p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin-top: 0;
}

.descriptions table tr td.sixth p ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin-top: 0;
}

.descriptions table tr td.sixth p ul li {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

/* End sixth */

/* Start sixth-first */
.descriptions table tr td.sixth-first {
    padding: 0;
    margin-top: 0;
}

.descriptions table tr td.sixth-first div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.sixth-first div p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.sixth-first div p ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.sixth-first p ul li {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
}

/* End sixth-first */



/* Start sixth-second */
.descriptions table tr td.sixth-second {
    padding: 0;
    margin-top: 0;
}

.descriptions table tr td.sixth-second div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.sixth-second div p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.sixth-second div p ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.sixth-second p ul li {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
}

/* End sixth-second */


/* Start buttons */
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
}

.sauvegarder button {
    margin-left: 5px;
    margin-right: 5px;
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

.sauvegarder .watch:hover {
    background-color: rgb(2, 49, 2);
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

.sauvegarder .not-watch:hover {
    background-color: rgb(84, 1, 1);
}

.sauvegarder button {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder button:hover {
    background-color: rgb(84, 1, 1);
}

/* End buttons */

tr {
    border-bottom: 1pt solid black;
}
</style>