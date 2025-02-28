<template>
    <div class="observations">

        <div class="retour">
            <button @click="retour">
                <font-awesome-icon icon="home" />
                <span>Menu principal</span>
            </button>
        </div>

        <h2>Liste des Backups précédents</h2>

        <Spinner v-if="flagSpinner" />
        <Invertesment :msgInvertesment="msgInvertesment" v-if="flagInvertesment" />
        <Error :msg="msgError" v-if="flagError" @annuller="annuller" />

        <div class="sites" v-if="!flagSpinner && !flagInvertesment">
            <table class="table-data">
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>nom</th>
                </tr>
                <tr v-for="backup in backups" :key="backup._id">
                    <td><input type="checkbox" v-model="observateursSelect" :value="backup._id"></td>
                    <td>{{ new Date(backup.date).toLocaleDateString() }} </td>
                    <td>{{ backup.nom }}</td>
                </tr>
            </table>
        </div>

        <div class="actions">
            <button @click="restorer">restorer</button>
            <button @click="sauvgarder">sauvgarder</button>
        </div>
        
        <Verified v-if="flagVerified" @confirmer="confirmer" @retirer="retirer" />

    </div>
</template>

<script>

import Bd from "@/requests/bd"
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
            backups: [],
            backupsSelect: [],
            flagSpinner: false,
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
        backupId: String
    },

    methods: {

        restorer() {
            Bd.restorer()
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            });        
        },

        sauvgarder() {
            console.log("sauvgarder")
            Bd.sauvgarder()
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            });
        },

        retour() {

            this.$router.push("/dashboard").catch(() => { });

        },

        supprimer() {

            if (this.observateursSelect.length === 1) {
                this.flagVerified = true;
            }

        }
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
    background-color: #f3a108;
}

.actions button:nth-child(1):hover {
    background-color: orange;
}

.actions button:nth-child(2) {
    background-color: #04AA6D;
}

.actions button:nth-child(2):hover {
    background-color: green;
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