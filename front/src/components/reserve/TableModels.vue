<template>
    <div class="models">
        <h2>Attachés</h2>
        <select v-model="commentaires" multiple>
            <option :value="item" v-for="item in attaches" :key="item">{{ item }}</option>
        </select>
        <input type="button" value="Attacher" @click="attacher()">
        <Error v-if="flagError" @annuller="annuller" :msg="msg"/>
    </div>
</template>

<script>
import Error from "@/components/models/Error.vue"
import Commentaire from "@/requests/commentaire"
export default {
    name: 'table-observateur',
    data() {
        return {
            commentaires: [],
            models: [],
            attaches: [
                "Lorem  dolor sit, amet consectetur adipisicing elit. Dolorem dolorum est repudiandae numquam debitis doloremque, voluptatum amet, ratione aut quibusdam",
                "Lorem ipsum dolor , amet consectetur adipisicing elit. Dolorem dolorum est repudiandae numquam debitis doloremque, voluptatum amet, ratione aut quibusdam",
                "Lorem ipsum dolor sit,  consectetur adipisicing elit. Dolorem dolorum est repudiandae numquam debitis doloremque, voluptatum amet, ratione aut quibusdam",
            ],

            flagError : false

        }
    },

    props: {
        observateurId: String,
        titreReserve: String,
        commentairesReserve : Array
    },

    components: {
        Error
    },

    methods: {

        attacher() {

            if (this.commentaires.length == 0) {
                this.flagError = true;
                this.msg = "Vous devez saisir au moins un élément";
            } else {
                Commentaire.create(this.commentaires, this.observateurId, this.titreReserve)
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },

        annuller() {
            this.flagError = false;
        }

    },

    created() {
        console.log(this.observateurId, this.titreReserve, this.commentairesReserve);
    }
}
</script>

<style scoped>
.table-objet-observateur {
    width: 100%;
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
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
}

.table-data td,
.table-data th {
    border: 1px solid #ddd;
    padding: 8px;
}

.table-data tr:nth-child(even) {
    background-color: #f2f2f2;
}

.table-data tr:hover {
    background-color: #ddd;
    cursor: pointer;
}

.table-data th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
}

.textarea {
    width: 100%;
}

.actions {
    display: flex;
    flex-direction: row;
    margin: 5px;
}

.actions button {
    margin-left: 5px;
    margin-right: 5px;
    padding: 10px;
    color: white;
    border: 0px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
}

.actions button:nth-child(1) {
    background-color: #04AA6D;
}

.actions button:nth-child(2) {
    background-color: #04AA6D;
}

.actions button:nth-child(3) {
    background-color: #e21608;
}

iframe {
    margin-top: 20px;
}
</style>