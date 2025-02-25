<template>
    <div class="reserve">

        <div class="parent">

            <h3>{{ `${infoReserve[0] + '/' + infoReserve[1]}` }} {{ infoReserve[2] }}</h3>

            <div class="buttons-head">
                <button @click="phrases">Phrases modèles disponibles</button>
                <button @click="saisie">Saisie liber d'une observation</button>
            </div>

            <!-- les modeles disponibles -->
            <table class="modeles-disponibles" v-if="flagPhrases">
                <tr v-for="(item, index) in liste" :value="item.name" :key="index">
                    <td>{{ item.name }}</td>
                    <td><button class="choisir" @click="choisir(item.name)">choisir</button></td>
                </tr>
            </table>

            <!-- saisir libre -->
            <div class="saisir-libre" v-if="flagSaisie">
                <textarea v-if="flagSaisie" v-model="content" rows="20"
                    placeholder="Vous devez saisir votre commentaire"></textarea>
                <button class="ajouter" v-if="flagSaisie" @click="ajouter">Ajouter commentaire</button>
            </div>

            <!-- liste sélectionnées -->
            <table class="modeles-selectiones">
                <tr v-for="(item, index) in modelSelected" :value="item.name" :key="index + 100">
                    <td>{{ item.name }}</td>
                    <td>
                        <button class="supprimer" @click="supprimer(item.name)">supprimer</button>
                        <button class="supprimer" @click="edit(item.name)">edit</button>
                        <select v-model="item.status">
                            <option value="critique">Critique</option>
                            <option value="non critique">Non critique</option>
                        </select>
                    </td>
                </tr>
            </table>

            <div class="buttons-tail">
                <button class="sauvegarder" v-if="modelSelected.length != 0" @click="sauvegarder">Sauvegarde</button>
                <button class="reset" v-if="commentaireId != '' && modelSelected.length >= 1"
                    @click="reset">Initialiser</button>
                <button class="quitter" @click="sortir">Quitter</button>
            </div>

        </div>

    </div>
</template>

<script>
import Commentaires from "@/requests/commentaire"
import Reserve from "@/requests/Reserve"

export default {
    name: 'reserve-component',
    data() {
        return {

            flagPhrases: false,
            flagSaisie: false,
            content: "",
            modelSelected: [],
            commentaireId: "",
            // liste: [
            //     { name: "Avec un investissement colossal de 4,41 milliards de dirhams (MMDH), ce projet est divisé entre 2,35 milliards de dirhams pour", status: "", etat: "not_saved" },
            //     { name: "La station est conçue pour produire de l'eau dessalée, qui est ensuite équitablement répartie entre l'eau potable et l'eau destiné", status: "", etat: "not-saved" },
            //     { name: "hectares dans la plaine de Chtouka, en substituant l'eau de mer à l'eau souterraine, et profite ainsi à environ 1.500 exploitations agricoles locales.", status: "", etat: "not_saved" },
            //     { name: "première de ce type en Afrique, joue un rôle crucial en fournissant de l'eau potable à la région du Grand Agadir (Agadir Ida-Outanan et Inezgane Ait Melloul) ", status: "", etat: "not_saved" },
            // ],
            liste: []
        }
    },

    components: {

    },

    props: {

        infoReserve: {
            type: Array,
            required: true
        },

        observateurId: {
            type: String,
            required: true
        }
    },

    methods: {


        sauvegarder() {

            Commentaires.create(this.observateurId, this.infoReserve[0], this.infoReserve[1], this.infoReserve[2], this.modelSelected)
                .then(() => {
                    return this.$emit('valider', this.infoReserve);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },

        reset() {

            Commentaires.delete(this.commentaireId)
                .then(() => {
                    return this.$emit('annuler', this.infoReserve);
                })
                .catch((error) => {
                    console.log(error)
                });
        },

        sortir() {

            if (this.modelSelected.length == 0) {
                return this.$emit('annuler', this.infoReserve);
            }

            if (this.modelSelected.length >= 1) {
                return this.$emit('sortir');
            }
        },

        ajouter() {

            this.modelSelected.push({
                name: this.content,
                status: "",
                etat: "not_saved"
            });

            this.content = "";
        },

        choisir(value) {

            const index = this.liste.findIndex((el) => el.name == value);
            this.liste.splice(index, 1);

            this.modelSelected.push({
                name: value,
                status: "",
                etat: "not_saved",
                disabled: false
            });

        },

        edit(value) {
            const index = this.liste.findIndex((el) => el.name == value);
            this.modelSelected[index].disabled = !this.modelSelected[index].disabled;
        },

        supprimer(value) {

            const index = this.modelSelected.findIndex((el) => el.name == value);

            if (this.modelSelected[index].etat == "not_saved") {

                this.modelSelected.splice(index, 1);
                this.liste.push({
                    name: value,
                    status: "",
                    etat: "not_saved",
                    disabled: false
                });

            } else {

                Commentaires.deleteByIndexAndRef(this.infoReserve[0], this.infoReserve[1], this.infoReserve[2], index, this.observateurId)
                    .then(() => {

                        this.modelSelected.splice(index, 1);
                        this.liste.push({
                            name: value,
                            status: "",
                            etat: "not_saved",
                            disabled: false
                        });

                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }


        },

        phrases() {
            this.flagPhrases = true;
            this.flagSaisie = false;
        },

        saisie() {
            this.flagSaisie = true;
            this.flagPhrases = false;
        },

        annuler() {
            return this.$emit('annuler');
        },


    },

    created() {

        Reserve.read()
            .then((result) => {
                this.liste = result.data;
            })
            .catch((error) => {
                console.log(error);
            });

        Commentaires.select(this.infoReserve[0], this.infoReserve[1], this.infoReserve[2], this.infoReserve[3])
            .then((result) => {

                this.commentaireId = result.data._id;


                if(result.data.modelSelected) {

                    result.data.modelSelected.forEach((el) => {
                        const index = this.liste.findIndex(val => val == el.name)
                        this.liste.splice(index, 1);
                    });

                    for(let i = 0; i < result.data.modelSelected.length; i++) {
                        result.data.modelSelected[i].disabled = false;
                        this.modelSelected.push(result.data.modelSelected[i])
                    }

                }




            })
            .catch((error) => {
                console.log(error);
            });


    }


}
</script>


<style scoped>
.reserve {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.664);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
}


.reserve .parent {
    background-color: white;
    height: 90vh;
    position: relative;
    width: 70%;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 3px solid black;
}


.reserve .parent h3 {
    background-color: #35353d;
    height: 5%;
    color: white;
    font-size: large;
    padding: 5px;
    margin: 0;
}

.reserve .parent .buttons-head {
    width: 100%;
    height: 5%;
    margin: 0;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #ddd;
}

.reserve .parent .buttons-head button {
    background-color: #ff3b00;
    color: white;
    border: 0;
    margin: 0;
    margin-left: 5px;
    margin-right: 5px;
    padding: 10px;
    width: fit-content;
    border-radius: 15px;
    cursor: pointer;
}

.reserve .parent .buttons-head button:hover {
    background-color: #04AA6D;
    transition: 1s;
}


.saisir-libre {
    width: 100%;
    height: 40%;
    margin: 0;
    margin-top: 5px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.saisir-libre textarea {
    width: 90%;
    height: 100%;
    margin: 0;
    padding: 5px;
    font-size: large;
    outline: 0;
}

.saisir-libre .ajouter {
    width: fit-content;
    padding: 10px;
    background-color: #04AA6D;
    color: white;
    border: 0;
    margin: 0;
    margin-top: 3px;
    margin-bottom: 3px;
    border-radius: 15px;
    cursor: pointer;
}

.saisir-libre .ajouter:hover {
    background-color: green;
}


.modeles-selectiones {
    width: 100%;
    display: block;
    height: 40%;
    overflow-y: scroll;
    background-color: #dddddd;
}


.modeles-selectiones tr {
    background-color: antiquewhite;
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
}

.modeles-selectiones tr:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.modeles-selectiones>tr>td:nth-child(1) {
    width: 90%;
    margin: 0;
    padding: 0;
    text-align: left;
}


.modeles-selectiones>tr>td:nth-child(2) {
    width: auto;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.modeles-selectiones>tr>td:nth-child(2)>button:nth-child(1) {
    width: fit-content;
    background-color: red;
    color: white;
    border: 0;
    padding: 5px;
    margin: 0;
    border-radius: 15px;
    margin-left: 3px;
    text-align: start;
}

.modeles-selectiones>tr>td:nth-child(2)>button:nth-child(2) {
    width: fit-content;
    background-color: #04AA6D;
    color: white;
    border: 0;
    padding: 5px;
    margin: 0;
    border-radius: 15px;
    margin-left: 3px;
}



.modeles-disponibles {
    margin-top: 10px;
    display: block;
    height: 40%;
    width: 100%;
    overflow-y: scroll;
    background-color: white;
}


.modeles-disponibles tr {
    background-color: antiquewhite;
    padding: 0;
    margin: 0;
    height: auto;
    width: 100%;
}

.modeles-disponibles tr:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}



.buttons-tail {
    position: absolute;
    width: 100%;
    height: 5%;
    margin: 0;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #ddd;
    bottom: 0;
}

.buttons-tail button {
    color: white;
    border: 0;
    margin: 0;
    margin-left: 5px;
    margin-right: 5px;
    padding: 10px;
    width: fit-content;
    border-radius: 15px;
    cursor: pointer;
}



.buttons-tail .quitter {
    background-color: red;
    transition: 1s;
}

.buttons-tail .initialiser {
    background-color: #ff3b00;
    transition: 1s;
}

.buttons-tail .sauvegarder {
    background-color: #04AA6D;
    transition: 1s;
}
</style>