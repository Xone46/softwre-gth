<template>
    
    <div class="descriptions">

        <table>
            <tr>
                <td>B-1</td>
                <td :class="[description.marquage != null ? 'saved' : 'not-saved']">MARQUAGE</td>
                <td>

                    <label for="CE">
                        CE
                        <input type="radio" value="CE" v-model="description.marquage">
                    </label>

                    <label for="Absence de marquage">
                        Absence de marquage
                        <input type="radio" value="Absence de marquage" v-model="description.marquage">
                    </label>

                </td>
            </tr>

            <tr>
                <td>B-2</td>
                <td :class="[description.modeDeLevage != null ? 'saved' : 'not-saved']">MODE DE LEVAGE</td>
                <td>
                    <label for="CE">
                        Unique
                        <input type="radio" value="Unique" v-model="description.modeDeLevage">
                    </label>

                    <label for="CE">
                        Multiples indépendants
                        <input type="radio" value="Multiples indépendants" v-model="description.modeDeLevage">
                    </label>

                    <label for="CE">
                        Multiples synchronisés
                        <input type="radio" value="Multiples synchronisés" v-model="description.modeDeLevage">
                    </label>

                </td>
            </tr>

            <tr>
                <td>B-3</td>
                <td :class="[(description.caracteristiques.caracteristiques != '' && description.caracteristiques.hauteurDeLevage != '' && description.caracteristiques.portee != '' && description.caracteristiques.porteFaux != '' && description.caracteristiques.longueurDuCheminDeRoulement != '' && description.caracteristiques.suspentes != '' && description.caracteristiques.mouflage != '' && description.caracteristiques.diametre != '') ? 'saved' : 'not-saved']">CARACTERISTIQUES DIMENSIONNELLES ET DE CHARGE</td>
                <td>
                    <label for="Charge maximale utile (kg) :">
                        Charge maximale utile (kg) :
                        <input type="text" v-model="description.caracteristiques.caracteristiques">
                    </label>

                    <label for="Hauteur de levage (m) :">
                        Hauteur de levage (m) :
                        <input type="text" v-model="description.caracteristiques.hauteurDeLevage">
                    </label>

                    <label for="Portée (m) :">
                        Portée (m) :
                        <input type="text" v-model="description.caracteristiques.portee">
                    </label>

                    <label for="Porte a faux (m):">
                        Porte a faux (m):
                        <input type="text" v-model="description.caracteristiques.porteFaux">
                    </label>

                    <label for="Longueur du chemin de roulement (m):">
                        Longueur du chemin de roulement (m):
                        <input type="text" v-model="description.caracteristiques.longueurDuCheminDeRoulement">
                    </label>

                    <label
                        for="Suspentes de levage :">
                        <span>Suspentes de levage</span>
                        <select v-model="description.caracteristiques.suspentes">
                            <option v-for="item in suspentesTable" :key="item.id">{{ item.titre }}</option>
                        </select>
                        <input v-if="description.caracteristiques.suspentes != ''" type="text" v-model="description.caracteristiques.suspentesAutre">
                    </label>


                    <label for="Mouflage (nombre de brins)">
                        <span>Mouflage (nombre de brins) : </span>
                        <input type="text" v-model="description.caracteristiques.mouflage">
                    </label>

                    <label for="Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm) :">
                        <span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm):  </span>
                        <input type="text" v-model="description.caracteristiques.diametre">
                    </label>

                </td>
            </tr>

            <tr>
                <td>B-4</td>
                <td :class="[description.levageAuxiliaire.sansObjet == 'Sans objet' || description.levageAuxiliaire.avecObjet == 'Avec objet' ? 'saved' : 'not-saved']">LEVAGE AUXILIAIRE</td>
                <td>
                    <label for="Sans objet">
                        Sans objet
                        <input type="radio" name="levageAuxiliaire" value="Sans objet" @change="statuslevageAuxiliaireSansObjet" v-model="description.levageAuxiliaire.sansObjet" :checked="description.levageAuxiliaire.sansObjet == 'Sans Objet'">
                        Avec objet
                        <input type="radio" name="levageAuxiliaire" value="Avec objet" @change="statuslevageAuxiliaireAvecObjet"  v-model="description.levageAuxiliaire.avecObjet" :checked="description.levageAuxiliaire.avecObjet == 'Avec Objet'">
                    </label>

                    <label v-if="description.levageAuxiliaire.avecObjet == 'Avec Objet' && description.levageAuxiliaire.sansObjet == ''" for="Charge maximale utile de chaque palan (kg)">
                        Charge maximale utile de chaque palan (kg) : 
                        <input type="text" v-model="description.levageAuxiliaire.chargeMaximaleUtileDeChaquePalan">
                    </label>

                    <label v-if="description.levageAuxiliaire.avecObjet == 'Avec Objet' && description.levageAuxiliaire.sansObjet == ''" for="Suspentes de levage :">
                        <span>Suspentes de levage</span>
                        <select v-model="description.levageAuxiliaire.suspentes">
                            <option v-for="item in suspentesTable" :key="item.id">{{ item.titre }}</option>
                        </select>
                        <input v-if="description.levageAuxiliaire.suspentes != ''" type="text" v-model="description.levageAuxiliaire.suspentesAutre">
                    </label>

                    <label v-if="description.levageAuxiliaire.avecObjet == 'Avec Objet' && description.levageAuxiliaire.sansObjet == ''" for="Mouflage (nombre de brins)">
                        <span>Mouflage (nombre de brins) : </span>
                        <input type="text" v-model="description.levageAuxiliaire.mouflage">
                    </label>

                    <label v-if="description.levageAuxiliaire.avecObjet == 'Avec Objet' && description.levageAuxiliaire.sansObjet == ''" for="Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm) :">
                        <span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm):  </span>
                        <input type="text" v-model="description.levageAuxiliaire.diametre">
                    </label>

                </td>
            </tr>

            <tr>
                <td>B-5</td>
                <td :class="[description.modeInstallationDetails.length != 0 ? 'saved' : 'not-saved']">MODE D'INSTALLATION</td>
                <td>
                    <label>
                        <select v-model="description.modeInstallation">
                            <option v-for="item in modeInstallationTable" :key="item.id">{{ item.titre }}</option>
                        </select>
                    </label>

                    <label for="Posé" v-if="description.modeInstallation == 'Pont roulant / Poutre roulante'">
                        Posé
                        <input type="radio" value="Posé" v-model="description.modeInstallationDetails">
                    </label>

                    <label for="Suspendu" v-if="description.modeInstallation == 'Pont roulant / Poutre roulante'">
                        Suspendu
                        <input type="radio" value="Suspendu" v-model="description.modeInstallationDetails">
                    </label>

                    <label for="Sur monorail" v-if="description.modeInstallation == 'Palan ou treuil'">
                        Sur monorail
                        <input type="radio" value="Sur monorail" v-model="description.modeInstallationDetails">
                    </label>

                    <label for="Sur point fixe" v-if="description.modeInstallation == 'Palan ou treuil'">
                        Sur point fixe
                        <input type="radio" value="Sur point fixe" v-model="description.modeInstallationDetails">
                    </label>

                    <label for="Sur point fixe" v-if="description.modeInstallation == 'Palan ou treuil'">
                        Sur potence
                        <input type="radio" value="Sur potence" v-model="description.modeInstallationDetails">
                    </label>

                    <label for="Sur portique" v-if="description.modeInstallation == 'Palan ou treuil'">
                        Sur potence
                        <input type="radio" value="Sur portique" v-model="description.modeInstallationDetails">
                    </label>

                    <label for="Autre" v-if="description.modeInstallation == 'Palan ou treuil'">
                        Autre
                        <input type="radio" value="Autre" v-model="description.modeInstallationDetails">
                        <input v-if="description.modeInstallationDetails == 'Autre'" type="text" v-model="description.modeInstallationDetailsAutre">
                    </label>
                </td>
            </tr>

            <tr>
                <td>B-6</td>
                <td :class="[description.sourceDenergie.value != '' ? 'saved' : 'not-saved']">SOURCE D'ENERGIE</td>
                <td>
                    <label>
                        <select v-model="description.sourceDenergie.value">
                            <option v-for="item in sourceDenergieTable" :key="item.id">{{ item.titre }}</option>
                        </select>
                        <input v-if="description.sourceDenergie.value == 'Autre'" type="text" v-model="description.modeInstallationDetailsAutre">
                    </label>

                    <label for="Levage" v-if="description.sourceDenergie.value == 'Levage'">
                        Motorisé
                        <input type="radio" value="Motorisé" v-model="description.sourceDenergie.levage">
                        Non motorisé
                        <input type="radio" value="Non motorisé" v-model="description.sourceDenergie.levage">
                    </label>

                    <label for="Translation" v-if="description.sourceDenergie.value == 'Translation'">
                        Motorisé
                        <input type="radio" value="Motorisé" v-model="description.sourceDenergie.translation">
                        Non motorisé
                        <input type="radio" value="Non motorisé" v-model="description.sourceDenergie.translation">
                    </label>

                    <label for="Direction" v-if="description.sourceDenergie.value == 'Direction'">
                        Motorisé
                        <input type="radio" value="Motorisé" v-model="description.sourceDenergie.direction">
                        Non motorisé
                        <input type="radio" value="Motorisé" v-model="description.sourceDenergie.direction">
                    </label>

                </td>
            </tr>

        </table>

        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>


    </div>

</template>
  
<script>
import Descriptions from "@/requests/Descriptions"
export default {
    name: 'renseignement-component',
    data() {
        return {

            flagReset : false,
            description: {
                marquage : null,
                modeDeLevage : null,
                caracteristiques : {
                    chargeMaximaleUtile : "",
                    hauteurDeLevage : "",
                    portee : "",
                    porteFaux : "",
                    longueurDuCheminDeRoulement : "",
                    suspentes : "",
                    suspentesAutre : "",
                    caracteristiquesChainesDeLevage : "",
                    caracteristiquesSangleDeLevage : "",
                    mouflage : "",
                    diametre : ""
                },
                levageAuxiliaire : {
                    sansObjet : "",
                    avecObjet : "",
                    chargeMaximaleUtileDeChaquePalan : "",
                    suspentes : "",
                    suspentesAutre : "",
                    caracteristiquesChainesDeLevage : "",
                    caracteristiquesSangleDeLevage : "",
                    mouflage : "",
                    diametre : ""
                },
                modeInstallation : "",
                modeInstallationDetails : "",
                modeInstallationDetailsAutre : "",
                sourceDenergie :  {
                    value : "",
                    autre : "",
                    levage : "",
                    translation : "",
                    direction : ""
                },
                observateurId : ""
            },

            suspentesTable: [
                { id: 10001, titre: "Câble(s) de levage / Composition" },
                { id: 10002, titre: "Chaînes(s) de levage / Caractéristiques" },
                { id: 10003, titre: "Sangle(s) de levage / Caractéristiques" }
            ],

            modeInstallationTable: [
                { id: 10004, titre: "Pont roulant / Poutre roulante" },
                { id: 10005, titre: "Palan ou treuil" }
            ],

            sourceDenergieTable : [
                { id : 10006, titre : "Electrique" },
                { id : 10007, titre : "Hydraulique" },
                { id : 10008, titre : "Pneumatique" },
                { id : 10009, titre : "Autre" },
                { id : 10010, titre : "Levage" },
                { id : 10011, titre : "Translation" },
                { id : 10012, titre : "Direction" }
            ]

        }
    },

    props : {
        observateurId : String
    },


    components: {
    },

    methods: {

        statuslevageAuxiliaireSansObjet() {
            this.description.levageAuxiliaire.sansObjet = "Sans Objet";
            this.description.levageAuxiliaire.avecObjet = ""
        },

        statuslevageAuxiliaireAvecObjet() {
            this.description.levageAuxiliaire.avecObjet = "Avec Objet";
            this.description.levageAuxiliaire.sansObjet = "";
        },

        sauvegarde() {

            this.description.observateurId = this.observateurId;
            Descriptions.create(this.description)
            .then((result) => {
                console.log(result);
                this.flagReset = true;
                this.$emit("menuStatusChicked");
            })
            .catch((error) => {
                console.log(error);
            });

        },

        reset() {
            Descriptions.reset(this.observateurId)
            .then(() => {

                this.flagReset = false;

                this.description.marquage = null;
                this.description.modeDeLevage = null;
                this.description.caracteristiques.chargeMaximaleUtile = "";
                this.description.caracteristiques.hauteurDeLevage = "";
                this.description.caracteristiques.portee = "";
                this.description.caracteristiques.porteFaux = "";
                this.description.caracteristiques.longueurDuCheminDeRoulement = "";
                this.description.caracteristiques.suspentes = "";
                this.description.caracteristiques.suspentesAutre = "";
                this.description.caracteristiques.caracteristiquesChainesDeLevage = "";
                this.description.caracteristiques.caracteristiquesSangleDeLevage = "";
                this.description.caracteristiques.mouflage = "";
                this.description.caracteristiques.diametre = "";
                this.description.levageAuxiliaire.sansObjet = "";
                this.description.levageAuxiliaire.avecObjet = "";
                this.description.levageAuxiliaire.chargeMaximaleUtileDeChaquePalan = "";
                this.description.levageAuxiliaire.suspentes = "";
                this.description.levageAuxiliaire.suspentesAutre = "";
                this.description.levageAuxiliaire.caracteristiquesChainesDeLevage = "";
                this.description.levageAuxiliaire.caracteristiquesSangleDeLevage = "";
                this.description.levageAuxiliaire.mouflage = "";
                this.description.levageAuxiliaire.diametre = "";
                this.description.modeInstallation = "";
                this.description.modeInstallationDetails = "";
                this.description.modeInstallationDetailsAutre = "";
                this.description.sourceDenergie.value = "";
                this.description.sourceDenergie.autre = "";
                this.description.sourceDenergie.levage = "";
                this.description.sourceDenergie.translation = "";
                this.description.sourceDenergie.direction = "";

                this.$emit("menuStatusChicked");
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },

    created() {
        Descriptions.select(this.observateurId)
        .then((result) => {

            if(result.data != null) {

                this.flagReset = true;
                this.$emit("menuStatusChicked");

                this.description.marquage = result.data.marquage;
                this.description.modeDeLevage = result.data.modeDeLevage;
                this.description.caracteristiques.chargeMaximaleUtile = result.data.caracteristiques[0].chargeMaximaleUtile;
                this.description.caracteristiques.hauteurDeLevage = result.data.caracteristiques[0].hauteurDeLevage;
                this.description.caracteristiques.portee = result.data.caracteristiques[0].portee;
                this.description.caracteristiques.porteFaux = result.data.caracteristiques[0].porteFaux;
                this.description.caracteristiques.longueurDuCheminDeRoulement = result.data.caracteristiques[0].longueurDuCheminDeRoulement;
                this.description.caracteristiques.suspentes = result.data.caracteristiques[0].suspentes;
                this.description.caracteristiques.suspentesAutre = result.data.caracteristiques[0].suspentesAutre;
                this.description.caracteristiques.caracteristiquesChainesDeLevage = result.data.caracteristiques[0].caracteristiquesChainesDeLevage;
                this.description.caracteristiques.caracteristiquesSangleDeLevage = result.data.caracteristiques[0].caracteristiquesSangleDeLevage;
                this.description.caracteristiques.mouflage = result.data.caracteristiques[0].mouflage;
                this.description.caracteristiques.diametre = result.data.caracteristiques[0].diametre;
                this.description.levageAuxiliaire.sansObjet = result.data.levageAuxiliaire[0].sansObjet;
                this.description.levageAuxiliaire.avecObjet = result.data.levageAuxiliaire[0].avecObjet;
                this.description.levageAuxiliaire.chargeMaximaleUtileDeChaquePalan = result.data.levageAuxiliaire[0].chargeMaximaleUtileDeChaquePalan;
                this.description.levageAuxiliaire.suspentes = result.data.levageAuxiliaire[0].suspentes;
                this.description.levageAuxiliaire.suspentesAutre = result.data.levageAuxiliaire[0].suspentesAutre;
                this.description.levageAuxiliaire.caracteristiquesChainesDeLevage = result.data.levageAuxiliaire[0].caracteristiquesChainesDeLevage;
                this.description.levageAuxiliaire.caracteristiquesSangleDeLevage = result.data.levageAuxiliaire[0].caracteristiquesSangleDeLevage;
                this.description.levageAuxiliaire.mouflage = result.data.levageAuxiliaire[0].mouflage;
                this.description.levageAuxiliaire.diametre = result.data.levageAuxiliaire[0].diametre;
                this.description.modeInstallation = result.data.modeInstallation;
                this.description.modeInstallationDetails = result.data.modeInstallationDetails;
                this.description.modeInstallationDetailsAutre = result.data.modeInstallationDetailsAutre;
                this.description.sourceDenergie.value = result.data.sourceDenergie[0].value;
                this.description.sourceDenergie.autre = result.data.sourceDenergie[0].autre;
                this.description.sourceDenergie.levage = result.data[0].levage;
                this.description.sourceDenergie.translation = result.data[0].translation;
                this.description.sourceDenergie.direction = result.data[0].direction;
                this.description.observateurId = result.data.observateurId;
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }
}
</script>
  
<style scoped>

.descriptions {
    margin-top: 10px;
    margin-bottom: 100px;
    width: inherit;
}

table {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
}

table tr td:nth-child(1) {
   width: 40px;
}


table tr td {
    border: 1px solid black;
    padding: 10px;
}

table > tr:nth-child(3) > td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table > tr:nth-child(3) > td:nth-child(3) label {
    margin-top: 3px;
    margin-bottom: 3px;
}

table > tr:nth-child(4) > td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table > tr:nth-child(4) > td:nth-child(3) label {
    margin-top: 3px;
    margin-bottom: 3px;
}

table > tr:nth-child(5) > td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table > tr:nth-child(6) > td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
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
    background-color: #040faa;
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

.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}

</style>