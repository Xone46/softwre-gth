<template>
    <div class="menu">
        <table>
            <tr>
                <th class="green" v-if="flagRenseignementsColor" @click="renseignement">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>RENSEIGNEMENTS GENERAUX ET ADMINISTRATIFS</span>
                    </div>
                </th>
                <th v-if="!flagRenseignementsColor" @click="renseignement">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>RENSEIGNEMENTS GENERAUX ET ADMINISTRATIFS</span>
                    </div>
                </th>


                <th class="green" v-if="flagDescriptionColor" @click="description">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>EXAMEN DE L'APPAREIL OU DE L'ÉTAT DE CONSERVATION</span>
                    </div>
                </th>
                <th v-if="!flagDescriptionColor" @click="descriptionLevageA">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>EXAMEN DE L'APPAREIL OU DE L'ÉTAT DE CONSERVATION</span>
                    </div>
                </th>


                <th class="green" v-if="flagExamenColor" @click="examen">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>EXAMEN DE L'APPAREIL OU DE L'ÉTAT DE CONSERVATION</span>
                    </div>
                </th>
                <th v-if="!flagExamenColor" @click="examenLevageA">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>EXAMEN DE L'APPAREIL OU DE L'ÉTAT DE CONSERVATION</span>
                    </div>
                </th>

                <th class="green" v-if="flagExamenColor" @click="examen">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>LISTE DES ACCESSOIRES VERIFIES</span>
                    </div>
                </th>
                <th v-if="!flagExamenColor" @click="examen">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>LISTE DES ACCESSOIRES VERIFIES</span>
                    </div>
                </th>


                <th class="green" v-if="flagConclusionColor" @click="conclusion">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>CONCLUSION</span>
                    </div>
                </th>
                <th v-if="!flagConclusionColor" @click="conclusion">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>CONCLUSION</span>
                    </div>
                </th>


                <th class="green" v-if="flagPhotoColor" @click="photo">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>PHOTO</span>
                    </div>
                </th>
                <th v-if="!flagPhotoColor" @click="photo">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>PHOTO</span>
                    </div>
                </th>

            </tr>
        </table>
    </div>
</template>

<script>

import Renseignements from "@/requests/appareil_levage/famille1_lev1/Renseignement";
import Descriptions from "@/requests/appareil_levage/famille1_lev1/Descriptions";
import Examens from "@/requests/appareil_levage/famille1_lev1/Examens";
import Photos from "@/requests/appareil_levage/famille1_lev1/Photos";
import Conclusions from "@/requests/appareil_levage/famille1_lev1/conclusion";

export default {
    name: 'menu-component',
    data() {
        return {

            flagRenseignementsColor: false,
            flagDescriptionColor: false,
            flagExamenColor: false,
            flagPhotoColor: false,
            flagConclusionColor: false
        }
    },

    components: {
    },

    props: {
        observateurId: String,
        renseignementChicked : Boolean
    },

    methods: {

        renseignement() {

            this.$emit("renseignement");
        },

        description() {
            this.$emit("description")
        },

        examen() {
            this.$emit("examen")
        },

        conclusion() {
            this.$emit("conclusion")
        },

        photo() {
            this.$emit("photo")
        }
    },


    created() {

        Renseignements.select(this.observateurId)
            .then((result) => {
                if(result.data) {
                    this.flagRenseignementsColor = result.data.checkEmptyStatus;
                }
            })
            .catch((error) => {
                console.log(error);
            });


        Descriptions.select(this.observateurId)
            .then((result) => {
                if (result.data) {
                    this.flagDescriptionColor = result.data.checkEmptyStatus;
                }
            })
            .catch((error) => {
                console.log(error);
            });


        Examens.select(this.observateurId)
            .then((result) => {
                if (result.data) {
                    this.flagExamenColor = result.data.checkEmptyStatus;
                }
            })
            .catch((error) => {
                console.log(error);
            });

        Photos.select(this.observateurId)
            .then((result) => {
                
                if (result.data.img != null) {
                    this.flagPhotoColor = true;
                }

                if (result.data.img == null) {
                    this.flagPhotoColor = false;
                } 
            })
            .catch((error) => {
                console.log(error);
            });

        Conclusions.select(this.observateurId)
            .then((result) => {
                if (result.data) {
                    this.flagConclusionColor = true;
                } else {
                    this.flagConclusionColor = false;
                }
            })
            .catch((error) => {
                console.log(error);
            });


    }
}
</script>

<style scoped>
.menu {
    margin-top: 10px;
    margin-bottom: 10px;
}

.menu {
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
}

table {
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
}

table>tr>th {
    cursor: pointer;
}

table>tr>th>div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

table>tr>th>div>img {
    width: 30px;
}
table>tr>th>div>span {
    font-size: 12px;
}

table>tr>th>div>img:hover {
    width: 40px;
    transition: 0.3s;
}
</style>@/requests/appareil_levage/famille1_lev1/Descriptions@/requests/appareil_levage/famille1_lev1/conclusion