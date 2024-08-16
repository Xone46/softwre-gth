<template>
    <div>
        <div class="content" v-for="(item, index) in fiches" :key="index + 100">

            <h3 @click="displayFiche(index)"> Fiche de vérification N° : {{ item.verfication }}</h3>

            <table v-if="item.display">

                <tr>
                    <th>Description de l'accessoire</th>
                    <th><input type="text" @input="saisirDescription(index, $event)"></th>
                </tr>

                <tr>
                    <td>Numéro interne</td>
                    <td><input type="text" @input="saisirNumeroInterne(index, $event)"></td>
                </tr>

                <tr>
                    <td>Localisation lors de la vérification</td>
                    <td><input type="text" @input="saisirLocalisation(index, $event)"></td>
                </tr>

                <tr>
                    <td>Information complémentaire</td>
                    <td><input type="text" @input="saisirInformationComplementaire(index, $event)"></td>
                </tr>

                <tr>
                    <td>Marque</td>
                    <td><input type="text" @input="saisirMarque(index, $event)"></td>
                </tr>

                <tr>
                    <td>Type</td>
                    <td><input type="text" @input="saisirType(index, $event)"></td>
                </tr>

                <tr>
                    <td>N° de série</td>
                    <td><input type="text" @input="saisirNumeroSerie(index, $event)"></td>
                </tr>

                <tr>
                    <td>Année de mise en service</td>
                    <td><input type="text" @input="saisirAnneeMiseService(index, $event)"></td>
                </tr>

                <tr>
                    <td>Charge maximale utile (CMU)</td>
                    <td><input type="text" @input="saisirChargeMaximaleUtile(index, $event)"></td>
                </tr>

                <tr>
                    <td>Diamètre de câble ou pas de chaîne</td>
                    <td><input type="text" @input="saisirDiametreCableChaine(index, $event)"></td>
                </tr>

                <tr>
                    <td>Nombre de brins ou de points de préhension</td>
                    <td><input type="text" @input="saisirNombreBrins(index, $event)"></td>
                </tr>

                <tr>
                    <td>Longueur et/ou portée</td>
                    <td><input type="text" @input="saisirLongueur(index, $event)"></td>
                </tr>

            </table>

            <table v-if="item.display">
                <tr>
                    <th>OBS. N°</th>
                    <th>OBSERVATIONS</th>
                    <th>SUITE DONNEE</th>
                    <th></th>
                </tr>
                <tr v-for="(o, j) in item.observation" :key="j + 200">
                    <td>
                        <input type="text" v-model="o.obs">
                    </td>
                    <td>
                        <textarea name="" v-model="o.observation" cols="30" rows="3"></textarea>
                    </td>
                    <td>
                        <input type="text" v-model="o.suite">
                    </td>
                    <td>
                        <p @click="supprimerObservation(index, j)">supprimer</p>
                    </td>
                </tr>
            </table>

            <button v-if="item.display" @click="ajouterObservation(index)">Ajouter Observation</button>

            <div v-if="item.display">
                <div v-for="(v, k) in item.conclusion" :key="k + 300">
                    <input type="checkbox" v-model="v.status" />
                    <label>{{ v.text }}</label>
                </div>
            </div>

        </div>

        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>

        <Insert v-if="falgInsert" :typeInsert="typeInsert" @valider="valider" @annuler="annuler" />

    </div>
</template>

<script>


import Insert from "@/components/models/Insert.vue"
// import Renseignement from "@/requests/accessoire_levage/famille_ac1/Renseignements"
// import Completed from "@/requests/accessoire_levage/famille_ac1/Completed"
// import Observateurs from "@/requests/Observateurs";
export default {
    name: 'renseignement-component',
    data() {
        return {

            falgInsert: false,
            flagReset: false,

            renseignementId: null,
            fiches : []
        }
    },

    props: {
        accessoires: Array
    },

    components: {
        Insert
    },

    methods: {

        checkProperties(obj) {
            for (let i = 0; i < obj.length; i++) {

                for (const [key] of Object.entries(obj[i])) {

                    if(key == "observation") {
                        for(let j = 0; j < obj[i]["observation"].length; j++) {

                            for (const [key, value] of Object.entries(obj[i]["observation"][j])) {
                                    if(value == "") {
                                        console.log(key)
                                        return false;
                                    }
                            }

                        }
                    }

                    if(key == "conclusion") {
                        for(let j = 0; j < obj[i]["conclusion"].length; j++) {
                            for (const [key, value] of Object.entries(obj[i]["conclusion"][j])) {
                                    if(value == "") {
                                        console.log(key)
                                        return false;
                                    }
                            }
                        }
                    }
                }

                console.log("---------------------------")
            }
            // return true;
        },

        notEmpty() {
            this.$emit("changeColorFiche_famille_ac1", this.checkProperties(this.fiches))
        },

        saisirDescription(index, e) {
            this.fiches[index]["description"] = e.target.value;
            this.notEmpty();
        },

        saisirNumeroInterne(index, e) {
            this.fiches[index]["numeroInterne"] = e.target.value;
            this.notEmpty();
        },

        saisirLocalisation(index, e) {
            this.fiches[index]["localisation"] = e.target.value;
            this.notEmpty();
        },

        saisirInformationComplementaire(index, e) {
            this.fiches[index]["informationComplementaire"] = e.target.value;
            this.notEmpty();
        },

        saisirMarque(index, e) {
            this.fiches[index]["marque"] = e.target.value;
            this.notEmpty();
        },

        saisirType(index, e) {
            this.fiches[index]["type"] = e.target.value;
            this.notEmpty();
        },

        saisirNumeroSerie(index, e) {
            this.fiches[index]["numeroSerie"] = e.target.value;
            this.notEmpty();
        },

        saisirAnneeMiseService(index, e) {
            this.fiches[index]["anneeMiseService"] = e.target.value;
            this.notEmpty();
        },

        saisirChargeMaximaleUtile(index, e) {
            this.fiches[index]["chargeMaximaleUtile"] = e.target.value;
            this.notEmpty();
        },

        saisirDiametreCableChaine(index, e) {
            this.fiches[index]["diametreCableChaine"] = e.target.value;
            this.notEmpty();
        },

        saisirNombreBrins(index, e) {
            this.fiches[index]["nombreBrins"] = e.target.value;
            this.notEmpty();
        },

        saisirLongueur(index, e) {
            this.fiches[index]["longueur"] = e.target.value;
            this.notEmpty();
        },

        displayFiche(index) {
            this.fiches[index]["display"] = !this.fiches[index]["display"];
            this.notEmpty();
        },

        supprimerObservation(index, j) {
            this.fiches[index]["observation"].splice(j, 1);
        },

        ajouterObservation(index) {
            this.fiches[index]["observation"].push({
              obs : "",
              observation : "",
               suite :""
            });
        },

        sauvegarde() {

        },

        reset() {

        }
    },

    created() {
        this.fiches = this.accessoires;
    }
}
</script>

<style scoped>

.content h3 {
    cursor: pointer;
}

.sauvegarde {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.sauvegarde button {
    background-color: #ff6a00;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.reset {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.reset button {
    background-color: #aa1704;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}


td:nth-child(2) {
    display: flex;
    flex-direction: column;
}

.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}



</style>