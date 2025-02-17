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

        <div class="sauvegarder">
            <button :class="[watched_sauvegarder == true ? 'watch' : 'not-watch']" @click="sauvegarde">
                {{ watched_sauvegarder == true ? "Enregistré" : "Non enregistré" }}
            </button>
        </div>

       <div class="reset">
            <button @click="reset">Initialiser</button>
        </div>

        <Insert v-if="falgInsert" :typeInsert="typeInsert" @valider="valider" @annuler="annuler" />

    </div>
</template>

<script>

import Insert from "@/components/models/Insert.vue"
import Fiche from "@/requests/accessoire_levage/famille_ac1/Fiches"
import Accessoire from "@/requests/accessoire_levage/famille_ac1/Accessoires"

export default {
    name: 'renseignement-component',
    data() {
        return {

            counter_watched : 0,
            watched_sauvegarder: false,
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

    watch: {
        fiches: {
            handler(){
                const count = this.counter_watched++;
                if(count != 0 && count != 1) {
                    this.watched_sauvegarder = false;
                }
            },
            deep: true
        }
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
        },

        saisirObservation(index, j, e) {
            this.fiches[index]["observation"][j]["observation"] = e.target.value;
            this.notEmpty();
        },

        saisirSuite(index, j, e) {
            this.fiches[index]["observation"][j]["suite"] = e.target.value;
            this.notEmpty();
        },

        saisirConclusion(index, j, value) {
            this.fiches[index]["conclusion"][j]["status"] = Boolean(!value);
            this.notEmpty();
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
            console.log(this.fiches[index])
            this.fiches[index]["display"] = Boolean(!this.fiches[index]["display"]);
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
                        this.watched_sauvegarder = false;
                        this.flagReset = true;
                        this.$emit("changeColorFiche_famille_ac1", this.checkProperties(this.fiches));
                })
                .catch((error) => {
                    console.log(error);
                });

        },


        sauvegarde() {

            Fiche.create(this.fiches, this.observateurId)
            .then((result) => {
                if(result) {
                    this.watched_sauvegarder = true;
                }
            })
            .catch((error) => {
                console.log(error);
            });

        },
    },

    created() {

        Fiche.select(this.observateurId)
        .then((result) => {
            if(result.data == null) {  

                Accessoire.select(this.observateurId)
                .then((result) => {
                    this.fiches = result.data.accessoires;
                    this.watched_sauvegarder = false;
                    return this.notEmpty();
                })
                .catch((error) => {
                    console.log(error);

                });

            } else {
                this.fiches = result.data.fiches;
                this.watched_sauvegarder = true;
                return this.notEmpty();
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

.watch {
    background-color: green;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 100px;
}

.not-watch {
    background-color: red;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 100px;
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
    background-color: red;
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