<template>
    <div class="reserve">
        <TableModels  v-if="flagTableModels" :observateurId="observateurId" :titreReserve="titreReserve" :commentairesReserve="commentairesReserve" />
        <TableReserve :observateurId="observateurId" @apercu="apercu" />
    </div>
</template>
  
<script>

import TableModels from "@/components/reserve/TableModels.vue"
import TableReserve from "@/components/reserve/TableReserve.vue"

// import Examens from "@/requests/Examens";

export default {
    name: 'renseignement-component',
    data() {
        return {
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





</style>