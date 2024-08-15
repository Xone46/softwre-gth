<template>
    <div class="menu">
        <table>
            <tr>
                <th class="green" v-if="colorRenseignement_famille_ac1" @click="renseignement">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>RENSEIGNEMENTS GENERAUX ET ADMINISTRATIFS</span>
                    </div>
                </th>
                <th v-if="!colorRenseignement_famille_ac1" @click="renseignement">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>RENSEIGNEMENTS GENERAUX ET ADMINISTRATIFS</span>
                    </div>
                </th>


                <th class="green" v-if="flagAccessoireColor" @click="accessoire">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>LISTE DES ACCESSOIRES VERIFIES</span>
                    </div>
                </th>
                <th v-if="!flagAccessoireColor" @click="accessoire">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>LISTE DES ACCESSOIRES VERIFIES</span>
                    </div>
                </th>


                <th class="green" v-if="flagFicheColor" @click="fiche">
                    <div>
                        <img src="@/assets/mark.png" alt="pencil">
                        <span>FICHES DE VÉRIFICATIONS</span>
                    </div>
                </th>
                <th v-if="!flagFicheColor" @click="fiche">
                    <div>
                        <img src="@/assets/pencil.png" alt="pencil">
                        <span>FICHES DE VÉRIFICATIONS</span>
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

// import Accessoires from "@/requests/accessoire_levage/famille_ac1/Accessoires";
// import Photos from "@/requests/accessoire_levage/famille_ac1/Photos";
// import Fiches from "@/requests/accessoire_levage/famille_ac1/Fiches";
// import Renseignements from "@/requests/accessoire_levage/famille_ac1/Renseignements";

export default {
    name: 'menu-component',
    data() {
        return {
            flagAccessoireColor: false,
            flagFicheColor: false,
            flagPhotoColor: false,
            flagRenseignementsColor: false,
            // flagVerficationColor: false,
        }
    },

    components: {
    },

    props: {
        observateurId: String,
        renseignementChicked : Boolean,
        colorRenseignement_famille_ac1 : Boolean
    },

    methods: {

        renseignement() {

            this.$emit("renseignement");
        },

        accessoire() {
            this.$emit("accessoire")
        },

        fiche() {
            this.$emit("fiche")
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



        // Accessoires.select(this.observateurId)
        //     .then((result) => {
        //         if (result.data) {
        //             this.flagAccessoireColor = result.data.checkEmptyStatus;
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });


        // Fiches.select(this.observateurId)
        //     .then((result) => {
                
        //         if (result.data.img != null) {
        //             this.flagFicheColor = true;
        //         }

        //         if (result.data.img == null) {
        //             this.flagPhotoColor = false;
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