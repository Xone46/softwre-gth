<template>
    <div>
        <div class="descriptions">
            <table border="1">

                <tr>
                    <td :class="[renseignement.etablissement.length != 0 ? 'saved' : 'not-saved']">Etablissement :</td>
                    <td v-html="renseignement.tagEtablissement" @input="getValueEtablissement"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.adresse.length != 0 ? 'saved' : 'not-saved']">Adresse :</td>
                    <td v-html="renseignement.tagAdresse" @input="getValueAdresse"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.etendueVerification.length != 0 ? 'saved' : 'not-saved']">Etendue de la
                        vérification – limite de prestation :</td>
                    <td v-html="renseignement.tagEtendueVerification" @input="getEtendueVerification"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.accompagnateurClient.length != 0 ? 'saved' : 'not-saved']">Personne ayant
                        accompagné le vérificateur (nom et qualité) :</td>
                    <td v-html="renseignement.tagAccompagnateurClient" @input="getAccompagnateurClient"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.personneCompteRendu.length != 0 ? 'saved' : 'not-saved']">Personne(s) à
                        qui est fait le compte rendu de fin de visite :</td>
                    <td v-html="renseignement.tagPersonneCompteRendu" @input="getPersonneCompteRendu"></td>
                </tr>


                <tr>
                    <td :class="[renseignement.nomVerificateur.length != 0 ? 'saved' : 'not-saved']">Nom du ou des
                        vérificateurs agréé(s) :</td>
                    <td v-html="renseignement.tagNomVerificateur" @input="getNomVerificateur"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.rapportPrecedent.length != 0 ? 'saved' : 'not-saved']">Rapport précédent
                        :</td>
                    <td v-html="renseignement.tagRapportPrecedent" @input="getRapportPrecedent"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.datePrecedenteVerification.length != 0 ? 'saved' : 'not-saved']">Date de
                        la précédente vérification :</td>
                    <td v-html="renseignement.tagDatePrecedenteVerification" @input="getDatePrecedenteVerification">
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.documents.length != 0 ? 'saved' : 'not-saved']">Documents & plans fournis
                        :</td>
                    <td v-html="renseignement.tagDocuments" @input="getDocuments"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.dateDuree.length != 0 ? 'saved' : 'not-saved']">Date et durée de la
                        présente vérification :</td>
                    <td v-html="renseignement.tagDateDuree" @input="getDateDuree"></td>
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
import Renseignement from "@/requests/levageA/Renseignements"
import Completed from "@/requests/levageA/Completed"
// import Observateurs from "@/requests/Observateurs";
export default {
    name: 'renseignement-component',
    data() {
        return {

            falgInsert: false,
            flagReset: false,

            renseignement: {

                tagEtablissement: "<input type='text' value='' height='48px'>",
                etablissement: "",

                tagAdresse: "<input type='text' value='' height='48px'>",
                adresse: "",

                tagEtendueVerification: "<input type='text' value='' height='48px'>",
                etendueVerification: "",

                tagAccompagnateurClient: "<input type='text' value='' height='48px'>",
                accompagnateurClient: "",

                tagPersonneCompteRendu: "<input type='text' value='' height='48px'>",
                personneCompteRendu: "",

                tagNomVerificateur: "<input type='text' value='' height='48px'>",
                nomVerificateur: "",

                tagRapportPrecedent: "<input type='text' value='' height='48px'>",
                rapportPrecedent: "",

                tagDatePrecedenteVerification: "<input type='date' value='' height='48px'>",
                datePrecedenteVerification: "",

                tagDocuments: "<input type='text' value='' height='48px'>",
                documents: "",

                tagDateDuree: "<input type='date' value='' height='48px'>",
                dateDuree: "",

                observateurId: "",
                renseignementId: null
            }
        }
    },

    props: {
        observateurId: String
    },

    components: {
        Insert
    },

    methods: {

        valider() {
            this.falgInsert = false;
            return this.sauvegarde();
        },

        annuler() {
            this.falgInsert = false;
        },

        getValueEtablissement(event) {
            this.renseignement.etablissement = event.target.value;
            return this.sauvegarde();
        },

        getValueAdresse(event) {
            this.renseignement.adresse = event.target.value;
            return this.sauvegarde();
        },

        getEtendueVerification(event) {
            this.renseignement.etendueVerification = event.target.value;
            return this.sauvegarde();
        },

        getAccompagnateurClient(event) {
            this.renseignement.accompagnateurClient = event.target.value;
            return this.sauvegarde();
        },

        getPersonneCompteRendu(event) {
            this.renseignement.personneCompteRendu = event.target.value;
            return this.sauvegarde();
        },

        getNomVerificateur(event) {
            this.renseignement.nomVerificateur = event.target.value;
            return this.sauvegarde();
        },

        getRapportPrecedent(event) {
            this.renseignement.rapportPrecedent = event.target.value;
            return this.sauvegarde();
        },

        getDatePrecedenteVerification(event) {
            this.renseignement.datePrecedenteVerification = event.target.value;
            return this.sauvegarde();
        },

        getDocuments(event) {
            this.renseignement.documents = event.target.value;
            return this.sauvegarde();
        },

        getDateDuree(event) {
            this.renseignement.dateDuree = event.target.value;
            return this.sauvegarde();
        },

        reset() {

            Renseignement.reset(this.observateurId)
                .then((result) => {

                    if (result.data) {

                        this.renseignement = {

                            tagEtablissement: "<input type='text' value='' height='48px'>",
                            etablissement: "",

                            tagAdresse: "<input type='text' value='' height='48px'>",
                            adresse: "",

                            tagEtendueVerification: "<input type='text' value='' height='48px'>",
                            etendueVerification: "",

                            tagAccompagnateurClient: "<input type='text' value='' height='48px'>",
                            accompagnateurClient: "",

                            tagPersonneCompteRendu: "<input type='text' value='' height='48px'>",
                            personneCompteRendu: "",

                            tagNomVerificateur: "<input type='text' value='' height='48px'>",
                            nomVerificateur: "",

                            tagRapportPrecedent: "<input type='text' value='' height='48px'>",
                            rapportPrecedent: "",

                            tagDatePrecedenteVerification: "<input type='date' value='' height='48px'>",
                            datePrecedenteVerification: "",

                            tagDocuments: "<input type='text' value='' height='48px'>",
                            documents: "",

                            tagDateDuree: "<input type='date' value='' height='48px'>",
                            dateDuree: "",

                        },

                        this.flagReset = false;
                        this.$emit("menuStatusChicked");

                    }
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
                        this.$emit("menuStatusChicked");
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        }

    },

    created() {

        Completed.checkRenseignement(this.observateurId)
            .then((result) => {

                if (result.data == true) {

                    Renseignement.select(this.observateurId)
                        .then((result) => {

                            this.renseignement.observateurId = this.observateurId;
                            this.flagReset = true;

                            this.renseignement.tagEtablissement = this.renseignement.tagEtablissement.replace("value=''", `value='${result.data.renseignement.etablissement}'`);
                            this.renseignement.etablissement = result.data.renseignement.etablissement;
                            
                            this.renseignement.tagAdresse = this.renseignement.tagAdresse.replace("value=''", `value='${result.data.renseignement.adresse}'`);
                            this.renseignement.adresse = result.data.renseignement.adresse;

                            this.renseignement.tagEtendueVerification = this.renseignement.tagEtendueVerification.replace("value=''", `value='${result.data.renseignement.etendueVerification}'`);
                            this.renseignement.etendueVerification = result.data.renseignement.etendueVerification;

                            this.renseignement.tagAccompagnateurClient = this.renseignement.tagAccompagnateurClient.replace("value=''", `value='${result.data.renseignement.accompagnateurClient}'`);
                            this.renseignement.accompagnateurClient = result.data.renseignement.accompagnateurClient;

                            this.renseignement.tagPersonneCompteRendu = this.renseignement.tagPersonneCompteRendu.replace("value=''", `value='${result.data.renseignement.personneCompteRendu}'`);
                            this.renseignement.personneCompteRendu = result.data.renseignement.personneCompteRendu;

                            this.renseignement.tagNomVerificateur = this.renseignement.tagNomVerificateur.replace("value=''", `value='${result.data.renseignement.nomVerificateur}'`);
                            this.renseignement.nomVerificateur = result.data.renseignement.nomVerificateur;

                            this.renseignement.tagRapportPrecedent = this.renseignement.tagRapportPrecedent.replace("value=''", `value='${result.data.renseignement.rapportPrecedent}'`);
                            this.renseignement.rapportPrecedent = result.data.renseignement.rapportPrecedent;

                            this.renseignement.tagDatePrecedenteVerification = this.renseignement.tagDatePrecedenteVerification.replace("value=''", `value='${result.data.renseignement.datePrecedenteVerification}'`);
                            this.renseignement.datePrecedenteVerification = result.data.renseignement.datePrecedenteVerification;

                            this.renseignement.tagDocuments = this.renseignement.tagDocuments.replace("value=''", `value='${result.data.renseignement.documents}'`);
                            this.renseignement.documents = result.data.renseignement.documents;

                            this.renseignement.tagDateDuree = this.renseignement.tagDateDuree.replace("value=''", `value='${result.data.renseignement.dateDuree}'`);
                            this.renseignement.dateDuree = result.data.renseignement.dateDuree;

                            this.$emit("menuStatusChicked");

                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
            .catch((error) => {
                console.log(error);
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