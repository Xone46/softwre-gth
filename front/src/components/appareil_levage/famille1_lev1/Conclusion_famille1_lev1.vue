<template>

    <div class="conclusion">

        <h1 class="observation">Observations complémentaires</h1>

        <div class="alignment">
            <input type="checkbox" :checked="(a != '')" @input="saisirA($event)"
                value="Les essais ont été réalisés avec les charges mises à disposition">
            <label>
                Les essais ont été réalisés avec les charges mises à disposition {{ poids == "" ? "......." : poids }}
                Kg
            </label>
        </div>

        <div class="alignment-nested">
            <label>
                a) le chef d'établissement doit définir les mesures organisationnelles et techniques visant à
                restreindre provisoirement l'utilisation de l'appareil à la valeur de ces charges.
            </label>
        </div>
        <div class="alignment-nested">
            <label>
                b) Avant toute utilisation de l'appareil à une charge supérieure à nos essais, il y aura lieu de
                réaliser des essais de fonctionnement correspondants à la capacité nominale de l'appareil ainsi que
                l'essai de surcharge.
            </label>
        </div>

        <div class="alignment">
            <input type="checkbox" :checked="(b != '')" @input="saisirB($event)"
                value="L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil.">
            <label>L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu
                de réaliser
                les essais correspondants avant utilisation de l'appareil.
            </label>
        </div>

        <div class="alignment">
            <input type="checkbox" :checked="(c != '')" @input="saisirC($event)"
                value="Absence de tableau des charges pour réaliser les essais, il y aura lieu de réaliser les essais correspondants à la capacité nominale de l'appareil.">
            <label>Absence de tableau des charges pour réaliser les essais, il y aura lieu de réaliser les essais
                correspondants à
                la capacité nominale de l'appareil.
            </label>
        </div>


        <h1 class="conclusion">Conclusion</h1>
        <div class="alignment">
            <input type="checkbox" :checked="(d != '')" @input="saisirD($event)"
                value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.">
            <label>La vérification de l'état de conservation et les essais de
                fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation
                ni d'anomalie.
            </label>
        </div>

        <div class="alignment">
            <input type="checkbox" :checked="(e != '')" @input="saisirE($event)" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la
                présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil
                auxquelles il convient de remédier.">
            <label>La vérification de l'état de conservation et les
                essais de fonctionnement réalisés dans les limites de la
                présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil
                auxquelles il convient de remédier.
            </label>
        </div>

        <div class="alignment">
            <input type="checkbox" :checked="(f != '')" @input="saisirF($event)" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la
                présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il
                convient de remédier.">
            <label>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites
                de la
                présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il
                convient de remédier.
            </label>
        </div>

        <div class="alignment">
            <input type="checkbox" :checked="(g != '')" @input="saisirG($event)" value="Commentaire complémentaire :">
            <label>Commentaire complémentaire :
            </label>
        </div>

        <div class="alignment">
            <label>{{ this.commentaire }}</label>
        </div>

        <Insert v-if="falgInsert" :typeInsert="typeInsert" :valueInsert="valueInsert" @valider="valider"
            @annuler="annuler" />

        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>

    </div>

</template>

<script>
import Conclusion from "@/requests/appareil_levage/famille1_lev1/conclusion"
import Insert from "@/components/appareil_levage/famille1_lev1/models_famille1_lev1/Insert.vue"

export default {
    name: 'conclusion-component',
    data() {
        return {
            flagReset: false,
            falgInsert: false,
            typeInsert: ``,
            valueInsert: "",
            poids: ``,
            commentaire: '',
            a: "",
            b: "",
            c: "",
            d: "",
            e: "",
            f: "",
            g: ""
        }
    },

    components: {
        Insert
    },

    props: {
        observateurId: String
    },

    methods: {

        checkProperties() {

            const arrOne = [
                this.a != "" ? true : false,
                this.b != "" ? true : false,
                this.c != "" ? true : false
            ];

            const arrTow = [
                this.d != "" ? true : false,
                this.e != "" ? true : false,
                this.f != "" ? true : false,
                this.g != "" ? true : false
            ];


            if(arrOne.includes(true)) {
                if(arrTow.includes(true)) {
                    return true;
                }
            } else {
                return false;
            }

        },

        notEmpty() {
            this.$emit("changeColorConclusion_famille1_lev1", this.checkProperties())
        },


        valider(event, type) {

            if (type == "poids") {
                this.poids = event;
                this.a = this.a.concat(' ', `${this.poids} kg.`);
            }

            if (type == "commentaire") {
                this.commentaire = event;
                this.g = this.g.concat(' ', this.commentaire);
            }

            this.falgInsert = false;
            this.sauvegarde();
        },

        annuler() {
            this.falgInsert = false;
        },

        saisirA(event) {

            if (this.a != "") {
                this.a = "";
                this.falgInsert = false;
                this.poids = "";
                this.sauvegarde();
            } else {
                this.a = event.target.value;
                this.typeInsert = "poids";
                this.valueInsert = this.poids
                this.falgInsert = true;
            }

        },

        saisirB(event) {

            if (this.b != "") {
                this.b = "";
            } else {
                this.b = event.target.value;
            }
            this.sauvegarde();
        },

        saisirC(event) {

            if (this.c != "") {
                this.c = "";
            } else {
                this.c = event.target.value;
            }
            this.sauvegarde();
        },

        saisirD(event) {

            if (this.d != "") {
                this.d = "";
            } else {
                this.d = event.target.value;
            }
            this.sauvegarde();
        },

        saisirE(event) {

            if (this.e != "") {
                this.e = "";
            } else {
                this.e = event.target.value;
            }
            this.sauvegarde();
        },

        saisirF(event) {

            if (this.f != "") {
                this.f = "";
            } else {
                this.f = event.target.value;
            }
            this.sauvegarde();
        },

        saisirG(event) {


            if (this.g != "") {
                this.g = "";
                this.falgInsert = false;
                this.commentaire = "";
                this.sauvegarde();
            } else {
                this.g = event.target.value;
                this.typeInsert = "commentaire";
                this.valueInsert = this.commentaire
                this.falgInsert = true;
            }
        },

        sauvegarde() {
            Conclusion.create(this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.poids, this.commentaire, this.observateurId)
                .then(() => {
                    this.flagReset = true;
                    this.notEmpty();
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        reset() {
            Conclusion.reset(this.observateurId)
                .then(() => {
                    this.flagReset = false;
                    this.falgInsert = false;
                    this.typeInsert = ``;
                    this.poids = ``;
                    this.commentaire = '';
                    this.a = "";
                    this.b = "";
                    this.c = "";
                    this.d = "";
                    this.e = "";
                    this.f = "";
                    this.g = "";
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    created() {

        Conclusion.select(this.observateurId)
            .then((result) => {
                if (result.data != null) {
                    this.flagReset = true;
                    this.poids = result.data.poids;
                    this.commentaire = result.data.commentaire;
                    this.a = result.data.a;
                    this.b = result.data.b;
                    this.c = result.data.c;
                    this.d = result.data.d;
                    this.e = result.data.e;
                    this.f = result.data.f;
                    this.g = result.data.g;
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
</script>

<style scoped>
.conclusion {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    padding: 5;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.alignment {
    width: 80%;
    display: flex;
    flex-direction: row;
    text-align: justify;
    text-justify: inter-word;
    margin-top: 10px;
    margin-bottom: 10px;
}


.alignment>label {
    width: 100%;
    margin-left: 10px;
}

.alignment-nested {
    width: 80%;
    display: flex;
    flex-direction: row;
    text-align: justify;
    text-justify: inter-word;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 20px;
}

.sauvegarde,
.reset {
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


.reset button {
    background-color: red;
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