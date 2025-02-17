<template>
    <div>
        <div class="descriptions">
            <table border="1">

                <tr>
                    <th>
                        FICHE N°
                    </th>
                    <th>
                        TYPE D'ACCESSOIRE
                    </th>
                    <th>
                        OBSERVATIONS
                    </th>
                    <th>
                        MISE A L'ARRET
                    </th>
                    <th>
                    </th>
                </tr>


                <tr v-for="(item , index) in accessoires" :key="index">
                    <td :class="[accessoires[index]['verfication'].length != 0 ? 'saved' : 'not-saved']">
                        {{ index + 1 }}
                    </td>
                    <td :class="[accessoires[index]['verfication'].length != 0 ? 'saved' : 'not-saved']">
                        Fiche de vérification N° : <input type="text" @input="saisirValue(index, 'verfication', $event)" :value="accessoires[index]['verfication']">
                    </td>
                    <td :class="[accessoires[index]['arret'].length != 0 ? 'saved' : 'not-saved']">
                        Voir fiche   
                    </td>
                    <td>
                        <select @input="saisirValue(index, 'arret', $event)" :value="accessoires[index]['arret']">
                            <option value=""></option>
                            <option value="Oui">Oui</option>
                            <option value="No">No</option>
                        </select>
                    </td>
                    <td>
                        <p @click="supprimer(index)">Supprimer</p>
                    </td>
                </tr>

            </table>
        </div>


        <div class="ajouter">
            <button @click="ajouter">Ajouter Accessoire</button>
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
import Accessoires from "@/requests/accessoire_levage/famille_ac1/Accessoires"

export default {
    name: 'renseignement-component',
    data() {
        return {
            counter_watched : 0,
            watched_sauvegarder : false,
            falgInsert: false,
            flagReset: false,
            accessoires: [],
        }
    },

    props: {
        observateurId: String
    },

    components: {
        Insert
    },

    watch: {
        accessoires: {
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

        valider() {
            this.falgInsert = false;
        },

        annuler() {
            this.falgInsert = false;
        },

        reset() {

            Accessoires.reset(this.observateurId)
                    .then(() => {

                        this.accessoires = [];
                        this.flagReset = true;
                        this.watched_sauvegarder = false;
                        this.$emit("changeColorAccessoire_famille_ac1", false);
                
                })
                .catch((error) => {
                    console.log(error);
                });

        },


        sauvegarde() {
            console.log(this.accessoires, this.observateurId)
            Accessoires.create(this.accessoires, this.observateurId)
            .then((result) => {
                console.log(result)
                    if(result) {
                        this.watched_sauvegarder = true;
                    }
            })
            .catch((error) => {
                console.log(error);
            });

        },

        checkProperties(obj) {

            for (let i = 0; i < obj.length; i++) {
                    if(obj[i]["verfication"] == "" || obj[i]["arret"] == "") {
                        return false;
                    }              
            }

            return true;
        },

        notEmpty() {
            this.$emit("changeColorAccessoire_famille_ac1", this.checkProperties(this.accessoires))
        },



        saisirValue(index, value, e) {
                this.accessoires[index][value] = e.target.value;
                this.notEmpty();
        },

        ajouter() {

            this.accessoires.push({
                "verfication" : "",
                "arret" : "",
                "description" : "",
                "numeroInterne" : "",
                "localistation" : "",
                "informationComplementaire" : "",
                "marque" : "",
                "type" : "",
                "numeroSerie" : "",
                "anneeMiseService" : "",
                "chargeMaximaleUtile" : "",
                "diametreCable" : "",
                "nombreBrins" : "",
                "longueur" : "",
                "observation" : [
                    { obs : "", observation : "", suite :"" }
                ],

                "conclusion" : [
                    {
                        text : "La vérification de l'état de conservation réalisé dans la limite de la présente mission n'ont pas fait apparaitre d'observation ni d'anomalie.",
                        status : false
                    },
                    {
                        text : "Observation(s) ne s'opposant pas à l'utilisation de l'accessoire.",
                        status : false
                    },
                    {
                        text : "Observation(s) ne permettant pas l'utilisation de l'accessoire.",
                        status : false
                    }
                ],

                "display" : false
            });

            this.$emit("sendAccessoires",  this.accessoires);
            this.notEmpty();
        },

        supprimer(index) {
            this.accessoires.splice(index, 1);
            this.notEmpty();
        }

    },

    created() {

        Accessoires.select(this.observateurId)
        .then((result) => {
            if(result.data.accessoires) {
                this.accessoires = result.data.accessoires;
                this.$emit("sendAccessoires",  this.accessoires);
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

.descriptions table {
    border-collapse: collapse;
    border: none;
    width: fit-content;
    margin-right: 10px;
}

tr {
    border-top: 1px solid black;
}

tr:first-child {
    border-top: none;
}

th {
    text-align: center;
    border: none !important;
    padding: 10px; 
}

td {
    text-align: start;
    border: none !important;
    padding: 10px; 
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

.ajouter {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.ajouter button {
    background-color: green;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}


.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}

</style>