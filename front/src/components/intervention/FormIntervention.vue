<template>
    <div class="form-intervention">

        <div class="retour">
          <button @click="retour">Retour</button>
        </div>

        <h3 v-if="interventionId == null">Création d'une nouvelle d'intervention</h3>
        <h3 v-else>Modification d'intervention</h3>

        <!-- start errors -->
        <ul v-if="flagError">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <!-- Fin errors -->

        <label for="Date d'intervention">
            <h3>Date d'intervention : <span class="start" v-if="interventions.date.length == 0">*</span></h3>
            <input type="date" v-model="interventions.date">
        </label>

        <label for="Numéro d'affaire">
            <h3>Numéro d'affaire : <span class="start" v-if="interventions.numeroAffaire.length == 0">*</span></h3>
            <input type="text" v-model="interventions.numeroAffaire">
        </label>


        <label for="Etablissement">
            <h3>Établissement (Siège social): <span class="start" v-if="interventions.etablissement.length == 0">*</span></h3>
            <input type="text" v-model="interventions.etablissement">
        </label>

        <label for="Repère">
            <h3>Repère (Siège social): <span class="start" v-if="interventions.repere.length == 0">*</span></h3>
            <input type="text" v-model="interventions.repere">
        </label>

        <label for="Adresse">
            <h3>Adresse (Siège social): <span class="start" v-if="interventions.adresse.length == 0">*</span></h3>
            <input type="text" v-model="interventions.adresse">
        </label>

        <label for="Code Postal">
            <h3>Code Postal (Siège social): <span class="start" v-if="interventions.codePostal.length == 0">*</span></h3>
            <input type="text" v-model="interventions.codePostal">
        </label>

        <label for="Ville">
            <h3>Ville (Siège social): <span class="start" v-if="interventions.ville.length == 0">*</span></h3>
            <input type="text" v-model="interventions.ville">
        </label>

        <label for="Pays">
            <h3>Pays (Siège social): <span class="start" v-if="interventions.pays.length == 0">*</span></h3>
            <input type="text" v-model="interventions.pays">
        </label>

        <label for="Numéro d'affaire">
            <h3>Numéro de Site : <span class="start" v-if="interventions.site.length == 0">*</span></h3>
            <input type="number" :value="interventions.site" @input="event => handelSite(event)">
        </label>

        

        <label for="Coordonnée du site" v-if="interventions.site >= 2">
            <div v-for="(item, index) in filterSite" :key="item">
              <h3>Coordonnée du site {{ index + 1 }} :<span class="start" v-if="interventions.site.length == 0">*</span></h3>
              <input type="text" :value="interventions.coordonnees[index]" @input="event => handelCoordonnee(event, index)">
            </div>
        </label>



        <label for="Métier">
            <h3>Métier : <span class="start" v-if="interventions.metier.length == 0">*</span></h3>
            <select v-model="interventions.metier">
                <option v-for="metier in metiers" :key="metier">{{ metier }}</option>
            </select>
        </label>
        

        <button v-if="interventionId == null" class="valider" @click="valider">Valider</button>
        <button class="valider" @click="modifier" v-else>Modifier</button>

    </div>
</template>
  
<script>

import Interventions from "@/requests/Interventions"


export default {
    name: 'table-intervention',
    data() {
        return {

            flagError : false,
            errors : [],
            interventions: {
                date : "",
                numeroAffaire : "",
                site : 1,
                etablissement : "",
                repere : "",
                adresse : "",
                codePostal : "",
                ville : "",
                pays : "",
                metier : "",
                coordonnees : [null, null]
            },

            metiers : [
                // "Installations électriques",
                "Appareil de levage",
                "Accessoire de levage",
                // "Ascenseur et escalier mecanique",
                // "Appareil à pression",
                // "Machine et engin chantier",
                // "Bruit et eclairement",
                // "Incendie",
                // "Equipement de travail"
            ]
        }
    },

    props : {
        interventionId : String
    },

    components: {

    },

    methods: {

        retour() {
            return this.$emit("close");
        },

        handelSite(event) {
            this.interventions.site = event.target.value;
        },

        handelCoordonnee(event, index) {
            this.interventions.coordonnees[index] = event.target.value;
        },

        modifier() {

            if(this.interventions.numeroAffaire == "") {
                this.interventions.numeroAffaire = `GXXX|XXX|XXX|XXX|${this.interventions.etablissement}`;
            }
            
            Interventions.update(this.interventions, this.interventionId)
            .then(() => {
                return this.$emit("table");
            })
            .catch((error) => {
                this.errors = [];
                this.flagError = true;
                this.errors = error.response.data.errors;
            });
        },

        valider() {
            
            // voir est que exite plusiueur site
            if(this.interventions.coordonnees[0] == null && this.interventions.coordonnees[1] == null) {
                this.interventions.coordonnees = [];
            }

            // check numero affaire is null or empty
            if(this.interventions.numeroAffaire == "") {
                this.interventions.numeroAffaire = `GXXX|XXX|XXX|XXX|${this.interventions.etablissement}`;
            }

            Interventions.create(this.interventions)
            .then((result) => {
                console.log(result)
                return this.$emit("table");
            })
            .catch((error) => {
                this.errors = [];
                this.flagError = true;
                this.errors = error.response.data.errors;
            });
        }
    },

    computed: {

        filterSite: function () {
            const num = Number(this.interventions.site);
            return num;
        }

    },

    created() {

        
        if(this.interventionId) {
            Interventions.select(this.interventionId)
            .then((result) => {
                this.interventions = result.data;
                this.interventions.date = result.data.dateCreated.split('T')[0];
                if(result.data.numeroAffaire.slice(0, 4) == 'GXXX') {
                    this.interventions.numeroAffaire = "";                
                }

            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>
  
<style scoped>
.form-intervention {
    margin: 0;
    padding: 0;
    width :100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items : center; 
}

.retour {
  width: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center,
}

.retour button {
    padding: 10px;
    width : 100px;
    height : 40px;
    color: white;
    margin-top: 0;
    margin-bottom: 0;
    border: 0px;
    border-radius: 5px;
    background-color: #e21608;
    cursor: pointer;
}

.form-intervention h3 {
    padding: 0;
    margin: 0;
}


.form-intervention ul {
  margin: 0;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.form-intervention label {
    margin: 0;
    padding: 0;
    width :100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items : center; 
}

.form-intervention label h3 {
    text-align: start;
    width: 300px;
    font-size: medium;
}

.form-intervention label input, .form-intervention label select {
    height : 30px;
    width: 900px;
    margin-top : 5px;
    margin-bottom : 5px;
}

.form-intervention button {
    padding: 10px;
    width : 100px;
    height : 40px;
    color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0px;
    border-radius: 5px;
}

.valider {
    background-color: #04AA6D;
    cursor: pointer;
}

.valider:hover {
    background-color: #04aa6da8;
    cursor: pointer;
}

.reset {
    background-color: #f00e06;
    cursor: pointer;
}

.reset:hover {
    background-color: #f00e0698;
    cursor: pointer;
}

.start {
    color: red;
}

</style>