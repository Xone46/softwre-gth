<template>
    <div class="menu">
        <table>
            <tr>

                <th class="green" v-if="colorRenseignement_famille1_lev1" @click="renseignement">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>RENSEIGNEMENTS GENERAUX</span>
                    </div>
                </th>

                <th v-if="!colorRenseignement_famille1_lev1" @click="renseignement">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>RENSEIGNEMENTS GENERAUX</span>
                    </div>
                </th>


                <th class="green" v-if="colorDescription_famille_lev1" @click="description">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>DESCRIPTION DE L'APPAREIL VERIFIE</span>
                    </div>
                </th>
                <th v-if="!colorDescription_famille_lev1" @click="description">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>DESCRIPTION DE L'APPAREIL VERIFIE</span>
                    </div>
                </th>


                <th class="green" v-if="colorExamen_famille1_lev1" @click="examen">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>EXAMEN ET ESSAIS DE L'APPAREIL</span>
                    </div>
                </th>
                <th v-if="!colorExamen_famille1_lev1" @click="examen">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>EXAMEN ET ESSAIS DE L'APPAREIL</span>
                    </div>
                </th>

                <th class="green" v-if="colorConclusion_famille1_lev1" @click="conclusion">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>CONCLUSION</span>
                    </div>
                </th>
                <th v-if="!colorConclusion_famille1_lev1" @click="conclusion">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>CONCLUSION</span>
                    </div>
                </th>


                <th class="green" v-if="colorPhoto_famille1_lev1" @click="photo">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>PHOTO</span>
                    </div>
                </th>
                <th v-if="!colorPhoto_famille1_lev1" @click="photo">
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


// import Renseignements from "@/requests/appareil_levage/famille1_lev1/Renseignement";
// import Descriptions from "@/requests/appareil_levage/famille1_lev1/Descriptions";
// import Examens from "@/requests/appareil_levage/famille1_lev1/Examens";
// import Photos from "@/requests/appareil_levage/famille1_lev1/Photos";
// import Conclusions from "@/requests/appareil_levage/famille1_lev1/conclusion";


export default {
    name: 'menu-component',
    data() {
        return {
        }
    },

    components: {
    },

    props: {
        observateurId: String,
        renseignementChicked : Boolean,
        colorRenseignement_famille1_lev1 : Boolean,
        colorDescription_famille_lev1 : Boolean,
        colorExamen_famille1_lev1 : Boolean,
        colorConclusion_famille1_lev1 : Boolean,
        colorPhoto_famille1_lev1 : Boolean
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


        // Renseignements.select(this.observateurId)
        //     .then((result) => {
        //         if(result.data) {
        //             this.flagRenseignementsColor = result.data.checkEmptyStatus;
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });


        // Descriptions.select(this.observateurId)
        //     .then((result) => {
        //         if (result.data) {
        //             this.flagDescriptionColor = result.data.checkEmptyStatus;
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });


        // Examens.select(this.observateurId)
        //     .then((result) => {
        //         if (result.data) {
        //             this.flagExamenColor = result.data.checkEmptyStatus;
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // Photos.select(this.observateurId)
        //     .then((result) => {
        //         if (result.data.img != null) {
        //             this.flagPhotoColor = true;
        //         }

        //         if (result.data.img == null) {
        //             this.flagPhotoColor = false;
        //         } 
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // Conclusions.select(this.observateurId)
        //     .then((result) => {
        //         if (result.data) {
        //             this.flagConclusionColor = true;
        //         } else {
        //             this.flagConclusionColor = false;
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });


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
</style>