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
                    <p>Charge maximale utile (kg) : <input type="text" :value="description.chargeMaximaleUtile"
                            @input="saisirChargeMaximaleUtile($event)"></p>

                    <p>Distance du centre de gravité en (mm) : <input type="text"
                            :value="description.distanceCentreGravite" @input="saisirDistanceCentreGravite($event)"></p>

                    <p>Charge maximale utile (kg) a hauteur de levée maximale : <input type="text"
                            :value="description.chargeMaximalUtileHauteurLeveeMaximale"
                            @input="saisirChargeMaximalUtileHauteurLeveeMaximale($event)"></p>

                    <p>Hauteur de levée maximale (m) : <input type="text" :value="description.hauteurLeveeMaximale"
                            @input="saisirHauteurLeveeMaximale($event)"></p>

                    <p>Pour chariots sans marquage (ni CE ni Epsilon) Charge maximale mat incliné et a la hauteur
                        maximale (m) : <input type="text" :value="description.chariotsSansMarquage"
                            @input="saisirChariotsSansMarquage($event)"></p>

                </td>
            </tr>

            <tr>
                <td>B-3</td>
                <td :class="[colorMecanismes == true ? 'saved' : 'not-saved']">MECANISMES</td>
                <td class="third">
                    <div>
                        <p v-for="item in description.mecanismes" :key="item.index">
                            <input type="checkbox" @input="saisirMecanisme(item.index)" :value="item.status"
                                :checked="item.status">{{ item.titre }}
                        <ul v-if="item.status">
                            <li v-for="el in item.tab" :key="el.index">
                                <input type="checkbox" @input="saisirSousMecanisme(item.index, el.index)"
                                    :checked="el.status">
                                {{ el.titre }}
                                <input v-if="el.status && el.titre == 'Nombre de vérins :'" type="text"
                                    :value="el.content" @input="saisirContentMecanisme($event, item.index, el.index)">
                            </li>
                        </ul>
                        </p>
                    </div>
                </td>
            </tr>

            <tr>
                <td>B-4</td>
                <td :class="[colorMecanismes == true ? 'saved' : 'not-saved']">SOURCE D'ENERGIE</td>
                <td class="fourth">
                    <div>
                        <p v-for="item in description.sourceEnergie" :key="item.index">
                            <input type="checkbox" @input="saisirSourceEnergie(item.index)" :value="item.status"
                                :checked="item.status">{{
                                    item.titre }}
                        </p>
                    </div>
                </td>
            </tr>

            <tr>
                <td>B-5</td>
                <td :class="[colorMecanismes == true ? 'saved' : 'not-saved']">TRANSLATION</td>
                <td class="fifth">
                    <div>
                        <p v-for="item in description.translation" :key="item.index">
                            <input type="checkbox" @input="saisirTranslation(item.index)" :value="item.status"
                                :checked="item.status">{{
                                    item.titre }}
                        </p>
                    </div>
                </td>
            </tr>

            <tr>
                <td>B-6</td>
                <td :class="[colorMecanismes == true ? 'saved' : 'not-saved']">DISPOSITIFS D'ELEVATION</td>
                <td class="sixth">
                    <div>
                        <p v-for="item in description.dispositifsElevation" :key="item.index">
                            <input type="checkbox" @input="saisirDispositifsElevation(item.index)" :value="item.status"
                                :checked="item.status">{{ item.titre }}
                        <ul v-if="item.status">
                            <li v-for="el in item.tab" :key="el.index">
                                <input type="checkbox" @input="saisirSousDispositifsElevation(item.index, el.index)"
                                    :checked="el.status">
                                {{ el.titre }}
                                <input
                                    v-if="el.status && (el.titre == 'Nombre :' || el.titre == 'Diamètre théorique :' || el.titre == 'Diamètre mesuré :' || el.titre == 'Dimension théorique :')"
                                    type="text" :value="el.content"
                                    @input="saisirContentDispositifsElevation($event, item.index, el.index)">
                                <ul v-if="el.status && el.content === undefined">
                                    <li v-for="elem in el.sous_tab" :key="elem.index">
                                        <input type="checkbox"
                                            @input="saisirSousSousDispositifsElevation(item.index, el.index, elem.index)"
                                            :checked="elem.status">
                                        {{ elem.titre }}
                                        <input
                                            v-if="elem.status && (elem.titre == 'Combinaison :' || elem.titre == 'Nombre :' || elem.titre == 'Pas théorique :')"
                                            type="text"
                                            @input="saisirContentSousSousDispositifsElevation($event, item.index, el.index, elem.index)"
                                            :value="elem.content">
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        </p>
                    </div>
                </td>
            </tr>

            <tr>
                <td>B-7</td>
                <td :class="[colorMecanismes == true ? 'saved' : 'not-saved']">DISPOSITIF DE PREHENSION</td>
                <td class="seventh">
                    <div>
                        <p v-for="item in description.dispositifPrehension" :key="item.index">
                            <input type="checkbox" @input="saisirDispositifPrehension(item.index)" :value="item.status"
                                :checked="item.status">
                            {{ item.titre }}

                            <input v-if="item.status && item.titre == 'Autre :'" type="text" :value="item.content"
                            @input="dispositifPrehensionAutre($event, item.index)">

                            <ul v-if="item.status && item.tab !== undefined">
                                <li v-for="el in item.tab" :key="el.index">
                                    <input type="checkbox" @input="saisirSousrDispositifPrehension(item.index, el.index)"
                                        :checked="el.status">
                                    {{ el.titre }}
                                    <input v-if="el.status && el.content !== undefined" type="text" :value="el.content"
                                        @input="saisirContentDispositifPrehension($event, item.index, el.index)">
                                </li>
                            </ul>
                        </p>
                    </div>
                </td>
            </tr>

            <tr>
                <td>B-8</td>
                <td :class="[colorMecanismes == true ? 'saved' : 'not-saved']">EQUIPEMENTS INTERCHANGEABLES</td>
                <td class="eighth">
                    <div>
                        <p v-for="item in description.equipementsInterchangable" :key="item.index">
                            <input type="checkbox" @input="saisirEquipementsInterchangable(item.index)"
                                :value="item.status" :checked="item.status">
                            {{ item.titre }}
                            <input v-if="item.status && item.titre == 'Autre :'" type="text" :value="item.content"
                                @input="saisirContentEquipementsInterchangable($event, item.index)">
                        </p>
                    </div>
                    <div>
                        <p>Si présence : Identification de l'équipement concerné : <input type="text"
                                :value="description.siPresence" @input="saisirSiPresence($event)"></p>
                    </div>
                </td>
            </tr>

        </table>

        <Loading v-if="flagLoading" />


    </div>

</template>

<script>

import Descriptions from "@/requests/appareil_levage/famille3_lev3/Descriptions"
import Observateurs from "@/requests/Observateurs"
import Loading from '@/components/models/Loading.vue'

export default {
    name: 'renseignement-component',
    data() {
        return {

            flagLoading: true,

            colorCaracteristiques: false,
            colorMecanismes: false,
            counter_watched: 0,
            watched_sauvegarder: false,
            flagReset: false,

            description: {

                marquage: "",

                chargeMaximaleUtile: "",
                distanceCentreGravite: "",
                chargeMaximalUtileHauteurLeveeMaximale: "",
                hauteurLeveeMaximale: "",
                chariotsSansMarquage: "",

                mecanismes: [
                    {
                        index: 0,
                        titre: "levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de vérins :", status: false, content: " " },
                            { index: 1, titre: "Sans Chaines", status: false, content: " " },
                            { index: 2, titre: "Sans Câbles", status: false, content: " " }
                        ]
                    },
                    {
                        index: 1,
                        titre: "Inclinaison - Relevage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de vérins :", status: false, content: " " },
                            { index: 1, titre: "Sans", status: false, content: " " }
                        ]
                    },
                    {
                        index: 2,
                        titre: "Rétractation :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de vérins :", status: false, content: " " },
                            { index: 1, titre: "Sans", status: false, content: " " }
                        ]
                    },
                ],

                sourceEnergie: [
                    { index: 0, titre: "Electrique", status: false },
                    { index: 1, titre: "Thermique", status: false },
                    { index: 2, titre: "Diesel", status: false },
                    { index: 3, titre: "Gaz", status: false },
                    { index: 4, titre: "Electrique", status: false },
                    { index: 5, titre: "Essence", status: false }
                ],

                translation: [
                    { index: 0, titre: "Motorisée", status: false },
                    { index: 1, titre: "Manuelle", status: false }
                ],

                dispositifsElevation: [
                    {
                        index: 0,
                        titre: "Mat :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Simple", status: false, content: " " },
                            { index: 1, titre: "Duplex", status: false, content: " " },
                            { index: 2, titre: "Triplex", status: false, content: " " },
                            { index: 3, titre: "Quadruple", status: false, content: " " },
                            { index: 4, titre: "Autre", status: false, content: " " },
                        ]
                    },
                    {
                        index: 1,
                        titre: "Chaînes :",
                        status: false,
                        tab: [
                            {
                                index: 0,
                                titre: "Chaines de levée libre :",
                                status: false,
                                sous_tab: [
                                    { index: 0, titre: "Sans objet", status: false, content: " " },
                                    { index: 1, titre: "A maille jointives", status: false, content: " " },
                                    { index: 2, titre: "A rouleau", status: false, content: " " },
                                    { index: 3, titre: "Combinaison :", status: false, content: " " },
                                    { index: 4, titre: "Nombre :", status: false, content: " " },
                                    { index: 5, titre: "Pas théorique :", status: false, content: " " },
                                ]
                            },
                            {
                                index: 1,
                                titre: "Chaines de levée mât :",
                                status: false,
                                sous_tab: [
                                    { index: 0, titre: "Sans objet", status: false, content: " " },
                                    { index: 1, titre: "A maille jointives", status: false, content: " " },
                                    { index: 2, titre: "A rouleau", status: false, content: " " },
                                    { index: 3, titre: "Combinaison :", status: false, content: " " },
                                    { index: 4, titre: "Nombre :", status: false, content: " " },
                                    { index: 5, titre: "Pas théorique :", status: false, content: " " },
                                ]
                            }
                        ]
                    },
                    {
                        index: 2,
                        titre: "Câbles de levée mat :",
                        status: false,
                        tab: [
                            {
                                index: 0,
                                titre: "Sans objet",
                                status: false,
                                content: " "
                            },
                            {
                                index: 1,
                                titre: "Nombre :",
                                status: false,
                                content: " "
                            },
                            {
                                index: 2,
                                titre: "Diamètre théorique :",
                                status: false,
                                content: " "
                            },
                            {
                                index: 3,
                                titre: "Diamètre mesuré :",
                                status: false,
                                content: " "
                            }
                        ]
                    },
                    {
                        index: 3,
                        titre: "Sangles de levage :",
                        status: false,
                        tab: [
                            {
                                index: 0,
                                titre: "Sans objet",
                                status: false,
                            },
                            {
                                index: 1,
                                titre: "Nombre :",
                                status: false,
                                content: " "
                            },
                            {
                                index: 2,
                                titre: "Dimension théorique :",
                                status: false,
                                content: " "
                            }
                        ]
                    },
                ],

                dispositifPrehension: [
                    {
                        index: 0,
                        titre: "Fourches :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de bras :", status: false, content: " " },
                            { index: 1, titre: "Longueur (m) :", status: false, content: " " },
                            { index: 2, titre: "CMU X 2(Kg) :", status: false, content: " " },
                        ],
                        content : " "
                    },
                    {
                        index: 1,
                        titre: "Pinces :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de bras :", status: false, content: " " },
                            { index: 1, titre: "Longueur (m) :", status: false, content: " " },
                            { index: 2, titre: "CMU X 2(Kg) :", status: false, content: " " },
                        ],
                        content : " "
                    },
                    {
                        index: 2,
                        titre: "Autre :",
                        status: false,
                        content: " "
                    }
                ],


                equipementsInterchangable: [
                    {
                        index: 0,
                        titre: "Sans",
                        status: false,
                        contsnt: " "
                    },
                    {
                        index: 1,
                        titre: "Potence",
                        status: false,
                        content: " "
                    },
                    {
                        index: 2,
                        titre: "Tablier a déplacement latéral",
                        status: false,
                        content: " "
                    },
                    {
                        index: 3,
                        titre: "Rallonges de fourches",
                        status: false,
                        content: " "
                    },
                    {
                        index: 4,
                        titre: "Tablier rotatif",
                        status: false,
                        content: " "
                    },
                    {
                        index: 5,
                        titre: "Autre :",
                        status: false,
                        content: " "
                    }
                ],

                siPresence: "",

                observateurId: ""
            },

            duplicate_description: {

                marquage: "",

                chargeMaximaleUtile: "",
                distanceCentreGravite: "",
                chargeMaximalUtileHauteurLeveeMaximale: "",
                hauteurLeveeMaximale: "",
                chariotsSansMarquage: "",

                mecanismes: [
                    {
                        index: 0,
                        titre: "levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de vérins :", status: false, content: " " },
                            { index: 1, titre: "Sans Chaines", status: false, content: " " },
                            { index: 2, titre: "Sans Câbles", status: false, content: " " }
                        ]
                    },
                    {
                        index: 1,
                        titre: "Inclinaison - Relevage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de vérins :", status: false, content: " " },
                            { index: 1, titre: "Sans", status: false, content: " " }
                        ]
                    },
                    {
                        index: 2,
                        titre: "Rétractation :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de vérins :", status: false, content: " " },
                            { index: 1, titre: "Sans", status: false, content: " " }
                        ]
                    },
                ],

                sourceEnergie: [
                    { index: 0, titre: "Electrique", status: false },
                    { index: 1, titre: "Thermique", status: false },
                    { index: 2, titre: "Diesel", status: false },
                    { index: 3, titre: "Gaz", status: false },
                    { index: 4, titre: "Electrique", status: false },
                    { index: 5, titre: "Essence", status: false }
                ],

                translation: [
                    { index: 0, titre: "Motorisée", status: false },
                    { index: 1, titre: "Manuelle", status: false }
                ],

                dispositifsElevation: [
                    {
                        index: 0,
                        titre: "Mat :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Simple", status: false, content: " " },
                            { index: 1, titre: "Duplex", status: false, content: " " },
                            { index: 2, titre: "Triplex", status: false, content: " " },
                            { index: 3, titre: "Quadruple", status: false, content: " " },
                            { index: 4, titre: "Autre", status: false, content: " " },
                        ]
                    },
                    {
                        index: 1,
                        titre: "Chaînes :",
                        status: false,
                        tab: [
                            {
                                index: 0,
                                titre: "Chaines de levée libre :",
                                status: false,
                                sous_tab: [
                                    { index: 0, titre: "Sans objet", status: false, content: " " },
                                    { index: 1, titre: "A maille jointives", status: false, content: " " },
                                    { index: 2, titre: "A rouleau", status: false, content: " " },
                                    { index: 3, titre: "Combinaison :", status: false, content: " " },
                                    { index: 4, titre: "Nombre :", status: false, content: " " },
                                    { index: 5, titre: "Pas théorique :", status: false, content: " " },
                                ]
                            },
                            {
                                index: 1,
                                titre: "Chaines de levée mât :",
                                status: false,
                                sous_tab: [
                                    { index: 0, titre: "Sans objet", status: false, content: " " },
                                    { index: 1, titre: "A maille jointives", status: false, content: " " },
                                    { index: 2, titre: "A rouleau", status: false, content: " " },
                                    { index: 3, titre: "Combinaison :", status: false, content: " " },
                                    { index: 4, titre: "Nombre :", status: false, content: " " },
                                    { index: 5, titre: "Pas théorique :", status: false, content: " " },
                                ]
                            }
                        ]
                    },
                    {
                        index: 2,
                        titre: "Câbles de levée mat :",
                        status: false,
                        tab: [
                            {
                                index: 0,
                                titre: "Sans objet",
                                status: false,
                                content: " "
                            },
                            {
                                index: 1,
                                titre: "Nombre :",
                                status: false,
                                content: " "
                            },
                            {
                                index: 2,
                                titre: "Diamètre théorique :",
                                status: false,
                                content: " "
                            },
                            {
                                index: 3,
                                titre: "Diamètre mesuré :",
                                status: false,
                                content: " "
                            }
                        ]
                    },
                    {
                        index: 3,
                        titre: "Sangles de levage :",
                        status: false,
                        tab: [
                            {
                                index: 0,
                                titre: "Sans objet",
                                status: false,
                            },
                            {
                                index: 1,
                                titre: "Nombre :",
                                status: false,
                                content: " "
                            },
                            {
                                index: 2,
                                titre: "Dimension théorique :",
                                status: false,
                                content: " "
                            }
                        ]
                    },
                ],

                dispositifPrehension: [
                    {
                        index: 0,
                        titre: "Fourches :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de bras :", status: false, content: " " },
                            { index: 1, titre: "Longueur (m) :", status: false, content: " " },
                            { index: 2, titre: "CMU X 2(Kg) :", status: false, content: " " },
                        ]
                    },
                    {
                        index: 1,
                        titre: "Pinces :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Nombre de bras :", status: false, content: " " },
                            { index: 1, titre: "Longueur (m) :", status: false, content: " " },
                            { index: 2, titre: "CMU X 2(Kg) :", status: false, content: " " },
                        ]
                    },
                    {
                        index: 2,
                        titre: "Autre :",
                        status: false,
                        content: " "
                    }
                ],


                equipementsInterchangable: [
                    {
                        index: 0,
                        titre: "Sans",
                        status: false,
                        contsnt: " "
                    },
                    {
                        index: 1,
                        titre: "Potence",
                        status: false,
                        content: " "
                    },
                    {
                        index: 2,
                        titre: "Tablier a déplacement latéral",
                        status: false,
                        content: " "
                    },
                    {
                        index: 3,
                        titre: "Rallonges de fourches",
                        status: false,
                        content: " "
                    },
                    {
                        index: 4,
                        titre: "Tablier rotatif",
                        status: false,
                        content: " "
                    },
                    {
                        index: 5,
                        titre: "Autre :",
                        status: false,
                        content: " "
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


        checkCaracterstiques() {

            if (this.description.chargeMaximaleUtile == "") {
                return false;
            }

            if (this.description.distanceCentreGravite == "") {
                return false;
            }

            if (this.description.chargeMaximalUtileHauteurLeveeMaximale == "") {
                return false;
            }

            if (this.description.hauteurLeveeMaximale == "") {
                return false;
            }

            if (this.description.chariotsSansMarquage == "") {
                return false;
            }

            return true;

        },


        checkMecanismes() {

            const arr = [
                this.description.mecanismes[0].status,
                this.description.mecanismes[1].status,
                this.description.mecanismes[2].status,
            ];

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
                this.description.sourceEnergie[2].status,
                this.description.sourceEnergie[3].status,
                this.description.sourceEnergie[4].status,
                this.description.sourceEnergie[5].status,
            ];

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkTranslation() {

            const arr = [
                this.description.translation[0].status,
                this.description.translation[1].status
            ];

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkDispositifsElevation() {

            const arr = [
                this.description.dispositifsElevation[0].status,
                this.description.dispositifsElevation[1].status,
                this.description.dispositifsElevation[2].status,
                this.description.dispositifsElevation[3].status
            ];

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkDispositifPrehension() {

            const arr = [
                this.description.dispositifPrehension[0].status,
                this.description.dispositifPrehension[1].status,
                this.description.dispositifPrehension[2].status
            ];

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkEquipementsInterchangable() {

            const arr = [
                this.description.equipementsInterchangable[0].status,
                this.description.equipementsInterchangable[1].status,
                this.description.equipementsInterchangable[2].status,
                this.description.equipementsInterchangable[3].status,
                this.description.equipementsInterchangable[4].status,
                this.description.equipementsInterchangable[5].status,
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
                this.checkDispositifsElevation(),
                this.checkDispositifPrehension(),
                this.checkEquipementsInterchangable(),
            ];

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == false) {
                    return false;
                }

                return true
            }

        },

        notEmpty() {

            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorMecanismes = this.checkMecanismes(),
                this.colorSourceEnergie = this.checkSourceEnergie(),
                this.colorTranslation = this.checkTranslation();
            this.colorDispositifsElevation = this.checkDispositifsElevation();
            this.colorDispositifPrehension = this.checkDispositifPrehension();
            this.colorEquipementsInterchangable = this.checkEquipementsInterchangable();

            this.$emit("changeColorDescription_famille3_lev3", this.checkProperties());
        },


        saisirChargeMaximaleUtile(e) {
            this.description.chargeMaximaleUtile = e.target.value;
            this.notEmpty();
        },

        saisirDistanceCentreGravite(e) {
            this.description.distanceCentreGravite = e.target.value;
            this.notEmpty();
        },

        saisirChargeMaximalUtileHauteurLeveeMaximale(e) {
            this.description.chargeMaximalUtileHauteurLeveeMaximale = e.target.value;
            this.notEmpty();
        },

        saisirHauteurLeveeMaximale(e) {
            this.description.hauteurLeveeMaximale = e.target.value;
            this.notEmpty();
        },

        saisirChariotsSansMarquage(e) {
            this.description.chariotsSansMarquage = e.target.value;
            this.notEmpty();
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

        saisirTranslation(index) {
            this.description.translation[index].status = !this.description.translation[index].status;
            this.notEmpty();
        },

        saisirDispositifsElevation(index) {
            this.description.dispositifsElevation[index].status = !this.description.dispositifsElevation[index].status;
            this.notEmpty();
        },

        saisirSousDispositifsElevation(index, i) {
            this.description.dispositifsElevation[index].tab[i].status = !this.description.dispositifsElevation[index].tab[i].status;
            this.notEmpty();
        },

        saisirContentDispositifsElevation(e, index, i) {
            this.description.dispositifsElevation[index].tab[i].content = e.target.value;
            this.notEmpty();
        },

        saisirSousSousDispositifsElevation(index, i, y) {
            this.description.dispositifsElevation[index].tab[i].sous_tab[y].status = !this.description.dispositifsElevation[index].tab[i].sous_tab[y].status;
            this.notEmpty();
        },

        saisirContentSousSousDispositifsElevation(e, index, i, y) {
            this.description.dispositifsElevation[index].tab[i].sous_tab[y].content = e.target.value;
            this.notEmpty();
        },

        saisirDispositifPrehension(index) {
            this.description.dispositifPrehension[index].status = !this.description.dispositifPrehension[index].status;
            this.notEmpty();
        },

        dispositifPrehensionAutre(e, index) {
            this.description.dispositifPrehension[index].content = e.target.value;
        },

        saisirSousrDispositifPrehension(index, i) {
            this.description.dispositifPrehension[index].tab[i].status = !this.description.dispositifPrehension[index].tab[i].status;
            this.notEmpty();
        },

        saisirContentDispositifPrehension(e, index, i) {
            this.description.dispositifPrehension[index].tab[i].content = e.target.value;
            this.notEmpty();
        },

        saisirEquipementsInterchangable(index) {
            this.description.equipementsInterchangable[index].status = !this.description.equipementsInterchangable[index].status;
            this.notEmpty();
        },

        saisirContentEquipementsInterchangable(e, index) {
            const value = e.target.value;
            this.description.equipementsInterchangable[index].content = value;
            this.notEmpty();
        },

        saisirSiPresence(e) {
            this.description.siPresence = e.target.value;
            this.notEmpty();
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
                    this.color = this.$emit("changeColorDescription_famille3_lev3", false);
                    this.$emit("resetTerminer");
                    return this.notEmpty();

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },


    created() {


        this.description.observateurId = this.observateurId;
        this.duplicate_description.observateurId = this.observateurId;
        this.flagLoading = true;

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

                this.watched_sauvegarder = true;
                this.flagLoading = false;
                return this.notEmpty();
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
    margin-bottom: 150px;
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
    margin-top: 5px;
    margin-bottom: 5px;
}

.descriptions table tr td.third div p ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin-top: 0;
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

/* Start seventh */
.descriptions table tr td.seventh {
    padding: 0;
    margin-top: 0;
}

.descriptions table tr td.seventh div {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-top: 0;
}

.descriptions table tr td.seventh div p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
}


.descriptions table tr td.seventh div p ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.seventh div p li {
    list-style: none;
}

/* End seventh */

/* Start eighth */
.descriptions table tr td.eighth {
    padding: 0;
    margin-top: 0;
}

.descriptions table tr td.eighth div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.eighth div p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
}

/* End eighth */



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

/* End buttons */

tr {
    border-bottom: 1pt solid black;
}
</style>