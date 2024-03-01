<template>
    <div class="formulaire">
        <!-- <h3>{{ formulaire.observateurId }}</h3> -->
        <h3>{{ formulaire.categorieAppareil }}</h3>

        <div class="buttons">
            <button>Liste des interventions</button>
            <button>Visualisation des observations</button>
        </div>


        <table class="menu">
            <tr>
                <th class="green" v-if="flagRenseignementsColor" @click="renseignement()">RENSEIGNEMENTS GENERAUX</th>
                <th v-if="!flagRenseignementsColor" @click="renseignement()">RENSEIGNEMENTS GENERAUX</th>

                <th class="green" v-if="flagDescriptionColor" @click="description()">DESCRIPTION DE L'APPAREIL VERIFIE</th>
                <th v-if="!flagDescriptionColor" @click="description()">DESCRIPTION DE L'APPAREIL VERIFIE</th>

                <th class="green" v-if="flagExamenColor" @click="examen()">EXAMENS ET ESSAIS DE L'APPAREIL</th>
                <th v-if="!flagExamenColor" @click="examen()">EXAMENS ET ESSAIS DE L'APPAREIL</th>

                <th class="green" v-if="flagConclusionColor" @click="conclusion()">CONCLUSION</th>
                <th v-if="!flagConclusionColor" @click="conclusion()">CONCLUSION</th>

                <th class="green" v-if="flagPhotoColor" @click="photo()">PHOTO</th>
                <th v-if="!flagPhotoColor" @click="photo()">PHOTO</th>

            </tr>
        </table>

        <div class="content" >

            <Renseignement v-if="flagRenseignements" :observateurId="formulaire.observateurId"/>
            <Description v-if="flagDescription" :observateurId="formulaire.observateurId"/>
            <Examen v-if="flagExamen" :observateurId="formulaire.observateurId"/>
            <Photo v-if="flagPhoto" :observateurId="formulaire.observateurId"/>
            <Conclusion v-if="flagConclusion" :observateurId="formulaire.observateurId"/>

        </div>

    </div>
</template>
  
<script>
import Renseignement from "@/components/renseignement/Renseignement"
import Description from "@/components/renseignement/Description.vue"
import Examen from "@/components/renseignement/Examen.vue"
import Photo from "@/components/renseignement/Photo.vue"
import Conclusion from "@/components/renseignement/Conclusion.vue"

import Renseignements from "@/requests/Renseignement";
import Descriptions from "@/requests/Descriptions";
import Examens from "@/requests/Examens";
import Photos from "@/requests/Photos";
import Conclusions from "@/requests/conclusion";

export default {
    name: 'FormulaireView',
    data() {
        return {
            flagRenseignements : false,
            flagDescription : false,
            flagExamen : false,
            flagPhoto : false,
            flagConclusion : false,
            formulaire : {
                observateurId : "",
                categorieAppareil : ""
            },
            flagRenseignementsColor : false,
            flagDescriptionColor : false,
            flagExamenColor : false,
            flagPhotoColor : false,
            flagConclusionColor : false,

        }
    },

    components: {
        Renseignement,
        Description,
        Examen,
        Photo,
        Conclusion
    },

    methods: {
        
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

        Renseignements.select(this.formulaire.observateurId)
        .then((result) => {
            if(result.data != null) {
                this.flagRenseignementsColor = true;
            }
        })
        .catch((error) => {
            console.log(error);
        });

        
        Examens.select(this.formulaire.observateurId)
        .then((result) => {
            if(result.data != null) {
                this.flagExamenColor = true;
            }
        })
        .catch((error) => {
            console.log(error);
        });
        
        Descriptions.select(this.formulaire.observateurId)
        .then((result) => {
            if(result.data != null) {
                this.flagDescriptionColor = true;
            }
        })
        .catch((error) => {
            console.log(error);
        });

        Photos.select(this.formulaire.observateurId)
        .then((result) => {
            if(result.data != null) {
                this.flagPhotoColor = true;
            }
        })
        .catch((error) => {
            console.log(error);
        });

        Conclusions.select(this.formulaire.observateurId)
        .then((result) => {
            if(result.data != null) {
                this.flagConclusionColor = true;
            }
        })
        .catch((error) => {
            console.log(error);
        });


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

menu,
th {
    border: 1px solid black;
    color: red;
    border-collapse: collapse;
    padding: 10px;
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

.green {
    color: #04AA6D;
    
}



</style>