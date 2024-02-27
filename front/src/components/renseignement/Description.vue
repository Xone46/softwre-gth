<template>
    
    <div class="descriptions">

        <table>
            <tr>
                <td>B-1</td>
                <td>MARQUAGE</td>
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
                <td>MODE DE LEVAGE</td>
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
                <td>CARACTERISTIQUES DIMENSIONNELLES ET DE CHARGE</td>
                <td>
                    <label for="Charge maximale utile (kg) :">
                        Charge maximale utile (kg) :
                        <input type="text" v-model="description.caracteristiques.chargeMaximaleUtile">
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
                    </label>

                    <label for="Composition" v-if="description.caracteristiques.suspentes == 'Câble(s) de levage'">
                        <span>Composition</span>
                        <input type="text" v-model="description.caracteristiques.composition">
                    </label>

                    <label for="Caractéristiques" v-if="description.caracteristiques.suspentes == 'Chaînes(s) de levage'">
                        <span>Caractéristiques</span>
                        <input type="text" v-model="description.caracteristiques.caracteristiquesChainesDeLevage">
                    </label>

                    <label for="Caractéristiques" v-if="description.caracteristiques.suspentes == 'Sangle(s) de levage'">
                        <span>Caractéristiques</span>
                        <input type="text" v-model="description.caracteristiques.caracteristiquesSangleDeLevage">
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
                <td>LEVAGE AUXILIAIRE</td>
                <td>
                    <label for="Sans objet">
                        Sans objet
                        <input type="radio" value="Sans objet" v-model="description.levageAuxiliaire.sansObjet">
                    </label>

                    <label for="Charge maximale utile de chaque palan (kg)">
                        Charge maximale utile de chaque palan (kg) : 
                        <input type="text" v-model="description.levageAuxiliaire.chargeMaximaleUtileDeChaquePalan">
                    </label>

                    <label
                        for="Suspentes de levage :">
                        <span>Suspentes de levage</span>
                        <select v-model="description.levageAuxiliaire.suspentes">
                            <option v-for="item in suspentesTable" :key="item.id">{{ item.titre }}</option>
                        </select>
                    </label>

                    <label for="Composition" v-if="description.levageAuxiliaire.suspentes == 'Câble(s) de levage'">
                        <span>Composition</span>
                        <input type="text" v-model="description.levageAuxiliaire.composition">
                    </label>

                    <label for="Caractéristiques" v-if="description.levageAuxiliaire.suspentes == 'Chaînes(s) de levage'">
                        <span>Caractéristiques</span>
                        <input type="text" v-model="description.levageAuxiliaire.caracteristiquesChainesDeLevage">
                    </label>

                    <label for="Caractéristiques" v-if="description.levageAuxiliaire.suspentes == 'Sangle(s) de levage'">
                        <span>Caractéristiques</span>
                        <input type="text" v-model="description.levageAuxiliaire.caracteristiquesSangleDeLevage">
                    </label>

                    <label for="Mouflage (nombre de brins)">
                        <span>Mouflage (nombre de brins) : </span>
                        <input type="text" v-model="description.levageAuxiliaire.mouflage">
                    </label>

                    <label for="Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm) :">
                        <span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm):  </span>
                        <input type="text" v-model="description.levageAuxiliaire.diametre">
                    </label>

                </td>
            </tr>

            <tr>
                <td>B-5</td>
                <td>MODE D'INSTALLATION</td>
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
                <td>SOURCE D'ENERGIE</td>
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

        <div class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>


    </div>

</template>
  
<script>
import Descriptions from "@/requests/Descriptions"
export default {
    name: 'renseignement-component',
    data() {
        return {

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
                    composition : "",
                    caracteristiquesChainesDeLevage : "",
                    caracteristiquesSangleDeLevage : "",
                    mouflage : "",
                    diametre : ""
                },
                levageAuxiliaire : {
                    sansObjet : "",
                    chargeMaximaleUtileDeChaquePalan : "",
                    suspentes : "",
                    composition : "",
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
                }
            },

            suspentesTable: [
                { id: 10001, titre: "Câble(s) de levage" },
                { id: 10002, titre: "Chaînes(s) de levage" },
                { id: 10003, titre: "Sangle(s) de levage" },
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

    components: {
    },

    methods: {

        sauvegarde() {

            Descriptions.create(this.description)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error);
            });

        }



    },

    created() {
  
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





</style>