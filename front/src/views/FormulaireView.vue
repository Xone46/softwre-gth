<template>
    <div class="formulaire">

        <h3>{{ formulaire.typeAppareil }}</h3>

            <!-- Start Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP' -->
            <Menu_famille1_lev1 v-if="flagMenu && formulaire.typeRapport == 'GTH-Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP'" :observateurId="formulaire.observateurId"  @renseignement="renseignement_famille1_lev1" @description="description" @examen="examen"  @conclusion="conclusion" @photo="photo" />
            <!-- Fin Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP' -->
            <MenuLevageA v-if="flagMenu && formulaire.typeRapport == 'GTH-Famille AC1 - Accessoires de levage_Minute'" :observateurId="formulaire.observateurId" @renseignementLevageA="renseignementLevageA" @examenLevageA="examenLevageA" @accessoireLevageA="accessoireLevageA" @descriptionLevageA="descriptionLevageA" @photo="photo" @conclusion="conclusion"  />
        <h3></h3>


        <div class="content">

            <!-- Start Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP' -->
            <div class="left" v-if="formulaire.typeRapport == 'Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP'">
                <Renseignement_famille1_lev1 v-if="flagRenseignement_famille1_lev1" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <Description_famille1_lev1 v-if="flagDescription_famille1_lev1" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <Examen_famille1_lev1 v-if="flagExamen_famille1_lev1" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <Photo_famille1_lev1 v-if="flagPhoto_famille1_lev1" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <Conclusion_famille1_lev1 v-if="flagConclusion_famille1_lev1" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
            </div>
            <!-- End Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP' -->


            <!-- Start GTH-Famille AC1 - Accessoires de levage_Minute -->
            <div class="left" v-if="formulaire.typeRapport == 'GTH-Famille AC1 - Accessoires de levage_Minute'">
                <LevageARenseignement v-if="flagRenseignements" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <LevageAExamen v-if="flagDescription" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <LevageAAccessoire v-if="flagDescription" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <LevageADescription v-if="flagDescription" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <LevageAPhoto v-if="flagPhoto" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
                <LevageAConclusion v-if="flagConclusion" :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked"/>
            </div>
            <!-- Fin GTH-Famille AC1 - Accessoires de levage_Minute -->


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

// Start Components ---------------------------------------------------------------
//GTH-Famille 1-LEV1
import Renseignement_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Renseignement_famille1_lev1.vue"
import Description_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Description_famille1_lev1.vue"
import Examen_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Examen_famille1_lev1.vue"
import Photo_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Photo_famille1_lev1.vue"
import Conclusion_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Conclusion_famille1_lev1.vue"
// import Reserve_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Reserve_famille1_lev1.vue"



//GTH-Famille-AC1
import LevageARenseignement from "@/components/gth_famille_ac1/LevageARenseignement.vue"
import LevageAExamen from "@/components/gth_famille_ac1/LevageAExamen.vue"
import LevageAAccessoire from "@/components/gth_famille_ac1/LevageAAccessoire.vue"
import LevageADescription from "@/components/gth_famille_ac1/LevageADescription.vue"
import LevageAPhoto from "@/components/gth_famille_ac1/LevageAPhoto.vue"
import LevageAConclusion from "@/components/gth_famille_ac1/LevageAConclusion.vue"
// Fin components ---------------------------------------------------------------


// Start Menu --------------------------------------------
import Menu_famille1_lev1 from "@/components/menu/appareil_levage/Menu_famille1_lev1.vue"
import MenuLevageA from "@/components/menu/accessoire_levage/MenuLevageA.vue"
// Fin Menu ----------------------------------------------


// Start Models -------------------------------------------------------------
import VisualiationReserve from "@/components/models/VisualiationReserve.vue"
// Fin Models ---------------------------------------------------------------

export default {
    name: 'FormulaireView',
    data() {
        return {

            flagMenu : true,
            flagMenuLevageA : true,

            flagRenseignement_famille1_lev1 : true,
            flagDescription_famille1_lev1 : false,
            flagExamen_famille1_lev1 : false,
            flagPhoto_famille1_lev1: false,
            Reserve_famille1_lev1: false,
            flagConclusion_famille1_lev1 : false,

            flagRenseignementsColor: false,
            flagDescriptionColor: false,
            flagExamenColor: false,
            flagPhotoColor: false,
            flagConclusionColor: false,


            formulaire: {
                observateurId: "",
                categorieAppareil: "",
                typeRapport : ""
            }

        }
    },

    components: {
        Renseignement_famille1_lev1,
        Description_famille1_lev1,
        Examen_famille1_lev1,
        Photo_famille1_lev1,
        Conclusion_famille1_lev1,
        Menu_famille1_lev1,
        VisualiationReserve,
        LevageARenseignement,
        LevageAExamen,
        LevageAAccessoire,
        LevageADescription,
        LevageAPhoto,
        LevageAConclusion,
        MenuLevageA
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

        renseignement_famille1_lev1() {

            this.flagRenseignement_famille1_lev1 = true;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1= false;
            this.Reserve_famille1_lev1= false;
            this.flagConclusion_famille1_lev1 = false;

            this.flagRenseignementsColor = false;
            this.flagDescriptionColor = false;
            this.flagExamenColor = false;
            this.flagPhotoColor = false;
            this.flagConclusionColor = false;
        },

        description() {

            this.flagRenseignement_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = true;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1= false;
            this.Reserve_famille1_lev1= false;
            this.flagConclusion_famille1_lev1 = false;

            this.flagRenseignementsColor = false;
            this.flagDescriptionColor = false;
            this.flagExamenColor = false;
            this.flagPhotoColor = false;
            this.flagConclusionColor = false;
        },

        examen() {

            this.flagRenseignement_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = true;
            this.flagPhoto_famille1_lev1= false;
            this.Reserve_famille1_lev1= false;
            this.flagConclusion_famille1_lev1 = false;

            this.flagRenseignementsColor = false;
            this.flagDescriptionColor = false;
            this.flagExamenColor = false;
            this.flagPhotoColor = false;
            this.flagConclusionColor = false;

        },

        conclusion() {

            this.flagRenseignement_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1= false;
            this.Reserve_famille1_lev1= false;
            this.flagConclusion_famille1_lev1 = true;

            this.flagRenseignementsColor = false;
            this.flagDescriptionColor = false;
            this.flagExamenColor = false;
            this.flagPhotoColor = false;
            this.flagConclusionColor = false;

        },

        photo() {

            this.flagRenseignement_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1= true;
            this.Reserve_famille1_lev1= false;
            this.flagConclusion_famille1_lev1 = false;

            this.flagRenseignementsColor = false;
            this.flagDescriptionColor = false;
            this.flagExamenColor = false;
            this.flagPhotoColor = false;
            this.flagConclusionColor = false;
        }

    },

    created() {

        this.formulaire.observateurId = this.$route.params.id;
        this.formulaire.typeAppareil = this.$route.params.typeAppareil;
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