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
                        <input type="text" :value="description.chargeMaximaleUtile" @input="saisirChargeMaximaleUtile($event)">
                    </p>
 
                    <p>Hauteur de levée maximale (m) :
                        <input type="text" :value="description.hauteurLeveeMaximale" @input="saisirHauteurLeveeMaximale($event)">
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
                <td :class="[colorDispositifElevation == true ? 'saved' : 'not-saved']">Transmission de l'élévation</td>
                <td>
                    <input type="text" :value="description.dispositifElevation" @input="saisirDispositifElevation($event)">
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
                <td :class="[colorTransmissionElevation == true ? 'saved' : 'not-saved']">Organes de suspension</td>
                <td>
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
            colorSuspentes : false,
            colorCaracteristiques: false,
            colorMecanisme : false,
            colorSourceEnergie : false,
            colorDispositifElevation : false,
            colorTransmissionElevation :false,
            colorLevageAuxiliaire : false,
            counter_watched: 0,
            watched_sauvegarder: false,
            flagReset: false,

            description: {

                marquage: "",

                chargeMaximaleUtile: "",
                hauteurLeveeMaximale: "",

                levage : [
                    { index : 0, titre : "Système «Vis/Ecrou»", status : false }, 
                    { index : 1, titre : "Suspentes entraînées par vérin", status : false }, 
                    { index : 2, titre : "Vérin(s) directs(s) Nombre :", status : false, content : " " }, 
                    { index : 3, titre : "Autre :", status : false, content : " " }
                ],

                sourceEnergie :[
                   { index : 0, titre : "Electrique", status : false }, 
                   { index : 1, titre : "Hydraulique", status : false }, 
                   { index : 2, titre : "Pneumatique", status : false }
                ],

                transmissionElevation : [
                   { index : 0, titre : "Indépendante sur chaque colonne", status : false }, 
                   { index : 1, titre : "Transmission entre chaque colonne par câbles ou chaînes", status : false }, 
                   { index : 2, titre : "Transmission entre chaque colonne par arbres et cardans", status : false }
                ],

                supoprtCharge : [
                   { index : 0, titre : "Plate forme suspendue a prise sous coque", status : false }, 
                   { index : 1, titre : "Plate forme posée a prise sous coque", status : false }, 
                   { index : 2, titre : "Bras orientables", status : false },
                   { index : 3, titre : "Symétriques", status : false },
                   { index : 4, titre : "Disymétriques", status : false },
                   { index : 5, titre : "Prise sous coque", status : false },
                   { index : 6, titre : "Télescopiques", status : false },
                   { index : 7, titre : "Autre :", status : false, content : " " }
                ],

                dispositifElevation : "",




                observateurId: ""
            },

            duplicate_description: {
                
 
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

        },

        checkCaracterstiques() {

        },

        checkProperties() {

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

        saisirDispositifElevation(e) {
            this.description.dispositifElevation = e.target.value;
        },

        handelSupoprtCharge(index) {
            this.description.supoprtCharge[index].status = !this.description.supoprtCharge[index].status;
        },

        saisirSupoprtCharge(e, index) {
            this.description.supoprtCharge[index].content = e.target.value;
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