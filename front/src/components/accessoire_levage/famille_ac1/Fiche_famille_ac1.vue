<template>
    <div>
        <div class="content" v-for="(item, index) in fiches" :key="index + 100">

            <h3 @click="displayFiche(index)"> Fiche de vérification N° :{{ item.verfication }}</h3>

            <table v-if="item.display">

                <tr>
                    <th>Description de l'accessoire</th>
                    <th><input type="text" :value="fiches[index]['description']" @input="saisirDescription(index, $event)"></th>
                </tr>

                <tr>
                    <td>Numéro interne</td>
                    <td><input type="text" :value="fiches[index]['numeroInterne']" @input="saisirNumeroInterne(index, $event)"></td>
                </tr>

                <tr>
                    <td>Localisation lors de la vérification</td>
                    <td><input type="text" :value="fiches[index]['localisation']" @input="saisirLocalisation(index, $event)"></td>
                </tr>

                <tr>
                    <td>Information complémentaire</td>
                    <td><input type="text" :value="fiches[index]['informationComplementaire']" @input="saisirInformationComplementaire(index, $event)"></td>
                </tr>

                <tr>
                    <td>Marque</td>
                    <td><input type="text" :value="fiches[index]['marque']" @input="saisirMarque(index, $event)"></td>
                </tr>

                <tr>
                    <td>Type</td>
                    <td><input type="text" :value="fiches[index]['type']" @input="saisirType(index, $event)"></td>
                </tr>

                <tr>
                    <td>N° de série</td>
                    <td><input type="text" :value="fiches[index]['numeroSerie']" @input="saisirNumeroSerie(index, $event)"></td>
                </tr>

                <tr>
                    <td>Année de mise en service</td>
                    <td><input type="text" :value="fiches[index]['anneeMiseService']" @input="saisirAnneeMiseService(index, $event)"></td>
                </tr>

                <tr>
                    <td>Charge maximale utile (CMU)</td>
                    <td><input type="text" :value="fiches[index]['chargeMaximaleUtile']" @input="saisirChargeMaximaleUtile(index, $event)"></td>
                </tr>

                <tr>
                    <td>Diamètre de câble ou pas de chaîne</td>
                    <td><input type="text" :value="fiches[index]['diametreCableChaine']" @input="saisirDiametreCableChaine(index, $event)"></td>
                </tr>

                <tr>
                    <td>Nombre de brins ou de points de préhension</td>
                    <td><input type="text" :value="fiches[index]['nombreBrins']" @input="saisirNombreBrins(index, $event)"></td>
                </tr>

                <tr>
                    <td>Longueur et/ou portée</td>
                    <td><input type="text" :value="fiches[index]['longueur']" @input="saisirLongueur(index, $event)"></td>
                </tr>

            </table>

            <table v-if="item.display">
                <tr>
                    <th>OBS. N°</th>
                    <th>OBSERVATIONS</th>
                    <th>SUITE DONNEE</th>
                    <th></th>
                </tr>
                <tr v-for="(o, j) in fiches[index]['observation']" :key="j + 200">
                    <td>
                        <input type="text" @input="saisirObs(index, j, $event)" :value="fiches[index]['observation'][j]['obs']">
                    </td>
                    <td>
                        <textarea @input="saisirObservation(index, j, $event)" :value="fiches[index]['observation'][j]['observation']" cols="30" rows="3"></textarea>
                    </td>
                    <td>
                        <input type="text" @input="saisirSuite(index, j, $event)" :value=" fiches[index]['observation'][j]['suite']">
                    </td>
                    <td>
                        <p @click="supprimerObservation(index, j)">supprimer</p>
                    </td>
                </tr>
            </table>

            <button v-if="item.display" @click="ajouterObservation(index)">Ajouter Observation</button>

            <div v-if="item.display">
                <div v-for="(v, k) in fiches[index]['conclusion']" :key="k + 300">
                    <input type="checkbox" @input="saisirConclusion(index, k, v.status)" :checked="fiches[index]['conclusion'][k]['status']" :value="fiches[index]['conclusion'][k]['status']" />
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
import Fiche from "@/requests/accessoire_levage/famille_ac1/Fiches"

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
        accessoires: Array,
        observateurId: String
    },

    components: {
        Insert
    },

    methods: {

        checkProperties(obj) {

            for(let i = 0; i < obj.length; i++) {

                    if(obj[i]["description"] == "") {
                        return false;
                    }

                    if(obj[i]["numeroInterne"] == "") {
                        return false;
                    }

                    if(obj[i]["localisation"] == "") {
                        return false;
                    }

                    if(obj[i]["informationComplementaire"] =="") {
                        return false;
                    }

                    if(obj[i]["marque"] == "") {
                        return false;
                    }

                    if(obj[i]["type"] == "") {
                        return false;
                    }

                    if(obj[i]["numeroSerie"] == "") {
                        return false;
                    }

                    if(obj[i]["anneeMiseService"] == "") {
                        return false;
                    }

                    if(obj[i]["chargeMaximaleUtile"] == "") {
                        return false;
                    }

                    if(obj[i]["diametreCableChaine"] == "") {
                        return false;
                    }

                    if(obj[i]["nombreBrins"] == "") {
                        return false;
                    }

                    if(obj[i]["longueur"] == "") {
                        return false;
                    }



            }

           return true;
        },

        notEmpty() {
            this.$emit("changeColorFiche_famille_ac1", this.checkProperties(this.fiches));
        },

        saisirObs(index, j, e) {
            this.fiches[index]["observation"][j]["obs"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirObservation(index, j, e) {
            this.fiches[index]["observation"][j]["observation"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirSuite(index, j, e) {
            this.fiches[index]["observation"][j]["suite"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirConclusion(index, j, value) {
            this.fiches[index]["conclusion"][j]["status"] = Boolean(!value);
            this.notEmpty();
            this.sauvegarde();
        },



        saisirDescription(index, e) {
            this.fiches[index]["description"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirNumeroInterne(index, e) {
            this.fiches[index]["numeroInterne"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirLocalisation(index, e) {
            this.fiches[index]["localisation"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirInformationComplementaire(index, e) {
            this.fiches[index]["informationComplementaire"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirMarque(index, e) {
            this.fiches[index]["marque"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirType(index, e) {
            this.fiches[index]["type"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirNumeroSerie(index, e) {
            this.fiches[index]["numeroSerie"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirAnneeMiseService(index, e) {
            this.fiches[index]["anneeMiseService"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirChargeMaximaleUtile(index, e) {
            this.fiches[index]["chargeMaximaleUtile"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirDiametreCableChaine(index, e) {
            this.fiches[index]["diametreCableChaine"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirNombreBrins(index, e) {
            this.fiches[index]["nombreBrins"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        saisirLongueur(index, e) {
            this.fiches[index]["longueur"] = e.target.value;
            this.notEmpty();
            this.sauvegarde();
        },

        displayFiche(index) {
            this.fiches[index]["display"] = !this.fiches[index]["display"];
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

        valider() {
            this.falgInsert = false;
        },

        annuler() {
            this.falgInsert = false;
        },

        reset() {
            Fiche.reset(this.observateurId)
                    .then(() => {
                        this.fiches = this.accessoires;
                        this.$emit("changeColorFiche_famille_ac1", this.checkProperties(this.fiches));
                        this.flagReset = false;
                })
                .catch((error) => {
                    console.log(error);
                });

        },


        sauvegarde() {

            Fiche.create(this.fiches, this.observateurId)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error);
            });

        },
    },

    created() {


        this.fiches = this.accessoires;

        Fiche.select(this.observateurId)
        .then((result) => {
            if(result.data) {
                this.fiches = result.data.fiches;
                this.$emit("changeColorFiche_famille_ac1", this.checkProperties(this.fiches));
                this.flagReset = true;
            }
        })
        .catch((error) => {
            console.log(error.message);
        });

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