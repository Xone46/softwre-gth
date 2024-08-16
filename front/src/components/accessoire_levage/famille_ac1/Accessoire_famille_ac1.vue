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
                        <select @input="saisirValue(index, 'arret', $event)">
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
            accessoires: [],
            renseignementId: null
        }
    },

    props: {
        observateurId: String
    },

    components: {
        Insert
    },

    methods: {

        valider() {
            this.falgInsert = false;
        },

        annuler() {
            this.falgInsert = false;
        },

        reset() {

        },

        sauvegarde() {

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
            this.$emit("sendAccessoires",  this.accessoires);
            this.notEmpty();

        }

    },

    created() {


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