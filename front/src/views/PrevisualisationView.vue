<template>
    <div class="observations">

        <div class="retour">
            <button @click="retour">
                <font-awesome-icon icon="home" />
                <span>Menu principal</span>
            </button>
        </div>

        <h2>Liste des [ Appareil(s), équipement(s) ou installation(s) ] Terminés</h2>

        <Spinner v-if="flagSpinner" />
        <Invertesment :msgInvertesment="msgInvertesment" v-if="flagInvertesment" />
        <Error :msg="msgError" v-if="flagError" @annuller="annuller" />

        <div class="sites" v-if="!flagSpinner && !flagInvertesment">
            <table class="table-data">
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Mission</th>
                    <th>Constructeur</th>
                    <th>N° De Série</th>
                    <th>N° Interne</th>
                    <th>Localisation</th>
                    <th>Accompagnateur</th>
                    <th>Type de Vérification</th>
                    <!-- <th>L'etat de Vérification</th> -->
                </tr>
                <tr v-for="observateur in observateurs" :key="observateur._id">
                    <td><input type="checkbox" v-model="observateursSelect" :value="observateur._id"></td>
                    <td>{{ new Date(observateur.date).toLocaleDateString() }} </td>
                    <td>{{ observateur.typeVerification }}</td>
                    <td>{{ observateur.typeAppareil[1] }}</td>
                    <td>{{ observateur.constructeur }}</td>
                    <td>{{ observateur.numeroSerie }}</td>
                    <td>{{ observateur.numeroInterne }}</td>
                    <td>{{ observateur.localisation }}</td>
                    <td>{{ observateur.accompagnateurInspecteur }}</td>
                    <td>{{ observateur.marquage }}</td>
                    <!-- <td v-if="observateur.etat">Verrouillé</td> -->
                </tr>
            </table>
        </div>

        <div class="actions">
            <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="apercu">Aperçu le
                rapport</button>
            <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="send">Transférer le
                rapport</button>
            <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="remettre">Remettre le
                rapport</button>
        </div>

        <Verified v-if="flagVerified" @confirmer="confirmer" @retirer="retirer" />

    </div>
</template>

<script>

import Observateurs from "@/requests/Observateurs"
import Spinner from 'vue-simple-spinner'
import Invertesment from "@/components/models/Invertesment.vue"
import Error from "@/components/models/Error.vue"
import Verified from "@/components/models/Verified.vue"

export default {
    name: 'ObservationView',
    data() {
        return {

            errors: [],
            flagError: false,

            flagVerified: false,
            observateurs: [],
            observateursSelect: [],
            flagSpinner: true,
            flagInvertesment: false,
            msgInvertesment: null,
            msgError: null
        }
    },

    components: {
        Invertesment,
        Verified,
        Spinner,
        Error
    },

    props: {
        interventionId: String
    },

    methods: {

        annuller() {
            this.flagError = false;
        },

        retour() {
            this.$router.push("/dashboard").catch(() => { });
        },


        supprimer() {
            if (this.observateursSelect.length === 1) {
                this.flagVerified = true;
            }
        },

        confirmer() {
            Observateurs.delete(this.observateursSelect[0])
                .then(() => {
                    for (let i = 0; i < this.observateurs.length; i++) {
                        if (String(this.observateurs[i]._id) === String(this.observateursSelect[0])) {
                            this.observateurs.splice(i, 1);
                            break;
                        }
                    }

                    this.flagVerified = false;
                    this.observateursSelect = [];

                })
                .catch((error) => {
                    console.log(error);
                });

        },

        retirer() {
            this.flagVerified = false;
        },

        remettre() {
            this.flagSpinner = true;
            Observateurs.remettre(this.observateursSelect[0])
                .then((result) => {
                    if (result.data) {
                        this.flagSpinner = false
                        const index = this.observateurs.filter((el) => el._id == this.observateursSelect[0]);
                        if(index != -1) {
                            this.observateurs.splice(index, 1);
                            this.observateursSelect = [];
                        }
                    } else {
                        this.flagSpinner = false
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        apercu() {
            this.flagSpinner = true;
            Observateurs.apercu(this.observateursSelect[0], sessionStorage.getItem("id"))
                .then((result) => {
                    if (result) {
                        this.flagSpinner = false
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async send() {

            this.flagSpinner = true;
            const findObservateur = this.observateurs.findIndex((el) => el._id == this.observateursSelect[0]);
            const interventionId = this.observateurs[findObservateur]["interventionId"];
            // check online or offline
            await fetch("https://api.ipify.org/?format=json")
                .then(async (res) => {

                    if (res.status == 200) {
                        const response = await fetch("https://api.ipify.org/?format=json");
                        const { ip } = await response.json();
                        // send rapport with info Inspecteur ville et pays
                        Observateurs.send(this.observateursSelect[0], sessionStorage.getItem("id"), ip, interventionId)
                            .then((result) => {
                                if (result) {
                                    this.flagSpinner = false
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }

                })
                .catch(() => {
                    this.flagSpinner = false;
                    this.flagError = true;
                    this.msgError = "il n'existe pas l'internet pour vous envoyons le rapport";
                });

        }
    },

    created() {

        Observateurs.readTerminer()
            .then((response) => {
                // response succes
                this.flagSpinner = false;
                this.flagInvertesment = false;
                response.data.forEach((el) => {
                    if (el.etat == true) {
                        this.observateurs.push(el);
                    }
                })

            })
            .catch((error) => {
                // response error
                this.flagSpinner = false;
                this.flagInvertesment = true;
                this.msgInvertesment = error.response.data.msg;
            });
    }
}
</script>

<style scoped>
.observations {
    width: 100%;
}

.observations button {
    padding: 10px;
    width: 100px;
    height: 40px;
    color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0px;
    border-radius: 5px;
    background-color: #e21608;
    cursor: pointer;
}

.sites {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 200px;
    overflow-x: auto;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.table {
    padding: 0px;
    width: 100%;
    height: 300px;
}

.table-data {
    padding: 0px;
    width: auto;
    height: auto;
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    display: block;
    max-width: -moz-fit-content;
    max-width: fit-content;
    margin: 0 auto;
    overflow-x: auto;
    white-space: nowrap;
}


.table-data tr {
    background-color: white;
}

.table-data tr:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.table-data th {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    background-color: #35353d;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
}

.table-data td,
.table-data th {
    border: 1px solid #ddd;
    padding: 8px;
}

.actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px;
}

.actions button {
    margin-left: 5px;
    margin-right: 5px;
    width: fit-content;
    padding: 10px;
    color: white;
    border: 0px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
    transition: 1s;
}

.actions button:nth-child(1) {
    background-color: #04AA6D;
}

.actions button:nth-child(1):hover {
    background-color: green;
}


.actions button:nth-child(2) {
    background-color: #f3a108;
}

.actions button:nth-child(2):hover {
    background-color: orange;
}

.actions button:nth-child(3) {
    background-color: #f33708;
}

.actions button:nth-child(3):hover {
    background-color: red;
}

.retour {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    padding: 0;
    margin-top: 2px;
}

.retour button {
    padding: 0;
    margin: 0;
    width: 200px;
    height: 40px;
    color: hsl(0, 0%, 87%);
    border: 0px;
    border-radius: 5px;
    background-color: rgba(255, 0, 0, 0.637);
    cursor: pointer;
    font-size: larger;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
}

.retour button:hover {
    color: white;
    background-color: red;
}
</style>