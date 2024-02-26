<template>
    <div class="formulaire">
        <!-- <h3>{{ formulaire.observateurId }}</h3> -->
        <h3>{{ formulaire.categorieAppareil }}</h3>

        <div class="buttons">
            <button>Liste des interventions</button>
            <button>Visualisation des observations</button>
        </div>


        <table class="menu">
            <tr>
                <th @click="renseignements()">RENSEIGNEMENTS GENERAUX</th>
                <th @click="description()">DESCRIPTION DE L'APPAREIL VERIFIE</th>
                <th @click="examens()">EXAMENS ET ESSAIS DE L'APPAREIL</th>
                <th @click="conclusion()">CONCLUSION</th>
                <th @photo="photo()">PHOTO</th>
            </tr>
        </table>

        <div class="parent-renseignements" >
            <Renseignement v-if="flagRenseignements" />
        </div>

    </div>
</template>
  
<script>
import Renseignement from "@/components/renseignement/Renseignement"
export default {
    name: 'FormulaireView',
    data() {
        return {
            flagRenseignements : false,
            formulaire : {
                observateurId : "",
                categorieAppareil : ""
            }
        }
    },

    components: {
        Renseignement
    },

    methods: {
        renseignements() {
            this.flagRenseignements = true;
        }
    },

    created() {
        this.formulaire.observateurId = this.$route.params.id;
        this.formulaire.categorieAppareil = this.$route.params.categorieAppareil;
    }
}
</script>
  
<style scoped>
.formulaire {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.buttons {
    display: flex;
    flex-direction: row;
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.buttons button {
    background-color: #04AA6D;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

menu,
th {
    border: 1px solid black;
    color: red;
    border-collapse: collapse;
    padding: 10px;
    cursor: pointer;
}



</style>