<template>
    <div class="formulaire">

        <h3>{{ formulaire.categorieAppareil }}</h3>

        <Menu v-if="flagMenu" :observateurId="formulaire.observateurId"  @renseignement="renseignement" @description="description" @examen="examen" @conclusion="conclusion" @photo="photo" />

        <h3></h3>


        <div class="content">

            <div class="left" v-if="formulaire.typeRapport == 'GTH-Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP'">
                <Renseignement v-if="flagRenseignements" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <Description v-if="flagDescription" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <Examen v-if="flagExamen" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <Photo v-if="flagPhoto" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <Conclusion v-if="flagConclusion" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
            </div>


            <div class="left" v-if="formulaire.typeRapport == 'GTH-Famille AC1 - Accessoires de levage_Minute'">
                <Renseignement_gth_famille_ac1 v-if="flagRenseignements" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
            </div>

            <div class="right">
                <button @click="retour">Liste des interventions</button>
                <button @click="visualiationReserve">Visualisation les réserves</button>
                <!-- <button @click="terminer">Contrôle terminer</button> -->
            </div>
        </div>

        <VisualiationReserve :observateurId="formulaire.observateurId"  v-if="flagVisualiationReserve" @quitter="handelQuitter"/>

    </div>
</template>

<script>
import { nextTick } from 'vue';

//GTH-Famille 1-LEV1
import Renseignement from "@/components/renseignement/Renseignement"
import Description from "@/components/renseignement/Description.vue"
import Examen from "@/components/renseignement/Examen.vue"
import Photo from "@/components/renseignement/Photo.vue"
import Conclusion from "@/components/renseignement/Conclusion.vue"
import VisualiationReserve from "@/components/models/VisualiationReserve.vue"

//GTH-Famille-AC1
import Renseignement_gth_famille_ac1 from "@/components/GTH-Famille-AC1/Renseignement_gth_famille_ac1.vue"


import Menu from "@/components/menu/Menu.vue"

export default {
    name: 'FormulaireView',
    data() {
        return {

            flagMenu : true,
            flagRenseignements: true,
            flagDescription: false,
            flagExamen: false,
            flagPhoto: false,
            flagConclusion: false,
            flagVisualiationReserve : false,

            flagRenseignement_gth_famille_ac1 : false,

            formulaire: {
                observateurId: "",
                categorieAppareil: "",
                typeRapport : ""
            },

            flagRenseignementsColor: false,
            flagDescriptionColor: false,
            flagExamenColor: false,
            flagPhotoColor: false,
            flagConclusionColor: false

        }
    },

    components: {
        Renseignement,
        Description,
        Examen,
        Photo,
        Conclusion,
        Menu,
        VisualiationReserve,
        Renseignement_gth_famille_ac1
    },

    methods: {

        handelQuitter() {
            this.flagVisualiationReserve = false;
        },

        retour() {
            this.$router.push("/interventions").catch(()=>{});
        },

        terminer() {
            this.$router.push("/terminer").catch(()=>{});
        },

        visualiationReserve() {
            this.flagVisualiationReserve = true;
        },

        sauvegarder() {
            this.$router.push("/sauvegarder").catch(()=>{});
        },


        async menuStatusChicked() {
            // Remove MyComponent from the DOM
            this.flagMenu = false;
            // Wait for the change to get flushed to the DOM
            await nextTick();
            // Add the component back in
            this.flagMenu = true;
        },

        renseignement() {
            this.flagRenseignements = true;
            this.flagDescription = false;
            this.flagExamen = false;
            this.flagPhoto = false;
            this.flagConclusion = false;
        },

        description() {
            this.flagRenseignements = false;
            this.flagDescription = true;
            this.flagExamen = false;
            this.flagPhoto = false;
            this.flagConclusion = false;
            this.flagRenseignementsColor = false;
        },

        examen() {
            this.flagRenseignements = false;
            this.flagDescription = false;
            this.flagExamen = true;
            this.flagPhoto = false;
            this.flagConclusion = false;
        },

        conclusion() {
            this.flagRenseignements = false;
            this.flagDescription = false;
            this.flagExamen = false;
            this.flagPhoto = false;
            this.flagConclusion = true;
        },

        photo() {
            this.flagRenseignements = false;
            this.flagDescription = false;
            this.flagExamen = false;
            this.flagPhoto = true;
            this.flagConclusion = false;
        }

    },

    created() {
        this.formulaire.observateurId = this.$route.params.id;
        this.formulaire.categorieAppareil = this.$route.params.categorieAppareil;
        this.formulaire.typeRapport = this.$route.params.typeRapport;
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


.formulaire h3 {
    width: 100%;
    background-color: #0300c7;
    color: white;
    padding: 10px;
}
/* 
.formulaire .content .left {
    display: flex;
    flex-direction: column;
    padding: 5px;
} */


.formulaire .content .right {
    display: flex;
    flex-direction: column;
}

.formulaire .content .right button {
    padding: 3px;
    color: white;
    border: 0px;
    margin: 3px;
    cursor: pointer;
    border-radius: 3px;
}

.formulaire .content .right button:nth-child(1) {
    background-color: #e21608;
}

.formulaire .content .right button:nth-child(2) {
    background-color: #0300c7;
}

.formulaire .content .right button:nth-child(3) {
    background-color: #04AA6D;
}


/* .buttons {
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
    width: fit-content;
} */

.content {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>