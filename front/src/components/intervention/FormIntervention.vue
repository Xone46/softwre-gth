<template>
    <div class="form-intervention">

        <!-- Button retour -->
        <div class="retour">
            <button @click="retour">
                <font-awesome-icon icon="list" />
                <span>Sites d'intervtion</span>
            </button>
        </div>

        <!-- Titre  -->
        <h3 v-if="interventionId == null">Création d'une nouvelle d'intervention</h3>
        <h3 v-else>Modification d'intervention</h3>

        <!-- start errors -->
        <ul v-if="flagError">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <!-- Fin errors -->


        <!-- Start from -->
        <div class="form">

            <label for="Date d'intervention">
                <h3>Date d'intervention : <span class="start" v-if="interventions.date.length == 0">*</span></h3>
                <input type="date" :value="interventions.date"
                    @input="event => interventions.date = event.target.value">
            </label>

            <label for="Numéro d'affaire">
                <h3>Numéro d'affaire : <span class="start" v-if="interventions.numeroAffaire.length == 0">*</span></h3>
                <input type="text" :value="interventions.numeroAffaire" @input="event => handelNumeroAffaire(event)">
            </label>


            <label for="Etablissement">
                <h3>Établissement (Siège social): <span class="start"
                        v-if="interventions.etablissement.length == 0">*</span></h3>
                <input type="text" :value="interventions.etablissement" @input="event => handelEtablissement(event)">
            </label>


            <label for="Adresse">
                <h3>Adresse (Siège social): <span class="start" v-if="interventions.adresse.length == 0">*</span></h3>
                <input type="text" :value="interventions.adresse" @input="event => handelAdresse(event)">
            </label>

            <label for="Code Postal">
                <h3>Code Postal (Siège social): <span class="start" v-if="interventions.codePostal.length == 0">*</span>
                </h3>
                <input type="text" :value="interventions.codePostal"
                    @input="event => interventions.codePostal = event.target.value">
            </label>

            <label for="Ville">
                <h3>Ville (Siège social): <span class="start" v-if="interventions.ville.length == 0">*</span></h3>
                <input type="text" :value="interventions.ville" @input="event => handelVille(event)">
            </label>

            <label for="Pays">
                <h3>Pays (Siège social): <span class="start" v-if="interventions.pays.length == 0">*</span></h3>
                <input type="text" :value="interventions.pays" @input="event => handelPays(event)">
            </label>

            <label for="Métier">
                <h3>Métier : <span class="start" v-if="interventions.metier.length == 0">*</span></h3>
                <select v-model="interventions.metier">
                    <option v-for="metier in metiers" :key="metier">{{ metier }}</option>
                </select>
            </label>

            <label for="Numéro d'affaire">
                <h3>Numéro de Site : <span class="start" v-if="interventions.site.length == 0">*</span></h3>
                <input type="number" :value="interventions.site" @input="event => handelSite(event)">
            </label>

            <label class="coordonnee" for="Coordonnée du site" v-if="interventions.site >= 2">
                <div v-for="(item, index) in Number(filterSite)" :key="item">
                    <h3>
                        <span>Coordonnée du site {{ index + 1 }} :</span>
                        <span class="start" v-if="interventions.site.length == 0">*</span>
                        <input type="text" :value="interventions.coordonnees[index]" @input="event => handelCoordonnee(event, index)">
                    </h3>
                </div>
            </label>
        </div>

        <button v-if="interventionId == null" class="valider" @click="valider">Valider</button>
        <button class="valider" @click="modifier" v-else>Modifier</button>

    </div>
</template>

<script>

import Interventions from "@/requests/Interventions"


export default {
    name: 'table-intervention',
    data() {
        return {

            flagError: false,
            errors: [],
            interventions: {
                date: "",
                numeroAffaire: "",
                site: 1,
                etablissement: "",
                repere: "",
                adresse: "",
                codePostal: "",
                ville: "",
                pays: "",
                metier: "",
                coordonnees: []
            },

            metiers: [
                // "Installations électriques",
                "Appareil de levage",
                "Accessoire de levage",
                // "Ascenseur et escalier mecanique",
                // "Appareil à pression",
                // "Machine et engin chantier",
                // "Bruit et eclairement",
                // "Incendie",
                // "Equipement de travail"
            ]
        }
    },

    props: {
        interventionId: String
    },

    components: {

    },

    methods: {

        handelNumeroAffaire(event) {
            this.interventions.numeroAffaire = String(event.target.value).toUpperCase();
        },

        handelEtablissement(event) {
            this.interventions.etablissement = String(event.target.value);
        },


        handelAdresse(event) {
            this.interventions.adresse = String(event.target.value);
        },

        handelVille(event) {
            this.interventions.ville = String(event.target.value).toUpperCase();
        },

        handelPays(event) {
            this.interventions.pays = String(event.target.value).toUpperCase();
        },

        handelSite(event) {
            this.interventions.coordonnees = [];
            for (let i = 0; i < event.target.value; i++) {
                this.interventions.coordonnees.push(null);
            }
            this.interventions.site = event.target.value;
        },

        handelCoordonnee(event, index) {
            this.interventions.coordonnees[index] = String(event.target.value).toUpperCase();
        },

        retour() {
            return this.$emit("close");
        },

        modifier() {

            if (this.interventions.numeroAffaire == "") {
                this.interventions.numeroAffaire = `GXXX|XXX|XXX|XXX|${this.interventions.etablissement}`;
            }

            Interventions.update(this.interventions, this.interventionId)
                .then(() => {
                    return this.$emit("table");
                })
                .catch((error) => {
                    this.errors = [];
                    this.flagError = true;
                    this.errors = error.response.data.errors;
                });
        },

        valider() {

            // check numero affaire is null or empty
            if (this.interventions.numeroAffaire == "") {
                this.interventions.numeroAffaire = `GXXX|XXX|XXX|XXX|${this.interventions.etablissement}`;
            }


            Interventions.create(this.interventions)
                .then(() => {
                    return this.$emit("table");
                })
                .catch((error) => {
                    this.errors = [];
                    this.flagError = true;
                    this.errors = error.response.data.errors;
                });
        }
    },

    computed: {

        filterSite: function () {
            const num = Number(this.interventions.site);
            return num;
        }

    },

    created() {

        if (this.interventionId != null) {
            Interventions.select(this.interventionId)
                .then((result) => {
                    this.interventions = result.data;
                    this.interventions.date = result.data.dateCreated.split('T')[0];
                    if (result.data.numeroAffaire.slice(0, 4) == 'GXXX') {
                        this.interventions.numeroAffaire = "";
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            this.interventions.site = 1;
        }
    }
}
</script>

<style scoped>

.form-intervention {
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.form-intervention .retour {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    padding: 0;
}

.form-intervention .retour button {
    padding: 0;
    margin: 0;
    width: 200px;
    height: 40px;
    color: hsl(0, 0%, 87%);
    border: 0px;
    border-radius: 5px;
    background-color: rgba(255, 0, 0, 0.637);
    cursor: pointer;
    font-size: larger;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
}

.form-intervention .retour button:hover {
    color: white;
    background-color: red;
}

.form-intervention h3 {
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
    font-size: larger;
}

.form-intervention ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.form-intervention label {
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.form-intervention label h3 {
    text-align: start;
    width: 300px;
    font-size: medium;
}

.form-intervention label input,
.form-intervention label select {
    height: 30px;
    width: 600px;
    padding-left: 3px;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0px;
    border-bottom: 1px solid rgb(52, 53, 53);
    background-color: #e9e8e8;
    outline: 0;
}

.form-intervention button {
    padding: 10px;
    width: 100px;
    height: 40px;
    color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0px;
    border-radius: 5px;
}

.valider {
    background-color: #04AA6D;
    cursor: pointer;
}

.valider:hover {
    background-color: #04aa6da8;
    cursor: pointer;
}

.reset {
    background-color: #f00e06;
    cursor: pointer;
}

.reset:hover {
    background-color: #f00e0698;
    cursor: pointer;
}

.start {
    color: red;
}


label.coordonnee {
    display: flex;
    flex-direction: column;
}

div.form {
    padding-left: 10px;
    padding-right: 10px;
    border-left: 1px solid #1020e5;
    border-right: 1px solid #1020e5;
}

</style>