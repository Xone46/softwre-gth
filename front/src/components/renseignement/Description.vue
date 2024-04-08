<template>

    <div class="descriptions">

        <table>
            <tr>
                <td>B-1</td>
                <td>MARQUAGE</td>
                <td v-html="description.tagMarquage" @input="getValueMarquage"></td>
            </tr>

            <tr>
                <td>B-2</td>
                <td>MODE DE LEVAGE</td>
                <td v-html="description.tagModeDeLevage" @input="getValueModeDeLevage"></td>
            </tr>

            <tr>
                <td>B-3</td>
                <td>CARACTERISTIQUES DIMENSIONNELLES ET DE CHARGE</td>
                <td>
                    <label for="Charge maximale utile (kg) :"
                        v-html="description.caracteristiques.tagChargeMaximaleUtile" @input="getValueChargeMaximaleUtile"></label>
                    <label for="Hauteur de levage (m) :"
                        v-html="description.caracteristiques.tagHauteurDeLevage" @input="getValueHauteurDeLevage"></label>
                    <label for="Portée (m) :" v-html="description.caracteristiques.tagPortee" @input="getValuePortee"></label>
                    <label for="Porte a faux (m) :" v-html="description.caracteristiques.tagPorteFaux" @input="getValuePorteFaux"></label>
                    <label for="Longueur du chemin de roulement (m) :"
                        v-html="description.caracteristiques.longueurDuCheminDeRoulement" @input="getValueLongueurDuCheminDeRoulement"></label>
                    <label for="Suspentes de levage :" v-html="description.caracteristiques.tagSuspentes" @input="getValueSuspentes"></label>
                    <label v-html="description.caracteristiques.suspentesAutre" @input="getValueSuspentesAutre"></label>
                    <label for="Mouflage (nombre de brins)" v-html="description.caracteristiques.tagMouflage" @input="getValueMouflage"></label>
                    <label for="Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm) :"
                        v-html="description.caracteristiques.tagDiametre" @input="getValueDiametre"></label>
                </td>
            </tr>

            <tr>
                <td>B-4</td>
                <td>LEVAGE AUXILIAIRE</td>
                <td>
                    <label for="LevageAuxiliaie" v-html="description.tagLevageAuxiliaie"
                        @input="getValueTagLevageAuxiliaie"></label>

                    <label for="Charge maximale utile de chaque palan (kg)"
                        v-if="description.levageAuxiliaire == 'Avec objet'"
                        v-html="description.detailsLevageAuxiliaire.tagChargeMaximaleUtileDeChaquePalan" 
                        @input="getValueChargeMaximaleUtileDeChaquePalan"></label>

                    <label for="Suspentes de levage :" v-if="description.levageAuxiliaire == 'Avec objet'"
                        v-html="description.detailsLevageAuxiliaire.tagSuspentes"
                        @input="getValueSuspentesLevageAuxiliaire"></label>

                    <label v-html="description.detailsLevageAuxiliaire.tagSuspentesAutre"
                    @input="getValueSuspentesAutreLevageAuxiliaire"></label>

                    <label for="Mouflage (nombre de brins)" v-if="description.levageAuxiliaire == 'Avec objet'"
                        v-html="description.detailsLevageAuxiliaire.tagMouflage"
                        @input="getValueMouflageLevageAuxiliaire"></label>

                    <label for="Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm) :"
                        v-if="description.levageAuxiliaire == 'Avec objet'"
                        v-html="description.detailsLevageAuxiliaire.tagDiametre"
                        @input="getValueDiametreLevageAuxiliaire"></label>
                </td>
            </tr>

            <tr>
                <td>B-5</td>
                <td>MODE D'INSTALLATION</td>
                <td>
                    <label for="Mode Installation" v-html="description.tagModeInstallation"
                        @input="getValueModeInstallation"></label>
                    <label for="Sur monorail" v-if="description.modeInstallation == 'Palan ou treuil'"
                        v-html="description.tagSurMonorail" @input="getValueSurMonorail"></label>
                    <label for="Sur point fixe" v-if="description.modeInstallation == 'Palan ou treuil'"
                        v-html="description.tagSurPointFixe" @input="getValueSurPointFixe"></label>
                    <label for="Sur potence" v-if="description.modeInstallation == 'Palan ou treuil'"
                        v-html="description.tagSurPotence" @input="getValueSurPotence"></label>
                    <label for="Sur portique" v-if="description.modeInstallation == 'Palan ou treuil'"
                        v-html="description.tagSurPortique" @input="getValueSurPortique"></label>
                    <label for="Autre" v-if="description.modeInstallation == 'Palan ou treuil'"
                        v-html="description.tagAutre" @input="getValueAutre"></label>
                    <label for="Posé" v-if="description.modeInstallation == 'Pont roulant / Poutre roulante'"
                        v-html="description.tagPose" @input="getValuePose"></label>
                    <label for="Suspendu" v-if="description.modeInstallation == 'Pont roulant / Poutre roulante'"
                        v-html="description.tagSuspendu" @input="getValueSuspendu"></label>
                </td>
            </tr>

            <tr>
                <td>B-6</td>
                <td>SOURCE D'ENERGIE</td>
                <td>
                    <label for="source d'energie" v-html="description.tagSourceDenergie"
                        @input="getValueSourceEnergie"></label>
                    <label for="Details"
                        v-if="description.sourceDenergie == 'Levage' || description.sourceDenergie == 'Translation' || description.sourceDenergie == 'Direction'"
                        v-html="description.detailSourceDenergie"></label>
                    <label for="Autre" v-if="description.sourceDenergie == 'Autre'"
                        v-html="description.autreSourceDenergie"></label>
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

            flagReset: false,
            description: {
                tagMarquage: `
                <label for="CE">
                        CE
                        <input type="radio" value="CE" name='marquage'>
                    </label>
                    <label for="Absence de marquage">
                        Absence de marquage
                        <input type="radio" value="Absence de marquage" name='marquage'>
                </label
                `,
                marquage: "",

                tagModeDeLevage: `
                    <label for="CE">
                            Unique
                            <input type="radio" value="Unique" name="modeDeLevage">
                        </label>

                        <label for="CE">
                            Multiples indépendants
                            <input type="radio" value="Multiples indépendants" name="modeDeLevage">
                        </label>

                        <label for="CE">
                            Multiples synchronisés
                            <input type="radio" value="Multiples synchronisés" name="modeDeLevage">
                    </label>
                `,
                modeDeLevage: "",
                caracteristiques: {

                    tagChargeMaximaleUtile: `
                     Charge maximale utile (kg) :
                     <input type="text" value=''>
                    `,
                    chargeMaximaleUtile: "",

                    tagHauteurDeLevage: `
                       Hauteur de levage (m) :
                       <input type="text" value=''>
                    `,
                    hauteurDeLevage: "",

                    tagPortee: `
                        Portée (m) :
                        <input type="text" value=''>
                    `,
                    portee: "",

                    tagPorteFaux: `
                      Porte a faux (m):
                      <input type="text" value=''>
                    `,
                    porteFaux: "",

                    tagLongueurDuCheminDeRoulement: `
                        Longueur du chemin de roulement (m):
                        <input type="text" value=''>
                    `,
                    longueurDuCheminDeRoulement: "",

                    tagSuspentes: `
                        <span>Suspentes de levage</span>
                        <select value="">
                            <option value="Câble(s) de levage / Composition">Câble(s) de levage / Composition</option>
                            <option value="Chaînes(s) de levage / Caractéristiques">Chaînes(s) de levage / Caractéristiques</option>
                            <option value="Sangle(s) de levage / Caractéristiques">Sangle(s) de levage / Caractéristiques</option>
                        </select>
                        <input type="text" value="">
                    `,
                    suspentes: "",

                    tagSuspentesAutre: `<input type="text" value="">`,
                    suspentesAutre: "",

                    tagMouflage: `
                        <span>Mouflage (nombre de brins) : </span>
                        <input type="text" v-model="description.caracteristiques.mouflage">
                    `,
                    mouflage: "",

                    tagDiametre: `
                      <span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm): </span>
                      <input type="text" value>
                    `,
                    diametre: ""
                },

                tagLevageAuxiliaie: `
                    Sans objet
                    <input type="radio" name="levageAuxiliaire" value="Sans objet" >
                    Avec objet
                    <input type="radio" name="levageAuxiliaire" value="Avec objet">
                    `,
                levageAuxiliaire: "",

                detailsLevageAuxiliaire: {

                    tagChargeMaximaleUtileDeChaquePalan: `
                        Charge maximale utile de chaque palan (kg) : 
                        <input type="text" value="">
                    `,
                    chargeMaximaleUtileDeChaquePalan: "",

                    tagSuspentes: `
                        <span>Suspentes de levage</span>
                        <select value="">
                            <option value="Câble(s) de levage / Composition">Câble(s) de levage / Composition</option>
                            <option value="Chaînes(s) de levage / Caractéristiques">Chaînes(s) de levage / Caractéristiques</option>
                            <option value="Sangle(s) de levage / Caractéristiques">Sangle(s) de levage / Caractéristiques</option>
                        </select>
                        
                    `,
                    suspentes: "",

                    tagSuspentesAutre: `<input type="text" value="">`,
                    suspentesAutre: "",

                    tagMouflage: `
                        <span>Mouflage (nombre de brins) : </span>
                        <input type="text" value="">
                    `,
                    mouflage: "",

                    tagDiametre: `
                    <span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm):  </span>
                    <input type="text" value="">
                    `,
                    diametre: ""
                },

                tagModeInstallation: `
                    <select value="">
                        <option></option>
                        <option>Pont roulant / Poutre roulante</option>
                        <option>Palan ou treuil</option>
                    </select>
                `,
                modeInstallation: "",

                tagPose: `
                    Posé
                    <input type="radio" value="Posé">
                `,
                pose: "",

                tagSuspendu: `
                    Suspendu
                    <input type="radio" value="Suspendu">
                `,
                suspendu: "",

                tagSurMonorail: `
                    Sur monorail
                    <input type="radio" value="Sur monorail">
                `,
                surMonorail: "",

                tagSurPointFixe: `
                     Sur point fixe
                     <input type="radio" value="Sur point fixe">
                    `,
                surPointFixe: "",

                tagSurPotence: `
                     Sur Potence
                     <input type="radio" value="Sur Potence">
                    `,
                surPotence: "",

                tagSurPortique: `
                     Sur Portique
                     <input type="radio" value="Sur Portique">
                    `,
                surPortique: "",

                tagAutre: `
                     Autre
                    <input type="radio" value="Autre">
                    <input type="text" value="">
                    `,
                autre: "",


                tagSourceDenergie: `
                <select value="">
                            <option></option>
                            <option>Electrique</option>
                            <option>Hydraulique</option>
                            <option>Pneumatique</option>
                            <option>Autre</option>
                            <option>Levage</option>
                            <option>Translation</option>
                            <option>Direction</option>
                </select>
                `,
                sourceDenergie: "",

                detailSourceDenergie: `         
                        Motorisé
                        <input type="radio" value="Motorisé">
                        Non motorisé
                        <input type="radio" value="Non motorisé">
                `,

                autreSourceDenergie: `         
                        <input type="text" value="">
                `,


                observateurId: ""
            }

        }
    },

    props: {
        observateurId: String
    },


    components: {
    },

    methods: {

        getValueMarquage(event) {
            this.description.marquage = event.target.value;
        },

        getValueModeDeLevage(event) {
            this.description.modeDeLevage = event.target.value;
        },

        getValueChargeMaximaleUtile(event) {
            this.description.caracteristiques.chargeMaximaleUtile = event.target.value;
        },

        getValueHauteurDeLevage(event) {
            this.description.caracteristiques.hauteurDeLevage = event.target.value;
        },

        getValuePortee(event) {
            this.description.caracteristiques.portee = event.target.value;
        },

        getValuePorteFaux(event) {
            this.description.caracteristiques.porteFaux = event.target.value;
        },

        getValueLongueurDuCheminDeRoulement(event) {
            this.description.caracteristiques.longueurDuCheminDeRoulement = event.target.value;
        },

        getValueSuspentes(event) {
            this.description.caracteristiques.suspentes = event.target.value;
        },

        getValueSuspentesAutre(event) {
            this.description.caracteristiques.suspentesAutre = event.target.value;
        },

        getValueMouflage(event) {
            this.description.caracteristiques.mouflage = event.target.value;
        },

        getValueDiametre(event) {
            this.description.caracteristiques.diametre = event.target.value;
        },


        getValueChargeMaximaleUtileDeChaquePalan(event) {
            this.description.detailsLevageAuxiliaire.chargeMaximaleUtileDeChaquePalan = event.target.value;
        },

        getValueSuspentesLevageAuxiliaire(event) {
            this.description.detailsLevageAuxiliaire.suspentes = event.target.value;
        },

        getValueSuspentesAutreLevageAuxiliaire(event) {
            this.description.detailsLevageAuxiliaire.suspentesAutre = event.target.value;
        },

        getValueMouflageLevageAuxiliaire(event) {
            this.description.detailsLevageAuxiliaire.mouflage = event.target.value;
        },

        getValueDiametreLevageAuxiliaire(event) {
            this.description.detailsLevageAuxiliaire.diametre = event.target.value;
        },

        getValueModeInstallation(event) {
            this.description.modeInstallation = event.target.value;
        },

        getValueSurMonorail(event) {
            this.description.surMonorail = event.target.value;
        },

        getValueSurPointFixe(event) {
            this.description.surPointFixe = event.target.value;
        },

        getValueSurPotence(event) {
            this.description.surPotence = event.target.value;
        },

        getValueSurPortique(event) {
            this.description.surPortique = event.target.value;
        },

        getValueAutre(event) {
            this.description.autre = event.target.value;
        },

        getValuePose(event) {
            this.description.pose = event.target.value;
        },

        getValueSuspendu() {
            this.description.suspendu = event.target.value;
        },

        getValueSourceEnergie(event) {
            this.description.sourceDenergie = event.target.value;
        },


        getValueTagLevageAuxiliaie(event) {
            this.description.levageAuxiliaire = event.target.value;
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

                    this.description.tagMarquage = `
                    <label for="CE">
                            CE
                            <input type="radio" value="CE" name='marquage'>
                        </label>
                        <label for="Absence de marquage">
                            Absence de marquage
                            <input type="radio" value="Absence de marquage" name='marquage'>
                    </label
                `;
                    this.description.marquage = "";

                    this.description.tagModeDeLevage = `
                    <label for="CE">
                            Unique
                            <input type="radio" value="Unique" name="modeDeLevage">
                        </label>

                        <label for="CE">
                            Multiples indépendants
                            <input type="radio" value="Multiples indépendants" name="modeDeLevage">
                        </label>

                        <label for="CE">
                            Multiples synchronisés
                            <input type="radio" value="Multiples synchronisés" name="modeDeLevage">
                    </label>
                `;

                    this.description.modeDeLevage = "";

                    this.description.caracteristiques.tagChargeMaximaleUtile = `
                     Charge maximale utile (kg) :
                     <input type="text" value=''>
                `;
                    this.description.caracteristiques.chargeMaximaleUtile = "";

                    this.description.caracteristiques.tagHauteurDeLevage = `
                       Hauteur de levage (m) :
                       <input type="text" value=''>
                `;
                    this.description.caracteristiques.hauteurDeLevage = "";

                    this.description.caracteristiques.tagPortee = `
                        Portée (m) :
                        <input type="text" value=''>
                    `;
                    this.description.caracteristiques.portee = "";

                    this.description.caracteristiques.tagPorteFaux = `
                      Porte a faux (m):
                      <input type="text" value=''>
                    `;
                    this.description.caracteristiques.porteFaux = "";

                    this.description.caracteristiques.tagLongueurDuCheminDeRoulement = `
                        Longueur du chemin de roulement (m):
                        <input type="text" value=''>
                    `;
                    this.description.caracteristiques.longueurDuCheminDeRoulement = "";


                    this.description.caracteristiques.tagSuspentes = `
                        <span>Suspentes de levage</span>
                        <select value="">
                            <option value="Câble(s) de levage / Composition">Câble(s) de levage / Composition</option>
                            <option value="Chaînes(s) de levage / Caractéristiques">Chaînes(s) de levage / Caractéristiques</option>
                            <option value="Sangle(s) de levage / Caractéristiques">Sangle(s) de levage / Caractéristiques</option>
                        </select>
                        <input type="text" value="">
                    `;
                    this.description.caracteristiques.suspentes = "";


                    this.description.caracteristiques.tagSuspentesAutre = `<input type="text" value="">`;
                    this.description.caracteristiques.suspentesAutre = "";

                    this.description.caracteristiques.tagMouflage = `
                        <span>Mouflage (nombre de brins) : </span>
                        <input type="text" v-model="description.caracteristiques.mouflage">
                `;
                    this.description.caracteristiques.mouflage = "";

                    this.description.caracteristiques.tagDiametre = `
                      <span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm): </span>
                      <input type="text" value>
                    `;
                    this.description.caracteristiques.diametre = "";


                    this.description.tagLevageAuxiliaie = `
                    Sans objet
                    <input type="radio" name="levageAuxiliaire" value="Sans objet" >
                    Avec objet
                    <input type="radio" name="levageAuxiliaire" value="Avec objet">
                `;
                    this.description.levageAuxiliaire = "";


                    this.description.detailsLevageAuxiliaire.tagChargeMaximaleUtileDeChaquePalan = `
                        Charge maximale utile de chaque palan (kg) : 
                        <input type="text" value="">
                `;
                    this.description.detailsLevageAuxiliaire.chargeMaximaleUtileDeChaquePalan = "";

                    this.description.detailsLevageAuxiliaire.tagSuspentes = `
                        <span>Suspentes de levage</span>
                        <select value="">
                            <option value="Câble(s) de levage / Composition">Câble(s) de levage / Composition</option>
                            <option value="Chaînes(s) de levage / Caractéristiques">Chaînes(s) de levage / Caractéristiques</option>
                            <option value="Sangle(s) de levage / Caractéristiques">Sangle(s) de levage / Caractéristiques</option>
                        </select>
                        
                    `;
                    this.description.detailsLevageAuxiliaire.suspentes = "";

                    this.description.detailsLevageAuxiliaire.tagSuspentesAutre = `<input type="text" value="">`;
                    this.description.detailsLevageAuxiliaire.suspentesAutre = "";


                    this.description.detailsLevageAuxiliaire.tagMouflage = `
                        <span>Mouflage (nombre de brins) : </span>
                        <input type="text" value="">
                `;
                    this.description.detailsLevageAuxiliaire.mouflage = "";

                    this.description.detailsLevageAuxiliaire.tagDiametre = `
                    <span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm):  </span>
                    <input type="text" value="">
                `;
                    this.description.detailsLevageAuxiliaire.diametre = "";


                    this.description.tagModeInstallation = `
                    <select value="">
                        <option></option>
                        <option>Pont roulant / Poutre roulante</option>
                        <option>Palan ou treuil</option>
                    </select>
                `;
                    this.description.modeInstallation = "";

                    this.description.tagPose = `
                    Posé
                    <input type="radio" value="Posé">
                `;
                    this.description.pose = "";

                    this.description.tagSuspendu = `
                    Suspendu
                    <input type="radio" value="Suspendu">
                `;
                    this.description.suspendu = "";


                    this.description.tagSurMonorail = `
                    Sur monorail
                    <input type="radio" value="Sur monorail">
                `;
                    this.description.surMonorail = "";


                    this.description.tagSurPointFixe = `
                     Sur point fixe
                     <input type="radio" value="Sur point fixe">
                `;
                    this.description.surPointFixe = "";


                    this.description.tagSurPotence = `
                     Sur Potence
                     <input type="radio" value="Sur Potence">
                    `;
                    this.description.surPotence = "";

                    this.description.tagSurPortique = `
                     Sur Portique
                     <input type="radio" value="Sur Portique">
                `;
                    this.description.surPortique = "";

                    this.description.tagAutre = `
                     Autre
                    <input type="radio" value="Autre">
                    <input type="text" value="">
                    `;
                    this.description.autre = "";


                    this.description.tagSourceDenergie = `
                <select value="">
                            <option></option>
                            <option>Electrique</option>
                            <option>Hydraulique</option>
                            <option>Pneumatique</option>
                            <option>Autre</option>
                            <option>Levage</option>
                            <option>Translation</option>
                            <option>Direction</option>
                </select>
                `;
                    this.description.sourceDenergie = "";


                    this.description.detailSourceDenergie = `
                <select value="">
                            <option></option>
                            <option>Electrique</option>
                            <option>Hydraulique</option>
                            <option>Pneumatique</option>
                            <option>Autre</option>
                            <option>Levage</option>
                            <option>Translation</option>
                            <option>Direction</option>
                </select>
                `;
                    this.description.sourceDenergie = `         
                        Motorisé
                        <input type="radio" value="Motorisé">
                        Non motorisé
                        <input type="radio" value="Non motorisé">
                `;

                    this.description.sourceDenergie = `<input type="text" value="">`;

                    this.flagReset = false;
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

                if (result.data != null) {

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

table>tr:nth-child(3)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table>tr:nth-child(3)>td:nth-child(3) label {
    margin-top: 3px;
    margin-bottom: 3px;
}

table>tr:nth-child(4)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table>tr:nth-child(4)>td:nth-child(3) label {
    margin-top: 3px;
    margin-bottom: 3px;
}

table>tr:nth-child(5)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table>tr:nth-child(6)>td:nth-child(3) {
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