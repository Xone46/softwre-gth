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

        <label for="Métier">
            <h3>Métier : <span class="start">*</span></h3>
            <input type="text" v-model="observateur.metier" disabled>
        </label>

        <label for="Type de Vérification">
            <h3>Type de Vérification : <span class="start" v-if="observateur.typeVerification.length == 0">*</span></h3>
            <select v-model="observateur.typeVerification">
                <option v-for="veification in verifications" :key="veification.name">{{ veification.name }}</option>
            </select>
        </label>

        <label for="Type de Rapport">
            <h3>Type de Rapport : <span class="start" v-if="observateur.typeRapport.length == 0">*</span></h3>
            <select v-model="observateur.typeRapport">
                <option v-for="rapport in rapports" :key="rapport">{{ rapport }}</option>
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
        <button class="anuller" @click="anuller">Anuller</button>

    </div>
</template>

<script>
import Observateurs from '@/requests/Observateurs';
import Interventions from '@/requests/Interventions';



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
                typeRapport : ""
            },
            coordonnees : [],
            rapports : [
                "GTH-Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP",
                "GTH-Famille 2-LEV2_(Palans, Ponts roulants, Portiques)_Minute VGP",
                "GTH-Famille 3-LEV3_(Chariots automoteurs, Elévateur Gerbeur )_Minute VGP",
                "GTH-Famille 4-LEV4_(Elevateur personnel )_Minute VGP",
                "GTH-Famille 4-LEV5_(Pont Elevateur de véhicule )_Minute VGP",
                "GTH-Famille AC1 - Accessoires de levage_Minute"
            ],
            marquage: [
                "Appareil CE",
                "Appareil Non CE",
                "Appareil Epsilon (uniquement pour les anciens chariots automoteurs)",
                "Sans objet (Pour les vérifications périodiques des accessoires de levage et Equipements de travail)"
            ],

            verifications: [
                { status: false, name: "Mise en service" },
                { status: false, name: "Préalable à la mise en service à la suite d'un démontage et remontage" },
                { status: false, name: "Préalable à la remise en service pour autre motif" },
                { status: false, name: "Périodique" }
            ],

            appareils: [
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

        anuller() {
            this.$router.push("/interventions").catch(() => { });
        }
    },

    created() {

        // pour prend les cordonnes
        this.observateur.interventionId = this.$route.params.id;

        Interventions.select(this.observateur.interventionId)
            .then((result) => {

                // set metier
                this.observateur.metier = result.data.metier;

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


        // for check case -> update ou create
        this.observateurId = this.$route.params.observateurId;
        if (this.observateurId) {

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
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.observateurs h3 {
    margin: 3px;
}

.observateurs label input {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
}

.observateurs label select {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
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


.retour,
.modifier,
.anuller,
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