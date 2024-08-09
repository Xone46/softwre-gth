<template>
    <div class="formulaire">

        <h3>{{ formulaire.typeAppareil[1] }}</h3>

        <!-- Start Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP' -->
        <Menu_famille1_lev1
            v-if="flag_Menu_famille_lev"
            :observateurId="formulaire.observateurId" @renseignement="renseignement_famille1_lev1"
            @description="description_famille1_lev1" @examen="examen_famille1_lev1" @conclusion="conclusion_famille1_lev1" @photo="photo_famille1_lev1" />
        <!-- Fin Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP' -->


        <!-- Start Famille-AC1 -->
        <Menu_famille_ac1 v-if="flag_Menu_famille_ac"
            :observateurId="formulaire.observateurId" @renseignement="renseignement_famille_ac1"
            @examen="examen_famille_ac1" @accessoire="accessoire_famille_ac1"
            @description="description_famille_ac1" @photo="photo_famille_ac1" @conclusion="conclusion_famille_ac1" />
        <!-- Fin Famille-AC1 -->

        <h3></h3>


        <div class="content">

            <div class="left"
                v-if="flag_famille_lev">
                <Renseignement_famille1_lev1 v-if="flagRenseignement_famille1_lev1"
                    :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked_famille_lev" />
                <Description_famille1_lev1 v-if="flagDescription_famille1_lev1"
                    :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked_famille_lev" />
                <Examen_famille1_lev1 v-if="flagExamen_famille1_lev1" :observateurId="formulaire.observateurId"
                    @menuStatusChicked="menuStatusChicked_famille_lev" />
                <Photo_famille1_lev1 v-if="flagPhoto_famille1_lev1" :observateurId="formulaire.observateurId"
                    @menuStatusChicked="menuStatusChicked_famille_lev" />
                <Conclusion_famille1_lev1 v-if="flagConclusion_famille1_lev1" :observateurId="formulaire.observateurId"
                    @menuStatusChicked="menuStatusChicked_famille_lev" />
                <Reserve_famille1_lev1 v-if="flagReserve_famille1_lev1" :observateurId="formulaire.observateurId"
                    @menuStatusChicked="menuStatusChicked_famille_lev" />
            </div>


            <div class="left" v-if="flag_famille_ac">
                <Renseignement_famille_ac1 v-if="flagRenseignement_famille_ac1"
                    :observateurId="formulaire.observateurId" @menuStatusChicked="menuStatusChicked_famille_ac1" />
                <Examen_famille_ac1 v-if="flagExamen_famille_ac1" :observateurId="formulaire.observateurId"
                    @menuStatusChicked="menuStatusChicked_famille_ac1" />
                <Accessoire_famille_ac1 v-if="flagAccessoire_famille_ac1" :observateurId="formulaire.observateurId"
                    @menuStatusChicked="menuStatusChicked_famille_ac1" />
                <Description_famille_ac1 v-if="flagDescription_famille_ac1" :observateurId="formulaire.observateurId"
                    @menuStatusChicked="menuStatusChicked_famille_ac1" />
                <Photo_famille_ac1 v-if="flagPhoto_famille_ac1" :observateurId="formulaire.observateurId"
                    @menuStatusChicked="menuStatusChicked_famille_ac1" />
                <Conclusion_famille_ac1 v-if="flagConclusion_famille_ac1" :observateurId="formulaire.observateurId"
                    @menuStatusChicked="menuStatusChicked_famille_ac1" />
            </div>

            <div class="right">
                <button @click="retour">Liste des interventions</button>
                <button @click="visualiationReserve">Visualisation les réserves</button>
                <!-- <button @click="terminer">Contrôle terminer</button> -->
            </div>
        </div>

        <VisualiationReserve :observateurId="formulaire.observateurId" v-if="flagVisualiationReserve"
            @quitter="handelQuitter" />

    </div>
</template>

<script>

import { nextTick } from 'vue';


//GTH-Famille 1-LEV1
import Conclusion_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Conclusion_famille1_lev1.vue"
import Description_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Description_famille1_lev1.vue"
import Examen_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Examen_famille1_lev1.vue"
import Photo_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Photo_famille1_lev1.vue"
import Renseignement_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Renseignement_famille1_lev1.vue"
import Reserve_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Reserve_famille1_lev1.vue"



//GTH-Famille-AC1
import Accessoire_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Accessoire_famille_ac1.vue"
import Conclusion_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Conclusion_famille_ac1.vue"
import Description_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Description_famille_ac1.vue"
import Examen_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Examen_famille_ac1.vue"
import Photo_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Photo_famille_ac1.vue"
import Renseignement_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Renseignement_famille_ac1.vue"


// Start Menu --------------------------------------------
import Menu_famille1_lev1 from "@/components/menu/appareil_levage/Menu_famille1_lev1.vue"
import Menu_famille_ac1 from "@/components/menu/accessoire_levage/Menu_famille_ac1.vue"
// Fin Menu ----------------------------------------------


// Start Models -------------------------------------------------------------
import VisualiationReserve from "@/components/models/VisualiationReserve.vue"
// Fin Models ---------------------------------------------------------------

export default {
    name: 'FormulaireView',
    data() {
        return {

            flag_famille_lev : false,
            flag_Menu_famille_lev: false,
            flagConclusion_famille1_lev1: false,
            flagDescription_famille1_lev1: false,
            flagExamen_famille1_lev1: false,
            flagPhoto_famille1_lev1: false,
            flagRenseignement_famille1_lev1: true,
            flagReserve_famille1_lev1: false,

            flag_famille_ac : false,
            flag_Menu_famille_ac: false,
            flagAccessoire_famille_ac1: false,
            flagConclusion_famille_ac1: false,
            flagDescription_famille_ac1: false,
            flagExamen_famille_ac1: false,
            flagPhoto_famille_ac1: false,
            flagRenseignement_famille_ac1: true,

            flagVisualiationReserve: false,


            formulaire: {
                observateurId: "",
                categorieAppareil: "",
                typeRapport: ""
            }
        }
    },

    components: {

        Conclusion_famille1_lev1,
        Description_famille1_lev1,
        Examen_famille1_lev1,
        Photo_famille1_lev1,
        Renseignement_famille1_lev1,
        Reserve_famille1_lev1,

        Accessoire_famille_ac1,
        Conclusion_famille_ac1,
        Description_famille_ac1,
        Examen_famille_ac1,
        Photo_famille_ac1,
        Renseignement_famille_ac1,

        VisualiationReserve,


        Menu_famille1_lev1,
        Menu_famille_ac1

    },

    methods: {

        handelQuitter() {
            this.flagVisualiationReserve = false;
        },

        retour() {
            this.$router.push("/interventions").catch(() => { });
        },

        terminer() {
            this.$router.push("/terminer").catch(() => { });
        },

        visualiationReserve() {
            this.flagVisualiationReserve = true;
        },

        sauvegarder() {
            this.$router.push("/sauvegarder").catch(() => { });
        },

        async menuStatusChicked_famille_lev() {
            // Remove MyComponent from the DOM
            this.flag_Menu_famille_lev = false;
            // Wait for the change to get flushed to the DOM
            await nextTick();
            // Add the component back in
            this.flag_Menu_famille_lev = true;
        },
        
        async menuStatusChicked_famille_ac1() {
            // Remove MyComponent from the DOM
            this.flag_Menu_famille_ac = false;
            // Wait for the change to get flushed to the DOM
            await nextTick();
            // Add the component back in
            this.flag_Menu_famille_ac = true;
        },



        renseignement_famille1_lev1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = true;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagConclusion_famille_ac1 = false;
            this.flagDescription_famille_ac1 = false;
            this.flagExamen_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
        },

        description_famille1_lev1() {
            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = true;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagConclusion_famille_ac1 = false;
            this.flagDescription_famille_ac1 = false;
            this.flagExamen_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
        },

        examen_famille1_lev1() {
            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = true;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagConclusion_famille_ac1 = false;
            this.flagDescription_famille_ac1 = false;
            this.flagExamen_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
        },

        conclusion_famille1_lev1() {
            this.flagConclusion_famille1_lev1 = true;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagConclusion_famille_ac1 = false;
            this.flagDescription_famille_ac1 = false;
            this.flagExamen_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
        },


        photo_famille1_lev1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = true;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagConclusion_famille_ac1 = false;
            this.flagDescription_famille_ac1 = false;
            this.flagExamen_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
        },




        accessoire_famille_ac1() {
            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = true;
            this.flagConclusion_famille_ac1 = false;
            this.flagDescription_famille_ac1 = false;
            this.flagExamen_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
        },


        conclusion_famille_ac1() {
            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagConclusion_famille_ac1 = true;
            this.flagDescription_famille_ac1 = false;
            this.flagExamen_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
        },


        examen_famille_ac1() {
            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagConclusion_famille_ac1 = false;
            this.flagDescription_famille_ac1 = false;
            this.flagExamen_famille_ac1 = true;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
        },



        photo_famille_ac1() {
            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagConclusion_famille_ac1 = false;
            this.flagDescription_famille_ac1 = false;
            this.flagExamen_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = true;
            this.flagRenseignement_famille_ac1 = false;
        },


        renseignement_famille_ac1() {
            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagConclusion_famille_ac1 = false;
            this.flagDescription_famille_ac1 = false;
            this.flagExamen_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = true;
        }

    },

    created() {

        this.formulaire.observateurId = this.$route.params.id;
        this.formulaire.typeAppareil = this.$route.params.typeAppareil;

        this.flag_famille_lev = ["Famille 1 LEV1", "Famille 2 LEV2", "Famille 3 LEV3", "Famille 4 LEV4", "Famille 5 LEV5"].includes(this.$route.params.typeAppareil[0]);
        this.flag_Menu_famille_lev = this.flag_famille_lev;


        this.flag_famille_ac = ["Famille AC1"].includes(this.$route.params.typeAppareil[0]);
        this.flag_Menu_famille_ac = this.flag_famille_ac;

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


.content {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>