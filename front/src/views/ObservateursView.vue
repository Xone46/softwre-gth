<template>
    <div class="observateurs">

        <button class="retour" @click="retour">Retour</button>
        
        <h3 v-if="observateurId != null">Modification Appareil, Equipement, Ou Installation</h3>
        <h3 v-else>Nouvel Appareil, Equipement Ou Installation</h3>

        <!-- start errors -->
        <ul v-if="flagError">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <!-- Fin errors -->

        <label for="Date">
            <h3>Date : <span class="start" v-if="observateur.date.length == 0">*</span></h3>
            <input type="date" v-model="observateur.date">
        </label>

        <label for="Type de Vérification">
            <h3>Type de Vérification : <span class="start" v-if="observateur.typeVerification.length == 0">*</span></h3>
            <select v-model="observateur.typeVerification">
                <option v-for="veification in verifications" :key="veification.name">{{ veification.name }}</option>
            </select>
        </label>

        <label for="Catégorie d'Appareil">
            <h3>Catégorie d'Appareil : <span class="start" v-if="observateur.categorieAppareil.length == 0">*</span></h3>
            <select v-model="observateur.categorieAppareil">
                <option v-for="appareil in appareils" :key="appareil">{{ appareil }}</option>
            </select>
        </label>

        <label for="Equipement">
            <h3>Equipement : <span class="start" v-if="observateur.equipement.length == 0">*</span></h3>
            <input type="test" v-model="observateur.equipement">
        </label>


        <label for="Constructeur">
            <h3>Constructeur : <span class="start" v-if="observateur.constructeur.length == 0">*</span></h3>
            <input type="text" v-model="observateur.constructeur">
        </label>

        <label for="N° de Série ">
            <h3>N° de Série : <span class="start" v-if="observateur.numeroSerie.length == 0">*</span></h3>
            <input type="text" v-model="observateur.numeroSerie">
        </label>

        <label for="Etablissement">
            <h3> N° Interne : <span class="start" v-if="observateur.numeroInterne.length == 0">*</span></h3>
            <input type="text" v-model="observateur.numeroInterne">
        </label>

        <label for="Localisation">
            <h3>Localisation : <span class="start" v-if="observateur.localisation.length == 0">*</span></h3>
            <input type="text" v-model="observateur.localisation">
        </label>

        <label for="Marquage">
            <h3>Marquage : <span class="start" v-if="observateur.marquage.length == 0">*</span></h3>
            <select v-model="observateur.marquage">
                <option v-for="marque in marquage" :key="marque">{{ marque }}</option>
            </select>
        </label>

        <label for="Accompagnateur">
            <h3>Accompagnateur : <span class="start" v-if="observateur.accompagnateur.length == 0">*</span></h3>
            <input type="text" v-model="observateur.accompagnateur">
        </label>

        <button v-if="observateurId != null" class="modifier" @click="modifier">Modifier</button>
        <button v-else class="valider" @click="valider">Valider</button>
        <button class="anuller" @click="anuller">Anuller</button>

    </div>
</template>
  
<script>
import Observateurs from '@/requests/Observateurs';



export default {
    name: 'ObservateursView',
    data() {
        return {
            errors : [],
            flagError : false,
            observateurId : null,
            observateur : {
                interventionId : null,
                date : "",
                typeVerification : "",
                categorieAppareil : "",
                equipement : "",
                constructeur : "",
                numeroSerie : "",
                numeroInterne : "",
                localisation : "",
                marquage : "",
                accompagnateur :"",
            },

            marquage : [
                "Appareil CE",
                "Appareil Non CE",
                "Appareil Epsilon (uniquement pour les anciens chariots automoteurs)",
                "Sans objet (Pour les vérifications périodiques des accessoires de levage et Equipements de travail)"
            ],

            verifications : [
                { status : false, name : "Mise en service" },
                { status : false, name : "Préalable à la mise en service à la suite d'un démontage et remontage" },
                { status : false, name : "Préalable à la remise en service pour autre motif" },
                { status : false, name : "Périodique" }
            ],

            appareils : [
                "Accessoires de levage - Palonniers (2)"
            ]
        }
    },

    components: {
    },

    methods: {

        modifier() {
            Observateurs.update(this.observateur, this.observateurId)
            .then(() => {
                this.$router.push("/interventions").catch(()=>{});
            })
            .catch((error) => {
                this.errors = [];
                this.flagError = true;
                this.errors = error.response.data.errors;
            });
        },

        retour() {
            this.$router.push("/interventions").catch(()=>{});
        },

        valider() {
            Observateurs.create(this.observateur)
            .then(() => {
                this.$router.push("/interventions").catch(()=>{});
            })
            .catch((error) => {
                this.errors = [];
                this.flagError = true;
                this.errors = error.response.data.errors;
            });
        },

        anuller() {
            this.$router.push("/interventions").catch(()=>{});
        }
    },

    created() {

        this.observateur.interventionId = this.$route.params.id;
        this.observateurId = this.$route.params.observateurId;


        if(this.observateurId) {

            Observateurs.selected(this.observateurId)
            .then((result) => {
                this.observateur = result.data;
                this.observateur.date = result.data.date.split('T')[0];
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>
  
<style scoped>
.observateurs {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.observateurs ul {
  margin: 0;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.observateurs label {
    width :80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items : flex-start; 
}
.observateurs h3 {
    margin: 3px;
}

.observateurs label input {
    width : 100%;
    height : 40px;
    margin-top : 5px;
    margin-bottom : 5px;
}
.observateurs label select {
    width : 100%;
    height : 40px;
    margin-top : 5px;
    margin-bottom : 5px;
}



.retour {
    background-color: #f00e06;
}

.modifier {
    background-color: #f7890c;
}

.anuller {
    background-color: #f00e06;
}

.valider {
    background-color: #04AA6D;
}

.start {
    color: red;
}


.retour, .modifier, .anuller, .valider {
    padding: 10px;
    width : 100px;
    height : 40px;
    color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}




</style>