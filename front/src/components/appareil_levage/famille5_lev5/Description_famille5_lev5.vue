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
                    <p>Charge maximale utile (kg) :
                        <input type="text" v-model="description.chargeMaximaleUtile">
                    </p>
 
                    <p>Hauteur de levée maximale (m) :
                        <input type="text" v-model="description.hauteurLeveeMaximale">
                    </p>
                </td>
            </tr>


            <tr>
                <td>B-3</td>
                <td :class="[colorMecanisme == true ? 'saved' : 'not-saved']">MECANISME</td>
                <td>
                    <p>Levage par :</p>

                    <p v-for="(item, index) in description.levage" :key="index">
                        <input type="checkbox" :value="item.status" @input="handelLevage(item.index)">
                        {{  item.titre }}
                        <input v-if="item.status && item.content != undefined" type="text" :value="item.content" @input="saisirLevage($event, index)">
                    </p>

                </td>
            </tr>

            <tr>
                <td>B-4</td>
                <td :class="[colorSourceEnergie == true ? 'saved' : 'not-saved']">SOURCE D'ENERGIE</td>
                <td>
                    <p v-for="(item, index) in description.sourceEnergie" :key="index">
                        <input type="checkbox" :value="item.status" @input="handelSourceEnergie(item.index)">
                        {{  item.titre }}
                    </p>

                </td>
            </tr>

            <tr>
                <td>B-5</td>
                <td :class="[colorDispositifElevation == true ? 'saved' : 'not-saved']">DISPOSITIF D'ELEVATION</td>
                <td>
                    <input type="text" v-model="description.dispositifElevation">
                </td>
            </tr>

            <tr>
                <td>B-5-1</td>
                <td :class="[colorTransmissionElevation == true ? 'saved' : 'not-saved']">Transmission de l'élévation</td>
                <td>
                    <p v-for="(item, index) in description.transmissionElevation" :key="index">
                        <input type="checkbox" :value="item.status" @input="handelTransmissionElevation(item.index)">
                        {{  item.titre }}
                    </p>
                </td>
            </tr>

            <tr>
                <td>B-5-2</td>
                <td :class="[colorOrganesSuspension == true ? 'saved' : 'not-saved']">Organes de suspension</td>
                <td>
                    <p>
                        Nombre de chaînes ou câbles :
                        <input type="text" :value="description.nombreChainesCables" @input="handelNombreChainesCables($event)">
                    </p>

                    <p v-for="(item, index) in description.organesSuspension" :key="index">
                        <input type="checkbox" :value="item.status" @input="handelOrganesSuspension(item.index)">
                        {{  item.titre }}
                        <ul v-if="item.status">
                            <li v-for="el in item.tab" :key="el.index">
                                <input type="checkbox"
                                    @input="handelSousOrganesSuspension(item.index, el.index)">
                                {{ el.titre }}
                                <input v-if="el.status && el.content !== undefined" type="text" :value="el.content"
                                    @input="saisirSousOrganesSuspension($event, item.index, el.index)">
                            </li>
                        </ul>
                    </p>

                    <p>
                        Charge de rupture (daN) :
                        <input type="text" :value="description.chargeRupture" @input="saisirChargeRupture($event)">
                    </p>

                    <p>
                        Coefficient d'utilisation :
                        <input type="text" :value="description.coefficientUtilisation" @input="saisirCoefficientUtilisation($event)">
                    </p>
                </td>
            </tr>

            <tr>
                <td>B-6</td>
                <td :class="[colorSupoprtCharge == true ? 'saved' : 'not-saved']">SUPPORT DE CHARGE</td>
                <td>
                    <p v-for="(item, index) in description.supoprtCharge" :key="index">
                        <input type="checkbox" :value="item.status" @input="handelSupoprtCharge(item.index)">
                        {{ item.titre }}
                        <input v-if="item.status && item.content != undefined" type="text" :value="item.content" @input="saisirSupoprtCharge($event, index)">
                    </p>
                </td>
            </tr>


            <tr>
                <td>B-7</td>
                <td :class="[colorLevageAuxiliaire == true ? 'saved' : 'not-saved']">LEVAGE AUXILIAIRE</td>
                <td>
                    <p v-for="(item, index) in description.levageAuxiliaire" :key="index">
                        <input type="checkbox" :value="item.status" @input="handelLevageAuxiliaire(item.index)">
                        {{ item.titre }}
                        <input v-if="item.status && item.content != undefined" type="text" :value="item.content" @input="saisirLevageAuxiliaire($event, index)">
                        <ul v-if="item.status">
                            <li v-for="el in item.tab" :key="el.index">
                                <input type="checkbox"
                                    @input="handelSousLevageAuxiliaire(item.index, el.index)">
                                {{ el.titre }}
                                <input v-if="el.status && el.content !== undefined" type="text" :value="el.content"
                                    @input="saisirSousLevageAuxiliaire($event, item.index, el.index)">
                            </li>
                        </ul>

                    </p>
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

            colorCaracteristiques: false,
            colorMecanisme: false,
            colorSourceEnergie: false,
            colorDispositifElevation: false,
            colorTransmissionElevation: false,
            colorOrganesSuspension: false,
            colorSupoprtCharge: false,
            colorLevageAuxiliaire: false,

            counter_watched: 0,
            watched_sauvegarder: false,
            flagReset: false,

            description: {

                marquage: "",

                chargeMaximaleUtile: "Non précisée",
                hauteurLeveeMaximale: "",

                levage: [
                    { index: 0, titre: "Système «Vis/Ecrou»", status: false },
                    { index: 1, titre: "Suspentes entraînées par vérin", status: false },
                    { index: 2, titre: "Vérin(s) directs(s) Nombre :", status: false, content: " " },
                    { index: 3, titre: "Autre :", status: false, content: " " }
                ],

                sourceEnergie: [
                    { index: 0, titre: "Electrique", status: false },
                    { index: 1, titre: "Hydraulique", status: false },
                    { index: 2, titre: "Pneumatique", status: false }
                ],
                
                dispositifElevation: "",

                transmissionElevation: [
                    { index: 0, titre: "Indépendante sur chaque colonne", status: false },
                    { index: 1, titre: "Transmission entre chaque colonne par câbles ou chaînes", status: false },
                    { index: 2, titre: "Transmission entre chaque colonne par arbres et cardans", status: false }
                ],

                nombreChainesCables: "Sans Objet",
                chargeRupture: " ",
                coefficientUtilisation: "Inconnu (absence d'information",
                organesSuspension: [

                    {
                        index: 0,
                        titre: "Câble(s) de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Composition :", content: " ", status: false },
                            { index: 1, titre: "Diamètre théorique (mm) :", content: " ", status: false }
                        ]
                    },

                    {
                        index: 1,
                        titre: "Chaînes(s) de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Caractéristiques :", content: " ", status: false },
                            { index: 1, titre: "Type de chaine :", content: " ", status: false },
                            { index: 2, titre: "Pas théorique :", content: " ", status: false }
                        ]
                    }

                ],

                supoprtCharge: [
                    { index: 0, titre: "Plate forme suspendue a prise sous coque", status: false },
                    { index: 1, titre: "Plate forme posée a prise sous coque", status: false },
                    { index: 2, titre: "Bras orientables", status: false },
                    { index: 3, titre: "Symétriques", status: false },
                    { index: 4, titre: "Disymétriques", status: false },
                    { index: 5, titre: "Prise sous coque", status: false },
                    { index: 6, titre: "Télescopiques", status: false },
                    { index: 7, titre: "Autre :", status: false, content: " " }
                ],

                levageAuxiliaire: [
                    {
                        index: 0,
                        titre: "Sans objet",
                        status: false
                    },
                    {
                        index: 1,
                        titre: "Charge maximale utile (kg) :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Non précisée", status: false },
                            { index: 1, titre: "Autre", content: " ", status: false }
                        ]
                    },
                    {
                        index: 2,
                        titre: "Mécanisme de levage par",
                        status: false,
                        tab: [
                            { index: 0, titre: "Vérin direct", status: false },
                            { index: 1, titre: "Autre", content: " ", status: false }
                        ]
                    },
                    {
                        index: 3,
                        titre: "Plate forme posée a",
                        status: false,
                        tab: [
                            { index: 0, titre: "Prise sous coque", status: false },
                            { index: 1, titre: "Prise sous essieux", status: false }
                        ]
                    },

                    {
                        index: 4,
                        titre: "Autre",
                        status: false,
                        content: " "
                    }
                ],

                observateurId: ""
            },

            duplicate_description: {

                marquage: "",

                chargeMaximaleUtile: "Non précisée",
                hauteurLeveeMaximale: "",

                levage: [
                    { index: 0, titre: "Système «Vis/Ecrou»", status: false },
                    { index: 1, titre: "Suspentes entraînées par vérin", status: false },
                    { index: 2, titre: "Vérin(s) directs(s) Nombre :", status: false, content: " " },
                    { index: 3, titre: "Autre :", status: false, content: " " }
                ],

                sourceEnergie: [
                    { index: 0, titre: "Electrique", status: false },
                    { index: 1, titre: "Hydraulique", status: false },
                    { index: 2, titre: "Pneumatique", status: false }
                ],
                
                dispositifElevation: "",

                transmissionElevation: [
                    { index: 0, titre: "Indépendante sur chaque colonne", status: false },
                    { index: 1, titre: "Transmission entre chaque colonne par câbles ou chaînes", status: false },
                    { index: 2, titre: "Transmission entre chaque colonne par arbres et cardans", status: false }
                ],

                nombreChainesCables: "Sans Objet",
                chargeRupture: " ",
                coefficientUtilisation: "Inconnu (absence d'information",
                organesSuspension: [

                    {
                        index: 0,
                        titre: "Câble(s) de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Composition :", content: " ", status: false },
                            { index: 1, titre: "Diamètre théorique (mm) :", content: " ", status: false }
                        ]
                    },

                    {
                        index: 1,
                        titre: "Chaînes(s) de levage :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Caractéristiques :", content: " ", status: false },
                            { index: 1, titre: "Type de chaine :", content: " ", status: false },
                            { index: 2, titre: "Pas théorique :", content: " ", status: false }
                        ]
                    }

                ],

                supoprtCharge: [
                    { index: 0, titre: "Plate forme suspendue a prise sous coque", status: false },
                    { index: 1, titre: "Plate forme posée a prise sous coque", status: false },
                    { index: 2, titre: "Bras orientables", status: false },
                    { index: 3, titre: "Symétriques", status: false },
                    { index: 4, titre: "Disymétriques", status: false },
                    { index: 5, titre: "Prise sous coque", status: false },
                    { index: 6, titre: "Télescopiques", status: false },
                    { index: 7, titre: "Autre :", status: false, content: " " }
                ],

                levageAuxiliaire: [
                    {
                        index: 0,
                        titre: "Sans objet",
                        status: false
                    },
                    {
                        index: 1,
                        titre: "Charge maximale utile (kg) :",
                        status: false,
                        tab: [
                            { index: 0, titre: "Non précisée", status: false },
                            { index: 1, titre: "Autre", content: " ", status: false }
                        ]
                    },
                    {
                        index: 2,
                        titre: "Mécanisme de levage par",
                        status: false,
                        tab: [
                            { index: 0, titre: "Vérin direct", status: false },
                            { index: 1, titre: "Autre", content: " ", status: false }
                        ]
                    },
                    {
                        index: 3,
                        titre: "Plate forme posée a",
                        status: false,
                        tab: [
                            { index: 0, titre: "Prise sous coque", status: false },
                            { index: 1, titre: "Prise sous essieux", status: false }
                        ]
                    },

                    {
                        index: 4,
                        titre: "Autre",
                        status: false,
                        content: " "
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


        checkCaracterstiques() {

            if (this.description.chargeMaximaleUtile == "") {
                return false;
            }

            if (this.description.hauteurLeveeMaximale == "") {
                return false;
            }

            return true;

        },

        checkMecanisme() {
            const arr = [
                this.description.levage[0].status,
                this.description.levage[1].status,
                this.description.levage[2].status,
                this.description.levage[3].status
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


        checkDispositifElevation() {
            if(this.description.dispositifElevation == "") {
                return false;
            }
            return true;
        },

        checkTransmissionElevation() {
            const arr = [
                this.description.transmissionElevation[0].status,
                this.description.transmissionElevation[1].status,
                this.description.transmissionElevation[2].status
            ]

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkOrganesSuspension() {

            const arr = [
                this.description.organesSuspension[0].status,
                this.description.organesSuspension[1].status
            ];

            if (arr.includes(true)) {

                if (this.description.nombreChainesCables == "" || this.description.chargeRupture == "" || this.description.coefficientUtilisation == "") {
                    return false;
                } else {
                    return true;
                }


            } else {
                return false;
            }
        },

        checkSupoprtCharge() {

            const arr = [
                this.description.supoprtCharge[0].status,
                this.description.supoprtCharge[1].status,
                this.description.supoprtCharge[2].status,
                this.description.supoprtCharge[3].status,
                this.description.supoprtCharge[4].status,
                this.description.supoprtCharge[5].status,
                this.description.supoprtCharge[6].status,
                this.description.supoprtCharge[7].status
            ];

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },

        checkLevageAuxiliaire() {

            const arr = [
                this.description.levageAuxiliaire[0].status,
                this.description.levageAuxiliaire[1].status,
                this.description.levageAuxiliaire[2].status,
                this.description.levageAuxiliaire[3].status,
                this.description.levageAuxiliaire[4].status
            ];

            if (arr.includes(true)) {
                return true;
            } else {
                return false;
            }
        },


        checkProperties() {

            this.colorCaracteristiques = this.checkCaracterstiques();
            this.colorMecanisme = this.checkMecanisme();
            this.colorSourceEnergie = this.checkSourceEnergie();
            this.colorDispositifElevation = this.checkDispositifElevation();
            this.colorTransmissionElevation = this.checkTransmissionElevation();
            this.colorOrganesSuspension = this.checkOrganesSuspension();
            this.colorSupoprtCharge = this.checkSupoprtCharge();
            this.colorLevageAuxiliaire = this.checkLevageAuxiliaire();


            const arr = [
                this.colorCaracteristiques,
                this.colorMecanisme,
                this.colorSourceEnergie,
                this.colorDispositifElevation,
                this.colorTransmissionElevation,
                this.colorOrganesSuspension,
                this.colorSupoprtCharge,
                this.colorLevageAuxiliaire
            ];

            for (let i = 0; i < arr.length; i++) {

                if (arr[i] == false) {
                    return false;
                }

                return true;
            }
        },

        notEmpty() {
            this.$emit("changeColorDescription_famille5_lev5", this.checkProperties());
        },

        handelLevage(index) {
            this.description.levage[index].status = !this.description.levage[index].status;
        },

        saisirLevage(e, index) {
            this.description.levage[index].content = e.target.value;
        },

        handelSourceEnergie(index) {
            this.description.sourceEnergie[index].status = !this.description.sourceEnergie[index].status;
        },

        handelTransmissionElevation(index) {
            this.description.transmissionElevation[index].status = !this.description.transmissionElevation[index].status;
        },

        handelNombreChainesCables(e) {
            this.description.nombreChainesCables = e.target.value;
        },

        handelOrganesSuspension(index) {
            this.description.organesSuspension[index].status = !this.description.organesSuspension[index].status;
        },

        handelSousOrganesSuspension(index, i) {
            this.description.organesSuspension[index].tab[i].status = !this.description.organesSuspension[index].tab[i].status;
        },

        saisirSousOrganesSuspension(e, index, i) {
            this.description.organesSuspension[index].tab[i].content = e.target.value;
        },

        saisirChargeRupture(e) {
            this.description.chargeRupture = e.target.value;
        },

        saisirCoefficientUtilisation(e) {
            this.description.coefficientUtilisation = e.target.value;
        },

        handelSupoprtCharge(index) {
            this.description.supoprtCharge[index].status = !this.description.supoprtCharge[index].status;
        },


        saisirSupoprtCharge(e, index) {
            this.description.supoprtCharge[index].content = e.target.value;
        },

        handelLevageAuxiliaire(index) {
            this.description.levageAuxiliaire[index].status = !this.description.levageAuxiliaire[index].status;
        },

        saisirLevageAuxiliaire(e, index) {
            this.description.levageAuxiliaire[index].conetent = e.target.value;
        },

        handelSousLevageAuxiliaire(index, i) {
            this.description.levageAuxiliaire[index].tab[i].status = !this.description.levageAuxiliaire[index].tab[i].status;
        },

        saisirSousLevageAuxiliaire(e, index, i) {
            this.description.levageAuxiliaire[index].tab[i].content = e.target.value;
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

input,
select {
    height: 25px;
    font-size: medium;
}

td div p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.sauvegarder,
.reset {
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
