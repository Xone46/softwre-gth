<template>
    <div class="reserve">

        <TableModels  v-if="flagTableModels" :observateurId="observateurId" :titreReserve="titreReserve" :commentairesReserve="commentairesReserve" />

        <TableReserve :observateurId="observateurId" @apercu="apercu" />

        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Téléverser </button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>
    </div>
    
</template>
  
<script>

import TableModels from "@/components/reserve/appareil_levage/TableModels.vue"
import TableReserve from "@/components/reserve/appareil_levage/TableReserve.vue"
import Commentaire from "@/requests/commentaire";

export default {
    name: 'renseignement-component',
    data() {
        return {
            flagReset : false,
            titreReserve : "",
            commentairesReserve : [],
            reserves : [],
            flagTableModels : false
        }
    },

    props : {
        observateurId : String
    },


    components: {
        TableModels,
        TableReserve
    },

    methods: {

        apercu(titreReserve, commentaires) {

            this.titreReserve = titreReserve;
            this.commentairesReserve = commentaires;

            this.flagTableModels = false;
            this.$nextTick(() => {
                this.flagTableModels = true;
            });
            
        },

        sauvegarde() {
            Commentaire.sauvegarde(this.observateurId)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
        },

        reset() {
            Commentaire.reset(this.observateurId)
            .then((result) => {
                if(result.data) {
                    this.$emit("menuStatusChicked");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }




    },

    created() {


    }
}
</script>
  
<style scoped>

.descriptions {
    margin-top: 10px;
    margin-bottom: 100px;
    width: inherit;
}

table {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
}

table tr td:nth-child(1) {
   width: 40px;
}


table tr td {
    border: 1px solid black;
    padding: 10px;
}

table > tr:nth-child(3) > td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table > tr:nth-child(3) > td:nth-child(3) label {
    margin-top: 3px;
    margin-bottom: 3px;
}

table > tr:nth-child(4) > td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table > tr:nth-child(4) > td:nth-child(3) label {
    margin-top: 3px;
    margin-bottom: 3px;
}

table > tr:nth-child(5) > td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table > tr:nth-child(6) > td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
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


</style>