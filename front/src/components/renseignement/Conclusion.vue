<template>

    <div class="conclusion">

        <h1 class="observation">Observations complémentaires</h1>
        
        <div class="alignment" v-html="tagA" :class="[a.length != 0 ? 'saved' : 'not-saved']" @input="getValueTagA"></div>
        <div class="alignment-nested" v-html="sousAOne" :class="[a.length != 0 ? 'saved' : 'not-saved']"></div>
        <div class="alignment-nested" v-html="sousATow" :class="[a.length != 0 ? 'saved' : 'not-saved']"></div>
        <div class="alignment" v-html="tagB" :class="[b.length != 0 ? 'saved' : 'not-saved']" @input="getValueTagB"></div>
        <div class="alignment" v-html="tagC" :class="[c.length != 0 ? 'saved' : 'not-saved']" @input="getValueTagC"></div>


        <h1 class="conclusion">Conclusion</h1>
        <div class="alignment" v-html="tagD" :class="[d.length != 0 ? 'saved' : 'not-saved']" @input="getValueTagD"></div>
        <div class="alignment" v-html="tagE" :class="[e.length != 0 ? 'saved' : 'not-saved']" @input="getValueTagE"></div>
        <div class="alignment" v-html="tagF" :class="[f.length != 0 ? 'saved' : 'not-saved']" @input="getValueTagF"></div>
        <div class="alignment" v-html="tagG" :class="[g.length != 0 ? 'saved' : 'not-saved']" @input="getValueTagG"></div>

        <div id="commentaire">{{ this.commentaire }}</div>

        <Insert v-if="falgInsert" :typeInsert="typeInsert" @valider="valider" @annuler="annuler" />


        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>

    </div>

</template>

<script>
import Conclusion from "@/requests/conclusion"
import Insert from "@/components/models/Insert.vue"

export default {
    name: 'conclusion-component',
    data() {
        return {
            flagReset: false,
            falgInsert: false,
            typeInsert: ``,
            poids: ``,
            commentaire: '',
            tagA: `<input type="radio" name="observations" value="Les essais ont été réalisés avec les charges mises à disposition."><label>Les essais ont été réalisés avec les charges mises à disposition.</label>`,
            a: ``,
            sousAOne: `<label>(a) le chef d'établissement doit définir les mesures organisationnelles et techniques visant à restreindre provisoirement l'utilisation de l'appareil à la valeur de ces charges.</label>`,
            sousATow: `<label>(b) Avant toute utilisation de l'appareil à une charge supérieure à nos essais, il y aura lieu de réaliser des essais de fonctionnement correspondants à la capacité nominale de l'appareil ainsi que l'essai de surcharge.</label>`,
            tagB: `<input type="radio" name="observations" value="L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil."><label>L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil.</label>`,
            b: ``,
            tagC: `<input type="radio" name="observations" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie."><label>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.</label>`,
            c: ``,

            tagD: `<input type="radio" name="conclusion" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie."><label>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.</label>`,
            d: ``,

            tagE: `<input type="radio" name="conclusion" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil auxquelles il convient de remédier."><label>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil auxquelles il convient de remédier.</label>`,
            e: ``,

            tagF: `<input type="radio" name="conclusion" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il convient de remédiers."><label>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il convient de remédiers.</label>`,
            f: ``,

            tagG: `<input type="radio" name="conclusion" value="Commentaire complémentaire."><label>Commentaire complémentaire.</label>`,
            g: ``,
        }
    },

    components: {
        Insert
    },

    props: {
        observateurId: String
    },

    methods: {

        valider(event, type) {

            if (type == "Commentaire complémentaire.") {
                this.commentaire = event;
            }

            if (type == "Les essais ont été réalisés avec les charges mises à disposition.") {
                this.poids = event;
            }

            this.falgInsert = false;
        },

        annuler() {
            this.falgInsert = false;
        },

        getValueTagA(event) {

            this.b = ``;
            this.c = ``;

            if (this.a == "") {
                this.a = event.target.value;
                this.typeInsert = event.target.value;
                this.falgInsert = true;
            } else {
                this.a = "";
                this.poids = "";
            }

        },

        getValueTagB(event) {

            this.a = ``;
            this.c = ``;
            this.poids = ``;

            if (this.b == "") {
                this.b = event.target.value;
            } else {
                this.b = "";
            }

        },

        getValueTagC(event) {

            this.a = ``;
            this.b = ``;
            this.poids = ``;

            if (this.c == "") {
                this.c = event.target.value;
            } else {
                this.c = "";
            }
        },

        getValueTagD(event) {

            this.e = "";
            this.f = "";
            this.g = "";
            this.commentaire = "";

            if (this.d == "") {
                this.d = event.target.value;
            } else {
                this.d = "";
            }
        },

        getValueTagE(event) {
            this.d = "";
            this.f = "";
            this.g = "";
            this.commentaire = "";

            if (this.e == "") {
                this.e = event.target.value;
            } else {
                this.e = "";
            }
        },


        getValueTagF(event) {

            this.d = "";
            this.e = "";
            this.g = "";
            this.commentaire = "";

            if (this.f == "") {
                this.f = event.target.value;
            } else {
                this.f = "";
            }
        },

        getValueTagG(event) {

            this.d = "";
            this.e = "";
            this.f = "";

            if (this.g == "") {
                this.g = event.target.value;
                this.typeInsert = event.target.value;
                this.falgInsert = true;
            } else {
                this.g = "";
                this.commentaire = ""
            }
        },


        sauvegarde() {
            Conclusion.create(this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.poids, this.commentaire, this.observateurId)
                .then(() => {
                    this.flagReset = true;
                    this.$emit("menuStatusChicked");
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        reset() {

            Conclusion.reset(this.observateurId)
                .then(() => {

                    this.flagReset = false,
                    this.falgInsert = false,
                    this.typeInsert = ``,
                    this.poids =  ``,
                    this.commentaire =  '',
                    this.tagA =  `<input type="radio" name="observations" value="Les essais ont été réalisés avec les charges mises à disposition."><label>Les essais ont été réalisés avec les charges mises à disposition.</label>`,
                    this.a =  ``,
                    this.sousAOne =  `<label>(a) le chef d'établissement doit définir les mesures organisationnelles et techniques visant à restreindre provisoirement l'utilisation de l'appareil à la valeur de ces charges.</label>`,
                    this.sousATow =  `<label>(b) Avant toute utilisation de l'appareil à une charge supérieure à nos essais, il y aura lieu de réaliser des essais de fonctionnement correspondants à la capacité nominale de l'appareil ainsi que l'essai de surcharge.</label>`,
                    this.tagB =  `<input type="radio" name="observations" value="L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil."><label>L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil.</label>`,
                    this.b =  ``,
                    this.tagC =  `<input type="radio" name="observations" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie."><label>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.</label>`,
                    this.c =  ``,
                    this.tagD =  `<input type="radio" name="conclusion" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie."><label>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.</label>`,
                    this.d =  ``,
                    this.tagE =  `<input type="radio" name="conclusion" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil auxquelles il convient de remédier."><label>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil auxquelles il convient de remédier.</label>`,
                    this.e =  ``,
                    this.tagF =  `<input type="radio" name="conclusion" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il convient de remédiers."><label>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il convient de remédiers.</label>`,
                    this.f =  ``,
                    this.tagG =  `<input type="radio" name="conclusion" value="Commentaire complémentaire."><label>Commentaire complémentaire.</label>`,
                    this.g =  ``,
                            
                    this.$emit("menuStatusChicked");

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

                    if (result.data.a != "") {
                        this.tagA = this.tagA.replace('type="radio"', 'type="radio" checked');
                        this.a = result.data.a;
                    }

                    if (result.data.b != "") {
                        this.tagB = this.tagB.replace('type="radio"', 'type="radio" checked');
                        this.b = result.data.b;
                    }

                    if (result.data.c != "") {
                        this.tagC = this.tagC.replace('type="radio"', 'type="radio" checked');
                        this.c = result.data.c;
                    }

                    if (result.data.d != "") {
                        this.tagD = this.tagD.replace('type="radio"', 'type="radio" checked');
                        this.d = result.data.d;
                    }

                    if (result.data.e != "") {
                        this.tagE = this.tagE.replace('type="radio"', 'type="radio" checked');
                        this.e = result.data.e;
                    }

                    if (result.data.f != "") {
                        this.tagF = this.tagF.replace('type="radio"', 'type="radio" checked');
                        this.f = result.data.f;
                    }

                    if (result.data.g != "") {
                        this.tagG = this.tagG.replace('type="radio"', 'type="radio" checked');
                        this.g = result.data.g;
                    }

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

.alignment > input {
    margin-top: 15px;
    width: 5%;
}

.alignment > label {
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

.sauvegarde , .reset {
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