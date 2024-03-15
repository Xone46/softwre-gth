<template>

    <div class="conclusion">

        <h1>D1. Observations complémentaires</h1>

        <div v-html="tagA" @input="getValueTagA"></div><span>{{ this.poids }}</span>
        <div class="sous" v-html="sous_A"></div>
        <div v-html="tagB" @input="getValueTagB"></div>
        <div v-html="tagC" @input="getValueTagC"></div>

        <h1>CONCLUSION</h1>

        <div v-html="tagD" @input="getValueTagD"></div>
        <div v-html="tagE" @input="getValueTagE"></div>
        <div v-html="tagF" @input="getValueTagF"></div>
        <div v-html="tagG" @input="getValueTagG"></div>
        <div>{{ this.commentaire }}</div>

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
            tagA: `<li><input type="checkbox" value="Les essais ont été réalisés avec les charges mises à disposition.">Les essais ont été réalisés avec les charges mises à disposition.</li>`,
            a: ``,
            sous_A: `<li>a) le chef d'établissement doit définir les mesures organisationnelles et techniques visant à restreindre provisoirement l'utilisation de l'appareil à la valeur de ces charges.</li> <li>b) Avant toute utilisation de l'appareil à une charge supérieure à nos essais, il y aura lieu de réaliser des essais de fonctionnement correspondants à la capacité nominale de l'appareil ainsi que l'essai de surcharge.</li>`,
            tagB: `<li><input type="checkbox" value="L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil.">L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil.</li>`,
            b: ``,
            tagC: `<li><input type="checkbox" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.">La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.</li>`,
            c: ``,

            tagD: `<li><input type="checkbox" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.">La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.</li>`,
            d: ``,

            tagE: `<li><input type="checkbox" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil auxquelles il convient de remédier.">La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil auxquelles il convient de remédier.</li>`,
            e: ``,

            tagF: `<li><input type="checkbox" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il convient de remédiers.">La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il convient de remédiers.</li>`,
            f: ``,

            tagG: `<li><input type="checkbox" value="Commentaire complémentaire.">Commentaire complémentaire.</li>`,
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

            if (this.b == "") {
                this.b = event.target.value;
            } else {
                this.b = "";
            }

        },

        getValueTagC(event) {
            if (this.c == "") {
                this.c = event.target.value;
            } else {
                this.c = "";
            }
        },

        getValueTagD(event) {
            if (this.d == "") {
                this.d = event.target.value;
            } else {
                this.d = "";
            }
        },

        getValueTagE(event) {

            if (this.e == "") {
                this.e = event.target.value;
            } else {
                this.e = "";
            }
        },


        getValueTagF(event) {
            if (this.f == "") {
                this.f = event.target.value;
            } else {
                this.f = "";
            }
        },

        getValueTagG(event) {
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

                    this.flagReset = false;
                    this.falgInsert = false;
                    this.typeInsert = ``;
                    this.poids = ``;
                    this.commentaire = '';
                    this.tagA = `<li><input type="checkbox" value="Les essais ont été réalisés avec les charges mises à disposition.">Les essais ont été réalisés avec les charges mises à disposition.</li>`;
                    this.a = ``;
                    this.sous_A = `<li>a) le chef d'établissement doit définir les mesures organisationnelles et techniques visant à restreindre provisoirement l'utilisation de l'appareil à la valeur de ces charges.</li> <li>b) Avant toute utilisation de l'appareil à une charge supérieure à nos essais; il y aura lieu de réaliser des essais de fonctionnement correspondants à la capacité nominale de l'appareil ainsi que l'essai de surcharge.</li>`;
                    this.tagB = `<li><input type="checkbox" value="L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement; il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil.">L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement; il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil.</li>`;
                    this.b = ``;
                    this.tagC = `<li><input type="checkbox" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.">La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.</li>`;
                    this.c = ``;

                    this.tagD = `<li><input type="checkbox" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.">La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.</li>`;
                    this.d = ``;

                    this.tagE = `<li><input type="checkbox" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil auxquelles il convient de remédier.">La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil auxquelles il convient de remédier.</li>`;
                    this.e = ``;

                    this.tagF = `<li><input type="checkbox" value="La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il convient de remédiers.">La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il convient de remédiers.</li>`;
                    this.f = ``,

                    this.tagG = `<li><input type="checkbox" value="Commentaire complémentaire.">Commentaire complémentaire.</li>`,
                    this.g = ``,
                    
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
                        this.tagA = this.tagA.replace('type="checkbox"', 'type="checkbox" checked');
                        this.a = result.data.a;
                    }

                    if (result.data.b != "") {
                        this.tagB = this.tagB.replace('type="checkbox"', 'type="checkbox" checked');
                        this.b = result.data.b;
                    }

                    if (result.data.c != "") {
                        this.tagC = this.tagC.replace('type="checkbox"', 'type="checkbox" checked');
                        this.c = result.data.c;
                    }

                    if (result.data.d != "") {
                        this.tagD = this.tagD.replace('type="checkbox"', 'type="checkbox" checked');
                        this.d = result.data.d;
                    }

                    if (result.data.e != "") {
                        this.tagE = this.tagE.replace('type="checkbox"', 'type="checkbox" checked');
                        this.e = result.data.e;
                    }

                    if (result.data.f != "") {
                        this.tagF = this.tagF.replace('type="checkbox"', 'type="checkbox" checked');
                        this.f = result.data.f;
                    }

                    if (result.data.g != "") {
                        this.tagG = this.tagG.replace('type="checkbox"', 'type="checkbox" checked');
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
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.conclusion div {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.conclusion > div > li {
    list-style: none;
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

div.sous {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: flex-start;
    align-items: flex-start;
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
</style>