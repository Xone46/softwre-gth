<template>

    <div class="descriptions">

        <table>

            <tr>
                <td>B-1</td>
                <td :class="[description.marquage.length != 0 ? 'saved' : 'not-saved']">MARQUAGE</td>
                <td class="first">
                    <input type="text" :value="description.marquage" disabled>
                </td>
            </tr>

            <tr>
                <td>B-2</td>
                <td :class="[description.modeLevage.length != 0 ? 'saved' : 'not-saved']">MODE DE LEVAGE</td>
                <td class="second">
                    <select @change="saisirModeLevage($event)" :value="description.modeLevage">
                        <option value=""></option>
                        <option value="Unique">Unique</option>
                        <option value="Multiples indépendants">Multiples indépendants</option>
                        <option value="Multiples synchronisés">Multiples synchronisés</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td>B-3</td>
                <td :class="[colorCaracteristiques == true ? 'saved' : 'not-saved']">CARACTERISTIQUES DIMENSIONNELLES ET DE CHARGE</td>
                <td class="third">
                    <p>Charge maximale utile (kg) : <input type="text" @input="saisirChargeMaximaleUtile($event)"
                            :value="description.chargeMaximaleUtile"></p>
                    <p>Hauteur de levage (m) : <input type="text" @input="saisirHauteurDeLevage($event)"
                            :value="description.hauteurDeLevage"></p>
                    <p>
                        Portée (m) : <input type="text" @input="saisirPortee($event)" :value="description.portee">
                    </p>
                    <p>
                        Porte a faux (m) : <input type="text" @input="saisirPorteFaux($event)"
                            :value="description.porteFaux">
                    </p>
                    <p>
                        Longueur du chemin de roulement (m) : <input type="text"
                            @input="saisirLongueurCheminRoulement($event)" :value="description.longueurCheminRoulement">
                    </p>
                    <p>
                        Suspentes de levage :
                        <select @change="saisirSuspentesLevage($event)" :value="description.suspentesLevage">
                            <option value=""></option>
                            <option value="Câble(s) de levage / Composition">Câble(s) de levage / Composition</option>
                            <option value="Chaînes(s) de levage / Caractéristiques">Chaînes(s) de levage /
                                Caractéristiques</option>
                            <option value="Sangle(s) de levage / Caractéristiques">Sangle(s) de levage /
                                Caractéristiques</option>
                        </select>
                    </p>
                    <p>
                        Mouflage (nombre de brins) : <input type="text" @input="saisirMouflage($event)"
                            :value="description.mouflage">
                    </p>
                    <p>
                        Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm) : <input type="text"
                            @input="saisirDiametre($event)" :value="description.diametre">
                    </p>

                </td>
            </tr>

            <tr>
                <td>B-4</td>
                <td :class="[colorLevageAuxilaire == true ? 'saved' : 'not-saved']">LEVAGE AUXILIAIRE</td>
                <td class="fourth">
                    <ul v-for="(item, index) in description.levageAuxilaire" :key="index">
                        <li>
                            <input type="radio" name="levageAuxilaire" @input="saisirLevageAuxilaire(index)" :value="item.status" :checked="item.status">{{ item.titre }}
                        </li>
                        <li v-if="item.status && item.tab.length != 0">
                            <p v-for="(el, i) in item.tab" :key="i">
                                {{ el.titre }} <input type="text" @input="saisirSousLevageAuxilaire($event, index, i)" :value="el.content">
                            </p>
                        </li>
                    </ul>

                    <p>
                        Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm) : <input type="text"
                            @input="saisirDiametreLevageAuxilaire($event)" :value="description.diametreLevageAuxilaire">
                    </p>

                </td>
            </tr>

            <tr>
                <td>B-5</td>
                <td :class="[colorModeInstallation == true ? 'saved' : 'not-saved']">MODE D'INSTALLATION</td>
                <td class="fifth">
                    <P v-for="(item, index) in description.modeInstallation" :key="index">
                        <input type="radio" name="modeInstallation" @input="saisirModeInstallation(index)" :value="item.status" :checked="item.status"> {{ item.titre }}
                        <ul v-if="item.status">
                            <li v-for="(el, i) in item.tab" :key="i">
                            <input type="radio" name="sousModeInstallation" @input="saisirSousModeInstallation(index, i)" :value="el.status" :checked="el.status">{{ el.titre }}
                            </li>
                        </ul>
                    </p>
                    <p class="autre" v-if="description.flagComplementModeInstallation">
                        <input type="text" @input="saisirComplementModeInstallation($event)" :value="description.complementModeInstallation">
                    </p>
                </td>
            </tr>

            <tr>
                <td>B-6</td>
                <td :class="[colorSourceEnergie == true ? 'saved' : 'not-saved']">SOURCE D'ENERGIE</td>
                <td class="sixth">
                    <p v-for="(item, index) in description.sourceEnergie" :key="index">
                        <input type="radio" name="sourceEnergie" @input="sisairSourceEnergie(index)" :checked="item.status">{{ item.titre }}
                        <ul>
                            <li v-for="(el, i) in item.tab" :key="i"><input type="radio" name="sousSourceEnergie" @input="sisairSousSourceEnergie(index, i)" :checked="el.status">{{ el.titre }}</li>
                        </ul>
                    </p>
                    <p v-if="description.flagcomplementSourceEnergie">
                        <input type="text" @input="sisairComplementSourceEnergie($event)" :value="description.complementSourceEnergie">
                    </p>
                </td>
            </tr>



        </table>

        <div class="sauvegarder">
            <button :class="[watched_sauvegarder == true ? 'watch' : 'not-watch']" @click="sauvegarde">
                {{ watched_sauvegarder == true ? "Déjà envoyé" : "Envoyer" }}
            </button>
        </div>

       <div class="reset">
            <button @click="reset">Initialiser</button>
        </div>

        <Loading v-if="flagLoading" />
        

    </div>

</template>

<script>
import Descriptions from "@/requests/appareil_levage/famille2_lev2/Descriptions"
import Observateurs from "@/requests/Observateurs"
import Loading from '@/components/models/Loading.vue'

export default {
    name: 'renseignement-component',
    data() {
        return {

            flagLoading : false,

            colorSuspentes: false,
            colorCaracteristiques: false,
            colorLevageAuxilaire: false,
            colorModeInstallation: false,
            colorSourceEnergie: false,

            counter_watched: 0,
            watched_sauvegarder: false,
            flagReset: false,

            description: {

                marquage: "",

                modeLevage: "",

                chargeMaximaleUtile: "",
                hauteurDeLevage: "",
                portee: "",
                porteFaux: "",
                longueurCheminRoulement: "",
                suspentesLevage: "",
                mouflage: "",
                diametre: "",


                levageAuxilaire: [
                    {
                        titre: "Sans Objet",
                        status: false,
                        tab: []
                    },
                    {
                        titre: "Charge maximale utile de chaque palan (kg)",
                        status: false,
                        tab: [
                            {
                                titre: "Câble(s) de levage / Composition",
                                status: false,
                                content: ""
                            },
                            {
                                titre: "Chaînes(s) de levage / Caractéristiques",
                                status: false,
                                content: ""
                            },
                            {
                                titre: "Sangle(s) de levage / Caractéristiques",
                                status: false,
                                content: ""
                            }
                        ]
                    }
                ],

                // mouflageLevageAuxilaire: "",
                diametreLevageAuxilaire: "",


                modeInstallation: [
                    {
                        titre: "Pont roulant / Poutre roulante",
                        status: false,
                        tab: [
                            { titre: "Posé", status: false },
                            { titre: "Suspendu", status: false }
                        ]
                    },

                    {
                        titre: "Palan ou treuil",
                        status: false,
                        tab: [
                            { titre: "Sur monorail", status: false },
                            { titre: "Sur point fixe", status: false },
                            { titre: "Sur point fixe", status: false },
                            { titre: "Sur potence", status: false },
                            { titre: "Sur portique", status: false },
                            { titre: "Autre", status: false }
                        ]
                    }
                ],

                complementModeInstallation: "",
                flagComplementModeInstallation: false,

                sourceEnergie: [
                    { index: 0, titre: "Electrique", status: false, tab: [] },
                    { index: 1, titre: "Hydraulique", status: false, tab: [] },
                    { index: 2, titre: "Pneumatique", status: false, tab: [] },
                    {
                        index: 3, titre: "Levage", status: false, tab: [
                            { titre: "Motorisé", status: false },
                            { titre: "Non Motorisé", status: false }
                        ]
                    },
                    {
                        index: 4, titre: "Translation", status: false, tab: [
                            { index: 0, titre: "Motorisé", status: false },
                            { index: 1, titre: "Non Motorisé", status: false }
                        ]
                    },
                    {
                        index: 5, titre: "Direction", status: false, tab: [
                            { index: 0, titre: "Motorisé", status: false },
                            { index: 1, titre: "Non Motorisé", status: false }
                        ]
                    },
                    { index: 6, titre: "Autre", status: false, tab: [] }
                ],

                flagcomplementSourceEnergie: false,
                complementSourceEnergie: "",

                observateurId: "",

            },

            duplicate_description: {

                marquage: "",

                modeLevage: "",

                chargeMaximaleUtile: "",
                hauteurDeLevage: "",
                portee: "",
                porteFaux: "",
                longueurCheminRoulement: "",
                suspentesLevage: "",
                mouflage: "",
                diametre: "",


                levageAuxilaire: [
                    {
                        titre: "Sans Objet",
                        status: false,
                        tab: []
                    },
                    {
                        titre: "Charge maximale utile de chaque palan (kg)",
                        status: false,
                        tab: [
                            {
                                titre: "Câble(s) de levage / Composition",
                                status: false,
                                content: ""
                            },
                            {
                                titre: "Chaînes(s) de levage / Caractéristiques",
                                status: false,
                                content: ""
                            },
                            {
                                titre: "Sangle(s) de levage / Caractéristiques",
                                status: false,
                                content: ""
                            }
                        ]
                    }
                ],

                // mouflageLevageAuxilaire: "",
                diametreLevageAuxilaire: "",


                modeInstallation: [
                    {
                        titre: "Pont roulant / Poutre roulante",
                        status: false,
                        tab: [
                            { titre: "Posé", status: false },
                            { titre: "Suspendu", status: false }
                        ]
                    },

                    {
                        titre: "Palan ou treuil",
                        status: false,
                        tab: [
                            { titre: "Sur monorail", status: false },
                            { titre: "Sur point fixe", status: false },
                            { titre: "Sur point fixe", status: false },
                            { titre: "Sur potence", status: false },
                            { titre: "Sur portique", status: false },
                            { titre: "Autre", status: false }
                        ]
                    }
                ],

                complementModeInstallation: "",
                flagComplementModeInstallation: false,

                sourceEnergie: [
                    { index: 0, titre: "Electrique", status: false, tab: [] },
                    { index: 1, titre: "Hydraulique", status: false, tab: [] },
                    { index: 2, titre: "Pneumatique", status: false, tab: [] },
                    {
                        index: 3, titre: "Levage", status: false, tab: [
                            { titre: "Motorisé", status: false },
                            { titre: "Non Motorisé", status: false }
                        ]
                    },
                    {
                        index: 4, titre: "Translation", status: false, tab: [
                            { index: 0, titre: "Motorisé", status: false },
                            { index: 1, titre: "Non Motorisé", status: false }
                        ]
                    },
                    {
                        index: 5, titre: "Direction", status: false, tab: [
                            { index: 0, titre: "Motorisé", status: false },
                            { index: 1, titre: "Non Motorisé", status: false }
                        ]
                    },
                    { index: 6, titre: "Autre", status: false, tab: [] }
                ],

                flagcomplementSourceEnergie: false,
                complementSourceEnergie: "",

                observateurId: "",
            }

        }
    },

    props: {
        observateurId: String
    },


    components: {
        Loading
    },

    watch: {
        description: {
            handler() {
                const count = this.counter_watched++;
                if (count != 0 && count != 1 && count != 2) {
                    this.watched_sauvegarder = false;
                }

                this.notEmpty();
            },
            deep: true
        }
    },

    methods: {

        checkSourceEnergie() {

            const arr = [
                this.description.sourceEnergie[0].status,
                this.description.sourceEnergie[1].status,
                this.description.sourceEnergie[2].status,
                this.description.sourceEnergie[3].status,
                this.description.sourceEnergie[4].status,
                this.description.sourceEnergie[5].status,
                this.description.sourceEnergie[6].status
            ];

            if(arr.includes(true)) {
                return true;
            } else {
                return false;
            } 
        },

        checkModeInstallation() {
            const arr = [
                this.description.modeInstallation[0].status,
                this.description.modeInstallation[1].status
            ];

            if(arr.includes(true)) {
                return true;
            } else {
                return false;
            }
            
        },

        checkeLevageAuxilaire() {

            const arr = [
                this.description.levageAuxilaire[0].status,
                this.description.levageAuxilaire[1].status
            ];

            if(arr.includes(true)) {
                return true;
            } else {
                return false;
            }
            
        },

        checkCaracterstiques() {

            if (this.description.chargeMaximaleUtile == "") {
                return false;
            }

            if (this.description.hauteurDeLevage == "") {
                return false;
            }

            if (this.description.portee == "") {
                return false;
            }

            if (this.description.porteFaux == "") {
                return false;
            }

            if (this.description.longueurCheminRoulement == "") {
                return false;
            }

            if (this.description.suspentesLevage == "") {
                return false;
            }

            if (this.description.mouflage == "") {
                return false;
            }

            if (this.description.diametre == "") {
                return false;
            }

            return true;
        },

        checkProperties() {

            const arr = [
                this.checkSourceEnergie(),
                this.checkModeInstallation(),
                this.checkeLevageAuxilaire(),
                this.checkCaracterstiques()
            ];

            for(let i = 0; i < arr.length; i++) {
                if(arr[i] == false) {
                    return false;
                }

                return true
            }

        },

        notEmpty() {
            this.$emit("changeColorDescription_famille2_lev2", this.checkProperties());
        },

        saisirModeLevage(e) {
            this.description.modeLevage = e.target.value;
        },

        saisirChargeMaximaleUtile(e) {
            this.description.chargeMaximaleUtile = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
        },

        saisirHauteurDeLevage(e) {
            this.description.hauteurDeLevage = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();

        },

        saisirPortee(e) {
            this.description.portee = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
        },

        saisirPorteFaux(e) {
            this.description.porteFaux = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
        },

        saisirLongueurCheminRoulement(e) {
            this.description.longueurCheminRoulement = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
        },

        saisirSuspentesLevage(e) {
            this.description.suspentesLevage = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();

        },

        saisirMouflage(e) {
            this.description.mouflage = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
        },

        saisirDiametre(e) {
            this.description.diametre = e.target.value;
            this.colorCaracteristiques = this.checkCaracterstiques();
        },



        saisirLevageAuxilaire(index) {

            this.description.levageAuxilaire[index].status = true

            if (this.description.levageAuxilaire[index].titre == "Sans Objet") {
                this.description.levageAuxilaire[1].status = false;
                for (let i = 0; i < this.description.levageAuxilaire[1].tab.length; i++) {
                    this.description.levageAuxilaire[1].tab[i].status = false;
                    this.description.levageAuxilaire[1].tab[i].content = "";
                }
            }

            if (this.description.levageAuxilaire[index].titre == "Charge maximale utile de chaque palan (kg)") {
                this.description.levageAuxilaire[0].status = false;
                this.description.levageAuxilaire[0].tab = [];
            }

            if(this.description.levageAuxilaire[1].status == true) {
                this.description.levageAuxilaire[1].tab.push({
                    titre: "Mouflage (nombre de brins) :",
                    status: false,
                    content: ""
                });
            }

            if(this.description.levageAuxilaire[0].status == true) {
                for(let j = 0; j < this.description.levageAuxilaire[1].tab.length; j++) {
                    if(this.description.levageAuxilaire[1].tab[j].titre == 'Mouflage (nombre de brins) :') {
                        this.description.levageAuxilaire[1].tab.splice(j, 1);
                    }
                }
            }

            this.colorLevageAuxilaire = this.checkeLevageAuxilaire();
        },

        saisirSousLevageAuxilaire(e, index, i) {
            this.description.levageAuxilaire[index].tab[i].content = e.target.value;

            if(this.description.levageAuxilaire[index].tab[i].content.length == 0) {
                this.description.levageAuxilaire[index].tab[i].status = false;
            }

            if(this.description.levageAuxilaire[index].tab[i].content.length != 0) {
                this.description.levageAuxilaire[index].tab[i].status = true;
            }

            this.colorLevageAuxilaire = this.checkeLevageAuxilaire();
        },

        // saisirMouflageLevageAuxilaire(e) {
        //     this.description.mouflageLevageAuxilaire = e.target.value;
        //     this.colorLevageAuxilaire = this.checkeLevageAuxilaire();
        // },

        saisirDiametreLevageAuxilaire(e) {
            this.description.diametreLevageAuxilaire = e.target.value;
            this.colorLevageAuxilaire = this.checkeLevageAuxilaire();
        },



        saisirModeInstallation(index) {

            this.description.modeInstallation[index].status = true;

            if (this.description.modeInstallation[index].titre == "Pont roulant / Poutre roulante") {
                this.description.modeInstallation[1].status = false;
                for (let i = 0; i < this.description.modeInstallation[1].tab.length; i++) {
                    this.description.modeInstallation[1].tab[i].status = false;
                }

                this.description.flagComplementModeInstallation = false;
                this.description.complementModeInstallation = "";
            }

            if (this.description.modeInstallation[index].titre == "Palan ou treuil") {
                this.description.modeInstallation[0].status = false;
                for (let i = 0; i < this.description.modeInstallation[0].tab.length; i++) {
                    this.description.modeInstallation[0].tab[i].status = false;
                }
            }

            this.colorModeInstallation = this.checkModeInstallation();

        },

        saisirSousModeInstallation(index, i) {

            this.description.modeInstallation[index].tab[i].status = true;

            if (this.description.modeInstallation[index].tab[i].titre == "Autre" && this.description.modeInstallation[index].tab[i].status == true) {
                this.description.flagComplementModeInstallation = true;
            } else {
                this.description.flagComplementModeInstallation = false;
                this.description.complementModeInstallation = "";
            }

            this.colorModeInstallation = this.checkModeInstallation();

        },

        saisirComplementModeInstallation(e) {
            this.description.complementModeInstallation = e.target.value;
            this.colorModeInstallation = this.checkModeInstallation();
        },

        sisairSourceEnergie(index) {

            if (index == 6) {
                this.description.flagcomplementSourceEnergie = true;
            } else {
                this.description.flagcomplementSourceEnergie = false;
                this.description.complementSourceEnergie = "";
            }


            for (let i = 0; i < this.description.sourceEnergie.length; i++) {

                if (this.description.sourceEnergie[i].index == index) {
                    this.description.sourceEnergie[i].status = true;
                } else {

                    this.description.sourceEnergie[i].status = false;

                    if (this.description.sourceEnergie[i].tab.length == 2) {
                        this.description.sourceEnergie[i].tab[0].status = false;
                        this.description.sourceEnergie[i].tab[1].status = false;
                    }

                }
            }


            this.colorSourceEnergie = this.checkSourceEnergie();

        },

        sisairSousSourceEnergie(index, i) {

            for (let i = 0; i < this.description.sourceEnergie.length; i++) {
                for (let j = 0; j < this.description.sourceEnergie[i].tab.length; j++) {
                    if (this.description.sourceEnergie[i].tab[j].length != 0) {
                        this.description.sourceEnergie[i].tab[j].status = false;
                    }
                }
            }

            this.description.sourceEnergie[index].tab[i].status = true;

            this.colorSourceEnergie = this.checkSourceEnergie();

        },



        sauvegarde() {

            Descriptions.create(this.description)
                .then((result) => {
                    if (result) {
                        this.watched_sauvegarder = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },


        reset() {
            Descriptions.reset(this.observateurId)
                .then(() => {

                    this.description = this.duplicate_description;

                    this.flagLoading = false;
                    this.colorSourceEnergie = this.checkSourceEnergie();
                    this.colorModeInstallation = this.checkModeInstallation();
                    this.colorLevageAuxilaire = this.checkeLevageAuxilaire();
                    this.colorCaracteristiques = this.checkCaracterstiques();
                    this.$emit("changeColorDescription_famille2_lev2", false);

                })
                .catch((error) => {
                    console.log(error);
                })
        }


    },


    created() {

        this.flagLoading = true;
        this.description.observateurId = this.observateurId;
        this.duplicate_description.observateurId = this.observateurId;

        Observateurs.selected(this.observateurId)
            .then((result) => {
                this.description.marquage = result.data.marquage;
                this.duplicate_description.marquage = result.data.marquage;
            })
            .catch((error) => {
                console.log(error)
            });


        Descriptions.select(this.observateurId)
            .then((result) => {

                if (result.data.description != null) {
                    this.description = result.data.description;
                } 


                this.colorSourceEnergie = this.checkSourceEnergie();
                this.colorModeInstallation = this.checkModeInstallation();
                this.colorLevageAuxilaire = this.checkeLevageAuxilaire();
                this.colorCaracteristiques = this.checkCaracterstiques();
                this.watched_sauvegarder = true;
                this.flagLoading = false;
                return this.notEmpty();
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
</script>

<style scoped>

/* Satrt Configuration Table */
.descriptions {
    margin-top: 10px;
    margin-bottom: 100px;
    width: inherit;
}


.descriptions table {
    border-collapse: collapse;
    border: none;
}

tr {
    border-top: 1px solid black;
}

tr:first-child {
    border-top: none;
}

td {
    text-align: start;
    border: none !important;
    padding-top: 10px;
    padding-bottom: 10px;
}

table tr td:nth-child(1) {
    width: 40px;
    border-right: 1px solid black;
}

/* End Configuration Table */


/* Start First */
.descriptions table tr td.first {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.descriptions table tr td.first input {
    width: 300px;
}
/* End First */


/* Start Second */
.descriptions table tr td.second {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.descriptions table tr td.second select {
    width: 300px;
}

/* End Second */


/* Start Third */

.descriptions table tr td.third {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.descriptions table tr td.third p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.descriptions table tr td.third p input {
    width: 200px;
}

.descriptions table tr td.third p select {
    width: 350px;
}
/* End Third */


/* Start fourth */
.descriptions table tr td.fourth {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.descriptions table tr td.fourth ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 3px;
    margin-bottom: 3px;
    padding: 0;
}

.descriptions table tr td.fourth ul li:nth-child(1) {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
}

.descriptions table tr td.fourth ul li:nth-child(2) {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0;
    padding: 0;
}

.descriptions table tr td.fourth ul li input {
    margin: 0;
}
/* End fourth */



/* Start fifth */
.descriptions table tr td.fifth  {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.descriptions table tr td.fifth p  {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;

}

.descriptions table tr td.fifth p.autre  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 5px;
}

.descriptions table tr td.fifth p.autre input {
    width: 300px;
}

.descriptions table tr td.fifth p ul {
    margin: 0;
    padding: 0;
}

.descriptions table tr td.fifth p ul li {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
}

/* End fifth */


/* Start sixth */
.descriptions table tr td.sixth {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
}

.descriptions table tr td.sixth p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0;
}

.descriptions table tr td.sixth p ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0;
    padding: 0;
}

.descriptions table tr td.sixth p ul li {
    list-style: none;
}
/* End sixth */

/* Start Configration ALL */
.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}

input,
select {
    height: 25px;
    width: 120px;
    font-size: medium;
}

.sauvegarder,
.reset {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-top: 5px;
}

.sauvegarder .watch {
    background-color: green;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .watch:hover {
    background-color: rgb(2, 49, 2);
}
 
.sauvegarder .not-watch {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .not-watch:hover {
    background-color: rgb(84, 1, 1);
}

.reset button {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
}

.reset button:hover {
    background-color: rgb(84, 1, 1);
}

/* End COnfigration ALL */

tr {
    border-bottom: 1pt solid black;
}
</style>