<template>
  <div class="interventions">
    <h1>Interventions en cours</h1>
    <h2>Sites d'intervention</h2>
    <div class="sites">
        <Spinner v-if="flagSpinner" />
        <table class="table-data" v-if="!flagSpinner">
            <tr>
                <th></th>
                <th>N° Offre</th>
            </tr>
            <tr v-for="item in Offres" :key="item._id">
                <td><input type="checkbox" v-model="item._id"></td>
                <td>{{ item.numeroAffaire }}</td>
            </tr>
    </table>
    </div>

    <h2>Commentaires</h2>
    <textarea class="commentaires" rows="5" cols="120">
    </textarea>
    <h1>Appareil(s), équipements(s) ou installation(s) du site</h1>
  </div>
</template>

<script>

import Offre from "@/requests/Offre"
import Spinner from 'vue-simple-spinner'

export default {
  name: 'InterventionsView',
  data() {
    return {
        offres : [],
        flagSpinner : false,

    }
  },

  components : {
    Spinner
  },

  created() {

    this.flagSpinner = true;

    Offre.read()
    .then((response) => {
        if(response) {
            this.flagSpinner = false;
            this.Offres = response.data.result;
        }
    })
    .catch((error) => {
        console.log(error);
    });
  }
}
</script>

<style scoped>
    .interventions {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .sites {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 200px;
        overflow-x:auto;
        overflow-y:auto;
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

    .table-data td, .table-data th {
    border: 1px solid #ddd;
    padding: 8px;
    }

    .table-data tr:nth-child(even){
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

</style>