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

        <table class="renseignements" v-if="flagRenseignements">
            <tr>
                <th>Constructeur</th>
            </tr>
            <tr>
                <td>
                    <label for="Type constructeur (Plaque)">
                        <h3>Type constructeur (Plaque) : <span class="start" v-if="renseignement.typeConstructeur.length == 0">*</span></h3>
                        <input type="text" v-model="renseignement.typeConstructeur">
                    </label>
                </td>
            </tr>
            <tr>
                <label for="Année de mise en service (Plaque constructeur)">
                        <h3>Année de mise en service (Plaque constructeur) : <span class="start" v-if="renseignement.anneeMiseService.length == 0">*</span></h3>
                        <input type="text" v-model="renseignement.anneeMiseService">
                </label>
            </tr>
            <tr>
                <label for="Numéro(s) de série (plaque constructeur)">
                        <h3>Numéro(s) de série (plaque constructeur) : <span class="start" v-if="renseignement.numeroSerie.length == 0">*</span></h3>
                        <input type="text" v-model="renseignement.numeroSerie">
                </label>
            </tr>
            <tr>
                <label for="Numéro(s) interne(s)">
                    <h3>Numéro(s) interne(s) : <span class="start" v-if="renseignement.numeroInterne.length == 0">*</span></h3>
                    <select v-model="renseignement.numeroInterne">
                        <option v-for="item in numeroInternes" :key="item">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>
            <tr>
                <label for="Localisation de(s) l'appareil (s) lors de la visite">
                        <h3>Localisation de(s) l'appareil (s) lors de la visite : <span class="start" v-if="renseignement.localisation.length == 0">*</span></h3>
                        <input type="text" v-model="renseignement.localisation">
                </label>
            </tr>
            <tr>
                <label for="Type d'appareil">
                    <h3>Type d'appareil : <span class="start" v-if="renseignement.typeAppareil.length == 0">*</span></h3>
                    <select v-model="renseignement.typeAppareil">
                        <option v-for="item in typeAppareils" :key="item">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>
            <tr>
                <td>Mise en service</td>
            </tr>
            <tr>
                <td>Date de la dernière vérification périodique</td>
            </tr>
            <tr>
                <label for="Essais en charge">
                    <h3>Essais en charge: <span class="start" v-if="renseignement.essaischarge.length == 0">*</span></h3>
                    <select v-model="renseignement.essaischarge">
                        <option v-for="item in essaischarges" :key="item">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>
            <tr>
                <label for="Modification(s) apportée(s) ou autre(s) remarque(s) éventuelle(s) concernant l'appareil examiné">
                    <h3>Modification(s) apportée(s) ou autre(s) remarque(s) éventuelle(s) concernant l'appareil examiné: <span class="start" v-if="renseignement.modification.length == 0">*</span></h3>
                    <select v-model="renseignement.modification">
                        <option v-for="item in modifications" :key="item">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>
        </table>

        <div class="sauvegarde" v-if="flagRenseignements">
            <button>Sauvegarde de Secours</button>
        </div>


    </div>
</template>
  
<script>

export default {
    name: 'FormulaireView',
    data() {
        return { 
            flagRenseignements : false,
            formulaire : {
                observateurId : null,
                categorieAppareil : null
            },
            renseignement : {
                typeConstructeur : "",
                anneeMiseService : "",
                numeroSerie : "",
                numeroInterne : "",
                localisation : "",
                typeAppareil : "",
                modification : "",
                essaischarge : ""
            },

            numeroInternes : [
             { titre : "Sans Object", status : false },
             { titre : "Avec Object", status : true },
            ],

            typeAppareils : [
                { titre : "Pont roulant", status : false },
                { titre : "Poutre roulante", status : false },
                { titre : "Portique", status : false },
                { titre : "Semi portique", status : false },
                { titre : "Palan", status : false },
                { titre : "Palan", status : false },
                { titre : "Treuil", status : false },
                { titre : "Autre", status : true },
            ],

            essaischarges : [
             { titre : "Réalisé avec la Charge maximale utile", status : false },
             { titre : "Réalisé sous charge de (kg) :", status : true },
             { titre : "Absence de charge pour réaliser les essais", status : false },
             { titre : "Absence de tableau des charges pour réaliser les essais", status : false },
             { titre : "Non réalisé. Voir observation critique", status : false },
             { titre : "(Les 4 dernières options conduisent à faire une observation) ", status : false }
            ],

            modifications : [
             { titre : "Sans Object", status : false },
             { titre : "Description", status : true },
            ]


            
        }
    },

    components: {
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

menu, .renseignements {
    width: 100%;
    margin: 10px;
}

menu, th {
  border: 1px solid black;
  color: red;
  border-collapse: collapse;
  padding: 10px;
  cursor: pointer;
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
    width :80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items : flex-start; 
}

label h3 {
    margin: 2px;
    color: red;
}

label input {
    width : 100%;
    height : 40px;
    margin-top : 5px;
    margin-bottom : 5px;
}

label select {
    width : 100%;
    height : 40px;
    margin-top : 5px;
    margin-bottom : 5px;
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