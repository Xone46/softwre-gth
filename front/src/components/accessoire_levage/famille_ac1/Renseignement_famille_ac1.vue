<template>
    <div>
        <div class="descriptions">
            <table border="1">

                <tr>
                    <td :class="[renseignement.etablissement.length != 0 ? 'saved' : 'not-saved']">
                        Etablissement :
                    </td>
                    <td>
                        <input type='text' :value='renseignement.etablissement' height='48px'  @input="handelEtablissement($event)">
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.adresse.length != 0 ? 'saved' : 'not-saved']">
                        Adresse :
                    </td>
                    <td>
                        <input type='text' :value='renseignement.adresse' height='48px'  @input="handelAdresse($event)">
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.etendueVerification.length != 0 ? 'saved' : 'not-saved']">
                        Etendue de la vérification – limite de prestation :
                    </td>
                    <td >
                        <input type='text' :value='renseignement.etendueVerification' height='48px'  @input="handelEtendueVerification($event)">
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.accompagnateurClient.length != 0 ? 'saved' : 'not-saved']">
                        Personne ayant Accompagné le vérificateur (nom et qualité) :
                    </td>
                    <td>
                        <input type='text' :value='renseignement.accompagnateurClient' height='48px'  @input="handelAccompagnateurClient($event)">
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.personneCompteRendu.length != 0 ? 'saved' : 'not-saved']">Personne(s) à
                        Qui est fait le compte rendu de fin de visite :
                    </td>
                    <td>
                        <input type='text' :value='renseignement.personneCompteRendu' height='48px'  @input="handelPersonneCompteRendu($event)">
                    </td>
                </tr>


                <tr>
                    <td :class="[renseignement.nomVerificateur.length != 0 ? 'saved' : 'not-saved']">Nom du ou des
                        Vérificateurs agréé(s) :
                    </td>
                    <td>
                        <input type='text' :value='renseignement.nomVerificateur' height='48px'  @input="handelNomVerificateur($event)">
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.rapportPrecedent.length != 0 ? 'saved' : 'not-saved']">
                        Rapport précédent :</td>
                    <td>
                        <input type='text' :value='renseignement.rapportPrecedent' height='48px'  @input="handelRapportPrecedent($event)">
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.datePrecedenteVerification.length != 0 ? 'saved' : 'not-saved']">
                        Date de la précédente vérification :</td>
                    <td>
                        <input type='date' :value='renseignement.datePrecedenteVerification' height='48px'  @input="handelDatePrecedenteVerification($event)">
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.documents.length != 0 ? 'saved' : 'not-saved']">
                        Documents & plans fournis :</td>
                    <td>
                        <input type='text' :value='renseignement.documents' height='48px'  @input="handelDocuments($event)">
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.dateDuree.length != 0 ? 'saved' : 'not-saved']">
                        Date et durée de la présente vérification :</td>
                        <input type='date' :value='renseignement.dateDuree' height='48px'  @input="handelDateDuree($event)">
                </tr>

            </table>
        </div>


        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>

        <Insert v-if="falgInsert" :typeInsert="typeInsert" @valider="valider" @annuler="annuler" />

    </div>
</template>

<script>


import Insert from "@/components/models/Insert.vue"
import Renseignement from "@/requests/accessoire_levage/famille_ac1/Renseignements"

export default {
    name: 'renseignement-component',
    data() {
        return {

            falgInsert: false,
            flagReset: false,

            renseignement: {

                etablissement: "",
                adresse: "",
                etendueVerification: "",
                accompagnateurClient: "",
                personneCompteRendu: "",
                nomVerificateur: "",
                rapportPrecedent: "",
                datePrecedenteVerification: "",
                documents: "",
                dateDuree: ""
            },

            renseignementId: null
        }
    },

    props: {
        observateurId: String
    },

    components: {
        Insert
    },

    methods: {

        checkProperties(obj) {
            for (var key in obj) {
                    if(obj[key] == "") {
                        return false;
                    }              
            }
            return true;
        },

        notEmpty() {
            this.$emit("changeColorRenseignement_famille_ac1", this.checkProperties(this.renseignement))
        },

        handelEtablissement(e) {
            this.renseignement.etablissement = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        handelAdresse(e) {
            this.renseignement.adresse = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        handelEtendueVerification(e) {
            this.renseignement.etendueVerification = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        handelAccompagnateurClient(e) {
            this.renseignement.accompagnateurClient = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        handelPersonneCompteRendu(e) {
            this.renseignement.personneCompteRendu = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        handelNomVerificateur(e) {
            this.renseignement.nomVerificateur = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        handelRapportPrecedent(e) {
            this.renseignement.rapportPrecedent = e.target.value;
            this.notEmpty();
            this.sauvegarde();

        },

        handelDatePrecedenteVerification(e) {
            this.renseignement.datePrecedenteVerification = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        handelDocuments(e) {
            this.renseignement.documents = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        handelDateDuree(e) {
            this.renseignement.dateDuree = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        valider() {
            this.falgInsert = false;
        },

        annuler() {
            this.falgInsert = false;
        },

        reset() {

            Renseignement.reset(this.observateurId)
                .then(() => {

                    this.renseignement.etablissement = "";
                    this.renseignement.adresse = "";
                    this.renseignement.etendueVerification = "";
                    this.renseignement.accompagnateurClient = "";
                    this.renseignement.personneCompteRendu = "";
                    this.renseignement.nomVerificateur = "";
                    this.renseignement.rapportPrecedent = "";
                    this.renseignement.datePrecedenteVerification = "";
                    this.renseignement.documents = "";
                    this.renseignement.dateDuree = "";

                    this.$emit("changeColorRenseignement_famille_ac1", false);
                    this.flagReset = false;
              
            })
            .catch((error) => {
                console.log(error);
            });
        },

        sauvegarde() {

            this.renseignement.observateurId = this.observateurId;
            Renseignement.create(this.renseignement)
                .then((result) => {

                    if (result.data) {
                        this.flagReset = true;
                        this.renseignementId = result.data.renseignementId;
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        }

    },

    created() {

        Renseignement.select(this.observateurId)
        .then((result) => {

            this.renseignement = result.data.renseignement
            this.renseignement.datePrecedenteVerification = new Date(result.data.renseignement.datePrecedenteVerification).toISOString().substring(0, 10);
            this.renseignement.dateDuree = new Date(result.data.renseignement.dateDuree).toISOString().substring(0, 10);

            this.$emit("changeColorRenseignement_famille_ac1", true);
            this.flagReset = true;
        })
        .catch((error) => {
            console.log(error.message);
        });

    }


}
</script>

<style scoped>
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


.sauvegarde {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.sauvegarde button {
    background-color: #ff6a00;
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


td:nth-child(2) {
    display: flex;
    flex-direction: column;
}

.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}
</style>