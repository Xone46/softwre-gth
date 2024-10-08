<template>

    <div class="descriptions">

        <table>

            <tr>
                <td>B-1</td>
                <td :class="[description.marquage.length != 0 ? 'saved' : 'not-saved']">MARQUAGE</td>
                <td>
                    <input type="text" :value="description.marquage" disabled>
                </td>
            </tr>

            <tr>
                <td>B-2</td>
                <td :class="[description.modeLevage.length != 0 ? 'saved' : 'not-saved']">MODE DE LEVAGE</td>
                <td>
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
                <td>
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
                <td>
                    <ul v-for="(item, index) in description.levageAuxilaire" :key="index">
                        <li>
                            {{ item.titre }}<input type="radio" name="levageAuxilaire" @input="saisirLevageAuxilaire(index)" :value="item.status">
                        </li>
                        <li v-if="item.status && item.tab.length != 0">
                            <p v-for="(el, i) in item.tab" :key="i">
                                {{ el.titre }} <input type="text" @input="saisirSousLevageAuxilaire($event, index, i)" :value="el.content">
                            </p>
                        </li>
                    </ul>

                    <p>
                        Mouflage (nombre de brins) : <input type="text" @input="saisirMouflageLevageAuxilaire($event)" :value="description.mouflageLevageAuxilaire">
                    </p>
                    <p>
                        Diamètre ou pas théorique de câble(s) ou de chaîne(s) (mm) : <input type="text" @input="saisirDiametreLevageAuxilaire($event)" :value="description.diametreLevageAuxilaire">
                    </p>

                </td>
            </tr>

            <tr>
                <td>B-5</td>
                <td :class="[colorModeInstallation == true ? 'saved' : 'not-saved']">MODE D'INSTALLATION</td>
                <td>
                    <P v-for="(item, index) in description.modeInstallation" :key="index">
                        {{ item.titre }}<input type="radio" name="modeInstallation" @input="saisirModeInstallation(index)" :value="item.status">
                        <ul v-if="item.status">
                            <li v-for="(el, i) in item.tab" :key="i">
                                {{ el.titre }}<input type="radio" name="sousModeInstallation" @input="saisirSousModeInstallation(index, i)" :value="el.status">
                            </li>
                        </ul>
                    </p>
                    <p v-if="description.flagComplementModeInstallation"><input type="text" @input="saisirComplementModeInstallation($event)" :value="description.complementModeInstallation"></p>
                </td>
            </tr>

            <tr>
                <td>B-6</td>
                <td :class="[colorSourceEnergie == true ? 'saved' : 'not-saved']">SOURCE D'ENERGIE</td>
                <td>
                    <p v-for="(item, index) in description.sourceEnergie" :key="index">
                    <ul>
                        <li>{{ item.one }}<input type="radio" name="sourceEnergie" @input="sisairSourceEnergieOne(index)"></li>
                        <li v-if="[0, 1, 2, 6].includes(index)">{{ item.tow }}<input type="radio" name="sousSourceEnergie" @input="sisairSourceEnergieTow(index)"></li>
                        <li v-if="[0, 1, 2, 6].includes(index)">{{ item.tree }}<input type="radio" name="sousSourceEnergie" @input="sisairSourceEnergieTree(index)"></li>
                    </ul>
                    </p>
                    <p v-if="description.flagcomplementSourceEnergie"><input type="text" @input="sisairComplementSourceEnergie($event)" :value="description.complementSourceEnergie"></p>
                </td>
            </tr>



        </table>

        <!-- <div class="sauvegarder">
            <button :class="[watched_sauvegarder == true ? 'watch' : 'not-watch']" @click="sauvegarde">
                {{ watched_sauvegarder == true ? "Déjà enregistré" : "Non enregistré" }}
            </button>
        </div> -->

        <!-- <div class="reset">
            <button @click="reset">Reset</button>
        </div> -->

    </div>

</template>

<script>
import Descriptions from "@/requests/appareil_levage/famille2_lev2/Descriptions"
import Observateurs from "@/requests/Observateurs"
export default {
    name: 'renseignement-component',
    data() {
        return {

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

                chargeMaximaleUtile: "Sans objet",
                hauteurDeLevage: "Sans objet",
                course: "Sans objet",
                hauteurLevage: "Sans objet",
                portee: "Sans objet",
                porteFaux: "Sans objet",
                longueurCheminRoulement: "Sans objet",
                suspentesLevage: "",
                mouflage: "Sans objet",
                diametre: "Sans objet",


                levageAuxilaire: [
                    {
                        titre: "Sans objet",
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

                mouflageLevageAuxilaire: "",
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
                    { one: "Electrique", stautsOne: false },
                    { one: "Hydraulique", stautsOne: false },
                    { one: "Pneumatique", stautsOne: false },
                    { one: "Levage", stautsOne: false, tow: "Motorisé", statusTow: false, tree: "Non Motorisé", statusTree: false },
                    { one: "Translation", stautsOne: false, tow: "Motorisé", statusTow: false, tree: "Non Motorisé", statusTree: false },
                    { one: "Direction", stautsOne: false, tow: "Motorisé", statusTow: false, tree: "Non Motorisé", statusTree: false },
                    { one: "Autre", stautsOne: false }
                ],

                flagcomplementSourceEnergie: false,
                complementSourceEnergie: "",

                observateurId: "",

            },

            duplicate_description: {
                observateurId: ""
            }

        }
    },

    props: {
        observateurId: String
    },


    components: {
    },

    watch: {
        // description: {
        //     handler() {
        //         const count = this.counter_watched++;
        //         if (count != 0 && count != 1 && count != 2) {
        //             this.watched_sauvegarder = false;
        //         }

        //         this.notEmpty();
        //     },
        //     deep: true
        // }
    },

    methods: {

        saisirModeLevage(e) {
            this.description.modeLevage = e.target.value;
        },

        saisirChargeMaximaleUtile(e) {
            this.description.chargeMaximaleUtile = e.target.value;
        },

        saisirHauteurDeLevage(e) {
            this.description.hauteurDeLevage = e.target.value;
        },

        saisirPortee(e) {
            this.description.portee = e.target.value;
        },

        saisirPorteFaux(e) {
            this.description.porteFaux = e.target.value;
        },

        saisirLongueurCheminRoulement(e) {
            this.description.longueurCheminRoulement = e.target.value;
        },

        saisirSuspentesLevage(e) {
            this.description.suspentesLevage = e.target.value;
        },

        saisirMouflage(e) {
            this.description.mouflage = e.target.value;
        },

        saisirDiametre(e) {
            this.description.diametre = e.target.value;
        },



        saisirLevageAuxilaire(index) {
            
            this.description.levageAuxilaire[index].status = true

            if(this.description.levageAuxilaire[index].titre == "Sans objet") {
                this.description.levageAuxilaire[1].status = false;
                for(let i = 0; i < this.description.levageAuxilaire[1].tab.length; i++) {
                    this.description.levageAuxilaire[1].tab[i].status = false;
                    this.description.levageAuxilaire[1].tab[i].content = "";
                }
            } 

            if(this.description.levageAuxilaire[index].titre == "Charge maximale utile de chaque palan (kg)") {
                this.description.levageAuxilaire[0].status = false;
                this.description.levageAuxilaire[0].tab = [];
            }

        },

        saisirSousLevageAuxilaire(e, index, i) {
            this.description.levageAuxilaire[index].tab[i].content = e.target.value;
        },

        saisirMouflageLevageAuxilaire(e) {
            this.description.mouflageLevageAuxilaire = e.target.value;
        },

        saisirDiametreLevageAuxilaire(e) {
            this.description.diametreLevageAuxilaire = e.target.value;
        },


        
        saisirModeInstallation(index) {

            this.description.modeInstallation[index].status = true;

            if(this.description.modeInstallation[index].titre == "Pont roulant / Poutre roulante") {
                this.description.modeInstallation[1].status = false;
                for(let i = 0; i < this.description.modeInstallation[1].tab.length; i++) {
                    this.description.modeInstallation[1].tab[i].status = false;
                }
            }

            if(this.description.modeInstallation[index].titre == "Palan ou treuil") {
                this.description.modeInstallation[0].status = false;
                for(let i = 0; i < this.description.modeInstallation[0].tab.length; i++) {
                    this.description.modeInstallation[1].tab[i].status = false;
                }
            }

        },

        saisirSousModeInstallation(index, i) {

            this.description.modeInstallation[index].tab[i].status = true;

            if(this.description.modeInstallation[index].tab[i].titre == "Autre" && this.description.modeInstallation[index].tab[i].status == true) {
                this.description.flagComplementModeInstallation  = true;
            } else {
                this.description.flagComplementModeInstallation  = false;
            }

        },

        saisirComplementModeInstallation(e) {
            this.description.complementModeInstallation = e.target.value;
        },

        sisairSourceEnergieOne(index) {
            this.description.sourceEnergie[index].stautsOne = true;
            if (this.description.sourceEnergie[index].stautsOne == true && index == 1) {
                this.description.flagcomplementSourceEnergie = true;
            }
        },

        sisairSourceEnergieTow(index) {
            this.description.sourceEnergie[index].statusTow = true;
            this.description.flagcomplementSourceEnergie = false;
        },

        sisairSourceEnergieTree(index) {
            this.description.sourceEnergie[index].statusTree = true;
            this.description.flagcomplementSourceEnergie = false;
        },

        sisairComplementSourceEnergie(e) {
            this.description.complementSourceEnergie = e.target.value;
        },

        // saisirPorteeMinimale(e) {
        //     this.description.porteeMinimale = e.target.value;
        //     this.colorCaracteristiques = this.checkCaracterstiques();
        //     this.colorSuspentes = this.checkeSuspentes();
        // },

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


    },


    created() {


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
                    this.flagReset = true;
                    this.description = result.data.description;
                }

                this.colorCaracteristiques = this.checkCaracterstiques();
                this.colorSuspentes = this.checkeSuspentes();
                this.watched_sauvegarder = true;
                return this.notEmpty();
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


.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}

input,
select {
    height: 25px;
    font-size: medium;
}

td div p {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
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

.sauvegarder .not-watch {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}


.reset button {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
}
</style>