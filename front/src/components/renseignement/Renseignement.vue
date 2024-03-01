<template>

    <div>

        <table class="renseignements">

            <tr>
                <th>Constructeur</th>
            </tr>
            <tr>
                <td>
                    <label for="Type constructeur (Plaque)">
                        <h3>Type constructeur (Plaque) : <span class="start"
                                v-if="renseignement.typeConstructeur.length == 0">*</span></h3>
                        <input type="text" v-model="renseignement.typeConstructeur">
                    </label>
                </td>
            </tr>
            <tr>
                <label for="Année de mise en service (Plaque constructeur)">
                    <h3>Année de mise en service (Plaque constructeur) : <span class="start"
                            v-if="renseignement.anneeMiseService.length == 0">*</span></h3>
                    <input type="text" v-model="renseignement.anneeMiseService">
                </label>
            </tr>
            <tr>
                <label for="Numéro(s) de série (plaque constructeur)">
                    <h3>Numéro(s) de série (plaque constructeur) : <span class="start"
                            v-if="renseignement.numeroSerie.length == 0">*</span></h3>
                    <input type="text" v-model="renseignement.numeroSerie">
                </label>
            </tr>
            <tr>
                <label for="Numéro(s) interne(s)">
                    <h3>Numéro(s) interne(s) : <span class="start" v-if="renseignement.numeroInterne.length == 0">*</span>
                    </h3>
                    <select v-model="renseignement.numeroInterne">
                        <option v-for="item in numeroInternes" :key="item.id">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>
            <tr v-if="renseignement.numeroInterne == 'Avec Object'">
                <label for="N°">
                    <h3>N°: <span class="start" v-if="renseignement.valueNumeroInterne.length == 0">*</span>
                    </h3>
                    <input type="text" v-model="renseignement.valueNumeroInterne">
                </label>
            </tr>
            <tr>
                <label for="Localisation de(s) l'appareil (s) lors de la visite">
                    <h3>Localisation de(s) l'appareil (s) lors de la visite : <span class="start"
                            v-if="renseignement.localisation.length == 0">*</span></h3>
                    <input type="text" v-model="renseignement.localisation">
                </label>
            </tr>

            <tr>
                <label for="Type d'appareil">
                    <h3>Type d'appareil : <span class="start" v-if="renseignement.typeAppareil.length == 0">*</span></h3>
                    <select v-model="renseignement.typeAppareil">
                        <option v-for="item in typeAppareils" :key="item.id">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>

            <tr v-if="renseignement.typeAppareil == 'Autre'">
                <label for="Type d'appareil">
                    <h3>Le nom d'autre Type d'appareil : <span class="start" v-if="renseignement.autreTypeAppareil.length == 0">*</span></h3>
                    <input type="text" v-model="renseignement.autreTypeAppareil">
                </label>
            </tr>

            <!-- Start Mise en service -->

            <tr>
                <label for="Mise en service (Rapport de vérification avant mise ou remise en service)">
                    <h3>Mise en service (Rapport de vérification avant mise ou remise en service) :<span class="start"
                            v-if="renseignement.miseEnService.length == 0">*</span></h3>
                    <select v-model="renseignement.miseEnService">
                        <option v-for="item in miseEnServiceTable" :key="item.id">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>



            <tr v-if="renseignement.miseEnService == 'Présenté'">
                <label for="Epreuves de Mise en service (Rapport de vérification avant mise ou remise en service)">
                    <h3>Epreuves : <span class="start" v-if="renseignement.epreuvemMiseEnService.length == 0">*</span></h3>
                    <select v-model="renseignement.epreuvemMiseEnService">
                        <option v-for="item in epreuves" :key="item.id">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>

            <tr v-if="renseignement.epreuvemMiseEnService == 'Réalisées' && renseignement.miseEnService == 'Présenté'">
                <label for="Réalisées Le">
                    <h3>Réalisées Le : <span class="start" v-if="renseignement.realiseesMiseEnService.length == 0">*</span></h3>
                    <input type="date" v-model="renseignement.realiseesMiseEnService">
                </label>
            </tr>

            <!-- End Mise en Service -->


            <!-- Start Date de la dernière vérification périodique -->
            <tr>
                <label for="Date de la dernière vérification périodique">
                    <h3>Date de la dernière vérification périodique : <span class="start"
                            v-if="renseignement.dateDerniereVerficationPeriodique.length == 0">*</span></h3>
                    <select v-model="renseignement.dateDerniereVerficationPeriodique">
                        <option v-for="item in dateDerniereVerficationPeriodiqueTable" :key="item.id">{{ item.titre }}
                        </option>
                    </select>
                </label>
            </tr>

            <tr v-if="renseignement.dateDerniereVerficationPeriodique == 'Présenté'">
                <label for="Epreuves">
                    <h3>Epreuves : <span class="start"
                            v-if="renseignement.epreuveDateDerniereVerficationPeriodique.length == 0">*</span></h3>
                    <select v-model="renseignement.epreuveDateDerniereVerficationPeriodique">
                        <option v-for="item in epreuves" :key="item.id">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>

            <tr
                v-if="renseignement.epreuveDateDerniereVerficationPeriodique == 'Réalisées' && renseignement.dateDerniereVerficationPeriodique == 'Présenté'">
                <label for="Réalisées Le">
                    <h3>Réalisées Le : <span class="start"
                            v-if="renseignement.realiseesDateDerniereVerficationPeriodique.length == 0">*</span></h3>
                    <input type="date" v-model="renseignement.realiseesDateDerniereVerficationPeriodique">
                </label>
            </tr>
            <!-- End Date de la dernière vérification périodique -->

            <tr>
                <label for="Essais en charge">
                    <h3>Essais en charge: <span class="start" v-if="renseignement.essaischarge.length == 0">*</span></h3>
                    <select v-model="renseignement.essaischarge">
                        <option v-for="item in essaischarges" :key="item.id">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>

            <tr v-if="renseignement.essaischarge == 'Réalisé sous charge de (kg) :'">
                <label for="Poids en kg">
                    <h3>Poids en kg : <span class="start" v-if="renseignement.poidsKg.length == 0">*</span></h3>
                    <input type="number" v-model="renseignement.poidsKg">
                </label>
            </tr>

            <tr>
                <label
                    for="Modification(s) apportée(s) ou autre(s) remarque(s) éventuelle(s) concernant l'appareil examiné">
                    <h3>Modification(s) apportée(s) ou autre(s) remarque(s) éventuelle(s) concernant l'appareil examiné:
                        <span class="start" v-if="renseignement.modification.length == 0">*</span></h3>
                    <select v-model="renseignement.modification">
                        <option v-for="item in modifications" :key="item.id">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>

            <tr v-if="renseignement.modification == 'Description'">
                <label for="Description">
                    <h3>Description : <span class="start" v-if="renseignement.description.length == 0">*</span>
                    </h3>
                    <input type="text" v-model="renseignement.description">
                </label>
            </tr>



        </table>

        <div class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>


    </div>

</template>
  
<script>
import Renseignement from "@/requests/Renseignement"
export default {
    name: 'renseignement-component',
    data() {
        return {

            renseignement: {
                typeConstructeur: "",
                anneeMiseService: "",
                numeroSerie: "",
                numeroInterne: "",
                valueNumeroInterne: "",
                localisation: "",
                typeAppareil: "",
                autreTypeAppareil : '',
                modification: "",
                description : "",
                essaischarge: "",
                miseEnService: "",
                epreuvemMiseEnService: "",
                dateDerniereVerficationPeriodique: "",
                realiseesMiseEnService: "",
                epreuveDateDerniereVerficationPeriodique: "",
                realiseesDateDerniereVerficationPeriodique: "",
                poidsKg : "",
                observateurId : ""
            },

            numeroInternes: [
                { id: 10001, titre: "Sans Object", status: false },
                { id: 10002, titre: "Avec Object", status: false },
            ],

            typeAppareils: [
                { id: 10003, titre: "Pont roulant", status: false },
                { id: 10004, titre: "Poutre roulante", status: false },
                { id: 10005, titre: "Portique", status: false },
                { id: 10006, titre: "Semi portique", status: false },
                { id: 10007, titre: "Palan", status: false },
                { id: 10008, titre: "Treuil", status: false },
                { id: 10009, titre: "Autre", status: true },
            ],

            essaischarges: [
                { id: 10010, titre: "Réalisé avec la Charge maximale utile", status: false },
                { id: 10011, titre: "Réalisé sous charge de (kg) :", status: true },
                { id: 10012, titre: "Absence de charge pour réaliser les essais", status: false },
                { id: 10013, titre: "Absence de tableau des charges pour réaliser les essais", status: false },
                { id: 10014, titre: "Non réalisé. Voir observation critique", status: false },
                { id: 10015, titre: "(Les 4 dernières options conduisent à faire une observation) ", status: false }
            ],

            modifications: [
                { id: 10016, titre: "Sans Object", status: false },
                { id: 10017, titre: "Description", status: false },
            ],

            miseEnServiceTable: [
                { id: 10018, titre: "Présenté", status: false },
                { id: 10019, titre: "Non Présenté", status: false }
            ],

            epreuves: [
                { id: 10020, titre: "Réalisées", status: false },
                { id: 10021, titre: "Absence de renseignement", status: false },
            ],

            dateDerniereVerficationPeriodiqueTable: [
                { id: 10022, titre: "Présenté", status: false },
                { id: 10023, titre: "Non Présenté", status: false },
            ],

        }
    },

    props : {
        observateurId : String
    },

    components: {
    },

    methods: {


        sauvegarde() {

            this.renseignement.observateurId = this.observateurId;
            Renseignement.create(this.renseignement)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        }

    },

    created() {

        Renseignement.select(this.observateurId)
        .then((result) => {
            this.renseignement = result.data
        })
        .catch((error) => {
            console.log(error)
        });

    }
}
</script>
  
<style scoped>

.renseignements {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
}


.renseignements th {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: white;
    background-color: blue;
}


.renseignements td {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: red;
    background-color: whitesmoke;
}

label {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

label h3 {
    margin: 2px;
    color: red;
}

label input {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
}

label select {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
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
</style>