<template>
    <div class="formulaire">

        <button @click="retour">Retour</button>

        <h3>{{ formulaire.categorieAppareil }}</h3>

        <div class="buttons">
            <button @click="reserves">Visualisation les réserves</button>
            <button @click="sauvegarder">Sauvegarder</button>
            <button @click="terminer">Terminer</button>
        </div>

        <Menu v-if="flagMenu" :observateurId="formulaire.observateurId"  @renseignement="renseignement" @description="description" @examen="examen" @conclusion="conclusion" @photo="photo" />

        <div class="content">
            <Renseignement v-if="flagRenseignements" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
            <Description v-if="flagDescription" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
            <Examen v-if="flagExamen" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
            <Photo v-if="flagPhoto" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
            <Conclusion v-if="flagConclusion" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
        </div>


    </div>
</template>

<script>
import { nextTick } from 'vue';
import Renseignement from "@/components/renseignement/Renseignement"
import Description from "@/components/renseignement/Description.vue"
import Examen from "@/components/renseignement/Examen.vue"
import Photo from "@/components/renseignement/Photo.vue"
import Conclusion from "@/components/renseignement/Conclusion.vue"

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

            formulaire: {
                observateurId: "",
                categorieAppareil: ""
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
        Menu
    },

    methods: {

        retour() {
            this.$router.push("/interventions").catch(()=>{});
        },

        reserves() {
            this.$router.push("/reserves").catch(()=>{});
        },

        sauvegarder() {
            this.$router.push("/reserves").catch(()=>{});
        },

        terminer() {
            this.$router.push("/reserves").catch(()=>{});
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

.formulaire button {
    padding: 10px;
    width : 40%;
    height : 40px;
    color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0px;
    border-radius: 5px;
    background-color: #04AA6D;
    cursor: pointer;
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

.content {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>