<template>

    <div class="conclusion">

        <h1 class="observation">Observations complémentaires</h1>

        <div class="alignment">
            <input type="checkbox" :checked="(conclusion.a != '')" @input="saisirA($event)"
                value="Les essais ont été réalisés avec les charges mises à disposition">
            <label>
                Les essais ont été réalisés avec les charges mises à disposition {{ conclusion.poids == "" ? "......." : conclusion.poids }}
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
            <input type="checkbox" :checked="(conclusion.b != '')" @input="saisirB($event)"
                value="L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil.">
            <label>L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu
                de réaliser
                les essais correspondants avant utilisation de l'appareil.
            </label>
        </div>

        <div class="alignment">
            <input type="checkbox" :checked="(conclusion.c != '')" @input="saisirC($event)"
                value="Absence de tableau des charges pour réaliser les essais, il y aura lieu de réaliser les essais correspondants à la capacité nominale de l'appareil.">
            <label>Absence de tableau des charges pour réaliser les essais, il y aura lieu de réaliser les essais
                correspondants à
                la capacité nominale de l'appareil.
            </label>
        </div>


        <h1 class="conclusion">Conclusion</h1>
        <div class="alignment">
            <input type="checkbox" :checked="(conclusion.d != '')" @input="saisirD($event)"
                value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.">
            <label>La vérification de l'état de conservation et les essais de
                fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation
                ni d'anomalie.
            </label>
        </div>

        <div class="alignment">
            <input type="checkbox" :checked="(conclusion.e != '')" @input="saisirE($event)" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la
                présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil
                auxquelles il convient de remédier.">
            <label>La vérification de l'état de conservation et les
                essais de fonctionnement réalisés dans les limites de la
                présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil
                auxquelles il convient de remédier.
            </label>
        </div>

        <div class="alignment">
            <input type="checkbox" :checked="(conclusion.f != '')" @input="saisirF($event)" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la
                présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il
                convient de remédier.">
            <label>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites
                de la
                présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il
                convient de remédier.
            </label>
        </div>

        <div class="alignment">
            <input type="checkbox" :checked="(conclusion.g != '')" @input="saisirG($event)" value="Commentaire complémentaire :">
            <label>Commentaire complémentaire :
            </label>
        </div>

        <div class="alignment">
            <label>{{ this.conclusion.commentaire }}</label>
        </div>

        <Insert v-if="conclusion.falgInsert" :typeInsert="conclusion.typeInsert" :valueInsert="conclusion.valueInsert" @valider="valider"
            @annuler="annuler" />

        <div class="sauvegarder">
            <button :class="[watched_sauvegarder == true ? 'watch' : 'not-watch']" @click="sauvegarde">
                {{ watched_sauvegarder == true ? "Déjà envoyé" : "Envoyer" }}
            </button>
        </div>

       <div class="reset">
            <button @click="reset">Initialiser</button>
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
            conclusion : {
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


        }
    },

    components: {
        Insert
    },

    watch: {

        conclusion: {
            handler() {

                if((this.counter_watched++) > 0) {
                    this.watched_sauvegarder = false;
                }

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
                this.conclusion.a != "" ? true : false,
                this.conclusion.b != "" ? true : false,
                this.conclusion.c != "" ? true : false
            ];

            const arrTow = [
                this.conclusion.d != "" ? true : false,
                this.conclusion.e != "" ? true : false,
                this.conclusion.f != "" ? true : false,
                this.conclusion.g != "" ? true : false
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
                this.conclusion.poids = event;
                this.conclusion.a = this.conclusion.a.concat(' ', `${this.conclusion.poids} kg.`);
            }

            if (type == "commentaire") {
                this.conclusion.commentaire = event;
                this.conclusion.g = this.conclusion.g.concat(' ', this.conclusion.commentaire);
            }

            this.conclusion.falgInsert = false;
        },

        annuler() {
            this.conclusion.falgInsert = false;
        },

        saisirA(event) {
            if (this.conclusion.a != "") {
                this.conclusion.a = "";
                this.conclusion.falgInsert = false;
                this.conclusion.poids = "";
            } else {
                this.conclusion.a = event.target.value;
                this.conclusion.typeInsert = "poids";
                this.conclusion.valueInsert = this.conclusion.poids
                this.conclusion.falgInsert = true;
            }
        },

        saisirB(event) {
            if (this.conclusion.b != "") {
                this.conclusion.b = "";
            } else {
                this.conclusion.b = event.target.value;
            }
        },

        saisirC(event) {
            if (this.conclusion.c != "") {
                this.conclusion.c = "";
            } else {
                this.conclusion.c = event.target.value;
            }
        },

        saisirD(event) {
            if (this.conclusion.d != "") {
                this.conclusion.d = "";
            } else {
                this.conclusion.d = event.target.value;
            }
        },

        saisirE(event) {

            if (this.conclusion.e != "") {
                this.conclusion.e = "";
            } else {
                this.conclusion.e = event.target.value;
            }
        },

        saisirF(event) {

            if (this.conclusion.f != "") {
                this.conclusion.f = "";
            } else {
                this.conclusion.f = event.target.value;
            }
        },

        saisirG(event) {

            if (this.conclusion.g != "") {
                this.conclusion.g = "";
                this.conclusion.falgInsert = false;
                this.conclusion.commentaire = "";
            } else {
                this.conclusion.g = event.target.value;
                this.conclusion.typeInsert = "commentaire";
                this.conclusion.valueInsert = this.conclusion.commentaire
                this.conclusion.falgInsert = true;
            }
        },

        sauvegarde() {
            Conclusion.create(this.conclusion.a, this.conclusion.b, this.conclusion.c, this.conclusion.d, this.conclusion.e, this.conclusion.f, this.conclusion.g, this.conclusion.poids, this.conclusion.commentaire, this.observateurId, this.conclusion.child)
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
            Conclusion.reset(this.conclusion.observateurId)
                .then(() => {

                    this.conclusion.falgInsert = false;
                    this.conclusion.typeInsert = ``;
                    this.conclusion.poids = ``;
                    this.conclusion.commentaire = '';
                    this.conclusion.a = "";
                    this.conclusion.b = "";
                    this.conclusion.c = "";
                    this.conclusion.d = "";
                    this.conclusion.e = "";
                    this.conclusion.f = "";
                    this.conclusion.g = "";

                    this.watched_sauvegarder = false;
                    this.$emit("changeColorConclusion_famille3_lev3", this.checkProperties());

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    created() {

        console.log(this.observateurId)

        Conclusion.select(this.observateurId)
            .then((result) => {

                console.log(result.data);

                if (result.data != null) {
                    this.conclusion.poids = result.data.poids;
                    this.conclusion.commentaire = result.data.commentaire;
                    this.conclusion.a = result.data.a;
                    this.conclusion.b = result.data.b;
                    this.conclusion.c = result.data.c;
                    this.conclusion.d = result.data.d;
                    this.conclusion.e = result.data.e;
                    this.conclusion.f = result.data.f;
                    this.conclusion.g = result.data.g;
                    this.conclusion.child = result.data.child;
                    this.watched_sauvegarder = true;
                    return this.notEmpty();
                }

                if(result.data == null) {
                    this.watched_sauvegarder = false;
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

.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}


.spinner {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


</style>