<template>
    <div class="reserve">

        <div class="head">
            <h3>{{ `${infoReserve[0] + '/' + infoReserve[1]}` }} {{ infoReserve[2] }}</h3>
        </div>

        <div class="content">

            <div>
                <button @click="phrases">Phrases modèles disponibles</button>
                <button @click="saisie">Saisie liber d'une observation</button>
            </div>

            <!-- les modeles disponibles -->
            <table v-if="flagPhrases">
                <tr v-for="(item, index) in liste" :value="item.name" :key="index">
                    <td>{{ item.name }}</td>
                    <td><span @click="choisir(item.name)">choisir</span></td>
                </tr>
            </table >

            <!-- saisir libre -->
            <ul v-if="flagSaisie">
                <textarea v-model="content" placeholder="Vous devez saisir un modèle"></textarea>
            </ul>
            <button v-if="flagSaisie" @click="ajouter">Ajouter</button>


            <!-- liste sélectionnées -->
            <h4>Notes finales sélectionnées</h4>
            <table>
                <tr v-for="(item, index) in modelSelected" :value="item.name" :key="index + 100">
                    <td>{{ item.name }}</td>
                    <td><span @click="supprimer(item.name)">supprimer</span></td>
                    <td>
                        <select v-model="item.status">
                            <option value="critique">Critique</option>
                            <option value="non critique">Non critique</option>
                        </select>
                    </td>
                </tr>
            </table>

            <div class="sauvegarder" v-if="modelSelected.length != 0">
                <button @click="sauvegarder">Sauvegarde</button>
            </div>

            <div class="reset" v-if="commentaireId != ''">
                <button @click="reset">Reset</button>
            </div>

            <div class="sortir">
                <button @click="sortir">Sortir</button>
            </div>

        </div>

    </div>
</template>

<script>
import Commentaires from "@/requests/commentaire"

export default {
    name: 'reserve-component',
    data() {
        return {

            flagPhrases: false,
            flagSaisie: false,
            content: "",
            modelSelected: [],
            commentaireId: "",
            liste: [
                { name: "Avec un investissement colossal de 4,41 milliards de dirhams (MMDH), ce projet est divisé entre 2,35 milliards de dirhams pour", status: "", etat : "not_saved" },
                { name: "La station est conçue pour produire de l'eau dessalée, qui est ensuite équitablement répartie entre l'eau potable et l'eau destiné", status: "", etat: "not-saved" },
                { name: "hectares dans la plaine de Chtouka, en substituant l'eau de mer à l'eau souterraine, et profite ainsi à environ 1.500 exploitations agricoles locales.", status: "", etat : "not_saved" },
                { name: "première de ce type en Afrique, joue un rôle crucial en fournissant de l'eau potable à la région du Grand Agadir (Agadir Ida-Outanan et Inezgane Ait Melloul) ", status: "", etat : "not_saved" },
            ]
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
                .then((result) => {
                    console.log(result);
                    return this.$emit('valider', this.infoReserve);
                })
                .catch((error) => {
                    console.log(error);
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
            return this.$emit('annuler', this.infoReserve);
        },

        ajouter() {

                this.modelSelected.push({
                    name : this.content,
                    status : "",
                    etat : "not_saved"
                });

                this.content = "";
        },

        choisir(value) {

            const index = this.liste.findIndex((el) => el.name == value);
            this.liste.splice(index, 1);

            this.modelSelected.push({
                name: value,
                status: "",
                etat : "not_saved"
            });

        },

        supprimer(value) {

            const index = this.modelSelected.findIndex((el) => el.name == value);

            if(this.modelSelected[index].etat == "not_saved") {

                this.modelSelected.splice(index, 1);
                this.liste.push({
                    name: value,
                    status: "",
                    etat : "not_saved"
                });

            } else {

                Commentaires.deleteByIndexAndRef(this.infoReserve[0], this.infoReserve[1], this.infoReserve[2], index, this.observateurId)
                .then(() => {

                    this.modelSelected.splice(index, 1);
                    this.liste.push({
                        name: value,
                        status: "",
                        etat : "not_saved"
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

        console.log(this.infoReserve)

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
}

.head {
    width: 1000px;
    height: auto;
    background-color: #0b0a68e6;
    color: white;
    border: 0px;
    border-radius: 10px;
}

.content {
    width: 1000px;
    height: 500px;
    background-color: white;
    overflow-y: auto;
}

.content div {
    margin: 0;
    padding: 0;
}


.content div button {
    margin: 5px;
    width: fit-content;
    background-color: #04AA6D;
    cursor: pointer;
    height: 40px;
    padding: 10px;
    color: white;
    border: 0px;
    border-radius: 5px;
}

.content div button:hover {
    background-color: #086946;
}

.content ul {
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

textarea {
    width: 950px;
    margin: 5px;
    height: 100px;
}

.content ul li {
    width: 100%;
    height: 100%;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 5px;
}

.content ul li p {
    font-size: 14px;
    width: 800px;
    text-align: start;
    margin: 0;
}

.content ul li span {
    font-size: 14px;
    text-align: start;
    margin: 0;
    color: #0b0a68e6;
    cursor: pointer;
    margin-right: 5px;
}

.sauvegarder , .reset, .sortir {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
}

.sauvegarder button{
    background-color: green;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .reset {
    background-color: rgb(240, 158, 7);
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .sortir {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

</style>