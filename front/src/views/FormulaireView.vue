<template>
    <div class="formulaire">

        <h3>{{ formulaire.typeAppareil[1] }}</h3>

        <!-- Start Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP' -->
        <Menu_famille1_lev1 v-if="flag_Menu_famille1_lev1" :observateurId="formulaire.observateurId"
            @renseignement="renseignement_famille1_lev1" @description="description_famille1_lev1"
            @examen="examen_famille1_lev1" @conclusion="conclusion_famille1_lev1" @photo="photo_famille1_lev1"
            :colorRenseignement_famille1_lev1="colorRenseignement_famille1_lev1"
            :colorDescription_famille1_lev1="colorDescription_famille1_lev1"
            :colorExamen_famille1_lev1="colorExamen_famille1_lev1"
            :colorConclusion_famille1_lev1="colorConclusion_famille1_lev1"
            :colorPhoto_famille1_lev1="colorPhoto_famille1_lev1" />
        <!-- Fin Famille 1-LEV1_(Appareils de levage mus a bras)_Minute VGP' -->


        <!-- Start Famille 2-LEV2 -->
        <Menu_famille2_lev2 v-if="flag_Menu_famille2_lev2" :observateurId="formulaire.observateurId"
            @renseignement="renseignement_famille2_lev2" @description="description_famille2_lev2"
            @examen="examen_famille2_lev2" @conclusion="conclusion_famille2_lev2" @photo="photo_famille2_lev2"
            :colorRenseignement_famille2_lev2="colorRenseignement_famille2_lev2"
            :colorDescription_famille2_lev2="colorDescription_famille2_lev2"
            :colorExamen_famille2_lev2="colorExamen_famille2_lev2"
            :colorConclusion_famille2_lev2="colorConclusion_famille2_lev2"
            :colorPhoto_famille2_lev2="colorPhoto_famille2_lev2" />
        <!-- Fin Famille 2-LEV2 -->

        <!-- Start Famille 3-LEV3 -->
        <Menu_famille3_lev3 v-if="flag_Menu_famille3_lev3" :observateurId="formulaire.observateurId"
            @renseignement="renseignement_famille3_lev3" @description="description_famille3_lev3"
            @examen="examen_famille3_lev3" @conclusion="conclusion_famille3_lev3" @photo="photo_famille3_lev3"
            :colorRenseignement_famille3_lev3="colorRenseignement_famille3_lev3"
            :colorDescription_famille3_lev3="colorDescription_famille3_lev3"
            :colorExamen_famille3_lev3="colorExamen_famille3_lev3"
            :colorConclusion_famille3_lev3="colorConclusion_famille3_lev3"
            :colorPhoto_famille3_lev3="colorPhoto_famille3_lev3" />
        <!-- Fin Famille 3-LEV3 -->

        <!-- Start Famille 4-LEV4 -->
        <Menu_famille4_lev4 v-if="flag_Menu_famille4_lev4" :observateurId="formulaire.observateurId"
            @renseignement="renseignement_famille4_lev4" @description="description_famille4_lev4"
            @examen="examen_famille4_lev4" @conclusion="conclusion_famille4_lev4" @photo="photo_famille4_lev4"
            :colorRenseignement_famille4_lev4="colorRenseignement_famille4_lev4"
            :colorDescription_famille4_lev4="colorDescription_famille4_lev4"
            :colorExamen_famille4_lev4="colorExamen_famille4_lev4"
            :colorConclusion_famille4_lev4="colorConclusion_famille4_lev4"
            :colorPhoto_famille4_lev4="colorPhoto_famille4_lev4" />
        <!-- Fin Famille 4-LEV4 -->


        <!-- Start Famille 5-LEV5 -->
        <Menu_famille5_lev5 v-if="flag_Menu_famille5_lev5" :observateurId="formulaire.observateurId"
            @renseignement="renseignement_famille5_lev5" @description="description_famille5_lev5"
            @examen="examen_famille5_lev5" @conclusion="conclusion_famille5_lev5" @photo="photo_famille5_lev5"
            :colorRenseignement_famille5_lev5="colorRenseignement_famille5_lev5"
            :colorDescription_famille5_lev5="colorDescription_famille5_lev5"
            :colorExamen_famille5_lev5="colorExamen_famille5_lev5"
            :colorConclusion_famille5_lev5="colorConclusion_famille5_lev5"
            :colorPhoto_famille5_lev5="colorPhoto_famille5_lev5" />
        <!-- Fin Famille 5-LEV5 -->


        <!-- Start Famille-AC1 -->
        <Menu_famille_ac1 v-if="flag_Menu_famille_ac1" :observateurId="formulaire.observateurId"
            @accessoire="accessoire_famille_ac1" @fiche="fiche_famille_ac1" @photo="photo_famille_ac1"
            @renseignement="renseignement_famille_ac1" @verfication="verfication_famille_ac1"
            :colorRenseignement_famille_ac1="colorRenseignement_famille_ac1"
            :colorAccessoire_famille_ac1="colorAccessoire_famille_ac1" :colorFiche_famille_ac1="colorFiche_famille_ac1"
            :colorPhoto_famille_ac1="colorPhoto_famille_ac1" />
        <!-- Fin Famille-AC1 -->

        <h3></h3>


        <div class="content">

            <!-- famille1_lev1 -->
            <div class="left" v-if="flag_famille1_lev1">

                <KeepAlive>
                    <Renseignement_famille1_lev1 v-if="flagRenseignement_famille1_lev1"
                        @changeColorRenseignement_famille1_lev1="changeColorRenseignement_famille1_lev1"
                        :observateurId="formulaire.observateurId"  />
                </KeepAlive>

                <KeepAlive>
                    <Description_famille1_lev1 v-if="flagDescription_famille1_lev1"
                        @changeColorDescription_famille1_lev1="changeColorDescription_famille1_lev1"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Examen_famille1_lev1 v-if="flagExamen_famille1_lev1"
                        @changeColorExamen_famille1_lev1="changeColorExamen_famille1_lev1"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Photo_famille1_lev1 v-if="flagPhoto_famille1_lev1"
                        @changeColorPhoto_famille1_lev1="changeColorPhoto_famille1_lev1"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Conclusion_famille1_lev1 v-if="flagConclusion_famille1_lev1"
                        @changeColorConclusion_famille1_lev1="changeColorConclusion_famille1_lev1"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Reserve_famille1_lev1 v-if="flagReserve_famille1_lev1"
                        @changeColorReserve_famille1_lev1="changeColorReserve_famille1_lev1"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

            </div>

            <!-- famille2_lev2 -->
            <div class="left" v-if="flag_famille2_lev2">

                <KeepAlive>
                    <Renseignement_famille2_lev2 v-if="flagRenseignement_famille2_lev2"
                        @changeColorRenseignement_famille2_lev2="changeColorRenseignement_famille2_lev2"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Description_famille2_lev2 v-if="flagDescription_famille2_lev2"
                        @changeColorDescription_famille2_lev2="changeColorDescription_famille2_lev2"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Examen_famille2_lev2 v-if="flagExamen_famille2_lev2"
                        @changeColorExamen_famille2_lev2="changeColorExamen_famille2_lev2"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Photo_famille2_lev2 v-if="flagPhoto_famille2_lev2"
                        @changeColorPhoto_famille2_lev2="changeColorPhoto_famille2_lev2"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Conclusion_famille2_lev2 v-if="flagConclusion_famille2_lev2"
                        @changeColorConclusion_famille2_lev2="changeColorConclusion_famille2_lev2"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Reserve_famille2_lev2 v-if="flagReserve_famille2_lev2"
                        @changeColorReserve_famille2_lev2="changeColorReserve_famille2_lev2"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

            </div>

            <!-- famille3_lev3 -->
            <div class="left" v-if="flag_famille3_lev3">

                <KeepAlive>
                    <Renseignement_famille3_lev3 v-if="flagRenseignement_famille3_lev3"
                        @changeColorRenseignement_famille3_lev3="changeColorRenseignement_famille3_lev3"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Description_famille3_lev3 v-if="flagDescription_famille3_lev3"
                        @changeColorDescription_famille3_lev3="changeColorDescription_famille3_lev3"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Examen_famille3_lev3 v-if="flagExamen_famille3_lev3"
                        @changeColorExamen_famille3_lev3="changeColorExamen_famille3_lev3"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Photo_famille3_lev3 v-if="flagPhoto_famille3_lev3"
                        @changeColorPhoto_famille3_lev3="changeColorPhoto_famille3_lev3"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Conclusion_famille3_lev3 v-if="flagConclusion_famille3_lev3"
                        @changeColorConclusion_famille3_lev3="changeColorConclusion_famille3_lev3"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Reserve_famille3_lev3 v-if="flagReserve_famille3_lev3"
                        @changeColorReserve_famille3_lev3="changeColorReserve_famille3_lev3"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

            </div>

            <!-- famille4_lev4 -->
            <div class="left" v-if="flag_famille4_lev4">

                <KeepAlive>
                    <Renseignement_famille4_lev4 v-if="flagRenseignement_famille4_lev4"
                        @changeColorRenseignement_famille4_lev4="changeColorRenseignement_famille4_lev4"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Description_famille4_lev4 v-if="flagDescription_famille4_lev4"
                        @changeColorDescription_famille4_lev4="changeColorDescription_famille4_lev4"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Examen_famille4_lev4 v-if="flagExamen_famille4_lev4"
                        @changeColorExamen_famille4_lev4="changeColorExamen_famille4_lev4"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Photo_famille4_lev4 v-if="flagPhoto_famille4_lev4"
                        @changeColorPhoto_famille4_lev4="changeColorPhoto_famille4_lev4"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Conclusion_famille4_lev4 v-if="flagConclusion_famille4_lev4"
                        @changeColorConclusion_famille4_lev4="changeColorConclusion_famille4_lev4"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Reserve_famille4_lev4 v-if="flagReserve_famille4_lev4"
                        @changeColorReserve_famille4_lev4="changeColorReserve_famille4_lev4"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

            </div>

            <!-- famille5_lev5 -->
            <div class="left" v-if="flag_famille5_lev5">

                <KeepAlive>
                    <Renseignement_famille5_lev5 v-if="flagRenseignement_famille5_lev5"
                        @changeColorRenseignement_famille5_lev5="changeColorRenseignement_famille5_lev5"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Description_famille5_lev5 v-if="flagDescription_famille5_lev5"
                        @changeColorDescription_famille5_lev5="changeColorDescription_famille5_lev5"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Examen_famille5_lev5 v-if="flagExamen_famille5_lev5"
                        @changeColorExamen_famille5_lev5="changeColorExamen_famille5_lev5"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Photo_famille5_lev5 v-if="flagPhoto_famille5_lev5"
                        @changeColorPhoto_famille5_lev5="changeColorPhoto_famille5_lev5"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Conclusion_famille5_lev5 v-if="flagConclusion_famille5_lev5"
                        @changeColorConclusion_famille5_lev5="changeColorConclusion_famille5_lev5"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Reserve_famille5_lev5 v-if="flagReserve_famille5_lev5"
                        @changeColorReserve_famille5_lev5="changeColorReserve_famille5_lev5"
                        :observateurId="formulaire.observateurId" />
                </KeepAlive>

            </div>

            <!-- Famille AC1 -->
            <div class="left" v-if="flag_famille_ac1">

                <KeepAlive>
                    <Renseignement_famille_ac1 v-if="flagRenseignement_famille_ac1"
                        @changeColorRenseignement_famille_ac1="changeColorRenseignement_famille_ac1"
                        :observateurId="formulaire.observateurId" :interventionId="formulaire.interventionId" />
                </KeepAlive>

                <KeepAlive>
                    <Accessoire_famille_ac1 v-if="flagAccessoire_famille_ac1"
                        @changeColorAccessoire_famille_ac1="changeColorAccessoire_famille_ac1"
                        @sendAccessoires="sendAccessoires" :observateurId="formulaire.observateurId" />
                </KeepAlive>

                <KeepAlive>
                    <Fiche_famille_ac1 v-if="flagFiche_famille_ac1"
                        @changeColorFiche_famille_ac1="changeColorFiche_famille_ac1"
                        :observateurId="formulaire.observateurId" :accessoires="accessoires" />
                </KeepAlive>

                <KeepAlive>
                    <Photo_famille_ac1 v-if="flagPhoto_famille_ac1" :observateurId="formulaire.observateurId"
                        @changeColorPhoto_famille_ac1="changeColorPhoto_famille_ac1" />
                </KeepAlive>
            </div>

            <div class="right">
                <button @click="retour">Liste des interventions</button>
                <button @click="visualiationReserve">Visualisation les réserves</button>
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

//GTH-Famille 2-LEV2
import Conclusion_famille2_lev2 from "@/components/appareil_levage/famille2_lev2/Conclusion_famille2_lev2.vue"
import Description_famille2_lev2 from "@/components/appareil_levage/famille2_lev2/Description_famille2_lev2.vue"
import Examen_famille2_lev2 from "@/components/appareil_levage/famille2_lev2/Examen_famille2_lev2.vue"
import Photo_famille2_lev2 from "@/components/appareil_levage/famille2_lev2/Photo_famille2_lev2.vue"
import Renseignement_famille2_lev2 from "@/components/appareil_levage/famille2_lev2/Renseignement_famille2_lev2.vue"
import Reserve_famille2_lev2 from "@/components/appareil_levage/famille2_lev2/Reserve_famille2_lev2.vue"

//GTH-Famille 3-LEV3
import Conclusion_famille3_lev3 from "@/components/appareil_levage/famille3_lev3/Conclusion_famille3_lev3.vue"
import Description_famille3_lev3 from "@/components/appareil_levage/famille3_lev3/Description_famille3_lev3.vue"
import Examen_famille3_lev3 from "@/components/appareil_levage/famille3_lev3/Examen_famille3_lev3.vue"
import Photo_famille3_lev3 from "@/components/appareil_levage/famille3_lev3/Photo_famille3_lev3.vue"
import Renseignement_famille3_lev3 from "@/components/appareil_levage/famille3_lev3/Renseignement_famille3_lev3.vue"
import Reserve_famille3_lev3 from "@/components/appareil_levage/famille3_lev3/Reserve_famille3_lev3.vue"

//GTH-Famille 4-LEV4
import Conclusion_famille4_lev4 from "@/components/appareil_levage/famille4_lev4/Conclusion_famille4_lev4.vue"
import Description_famille4_lev4 from "@/components/appareil_levage/famille4_lev4/Description_famille4_lev4.vue"
import Examen_famille4_lev4 from "@/components/appareil_levage/famille4_lev4/Examen_famille4_lev4.vue"
import Photo_famille4_lev4 from "@/components/appareil_levage/famille4_lev4/Photo_famille4_lev4.vue"
import Renseignement_famille4_lev4 from "@/components/appareil_levage/famille4_lev4/Renseignement_famille4_lev4.vue"
import Reserve_famille4_lev4 from "@/components/appareil_levage/famille4_lev4/Reserve_famille4_lev4.vue"

//GTH-Famille 5-LEV5
import Conclusion_famille5_lev5 from "@/components/appareil_levage/famille5_lev5/Conclusion_famille5_lev5.vue"
import Description_famille5_lev5 from "@/components/appareil_levage/famille5_lev5/Description_famille5_lev5.vue"
import Examen_famille5_lev5 from "@/components/appareil_levage/famille5_lev5/Examen_famille5_lev5.vue"
import Photo_famille5_lev5 from "@/components/appareil_levage/famille5_lev5/Photo_famille5_lev5.vue"
import Renseignement_famille5_lev5 from "@/components/appareil_levage/famille5_lev5/Renseignement_famille5_lev5.vue"
import Reserve_famille5_lev5 from "@/components/appareil_levage/famille5_lev5/Reserve_famille5_lev5.vue"

//GTH-Famille-AC1
import Accessoire_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Accessoire_famille_ac1.vue"
import Fiche_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Fiche_famille_ac1.vue"
import Photo_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Photo_famille_ac1.vue"
import Renseignement_famille_ac1 from "@/components/accessoire_levage/famille_ac1/Renseignement_famille_ac1.vue"

// Start Menu --------------------------------------------
import Menu_famille1_lev1 from "@/components/menu/appareil_levage/Menu_famille1_lev1.vue"
import Menu_famille2_lev2 from "@/components/menu/appareil_levage/Menu_famille2_lev2.vue"
import Menu_famille3_lev3 from "@/components/menu/appareil_levage/Menu_famille3_lev3.vue"
import Menu_famille4_lev4 from "@/components/menu/appareil_levage/Menu_famille4_lev4.vue"
import Menu_famille5_lev5 from "@/components/menu/appareil_levage/Menu_famille5_lev5.vue"
import Menu_famille_ac1 from "@/components/menu/accessoire_levage/Menu_famille_ac1.vue"
// Fin Menu ----------------------------------------------


// Start Models -------------------------------------------------------------
import VisualiationReserve from "@/components/models/VisualiationReserve.vue"
// Fin Models ---------------------------------------------------------------

export default {
    name: 'FormulaireView',
    data() {
        return {

            counter_saved : 0,

            flag_famille1_lev1: false,
            flag_Menu_famille1_lev1: false,
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
            colorRenseignement_famille1_lev1: false,
            colorReserve_famille1_lev1: false,

            flag_famille2_lev2: false,
            flag_Menu_famille2_lev2: false,
            flagConclusion_famille2_lev2: false,
            flagDescription_famille2_lev2: false,
            flagExamen_famille2_lev2: false,
            flagPhoto_famille2_lev2: false,
            flagRenseignement_famille2_lev2: true,
            flagReserve_famille2_lev2: false,
            colorConclusion_famille2_lev2: false,
            colorDescription_famille2_lev2: false,
            colorExamen_famille2_lev2: false,
            colorPhoto_famille2_lev2: false,
            colorRenseignement_famille2_lev2: false,
            colorReserve_famille2_lev2: false,

            flag_famille3_lev3: false,
            flag_Menu_famille3_lev3: false,
            flagConclusion_famille3_lev3: false,
            flagDescription_famille3_lev3: false,
            flagExamen_famille3_lev3: false,
            flagPhoto_famille3_lev3: false,
            flagRenseignement_famille3_lev3: true,
            flagReserve_famille3_lev3: false,
            colorConclusion_famille3_lev3: false,
            colorDescription_famille3_lev3: false,
            colorExamen_famille3_lev3: false,
            colorPhoto_famille3_lev3: false,
            colorRenseignement_famille3_lev3: false,
            colorReserve_famille3_lev3: false,

            flag_famille4_lev4: false,
            flag_Menu_famille4_lev4: false,
            flagConclusion_famille4_lev4: false,
            flagDescription_famille4_lev4: false,
            flagExamen_famille4_lev4: false,
            flagPhoto_famille4_lev4: false,
            flagRenseignement_famille4_lev4: true,
            flagReserve_famille4_lev4: false,
            colorConclusion_famille4_lev4: false,
            colorDescription_famille4_lev4: false,
            colorExamen_famille4_lev4: false,
            colorPhoto_famille4_lev4: false,
            colorRenseignement_famille4_lev4: false,
            colorReserve_famille4_lev4: false,

            flag_famille5_lev5: false,
            flag_Menu_famille5_lev5: false,
            flagConclusion_famille5_lev5: false,
            flagDescription_famille5_lev5: false,
            flagExamen_famille5_lev5: false,
            flagPhoto_famille5_lev5: false,
            flagRenseignement_famille5_lev5: true,
            flagReserve_famille5_lev5: false,
            colorConclusion_famille5_lev5: false,
            colorDescription_famille5_lev5: false,
            colorExamen_famille5_lev5: false,
            colorPhoto_famille5_lev5: false,
            colorRenseignement_famille5_lev5: false,
            colorReserve_famille5_lev5: false,

            flag_famille_ac1: false,
            flag_Menu_famille_ac1: false,
            flagAccessoire_famille_ac1: false,
            flagPhoto_famille_ac1: false,
            flagRenseignement_famille_ac1: true,
            flagFiche_famille_ac1: false,
            colorRenseignement_famille_ac1: false,
            colorAccessoire_famille_ac1: false,
            colorFiche_famille_ac1: false,
            colorPhoto_famille_ac1: false,

            flagVisualiationReserve: false,

            formulaire: {
                observateurId: "",
                categorieAppareil: "",
                typeRapport: "",
                interventionId: "",
            },

            accessoires: []
        }
    },

    components: {

        Conclusion_famille1_lev1,
        Description_famille1_lev1,
        Examen_famille1_lev1,
        Photo_famille1_lev1,
        Renseignement_famille1_lev1,
        Reserve_famille1_lev1,

        Conclusion_famille2_lev2,
        Description_famille2_lev2,
        Examen_famille2_lev2,
        Photo_famille2_lev2,
        Renseignement_famille2_lev2,
        Reserve_famille2_lev2,

        Conclusion_famille3_lev3,
        Description_famille3_lev3,
        Examen_famille3_lev3,
        Photo_famille3_lev3,
        Renseignement_famille3_lev3,
        Reserve_famille3_lev3,


        Conclusion_famille4_lev4,
        Description_famille4_lev4,
        Examen_famille4_lev4,
        Photo_famille4_lev4,
        Renseignement_famille4_lev4,
        Reserve_famille4_lev4,

        Conclusion_famille5_lev5,
        Description_famille5_lev5,
        Examen_famille5_lev5,
        Photo_famille5_lev5,
        Renseignement_famille5_lev5,
        Reserve_famille5_lev5,

        Accessoire_famille_ac1,
        Photo_famille_ac1,
        Fiche_famille_ac1,
        Renseignement_famille_ac1,

        VisualiationReserve,

        Menu_famille1_lev1,
        Menu_famille2_lev2,
        Menu_famille3_lev3,
        Menu_famille4_lev4,
        Menu_famille5_lev5,
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

        // All functions for Change color famille1_lev1 ---------------------------
        async changeColorRenseignement_famille1_lev1(value) {
            this.colorRenseignement_famille1_lev1 = value;
        },

        async changeColorDescription_famille1_lev1(value) {
            this.colorDescription_famille1_lev1 = value;
        },

        async changeColorExamen_famille1_lev1(value) {
            this.colorExamen_famille1_lev1 = value;
        },

        async changeColorConclusion_famille1_lev1(value) {
            this.colorConclusion_famille1_lev1 = value;
        },

        async changeColorPhoto_famille1_lev1(value) {
            this.colorPhoto_famille1_lev1 = value;
        },


        // ------------------------------------------------------------------

        // All functions for Change color famille2_lev2 ---------------------------
        async changeColorRenseignement_famille2_lev2(value) {
            this.colorRenseignement_famille2_lev2 = value;
            console.log(this.colorRenseignement_famille2_lev2)
        },

        async changeColorDescription_famille2_lev2(value) {
            this.colorDescription_famille2_lev2 = value;
        },

        async changeColorExamen_famille2_lev2(value) {
            this.colorExamen_famille2_lev2 = value;
        },

        async changeColorConclusion_famille2_lev2(value) {
            this.colorConclusion_famille2_lev2 = value;
        },

        async changeColorPhoto_famille2_lev2(value) {
            this.colorPhoto_famille2_lev2 = value;
        },
        // ------------------------------------------------------------------


        
        // All functions for Change color famille3_lev3 ---------------------------
        async changeColorRenseignement_famille3_lev3(value) {
            this.colorRenseignement_famille3_lev3 = value;
        },

        async changeColorDescription_famille3_lev3(value) {
            this.colorDescription_famille3_lev3 = value;
        },

        async changeColorExamen_famille3_lev3(value) {
            this.colorExamen_famille3_lev3 = value;
        },

        async changeColorConclusion_famille3_lev3(value) {
            this.colorConclusion_famille3_lev3 = value;
        },

        async changeColorPhoto_famille3_lev3(value) {
            this.colorPhoto_famille3_lev3 = value;
        },
        // ------------------------------------------------------------------

        // All functions for Change color famille4_lev4 ---------------------------
        async changeColorRenseignement_famille4_lev4(value) {
            this.colorRenseignement_famille4_lev4 = value;
        },

        async changeColorDescription_famille4_lev4(value) {
            this.colorDescription_famille4_lev4 = value;
        },

        async changeColorExamen_famille4_lev4(value) {
            this.colorExamen_famille4_lev4 = value;
        },

        async changeColorConclusion_famille4_lev4(value) {
            this.colorConclusion_famille4_lev4 = value;
        },

        async changeColorPhoto_famille4_lev4(value) {
            this.colorPhoto_famille4_lev4 = value;
        },
        // ------------------------------------------------------------------

        // All functions for Change color famille5_lev5 ---------------------------
        async changeColorRenseignement_famille5_lev5(value) {
            this.colorRenseignement_famille5_lev5 = value;
        },

        async changeColorDescription_famille5_lev5(value) {
            this.colorDescription_famille5_lev5 = value;
        },

        async changeColorExamen_famille5_lev5(value) {
            this.colorExamen_famille5_lev5 = value;
        },

        async changeColorConclusion_famille5_lev5(value) {
            this.colorConclusion_famille5_lev5 = value;
        },

        async changeColorPhoto_famille5_lev5(value) {
            this.colorPhoto_famille5_lev5 = value;
        },
        // ------------------------------------------------------------------

        // All functions for Change color famille_ac1---------------------
        async changeColorRenseignement_famille_ac1(value) {
            this.colorRenseignement_famille_ac1 = value;
        },

        async changeColorAccessoire_famille_ac1(value) {
            this.colorAccessoire_famille_ac1 = value;
        },

        async changeColorFiche_famille_ac1(value) {
            this.colorFiche_famille_ac1 = value;
        },

        async changeColorPhoto_famille_ac1(value) {
            this.colorPhoto_famille_ac1 = value;
        },
        //--------------------------------------------------------------


        renseignement_famille1_lev1() {
            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = true;
            this.flagReserve_famille1_lev1 = false;
        },

        description_famille1_lev1() {
            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = true;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false
        },

        examen_famille1_lev1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = true;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;
        },

        conclusion_famille1_lev1() {

            this.flagConclusion_famille1_lev1 = true;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;
        },


        photo_famille1_lev1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = true;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;
        },

        // ----------------------------------------------------

        renseignement_famille2_lev2() {
            this.flagConclusion_famille2_lev2 = false;
            this.flagDescription_famille2_lev2 = false;
            this.flagExamen_famille2_lev2 = false;
            this.flagPhoto_famille2_lev2 = false;
            this.flagRenseignement_famille2_lev2 = true;
            this.flagReserve_famille2_lev2 = false;
        },

        description_famille2_lev2() {
            this.flagConclusion_famille2_lev2 = false;
            this.flagDescription_famille2_lev2 = true;
            this.flagExamen_famille2_lev2 = false;
            this.flagPhoto_famille2_lev2 = false;
            this.flagRenseignement_famille2_lev2 = false;
            this.flagReserve_famille2_lev2 = false
        },

        examen_famille2_lev2() {

            this.flagConclusion_famille2_lev2 = false;
            this.flagDescription_famille2_lev2 = false;
            this.flagExamen_famille2_lev2 = true;
            this.flagPhoto_famille2_lev2 = false;
            this.flagRenseignement_famille2_lev2 = false;
            this.flagReserve_famille2_lev2 = false;
        },

        conclusion_famille2_lev2() {

            this.flagConclusion_famille2_lev2 = true;
            this.flagDescription_famille2_lev2 = false;
            this.flagExamen_famille2_lev2 = false;
            this.flagPhoto_famille2_lev2 = false;
            this.flagRenseignement_famille2_lev2 = false;
            this.flagReserve_famille2_lev2 = false;
        },


        photo_famille2_lev2() {

            this.flagConclusion_famille2_lev2 = false;
            this.flagDescription_famille2_lev2 = false;
            this.flagExamen_famille2_lev2 = false;
            this.flagPhoto_famille2_lev2 = true;
            this.flagRenseignement_famille2_lev2 = false;
            this.flagReserve_famille2_lev2 = false;
        },

        // ---------------------------------------------------------------

        renseignement_famille3_lev3() {
            this.flagConclusion_famille3_lev3 = false;
            this.flagDescription_famille3_lev3 = false;
            this.flagExamen_famille3_lev3 = false;
            this.flagPhoto_famille3_lev3 = false;
            this.flagRenseignement_famille3_lev3 = true;
            this.flagReserve_famille3_lev3 = false;
        },

        description_famille3_lev3() {
            this.flagConclusion_famille3_lev3 = false;
            this.flagDescription_famille3_lev3 = true;
            this.flagExamen_famille3_lev3 = false;
            this.flagPhoto_famille3_lev3 = false;
            this.flagRenseignement_famille3_lev3 = false;
            this.flagReserve_famille3_lev3 = false
        },

        examen_famille3_lev3() {

            this.flagConclusion_famille3_lev3 = false;
            this.flagDescription_famille3_lev3 = false;
            this.flagExamen_famille3_lev3 = true;
            this.flagPhoto_famille3_lev3 = false;
            this.flagRenseignement_famille3_lev3 = false;
            this.flagReserve_famille3_lev3 = false;
        },

        conclusion_famille3_lev3() {

            this.flagConclusion_famille3_lev3 = true;
            this.flagDescription_famille3_lev3 = false;
            this.flagExamen_famille3_lev3 = false;
            this.flagPhoto_famille3_lev3 = false;
            this.flagRenseignement_famille3_lev3 = false;
            this.flagReserve_famille3_lev3 = false;
        },


        photo_famille3_lev3() {

            this.flagConclusion_famille3_lev3 = false;
            this.flagDescription_famille3_lev3 = false;
            this.flagExamen_famille3_lev3 = false;
            this.flagPhoto_famille3_lev3 = true;
            this.flagRenseignement_famille3_lev3 = false;
            this.flagReserve_famille3_lev3 = false;
        },


        // ---------------------------------------------------------------

        renseignement_famille4_lev4() {
            this.flagConclusion_famille4_lev4 = false;
            this.flagDescription_famille4_lev4 = false;
            this.flagExamen_famille4_lev4 = false;
            this.flagPhoto_famille4_lev4 = false;
            this.flagRenseignement_famille4_lev4 = true;
            this.flagReserve_famille4_lev4 = false;
        },

        description_famille4_lev4() {
            this.flagConclusion_famille4_lev4 = false;
            this.flagDescription_famille4_lev4 = true;
            this.flagExamen_famille4_lev4 = false;
            this.flagPhoto_famille4_lev4 = false;
            this.flagRenseignement_famille4_lev4 = false;
            this.flagReserve_famille4_lev4 = false
        },

        examen_famille4_lev4() {

            this.flagConclusion_famille4_lev4 = false;
            this.flagDescription_famille4_lev4 = false;
            this.flagExamen_famille4_lev4 = true;
            this.flagPhoto_famille4_lev4 = false;
            this.flagRenseignement_famille4_lev4 = false;
            this.flagReserve_famille4_lev4 = false;
        },

        conclusion_famille4_lev4() {

            this.flagConclusion_famille4_lev4 = true;
            this.flagDescription_famille4_lev4 = false;
            this.flagExamen_famille4_lev4 = false;
            this.flagPhoto_famille4_lev4 = false;
            this.flagRenseignement_famille4_lev4 = false;
            this.flagReserve_famille4_lev4 = false;
        },


        photo_famille4_lev4() {

            this.flagConclusion_famille4_lev4 = false;
            this.flagDescription_famille4_lev4 = false;
            this.flagExamen_famille4_lev4 = false;
            this.flagPhoto_famille4_lev4 = true;
            this.flagRenseignement_famille4_lev4 = false;
            this.flagReserve_famille4_lev4 = false;
        },
        // ---------------------------------------------------------------

        renseignement_famille5_lev5() {
            this.flagConclusion_famille5_lev5 = false;
            this.flagDescription_famille5_lev5 = false;
            this.flagExamen_famille5_lev5 = false;
            this.flagPhoto_famille5_lev5 = false;
            this.flagRenseignement_famille5_lev5 = true;
            this.flagReserve_famille5_lev5 = false;
        },

        description_famille5_lev5() {
            this.flagConclusion_famille5_lev5 = false;
            this.flagDescription_famille5_lev5 = true;
            this.flagExamen_famille5_lev5 = false;
            this.flagPhoto_famille5_lev5 = false;
            this.flagRenseignement_famille5_lev5 = false;
            this.flagReserve_famille5_lev5 = false
        },

        examen_famille5_lev5() {

            this.flagConclusion_famille5_lev5 = false;
            this.flagDescription_famille5_lev5 = false;
            this.flagExamen_famille5_lev5 = true;
            this.flagPhoto_famille5_lev5 = false;
            this.flagRenseignement_famille5_lev5 = false;
            this.flagReserve_famille5_lev5 = false;
        },

        conclusion_famille5_lev5() {

            this.flagConclusion_famille5_lev5 = true;
            this.flagDescription_famille5_lev5 = false;
            this.flagExamen_famille5_lev5 = false;
            this.flagPhoto_famille5_lev5 = false;
            this.flagRenseignement_famille5_lev5 = false;
            this.flagReserve_famille5_lev5 = false;
        },


        photo_famille5_lev5() {

            this.flagConclusion_famille5_lev5 = false;
            this.flagDescription_famille5_lev5 = false;
            this.flagExamen_famille5_lev5 = false;
            this.flagPhoto_famille5_lev5 = true;
            this.flagRenseignement_famille5_lev5 = false;
            this.flagReserve_famille5_lev5 = false;
        },

        // ---------------------------------------------------------------

        accessoire_famille_ac1() {

            this.flagConclusion_famille1_lev1 = false;
            this.flagDescription_famille1_lev1 = false;
            this.flagExamen_famille1_lev1 = false;
            this.flagPhoto_famille1_lev1 = false;
            this.flagRenseignement_famille1_lev1 = false;
            this.flagReserve_famille1_lev1 = false;
        },


        photo_famille_ac1() {
            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = true;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1 = false;
            this.flagVerfication_famille_ac1 = false;
        },


        renseignement_famille_ac1() {

            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = true;
            this.flagFiche_famille_ac1 = false;

        },



        verfication_famille_ac1() {
            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1 = false;
            this.flagVerfication_famille_ac1 = true;
        },


        fiche_famille_ac1() {

            this.flagAccessoire_famille_ac1 = false;
            this.flagPhoto_famille_ac1 = false;
            this.flagRenseignement_famille_ac1 = false;
            this.flagFiche_famille_ac1 = true;
        }

    },

    created() {

        this.formulaire.observateurId = this.$route.params.id;
        this.formulaire.typeAppareil = this.$route.params.typeAppareil;
        this.formulaire.interventionId = this.$route.params.interventionId;

        if (this.$route.params.typeAppareil[0] == "Famille 1 LEV1") {
            this.flag_famille1_lev1 = true;
            this.flag_Menu_famille1_lev1 = true;
            this.colorRenseignement_famille1_lev1 = true;
        }

        if (this.$route.params.typeAppareil[0] == "Famille 2 LEV2") {
            this.flag_famille2_lev2 = true;
            this.flag_Menu_famille2_lev2 = true;
            this.colorRenseignement_famille2_lev2 = true;
        }

        if (this.$route.params.typeAppareil[0] == "Famille 3 LEV3") {
            this.flag_famille3_lev3 = true;
            this.flag_Menu_famille3_lev3 = true;
            this.colorRenseignement_famille3_lev3 = true;
        }

        if (this.$route.params.typeAppareil[0] == "Famille 4 LEV4") {
            this.flag_famille4_lev4 = true;
            this.flag_Menu_famille4_lev4 = true;
            this.colorRenseignement_famille4_lev4 = true;
        }

        if (this.$route.params.typeAppareil[0] == "Famille 5 LEV5") {
            this.flag_famille5_lev5 = true;
            this.flag_Menu_famille5_lev5 = true;
            this.colorRenseignement_famille5_lev5 = true;
        }


        if (this.$route.params.typeAppareil[0] == "Famille AC1") {
            this.flag_famille_ac1 = false;
            this.flag_Menu_famille_ac1 = false;
            this.colorRenseignement_famille_ac1 = true;
        }

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
    background-color: #141293;
    color: white;
    padding: 10px;
}


.formulaire .content .right {
    display: flex;
    flex-direction: column;
}

.formulaire .content .right button {
    padding: 10px;
    color: white;
    margin: 3px;
    cursor: pointer;
    background-color: #1020e5;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    font-size: x-large;
    border: 0px;
}

.formulaire .content .right button:nth-child(1) {
    background-color: #1020e5;
}

.formulaire .content .right button:nth-child(1):hover {
    background-color: #040e81;
}

.formulaire .content .right button:nth-child(2) {
    background-color: #e98116;
}

.formulaire .content .right button:nth-child(2):hover {
    background-color: #a15304;
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