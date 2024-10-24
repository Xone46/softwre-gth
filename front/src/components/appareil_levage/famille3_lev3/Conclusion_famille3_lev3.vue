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

        <div class="sauvegarder">
            <button :class="[watched_sauvegarder == true ? 'watch' : 'not-watch']" @click="sauvegarde">
                {{ watched_sauvegarder == true ? "Déjà enregistré" : "Non enregistré" }}
            </button>
        </div>

        <div class="reset">
            <button @click="reset">Reset</button>
        </div>


    </div>

</template>

<script>
import Conclusion from "@/requests/appareil_levage/famille3_lev3/conclusion"
import Insert from "@/components/appareil_levage/famille3_lev3/models_famille3_lev3/Insert.vue"

export default {
    name: 'conclusion-component',
    data() {
        return {
            counter_watched: 0,
            watched_sauvegarder: false,
            falgInsert: false,
            typeInsert: ``,
            valueInsert: "",
            poids: ``,
            commentaire: '',
            a: "",
            child: [
                {
                    content: "a) Le chef d'établissement doit définir les mesures organisationnelles et techniques visant à restreindre provisoirement l'utilisation de l'appareil à la valeur de ces charges.",
                }
                , {
                    content: "b) Avant toute utilisation de l'appareil à une charge supérieure à nos essais, il y aura lieu de réaliser des essais de fonctionnement correspondants à la capacité nominale de l'appareil ainsi que l'essai de surcharge.",
                }],
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

    watch: {

        a: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },

        b: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },

        c: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },

        d: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },

        e: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },

        f: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },

        g: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },

        falgInsert: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },
        typeInsert: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },

        valueInsert: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },

        poids: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        },

        commentaire: {
            handler() {
                this.watched_sauvegarder = false;
                this.notEmpty();
            },
            deep: true
        }
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


            if (arrOne.includes(true)) {
                if (arrTow.includes(true)) {
                    return true;
                }
            } else {
                return false;
            }

        },

        notEmpty() {
            this.$emit("changeColorConclusion_famille3_lev3", this.checkProperties());
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
        },

        annuler() {
            this.falgInsert = false;
        },

        saisirA(event) {
            if (this.a != "") {
                this.a = "";
                this.falgInsert = false;
                this.poids = "";
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
        },

        saisirC(event) {
            if (this.c != "") {
                this.c = "";
            } else {
                this.c = event.target.value;
            }
        },

        saisirD(event) {
            if (this.d != "") {
                this.d = "";
            } else {
                this.d = event.target.value;
            }
        },

        saisirE(event) {

            if (this.e != "") {
                this.e = "";
            } else {
                this.e = event.target.value;
            }
        },

        saisirF(event) {

            if (this.f != "") {
                this.f = "";
            } else {
                this.f = event.target.value;
            }
        },

        saisirG(event) {

            if (this.g != "") {
                this.g = "";
                this.falgInsert = false;
                this.commentaire = "";
            } else {
                this.g = event.target.value;
                this.typeInsert = "commentaire";
                this.valueInsert = this.commentaire
                this.falgInsert = true;
            }
        },

        sauvegarde() {
            Conclusion.create(this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.poids, this.commentaire, this.observateurId, this.child)
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
            Conclusion.reset(this.observateurId)
                .then(() => {

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

                    this.watched_sauvegarder = false;
                    this.$emit("changeColorConclusion_famille3_lev3", this.checkProperties());

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
                    this.poids = result.data.poids;
                    this.commentaire = result.data.commentaire;
                    this.a = result.data.a;
                    this.b = result.data.b;
                    this.c = result.data.c;
                    this.d = result.data.d;
                    this.e = result.data.e;
                    this.f = result.data.f;
                    this.g = result.data.g;
                    this.childA = result.data.childA;
                    this.watched_sauvegarder = true;
                    return this.notEmpty();
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

.sauvegarder , .reset {
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

.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}

</style>