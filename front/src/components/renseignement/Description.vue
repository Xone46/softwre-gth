<template>

    <div class="descriptions">

        <table>
            <tr>
                <td>B-1</td>
                <td :class="[description.marquage.length != 0 ? 'saved' : 'not-saved']">MARQUAGE</td>
                <td v-html="description.tagMarquage" @input="getValueMarquage"></td>
            </tr>

            <tr>
                <td>B-2</td>
                <td :class="[description.modeDeLevage.length != 0 ? 'saved' : 'not-saved']">MODE DE LEVAGE</td>
                <td v-html="description.tagModeDeLevage" @input="getValueModeDeLevage"></td>
            </tr>

            <tr>
                <td>B-3</td>
                <td 
                :class="[description.modeDeLevage.length != 0 &&
                 description.caracteristiques.hauteurDeLevage.length != 0 &&
                 description.caracteristiques.portee.length != 0 &&
                 description.caracteristiques.porteFaux.length != 0  &&
                 description.caracteristiques.longueurDuCheminDeRoulement.length != 0 &&
                 description.caracteristiques.suspentes.length != 0 &&
                 description.caracteristiques.suspentesAutre.length != 0 &&
                 description.caracteristiques.mouflage.length != 0 &&
                 description.caracteristiques.diametre.length != 0 ? 'saved' : 'not-saved']">CARACTERISTIQUES DIMENSIONNELLES ET DE CHARGE</td>
                <td>
                    <label for="Charge maximale utile (kg) :"
                        v-html="description.caracteristiques.tagChargeMaximaleUtile"
                        @input="getValueChargeMaximaleUtile"></label>

                    <label for="Hauteur de levage (m) :" v-html="description.caracteristiques.tagHauteurDeLevage"
                        @input="getValueHauteurDeLevage"></label>

                    <label for="Portée (m) :" v-html="description.caracteristiques.tagPortee"
                        @input="getValuePortee"></label>

                    <label for="Porte a faux (m) :" v-html="description.caracteristiques.tagPorteFaux"
                        @input="getValuePorteFaux"></label>

                    <label for="Longueur du chemin de roulement (m) :"
                        v-html="description.caracteristiques.tagLongueurDuCheminDeRoulement"
                        @input="getValueLongueurDuCheminDeRoulement"></label>

                    <label for="Suspentes de levage :" v-html="description.caracteristiques.tagSuspentes"
                        @input="getValueSuspentes"></label>

                    <label for="Suspentes de levage Autre :" v-html="description.caracteristiques.tagSuspentesAutre"
                        @input="getValueSuspentesAutre"></label>

                    <label for="Mouflage (nombre de brins)" v-html="description.caracteristiques.tagMouflage"
                        @input="getValueMouflage"></label>

                    <label for="Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm) :"
                        v-html="description.caracteristiques.tagDiametre" @input="getValueDiametre"></label>
                </td>
            </tr>

            <tr>
                <td>B-4</td>
                <td :class="[description.levageAuxiliaire.length != 0 ? 'saved' : 'not-saved']">LEVAGE AUXILIAIRE</td>
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
                        v-if="description.levageAuxiliaire == 'Avec objet'"
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
                <td :class="[description.modeInstallation.length != 0 ? 'saved' : 'not-saved']">MODE D'INSTALLATION</td>
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
                    <label for="valueAutre" v-if="description.valueAutre == 'Autre'"
                        v-html="description.tagValueAutre" @input="getValueDeAutre"></label>
                    <label for="Posé" v-if="description.modeInstallation == 'Pont roulant / Poutre roulante'"
                        v-html="description.tagPose" @input="getValuePose"></label>
                    <label for="Suspendu" v-if="description.modeInstallation == 'Pont roulant / Poutre roulante'"
                        v-html="description.tagSuspendu" @input="getValueSuspendu"></label>
                </td>
            </tr>

            <tr>
                <td>B-6</td>
                <td :class="[description.sourceDenergie.length != 0 ? 'saved' : 'not-saved']">SOURCE D'ENERGIE</td>
                <td>
                    <label for="source d'energie" v-html="description.tagSourceDenergie"
                        @input="getValueSourceEnergie"></label>
                    <label for="Details"
                        v-if="description.sourceDenergie == 'Levage' || description.sourceDenergie == 'Translation' || description.sourceDenergie == 'Direction'"
                        v-html="description.tagDetailSourceDenergie" @input="getValueDetailSourceDenergie"></label>
                    <label for="Autre" v-if="description.sourceDenergie == 'Autre'"
                        v-html="description.tagAutreSourceDenergie" @input="getValueAutreSourceDenergie"></label>
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
                tagMarquage: "<label for='CE'>CE<input type='radio' value='CE' name='marquage'></label><label for='Absence de marquage'>Absence de marquage<input type='radio' value='Absence de marquage' name='marquage'></label>",
                marquage: "",

                tagModeDeLevage: "<label for='CE'>Unique<input type='radio' value='Unique' name='modeDeLevage'></label><label for='CE'>Multiples indépendants<input type='radio' value='Multiples indépendants' name='modeDeLevage'></label><label for='CE'>Multiples synchronisés<input type='radio' value='Multiples synchronisés' name='modeDeLevage'></label>",
                modeDeLevage: "",

                caracteristiques: {

                    tagChargeMaximaleUtile: "Charge maximale utile (kg) :<input type='text' value=''>",
                    chargeMaximaleUtile: "",

                    tagHauteurDeLevage: "Hauteur de levage (m) :<input type='text' value=''>",
                    hauteurDeLevage: "",

                    tagPortee: "Portée (m) :<input type='text' value=''>",
                    portee: "",

                    tagPorteFaux: "Porte a faux (m): <input type='text' value=''>",
                    porteFaux: "",

                    tagLongueurDuCheminDeRoulement: "Longueur du chemin de roulement (m): <input type='text' value=''>",
                    longueurDuCheminDeRoulement: "",

                    tagSuspentes: "<span>Suspentes de levage</span><select value=''><option value='Câble(s) de levage / Composition'>Câble(s) de levage / Composition</option><option value='Chaînes(s) de levage / Caractéristiques'>Chaînes(s) de levage / Caractéristiques</option><option value='Sangle(s) de levage / Caractéristiques'>Sangle(s) de levage / Caractéristiques</option></select>",
                    suspentes: "",

                    tagSuspentesAutre: "<input type='text' value=''>",
                    suspentesAutre: "",

                    tagMouflage: "<span>Mouflage (nombre de brins) : </span><input type='text' value=''>",
                    mouflage: "",

                    tagDiametre: "<span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm): </span><input type='text' value=''>",
                    diametre: ""
                },

                tagLevageAuxiliaie: "Sans objet<input type='radio' name='levageAuxiliaire' value='Sans objet'>Avec objet<input type='radio' name='levageAuxiliaire' value='Avec objet'>",
                levageAuxiliaire: "",

                detailsLevageAuxiliaire: {

                    tagChargeMaximaleUtileDeChaquePalan: "Charge maximale utile de chaque palan (kg) : <input type='text' value=''>",
                    chargeMaximaleUtileDeChaquePalan: "",

                    tagSuspentes: "<span>Suspentes de levage</span><select value=''><option value='Câble(s) de levage / Composition'>Câble(s) de levage / Composition</option><option value='Chaînes(s) de levage / Caractéristiques'>Chaînes(s) de levage / Caractéristiques</option><option value='Sangle(s) de levage / Caractéristiques'>Sangle(s) de levage / Caractéristiques</option></select>",
                    suspentes: "",

                    tagSuspentesAutre: "<input type='text' value=''>",
                    suspentesAutre: "",

                    tagMouflage: "<span>Mouflage (nombre de brins) : </span><input type='text' value=''>",
                    mouflage: "",

                    tagDiametre: "<span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm): </span><input type='text' value=''>",
                    diametre: ""
                },

                tagModeInstallation: "<select value=''><option value=''></option><option value='Pont roulant / Poutre roulante'>Pont roulant / Poutre roulante</option><option value='Palan ou treuil'>Palan ou treuil</option></select>",
                modeInstallation: "",

                tagPose: "Posé<input type='radio' value='Posé'>",
                pose: "",

                tagSuspendu: "Suspendu<input type='radio' value='Suspendu'>",
                suspendu: "",

                tagSurMonorail: "Sur monorail<input type='radio' value='Sur monorail'>",
                surMonorail: "",

                tagSurPointFixe: "Sur point fixe<input type='radio' value='Sur point fixe'>",
                surPointFixe: "",

                tagSurPotence: "Sur Potence<input type='radio' value='Sur Potence'>",
                surPotence: "",

                tagSurPortique: "Sur Portique<input type='radio' value='Sur Portique'>",
                surPortique: "",

                tagAutre: "Autre<input type='radio' value='Autre'>",
                autre: "",

                tagValueAutre: "<input type='text' value=''>",
                valueAutre: "",


                tagSourceDenergie: "<select value=''><option value=''></option><option value='Electrique'>Electrique</option><option value='Hydraulique'>Hydraulique</option><option value='Pneumatique'>Pneumatique</option><option value='Autre'>Autre</option><option value='Levage'>Levage</option><option value='Translation'>Translation</option><option value='Direction'>Direction</option></select>",
                sourceDenergie: "",

                tagDetailSourceDenergie: "Motorisé<input type='radio' value='Motorisé'>Non motorisé<input type='radio' value='Non motorisé'>",
                detailSourceDenergie: "",

                tagAutreSourceDenergie: "<input type='text' value=''>",
                autreSourceDenergie: "",

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
            return this.sauvegarde();
        },

        getValueModeDeLevage(event) {
            this.description.modeDeLevage = event.target.value;
            return this.sauvegarde();
        },

        getValueChargeMaximaleUtile(event) {
            this.description.caracteristiques.chargeMaximaleUtile = event.target.value;
            return this.sauvegarde();
        },

        getValueHauteurDeLevage(event) {
            this.description.caracteristiques.hauteurDeLevage = event.target.value;
            return this.sauvegarde();
        },

        getValuePortee(event) {
            this.description.caracteristiques.portee = event.target.value;
            return this.sauvegarde();
        },

        getValuePorteFaux(event) {
            this.description.caracteristiques.porteFaux = event.target.value;
            return this.sauvegarde();
        },

        getValueLongueurDuCheminDeRoulement(event) {
            this.description.caracteristiques.longueurDuCheminDeRoulement = event.target.value;
            return this.sauvegarde();
        },

        getValueSuspentes(event) {
            this.description.caracteristiques.suspentes = event.target.value;
            return this.sauvegarde();
        },

        getValueSuspentesAutre(event) {
            this.description.caracteristiques.suspentesAutre = event.target.value;
            return this.sauvegarde();
        },

        getValueMouflage(event) {
            this.description.caracteristiques.mouflage = event.target.value;
            return this.sauvegarde();
        },

        getValueDiametre(event) {
            this.description.caracteristiques.diametre = event.target.value;
            return this.sauvegarde();
        },


        getValueChargeMaximaleUtileDeChaquePalan(event) {
            this.description.detailsLevageAuxiliaire.chargeMaximaleUtileDeChaquePalan = event.target.value;
            return this.sauvegarde();
        },

        getValueSuspentesLevageAuxiliaire(event) {
            this.description.detailsLevageAuxiliaire.suspentes = event.target.value;
            return this.sauvegarde();
        },

        getValueSuspentesAutreLevageAuxiliaire(event) {
            this.description.detailsLevageAuxiliaire.suspentesAutre = event.target.value;
            return this.sauvegarde();
        },

        getValueMouflageLevageAuxiliaire(event) {
            this.description.detailsLevageAuxiliaire.mouflage = event.target.value;
            return this.sauvegarde();
        },

        getValueDiametreLevageAuxiliaire(event) {
            this.description.detailsLevageAuxiliaire.diametre = event.target.value;
            return this.sauvegarde();
        },

        getValueModeInstallation(event) {
            this.description.modeInstallation = event.target.value;
            this.description.surMonorail = "";
            this.description.surPointFixe = "";
            this.description.surPotence = "";
            this.description.surPortique = "";
            this.description.autre = "";
            this.description.pose = "";
            this.description.suspendu = "";
            this.description.valueAutre = "";
            return this.sauvegarde();
        },

        getValueSurMonorail(event) {
            this.description.surMonorail = event.target.value;
            return this.sauvegarde();
        },

        getValueSurPointFixe(event) {
            this.description.surPointFixe = event.target.value;
            return this.sauvegarde();
        },

        getValueSurPotence(event) {
            this.description.surPotence = event.target.value;
            return this.sauvegarde();
        },

        getValueSurPortique(event) {
            this.description.surPortique = event.target.value;
            return this.sauvegarde();
        },

        getValueAutre(event) {
            this.description.autre = event.target.value;
            return this.sauvegarde();
        },

        getValueDeAutre(event) {
            this.description.valueAutre = event.target.value;
            return this.sauvegarde();
        },

        getValuePose(event) {
            this.description.pose = event.target.value;
            return this.sauvegarde();
        },

        getValueSuspendu(event) {
            this.description.suspendu = event.target.value;
            return this.sauvegarde();
        },

        getValueTagLevageAuxiliaie(event) {
            this.description.levageAuxiliaire = event.target.value;
            return this.sauvegarde();
        },

        getValueSourceEnergie(event) {
            this.description.sourceDenergie = event.target.value;
            this.description.detailSourceDenergie = "";
            this.description.autreSourceDenergie = "";
            return this.sauvegarde();
        },

        getValueDetailSourceDenergie(event) {
            this.description.detailSourceDenergie = event.target.value;
            return this.sauvegarde();
        },

        getValueAutreSourceDenergie(event) {
            this.description.autreSourceDenergie = event.target.value;
            return this.sauvegarde();
        },

        sauvegarde() {
            this.description.observateurId = this.observateurId;
            Descriptions.create(this.description)
                .then(() => {
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

                this.description = {

                tagMarquage: "<label for='CE'>CE<input type='radio' value='CE' name='marquage'></label><label for='Absence de marquage'>Absence de marquage<input type='radio' value='Absence de marquage' name='marquage'></label>",
                marquage: "",

                tagModeDeLevage: "<label for='CE'>Unique<input type='radio' value='Unique' name='modeDeLevage'></label><label for='CE'>Multiples indépendants<input type='radio' value='Multiples indépendants' name='modeDeLevage'></label><label for='CE'>Multiples synchronisés<input type='radio' value='Multiples synchronisés' name='modeDeLevage'></label>",
                modeDeLevage: "",

                caracteristiques: {

                    tagChargeMaximaleUtile: "Charge maximale utile (kg) :<input type='text' value=''>",
                    chargeMaximaleUtile: "",

                    tagHauteurDeLevage: "Hauteur de levage (m) :<input type='text' value=''>",
                    hauteurDeLevage: "",

                    tagPortee: "Portée (m) :<input type='text' value=''>",
                    portee: "",

                    tagPorteFaux: "Porte a faux (m): <input type='text' value=''>",
                    porteFaux: "",

                    tagLongueurDuCheminDeRoulement: "Longueur du chemin de roulement (m): <input type='text' value=''>",
                    longueurDuCheminDeRoulement: "",

                    tagSuspentes: "<span>Suspentes de levage</span><select value=''><option value='Câble(s) de levage / Composition'>Câble(s) de levage / Composition</option><option value='Chaînes(s) de levage / Caractéristiques'>Chaînes(s) de levage / Caractéristiques</option><option value='Sangle(s) de levage / Caractéristiques'>Sangle(s) de levage / Caractéristiques</option></select>",
                    suspentes: "",

                    tagSuspentesAutre: "<input type='text' value=''>",
                    suspentesAutre: "",

                    tagMouflage: "<span>Mouflage (nombre de brins) : </span><input type='text' value=''>",
                    mouflage: "",

                    tagDiametre: "<span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm): </span><input type='text' value=''>",
                    diametre: ""
                },

                tagLevageAuxiliaie: "Sans objet<input type='radio' name='levageAuxiliaire' value='Sans objet'>Avec objet<input type='radio' name='levageAuxiliaire' value='Avec objet'>",
                levageAuxiliaire: "",

                detailsLevageAuxiliaire: {

                    tagChargeMaximaleUtileDeChaquePalan: "Charge maximale utile de chaque palan (kg) : <input type='text' value=''>",
                    chargeMaximaleUtileDeChaquePalan: "",

                    tagSuspentes: "<span>Suspentes de levage</span><select value=''><option value='Câble(s) de levage / Composition'>Câble(s) de levage / Composition</option><option value='Chaînes(s) de levage / Caractéristiques'>Chaînes(s) de levage / Caractéristiques</option><option value='Sangle(s) de levage / Caractéristiques'>Sangle(s) de levage / Caractéristiques</option></select>",
                    suspentes: "",

                    tagSuspentesAutre: "<input type='text' value=''>",
                    suspentesAutre: "",

                    tagMouflage: "<span>Mouflage (nombre de brins) : </span><input type='text' value=''>",
                    mouflage: "",

                    tagDiametre: "<span>Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm): </span><input type='text' value=''>",
                    diametre: ""
                },

                tagModeInstallation: "<select value=''><option value=''></option><option value='Pont roulant / Poutre roulante'>Pont roulant / Poutre roulante</option><option value='Palan ou treuil'>Palan ou treuil</option></select>",
                modeInstallation: "",

                tagPose: "Posé<input type='radio' value='Posé'>",
                pose: "",

                tagSuspendu: "Suspendu<input type='radio' value='Suspendu'>",
                suspendu: "",

                tagSurMonorail: "Sur monorail<input type='radio' value='Sur monorail'>",
                surMonorail: "",

                tagSurPointFixe: "Sur point fixe<input type='radio' value='Sur point fixe'>",
                surPointFixe: "",

                tagSurPotence: "Sur Potence<input type='radio' value='Sur Potence'>",
                surPotence: "",

                tagSurPortique: "Sur Portique<input type='radio' value='Sur Portique'>",
                surPortique: "",

                tagAutre: "Autre<input type='radio' value='Autre'>",
                autre: "",

                tagValueAutre: "<input type='text' value=''>",
                valueAutre: "",


                tagSourceDenergie: "<select value=''><option value=''></option><option value='Electrique'>Electrique</option><option value='Hydraulique'>Hydraulique</option><option value='Pneumatique'>Pneumatique</option><option value='Autre'>Autre</option><option value='Levage'>Levage</option><option value='Translation'>Translation</option><option value='Direction'>Direction</option></select>",
                sourceDenergie: "",

                tagDetailSourceDenergie: "Motorisé<input type='radio' value='Motorisé'>Non motorisé<input type='radio' value='Non motorisé'>",
                detailSourceDenergie: "",

                tagAutreSourceDenergie: "<input type='text' value=''>",
                autreSourceDenergie: "",

                observateurId: ""
            }

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

                if (result.data.description != null) {

                    this.flagReset = true;

                    this.description.marquage = result.data.description.marquage;
                    this.description.tagMarquage = this.description.tagMarquage.replace(`value='${result.data.description.marquage}'`, `value='${result.data.description.marquag}' checked='checked'`);

                    this.description.modeDeLevage = result.data.description.modeDeLevage;
                    this.description.tagModeDeLevage = this.description.tagModeDeLevage.replace(`value='${result.data.description.modeDeLevage}'`, `value='${result.data.description.modeDeLevage}' checked='checked'`);

                    this.description.caracteristiques.chargeMaximaleUtile = result.data.description.caracteristiques[0].chargeMaximaleUtile;
                    this.description.caracteristiques.tagChargeMaximaleUtile = this.description.caracteristiques.tagChargeMaximaleUtile.replace(`value=''`, `value='${result.data.description.caracteristiques[0].chargeMaximaleUtile}'`);

                    this.description.caracteristiques.hauteurDeLevage = result.data.description.caracteristiques[0].hauteurDeLevage;
                    this.description.caracteristiques.tagHauteurDeLevage = this.description.caracteristiques.tagHauteurDeLevage.replace(`value=''`, `value='${result.data.description.caracteristiques[0].hauteurDeLevage}'`);

                    this.description.caracteristiques.portee = result.data.description.caracteristiques[0].portee;
                    this.description.caracteristiques.tagPortee = this.description.caracteristiques.tagPortee.replace(`value=''`, `value='${result.data.description.caracteristiques[0].portee}'`);

                    this.description.caracteristiques.porteFaux = result.data.description.caracteristiques[0].porteFaux;
                    this.description.caracteristiques.tagPorteFaux = this.description.caracteristiques.tagPorteFaux.replace(`value=''`, `value='${result.data.description.caracteristiques[0].porteFaux}'`);

                    this.description.caracteristiques.longueurDuCheminDeRoulement = result.data.description.caracteristiques[0].longueurDuCheminDeRoulement;
                    this.description.caracteristiques.tagLongueurDuCheminDeRoulement = this.description.caracteristiques.tagLongueurDuCheminDeRoulement.replace(`value=''`, `value='${result.data.description.caracteristiques[0].longueurDuCheminDeRoulement}'`);

                    this.description.caracteristiques.suspentes = result.data.description.caracteristiques[0].suspentes;
                    this.description.caracteristiques.tagSuspentes = this.description.caracteristiques.tagSuspentes.replace(`value='${result.data.description.caracteristiques[0].suspentes}'`, `value='${result.data.description.caracteristiques[0].suspentes}' selected`);
                    this.description.caracteristiques.tagSuspentes = this.description.caracteristiques.tagSuspentes.replace(`value=''`, `value='${result.data.description.caracteristiques[0].suspentes}'`);

    

                    this.description.caracteristiques.suspentesAutre = result.data.description.caracteristiques[0].suspentesAutre;
                    this.description.caracteristiques.tagSuspentesAutre = this.description.caracteristiques.tagSuspentesAutre.replace(`value=''`, `value='${result.data.description.caracteristiques[0].suspentesAutre}'`);

                    this.description.caracteristiques.mouflage = result.data.description.caracteristiques[0].mouflage;
                    this.description.caracteristiques.tagMouflage = this.description.caracteristiques.tagMouflage.replace(`value=''`, `value='${result.data.description.caracteristiques[0].mouflage}'`);

                    this.description.caracteristiques.diametre = result.data.description.caracteristiques[0].diametre;
                    this.description.caracteristiques.tagDiametre = this.description.caracteristiques.tagDiametre.replace(`value=''`, `value='${result.data.description.caracteristiques[0].diametre}'`);


                    this.description.levageAuxiliaire = result.data.description.levageAuxiliaire;
                    this.description.tagLevageAuxiliaie = this.description.tagLevageAuxiliaie.replace(`value='${result.data.description.levageAuxiliaire}'`, `value='${result.data.description.levageAuxiliaire}' checked='checked'`);


                    this.description.detailsLevageAuxiliaire.chargeMaximaleUtileDeChaquePalan = result.data.description.detailsLevageAuxiliaire[0].chargeMaximaleUtileDeChaquePalan;
                    this.description.detailsLevageAuxiliaire.tagChargeMaximaleUtileDeChaquePalan = this.description.detailsLevageAuxiliaire.tagChargeMaximaleUtileDeChaquePalan.replace(`value=''`, `value='${result.data.description.detailsLevageAuxiliaire[0].chargeMaximaleUtileDeChaquePalan}'`);

                    this.description.detailsLevageAuxiliaire.suspentes = result.data.description.detailsLevageAuxiliaire[0].suspentes;
                    this.description.detailsLevageAuxiliaire.tagSuspentes = this.description.detailsLevageAuxiliaire.tagSuspentes.replace(`value='${result.data.description.detailsLevageAuxiliaire[0].suspentes}'`, `value='${result.data.description.detailsLevageAuxiliaire[0].suspentes}' selected`);
                    this.description.detailsLevageAuxiliaire.tagSuspentes = this.description.detailsLevageAuxiliaire.tagSuspentes.replace(`value=''`, `value='${result.data.description.detailsLevageAuxiliaire[0].suspentes}'`);

                    this.description.detailsLevageAuxiliaire.suspentesAutre = result.data.description.detailsLevageAuxiliaire[0].suspentesAutre;
                    this.description.detailsLevageAuxiliaire.tagSuspentesAutre = this.description.detailsLevageAuxiliaire.tagSuspentesAutre.replace(`value=''`, `value='${result.data.description.detailsLevageAuxiliaire[0].suspentesAutre}'`);


                    this.description.detailsLevageAuxiliaire.mouflage = result.data.description.detailsLevageAuxiliaire[0].mouflage;
                    this.description.detailsLevageAuxiliaire.tagMouflage = this.description.detailsLevageAuxiliaire.tagMouflage.replace(`value=''`, `value='${result.data.description.detailsLevageAuxiliaire[0].mouflage}'`);

                    this.description.detailsLevageAuxiliaire.diametre = result.data.description.detailsLevageAuxiliaire[0].diametre;
                    this.description.detailsLevageAuxiliaire.tagDiametre = this.description.detailsLevageAuxiliaire.tagDiametre.replace(`value=''`, `value='${result.data.description.detailsLevageAuxiliaire[0].diametre}'`);

                    this.description.modeInstallation = result.data.description.modeInstallation;
                    this.description.tagModeInstallation = this.description.tagModeInstallation.replace(`value='${result.data.description.modeInstallation}'`, `value='${result.data.description.modeInstallation}' selected`);
                    this.description.tagModeInstallation = this.description.tagModeInstallation.replace(`value=''`, `value='${result.data.description.modeInstallation}'`);


                    this.description.pose = result.data.description.pose;
                    this.description.tagPose = this.description.tagPose.replace(`value='${result.data.description.pose}'`, `value='${result.data.description.pose}' checked='checked'`);

                    this.description.suspendu = result.data.description.suspendu;
                    this.description.tagSuspendu = this.description.tagSuspendu.replace(`value='${result.data.description.suspendu}'`, `value='${result.data.description.suspendu}' checked='checked'`);

                    this.description.surMonorail = result.data.description.surMonorail;
                    this.description.tagSurMonorail = this.description.tagSurMonorail.replace(`value='${result.data.description.surMonorail}'`, `value='${result.data.description.surMonorail}' checked='checked'`);

                    this.description.surPointFixe = result.data.description.surPointFixe;
                    this.description.tagSurPointFixe = this.description.tagSurPointFixe.replace(`value='${result.data.description.surPointFixe}'`, `value='${result.data.description.surPointFixe}' checked='checked'`);

                    this.description.surPotence = result.data.description.surPotence;
                    this.description.tagSurPotence = this.description.tagSurPotence.replace(`value='${result.data.description.surPotence}'`, `value='${result.data.description.surPotence}' checked='checked'`);

                    this.description.surPortique = result.data.description.surPortique;
                    this.description.tagSurPortique = this.description.tagSurPortique.replace(`value='${result.data.description.surPortique}'`, `value='${result.data.description.surPortique}' checked='checked'`);

                    this.description.autre = result.data.description.autre;
                    this.description.tagAutre = this.description.tagAutre.replace(`value='${result.data.description.autre}'`, `value='${result.data.description.autre}' checked='checked'`);

                    this.description.sourceDenergie = result.data.description.sourceDenergie;
                    this.description.tagSourceDenergie = this.description.tagSourceDenergie.replace(`value='${result.data.description.sourceDenergie}'`, `value='${result.data.description.sourceDenergie}' selected`);
                    this.description.tagSourceDenergie = this.description.tagSourceDenergie.replace(`value=''`, `value='${result.data.description.sourceDenergie}'`);


                    this.description.detailSourceDenergie = result.data.description.detailSourceDenergie;
                    this.description.tagDetailSourceDenergie = this.description.tagDetailSourceDenergie.replace(`value='${result.data.description.detailSourceDenergie}'`, `value='${result.data.description.detailSourceDenergie}' checked='checked'`);


                    this.description.autreSourceDenergie = result.data.description.autreSourceDenergie;
                    this.description.tagAutreSourceDenergie = this.description.tagAutreSourceDenergie.replace(`value=''`, `value='${result.data.description.autreSourceDenergie}'`);

                    this.description.observateurId = result.data.description.observateurId;

                    this.$emit("menuStatusChicked");

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