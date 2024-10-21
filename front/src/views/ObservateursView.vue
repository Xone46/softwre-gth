<template>
    <div class="observateurs">

        <div class="retour">
          <button @click="retour">Retour</button>
        </div>

        <h3 v-if="observateurId != null">Modification Appareil, Equipement, Ou Installation</h3>
        <h3 v-else>Nouvel Appareil, Equipement Ou Installation</h3>

        <!-- start errors -->
        <ul v-if="flagError">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <!-- Fin errors -->

        <label for="Métier">
            <h3>Métier : <span class="start" v-if="observateur.metier.length == 0">*</span></h3>
            <input type="text" v-model="observateur.metier" disabled>
        </label>

        <label for="Type de Vérification">
            <h3>Type de Vérification : <span class="start" v-if="observateur.typeVerification.length == 0">*</span></h3>
            <select v-model="observateur.typeVerification">
                <option v-for="veification in verifications" :key="veification.name">{{ veification.name }}</option>
            </select>
        </label>

        <label for="Marquage">
            <h3>Marquage : <span class="start" v-if="observateur.marquage.length == 0">*</span></h3>
            <select v-model="observateur.marquage">
                <option v-for="marque in marquage" :key="marque">{{ marque }}</option>
            </select>
        </label>

        <label for="Date">
            <h3>Date : <span class="start" v-if="observateur.date.length == 0">*</span></h3>
            <input type="date" v-model="observateur.date">
        </label>

        <label for="Le coordonnées de Vérification">
            <h3>Le coordonnées de Vérification : <span class="start" v-if="observateur.coordonnees.length == 0">*</span></h3>
            <select v-if="coordonnees.length >= 2" v-model="observateur.coordonnees">
                <option v-for="item in coordonnees" :key="item">{{ item }}</option>
            </select>
            <input v-if="observateur.coordonnees != ''" type="text" v-model="observateur.coordonnees" disabled>
        </label>

        <label for="Type d'Appareil">
            <h3>Type d'Appareil : <span class="start" v-if="observateur.typeAppareil.length == 0">*</span></h3>
            <select v-model="observateur.typeAppareil">
                <option v-for="(appareil , index) in appareils" :key="index" :value="[appareil.a, appareil.b]">{{ appareil.b }}</option>
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

        <label for="Accompagnateur Inspecteur">
            <h3>Accompagnateur Inspecteur : <span class="start" v-if="observateur.accompagnateurInspecteur.length == 0">*</span></h3>
            <input type="text" v-model="observateur.accompagnateurInspecteur">
        </label>

        <label for="Accompagnateur Client">
            <h3>Accompagnateur Client : <span class="start" v-if="observateur.accompagnateurClient.length == 0">*</span></h3>
            <input type="text" v-model="observateur.accompagnateurClient">
        </label>

        <button v-if="observateurId != null" class="modifier" @click="modifier">Modifier</button>
        <button v-else class="valider" @click="valider">Valider</button>

    </div>
</template>

<script>
import Observateurs from '@/requests/Observateurs';
import Interventions from '@/requests/Interventions';
import Filo from '@/requests/Filos';

export default {
    name: 'ObservateursView',
    data() {
        return {
            errors: [],
            flagError: false,
            observateurId: null,
            observateur: {
                metier : "",
                interventionId: null,
                date: "",
                typeVerification: "",
                coordonnees : "",
                typeAppareil: "",
                equipement: "",
                constructeur: "",
                numeroSerie: "",
                numeroInterne: "",
                localisation: "",
                marquage: "",
                accompagnateurClient: "",
                accompagnateurInspecteur: "",
                // categorie : ""
            },
            coordonnees : [],
            categories : [],
            marquage: [
                "Appareil CE",
                "Sans Objet",
                "Absence de marquage",
                "Appareil Epsilon",
                "Non CE ni Epsilon",
            ],

            verifications: [
                { status: false, name: "Mise en service" },
                { status: false, name: "Préalable à la mise en service à la suite d'un démontage et remontage" },
                { status: false, name: "Préalable à la remise en service pour autre motif" },
                { status: false, name: "Périodique" }
            ],

            appareils: []
        }
    },

    components: {
    },

    methods: {

        modifier() {
            Observateurs.update(this.observateur, this.observateurId)
                .then(() => {
                    this.$router.push("/interventions").catch(() => { });
                })
                .catch((error) => {
                    this.errors = [];
                    this.flagError = true;
                    this.errors = error.response.data.errors;
                });
        },

        retour() {
            this.$router.push("/interventions").catch(() => { });
        },

        valider() {
            Observateurs.create(this.observateur)
                .then(() => {
                    this.$router.push("/interventions").catch(() => { });
                })
                .catch((error) => {
                    this.errors = [];
                    this.flagError = true;
                    this.errors = error.response.data.errors;
                });
        },

    },

    created() {

        // pour prend les cordonnes
        this.observateur.interventionId = this.$route.params.interventionId;

        Interventions.select(this.observateur.interventionId)
            .then((result) => {
                // set metier
                this.observateur.metier = result.data.metier;

                // obtenir les categories a traver metier
                Filo.select(this.observateur.metier)
                .then((result) => {
                    this.appareils = result.data;
                })
                .catch((error) => {
                    console.log(error);
                });

                if(result.data.coordonnees.length >= 2) {
                    result.data.coordonnees.forEach((el) => this.coordonnees.push(el))
                }

                if(result.data.coordonnees.length == 0) {
                    this.observateur.coordonnees = `${result.data.adresse}, ${result.data.ville} ${result.data.codePostal} - ${result.data.pays}`;
                }

            })
            .catch((error) => {
                console.log(error);
            });


        // // for check case -> update ou create
        this.observateurId = this.$route.params.observateurId;    

        if (this.observateurId) {
            Observateurs.selected(this.observateurId)
                .then((result) => {
                    console.log(result)
                    // console.log(result.data.typeAppareil)
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

.retour {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin : 0;
  padding: 0;
}

.retour button {
    padding: 10px;
    width : 100px;
    height : 40px;
    color: white;
    border: 0px;
    border-radius: 5px;
    background-color: #e21608;
    cursor: pointer;
}

.observateurs h3 {
    padding: 0;
    margin-bottom: 5px;
    width: 100%;
}

.observateurs ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
}

.observateurs label {
    width :100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items : center; 
}

.observateurs label h3 {
    text-align: start;
    width: 300px;
}

.observateurs label input, .observateurs label select  {
    height : 30px;
    width: 900px;
    margin-top : 5px;
    margin-bottom : 5px;
}


.modifier {
    background-color: #f7890c;
}

.reset {
    background-color: #f00e06;
}

.valider {
    background-color: #04AA6D;
}

.start {
    color: red;
}


.modifier,
.reset,
.valider {
    padding: 10px;
    width: 100px;
    height: 40px;
    color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}
</style>