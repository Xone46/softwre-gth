<template>
    <div class="formulaire">

        <h3>{{ formulaire.typeAppareil[1] }}</h3>

        <!-- Start Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP' -->
        <Menu_famille1_lev1 
            v-if="flag_Menu_famille_lev" 
            :observateurId="formulaire.observateurId"
            @renseignement="renseignement_famille1_lev1"
            @description="description_famille1_lev1"
            @examen="examen_famille1_lev1"
            @conclusion="conclusion_famille1_lev1"
            @photo="photo_famille1_lev1" 
            :colorRenseignement_famille1_lev1="colorRenseignement_famille1_lev1"
            :colorDescription_famille1_lev1="colorDescription_famille1_lev1"
            :colorExamen_famille1_lev1="colorExamen_famille1_lev1"
            :colorConclusion_famille1_lev1="colorConclusion_famille1_lev1"
            :colorPhoto_famille1_lev1="colorPhoto_famille1_lev1"
        />
        <!-- Fin Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP' -->


        <!-- Start Famille-AC1 -->
        <Menu_famille_ac1 
            v-if="flag_Menu_famille_ac" 
            :observateurId="formulaire.observateurId"
            @accessoire="accessoire_famille_ac1" 
            @fiche="fiche_famille_ac1" 
            @photo="photo_famille_ac1"
            @renseignement="renseignement_famille_ac1" 
            @verfication="verfication_famille_ac1"
            :colorRenseignement_famille_ac1="colorRenseignement_famille_ac1"
            :colorAccessoire_famille_ac1="colorAccessoire_famille_ac1"
            :colorFiche_famille_ac1="colorFiche_famille_ac1"
            :colorPhoto_famille_ac1="colorPhoto_famille_ac1"
         />
        <!-- Fin Famille-AC1 -->

        <h3></h3>


        <div class="content">

            <!-- famille1_lev1 -->
            <div class="left" v-if="flag_famille_lev">

                <KeepAlive>
                <Renseignement_famille1_lev1 
                    v-if="flagRenseignement_famille1_lev1"
                    @changeColorRenseignement_famille1_lev1="changeColorRenseignement_famille1_lev1"
                    :observateurId="formulaire.observateurId"
                 />
                </KeepAlive>

                <KeepAlive>
                <Description_famille1_lev1
                    v-if="flagDescription_famille1_lev1"
                    @changeColorDescription_famille1_lev1="changeColorDescription_famille1_lev1"
                    :observateurId="formulaire.observateurId"
                />
                </KeepAlive>

                <KeepAlive>
                <Examen_famille1_lev1 
                    v-if="flagExamen_famille1_lev1"
                    @changeColorExamen_famille1_lev1="changeColorExamen_famille1_lev1"
                    :observateurId="formulaire.observateurId"
                 />
                </KeepAlive>

                <KeepAlive>
                <Photo_famille1_lev1 
                    v-if="flagPhoto_famille1_lev1"
                    @changeColorPhoto_famille1_lev1="changeColorPhoto_famille1_lev1"
                    :observateurId="formulaire.observateurId"
                />
                </KeepAlive>

                <KeepAlive>
                <Conclusion_famille1_lev1 
                    v-if="flagConclusion_famille1_lev1"
                    @changeColorConclusion_famille1_lev1="changeColorConclusion_famille1_lev1"
                    :observateurId="formulaire.observateurId"
                 />
                </KeepAlive>

                <KeepAlive>
                <Reserve_famille1_lev1 
                    v-if="flagReserve_famille1_lev1" 
                    @changeColorReserve_famille1_lev1="changeColorReserve_famille1_lev1"
                    :observateurId="formulaire.observateurId"
                />
                </KeepAlive>

            </div>

            <!-- Famille AC1 -->
            <div class="left" v-if="flag_famille_ac">

                <KeepAlive>
                <Renseignement_famille_ac1 
                    v-if="flagRenseignement_famille_ac1" 
                    @changeColorRenseignement_famille_ac1="changeColorRenseignement_famille_ac1"
                    :observateurId="formulaire.observateurId" 
                    :interventionId="formulaire.interventionId" 
                />
                </KeepAlive>

                <KeepAlive>
                <Accessoire_famille_ac1 
                    v-if="flagAccessoire_famille_ac1" 
                    @changeColorAccessoire_famille_ac1="changeColorAccessoire_famille_ac1" 
                    @sendAccessoires="sendAccessoires"
                    :observateurId="formulaire.observateurId"
                />
                </KeepAlive>

                <KeepAlive>
                <Fiche_famille_ac1 
                    v-if="flagFiche_famille_ac1"
                    @changeColorFiche_famille_ac1="changeColorFiche_famille_ac1"
                    :observateurId="formulaire.observateurId"
                    :accessoires="accessoires"
                 />
                </KeepAlive>

                <KeepAlive>
                <Photo_famille_ac1 
                    v-if="flagPhoto_famille_ac1" 
                    :observateurId="formulaire.observateurId"
                    @changeColorPhoto_famille_ac1="changeColorPhoto_famille_ac1"
                 />
                </KeepAlive>
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

// 

//GTH-Famille 1-LEV1
import Conclusion_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Conclusion_famille1_lev1.vue"
import Description_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Description_famille1_lev1.vue"
import Examen_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Examen_famille1_lev1.vue"
import Photo_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Photo_famille1_lev1.vue"
import Renseignement_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Renseignement_famille1_lev1.vue"
import Reserve_famille1_lev1 from "@/components/appareil_levage/famille1_lev1/Reserve_famille1_lev1.vue"



//GTH-Famille-AC1
import Accessoire_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Accessoire_famille_ac1.vue"
import Fiche_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Fiche_famille_ac1.vue"
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

            flag_famille_lev: false,
            flag_Menu_famille_lev: false,
            flagConclusion_famille1_lev1: false,
            flagDescription_famille1_lev1: false,
            flagExamen_famille1_lev1: false,
            flagPhoto_famille1_lev1: false,
            flagRenseignement_famille1_lev1: true,
            flagReserve_famille1_lev1: false,
            colorConclusion_famille1_lev1: false,
            colorDescription_famille1_lev1: false,
            colorExamen_famille1_lev1: false,
            colorPhoto_famille1_lev1: false,
            colorRenseignement_famille1_lev1: true,
            colorReserve_famille1_lev1: false,

            flag_famille_ac: false,
            flag_Menu_famille_ac: false,
            flagAccessoire_famille_ac1: false,
            flagPhoto_famille_ac1: false,
            flagRenseignement_famille_ac1: true,
            flagFiche_famille_ac1 : false,
            colorRenseignement_famille_ac1 : false,
            colorAccessoire_famille_ac1 : false,
            colorFiche_famille_ac1 : false,
            colorPhoto_famille_ac1 : false,

            flagVisualiationReserve: false,

            formulaire: {
                observateurId: "",
                categorieAppareil: "",
                typeRapport: "",
                interventionId : "",
            },

            accessoires : []
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
        Photo_famille_ac1,
        Fiche_famille_ac1,
        Renseignement_famille_ac1,

        VisualiationReserve,

        Menu_famille1_lev1,
        Menu_famille_ac1

    },

    methods: {

        emptyAccessoire_famille_ac1() {
            this.accessoires = [];
        },

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

        sendAccessoires(value) {
            this.accessoires = value;
        },


        // All functions for Change color famille_ac1---------------------
        async changeColorRenseignement_famille_ac1 (value) {
            this.colorRenseignement_famille_ac1 = value;
        },

        async changeColorAccessoire_famille_ac1 (value) {
            this.colorAccessoire_famille_ac1 = value;
        },

        async changeColorFiche_famille_ac1 (value) {
            this.colorFiche_famille_ac1 = value;
        },

        async changeColorPhoto_famille_ac1 (value) {
            this.colorPhoto_famille_ac1 = value;
        },
        //--------------------------------------------------------------

        // All functions for Change color famille1_lev1 ---------------------------
        async changeColorRenseignement_famille1_lev1(value) {
            this.colorRenseignement_famille1_lev1 = value;
        },

        async changeColorDescription_famille1_lev1(value) {
            this.colorDescription_famille1_lev1 = value;
        },

        async changeColorExamen_famille1_lev1(value){
            this.colorExamen_famille1_lev1 = value;
        },

        async changeColorConclusion_famille1_lev1(value) {
            this.colorConclusion_famille1_lev1 = value;
        },

        async changeColorPhoto_famille1_lev1(value) {
            this.colorPhoto_famille1_lev1 = value;
        },
        // ------------------------------------------------------------------


        renseignement_famille1_lev1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = true;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1  = false;
            

        },

        description_famille1_lev1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = true;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1  = false;
            


        },

        examen_famille1_lev1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = true;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1  = false;
            
        },

        conclusion_famille1_lev1() {

            this.flagConclusion_famille1_lev1 = true;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1  = false;
            

        },


        photo_famille1_lev1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = true;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1  = false;
            

        },




        accessoire_famille_ac1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = true;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1  = false;
            

        },


        photo_famille_ac1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = true;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1 = false;
            this.flagVerfication_famille_ac1 = false;
        },


        renseignement_famille_ac1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = true;
            this.flagFiche_famille_ac1  = false;
            
        },



        verfication_famille_ac1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;

            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1  = false;
            this.flagVerfication_famille_ac1  = true;
        },


        fiche_famille_ac1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;
            
            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1  = true;
            
        }

    },

    created() {

        this.formulaire.observateurId = this.$route.params.id;
        this.formulaire.typeAppareil = this.$route.params.typeAppareil;
        this.formulaire.interventionId = this.$route.params.interventionId;

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