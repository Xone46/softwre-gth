<template>
    <div class="terminer">
        <button @click="terminer">
            <font-awesome-icon icon="thumbs-up" class="thumbs-up" />
            Terminer
        </button>
    </div>
</template>

<script>

// import FamilleCompletedOneLevOne from "@/requests/appareil_levage/famille1_lev1/completed"
// import FamilleCompletedTowLevTow from "@/requests/appareil_levage/famille2_lev2/completed"
// import FamilleCompletedTreeLevTree from "@/requests/appareil_levage/famille3_lev3/completed"
// import FamilleCompletedFourLevFour from "@/requests/appareil_levage/famille4_lev4/completed"
// import FamilleCompletedFiveLevFive from "@/requests/appareil_levage/famille5_lev5/completed"
import Observateurs from "@/requests/Observateurs"

export default {
    name: 'terminer-component',
    data() {
        return {
        }
    },

    props: {
        observateurId: String,
        typeAppareil: Array
    },

    methods: {

        terminer() {

            Observateurs.terminer(this.observateurId)
                .then((result) => {

                    if (result.data.msg == true) {
                        // const index = this.observateurs.findIndex((el) => el._id == this.observateursSelect[0]);
                        // this.observateurs[index].etat = true;
                        alert("Le contrôle est entièrement terminé. Merci !!!!");
                        this.$router.push("/interventions").catch(() => { });

                    }

                    if (result.data.msg == false) {
                        alert("Le contrôle n'est pas entièrement terminé. Veuillez examiner toutes les entrées.")
                        
                    }

                })
                .catch((error) => {
                    this.flagInvertesment = true;
                    this.msgInvertesment = error.response.data.msg;
                });   
        },

        // handelObservateursSelect(observateurId, typeAppareil) {


        //     if (typeAppareil == "Famille 1 LEV1") {

        //         FamilleCompletedOneLevOne.checkRenseignement(observateurId)
        //             .then((result) => {
        //                 console.log(result)
        //                 if (result.data == true) {
        //                     this.flagTerminer = true;
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             });
        //     }

        //     if (typeAppareil == "Famille 2 LEV2") {

        //         FamilleCompletedTowLevTow.checkRenseignement(observateurId)
        //             .then((result) => {
        //                 if (result.data == true) {
        //                     this.flagTerminer = true;
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             });
        //     }

        //     if (typeAppareil == "Famille 3 LEV3") {

        //         FamilleCompletedTreeLevTree.checkRenseignement(observateurId)
        //             .then((result) => {
        //                 if (result.data == true) {
        //                     this.flagTerminer = true;
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             });
        //     }

        //     if (typeAppareil == "Famille 4 LEV4") {

        //         FamilleCompletedFourLevFour.checkRenseignement(observateurId)
        //             .then((result) => {
        //                 if (result.data == true) {
        //                     this.flagTerminer = true;
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             });
        //     }

        //     if (typeAppareil == "Famille 5 LEV5") {

        //         FamilleCompletedFiveLevFive.checkRenseignement(observateurId)
        //             .then((result) => {
        //                 if (result.data == true) {
        //                     this.flagTerminer = true;
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(error)
        //             });
        //     }
        // }
    },

    created() {
        // this.handelObservateursSelect(this.observateurId, this.typeAppareil[0])
    }


}
</script>


<style scoped>

.terminer {
    width : 100%;
    height: inherit;
    padding: 0;
    margin: 0;
}

.terminer button {
    color: white;
    width : 100%;
    height : auto;
    border: 0;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
    font-size: medium;
    text-align: left;
    background-color: #74C365;
}


.terminer button:hover {
    background-color: green;
}

</style>