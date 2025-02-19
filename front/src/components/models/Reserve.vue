<template>
    <div class="reserve">

        <div class="parent">

            <h3>{{ `${infoReserve[0] + '/' + infoReserve[1]}` }} {{ infoReserve[2] }}</h3>

            <div class="buttons-head">
                <button @click="phrases">Phrases modèles disponibles</button>
                <button @click="saisie">Saisie liber d'une observation</button>
            </div>

            <!-- les modeles disponibles -->
            <table id="customers" v-if="flagPhrases">
                <tr v-for="(item, index) in liste" :value="item.name" :key="index">
                    <td>{{ item.name }}</td>
                    <td><button class="choisir" @click="choisir(item.name)">choisir</button></td>
                </tr>
            </table>

            <!-- saisir libre -->
            <div class="saisir-libre">
                <textarea v-if="flagSaisie" v-model="content" rows="20"
                    placeholder="Vous devez saisir votre commentaire"></textarea>
                <button class="ajouter" v-if="flagSaisie" @click="ajouter">Ajouter commentaire</button>
            </div>

            <!-- liste sélectionnées -->
            <h4 v-if="modelSelected.length != 0">Notes finales sélectionnées</h4>
            <table id="customers">
                <tr v-for="(item, index) in modelSelected" :value="item.name" :key="index + 100">
                    <td>{{ item.name }}</td>
                    <td>
                        <button class="supprimer" @click="supprimer(item.name)">supprimer</button>
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
                    @click="reset">Reset</button>
                <button class="sortir" @click="sortir">Sortir</button>
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
                etat: "not_saved"
            });

        },

        supprimer(value) {

            const index = this.modelSelected.findIndex((el) => el.name == value);

            if (this.modelSelected[index].etat == "not_saved") {

                this.modelSelected.splice(index, 1);
                this.liste.push({
                    name: value,
                    status: "",
                    etat: "not_saved"
                });

            } else {

                Commentaires.deleteByIndexAndRef(this.infoReserve[0], this.infoReserve[1], this.infoReserve[2], index, this.observateurId)
                    .then(() => {

                        this.modelSelected.splice(index, 1);
                        this.liste.push({
                            name: value,
                            status: "",
                            etat: "not_saved"
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

        Commentaires.select(this.infoReserve[0], this.infoReserve[1], this.infoReserve[2], this.infoReserve[3])
            .then((result) => {

                this.commentaireId = result.data._id;

                result.data.modelSelected.forEach((el) => {
                    const index = this.liste.findIndex(val => val == el.name)
                    this.liste.splice(index, 1);
                });

                this.modelSelected = result.data.modelSelected;

            })
            .catch((error) => {
                console.log(error);
            });

        Reserve.read()
            .then((result) => {
                this.liste = result.data;
                // console.log(result)
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
    color: white;
    font-size: large;
    padding: 5px;
    margin: 0;
}

.reserve .parent .buttons-head {
    width: 100%;
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

#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: justify;
}

#customers tr:nth-child(even) {
    background-color: #f2f2f2;
}

#customers tr:hover {
    background-color: #ddd;
}

.reserve .parent h4 {
    color: #0000b3;
    font-size: large;
    padding: 5px;
    border-bottom: 1px solid #0000b3;
}

.reserve .parent .buttons-tail {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center
}

.saisir-libre {
    width: 100%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

textarea {
    width: 100%;
    padding: 5px;
    font-size: large;
}


.ajouter {
    background-color: #045a08;
    color: white;
    padding: 10px;
    width: 160px;
    border-radius: 25px;
    border: 0px;
    cursor: pointer;
    text-align: center;
    margin-top: 10px;
}

.ajouter:hover {
    background-color: rgb(19, 190, 4);
}



.choisir {
    background-color: #000076;
    color: white;
    padding: 10px;
    width: fit-content;
    border-radius: 25px;
    border: 0px;
    cursor: pointer;
    text-align: center;
    margin: 3px;
    margin: 5px;
}

.choisir:hover {
    background-color: blue;
}

.supprimer {
    background-color: #ff0000;
    color: white;
    padding: 10px;
    width: fit-content;
    border-radius: 25px;
    border: 0px;
    cursor: pointer;
    text-align: center;
    margin: 3px;
    margin: 5px;
}

.supprimer:hover {
    background-color: rgb(185, 15, 15);
}

.sauvegarder {
    background-color: green;
    color: white;
    padding: 10px;
    width: 160px;
    font-size: large;
    border-radius: 25px;
    border: 0px;
    cursor: pointer;
    margin-top: 5px;
}

.sauvegarder:hover {
    background-color: rgb(6, 189, 6);
}

.reset {
    background-color: rgb(255, 102, 0);
    color: white;
    padding: 10px;
    width: 160px;
    font-size: large;
    border-radius: 25px;
    border: 0px;
    cursor: pointer;
    margin-top: 5px;
}

.reset:hover {
    background-color: rgb(161, 63, 6);
}

.sortir {
    background-color: rgba(255, 2, 2, 0.582);
    color: white;
    padding: 10px;
    width: 160px;
    font-size: large;
    border-radius: 25px;
    border: 0px;
    cursor: pointer;
    margin-top: 5px;
}

.sortir:hover {
    background-color: rgba(151, 1, 1, 0.582);
}


select {
    border-radius: 25px;
    border: 1px solid #000076;
    height: 35px;
    padding: 2px;
}
</style>