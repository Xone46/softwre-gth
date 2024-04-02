<template>
    <div class="reserve">

        <div class="head">
            <h3>{{ `${infoReserve[0]+ '/' +infoReserve[1]}` }} {{ infoReserve[2] }}</h3>
        </div>

        <div class="content">

            <h4>Liste des modèles suggérés</h4>

            <select class="select-liste-model" v-model="model">
                <option v-for="(item, index) in liste" :value="item" :key="index">{{ item }}</option>
            </select>

            <div class="bottom-content">
                <button @click="choisir">Choisir</button>
                <button @click="ajouter">Ajouter un autre modèle</button>
            </div>

            <h4 v-if="modelSelected.length > 0">Liste des modèles sélectionnés</h4>

            <table class="table-data">
                <tr v-for="(item, index) in modelSelected" :key="item.name">

                    <input type="text" v-model="modelSelected[index].name">

                    <td>
                        <select v-model="item.status">
                            <option value="critique">Critique</option>
                            <option value="non critique">Non critique</option>
                        </select>
                    </td>

                    <td>
                        <button @click="supprimer(item)">Supprimer</button>
                    </td>

                </tr>
            </table>

        </div>

        <div class="bottom" v-if="!flagExisteCommentaire">
            <button @click="valider">Valider</button>
            <button @click="$emit('annuler')">Annuler</button>
        </div>

        <div class="bottom" v-if="flagExisteCommentaire">
            <button @click="valider">Modifier</button>
            <button @click="supprimerCommentaire">Supprimer</button>
        </div>

     <AddModel v-if="flagAddModel" @ajouterModel="ajouterModel" @annulerAddModel="annulerAddModel" />

    </div>
</template>

<script>

import AddModel from '@/components/models/AddModel.vue';
import Commentaires from "@/requests/commentaire"

export default {
    name: 'reserve-component',
    data() {
        return {
            flagExisteCommentaire : false,
            commentaireId : null,
            flagAddModel : false,
            statusCritique : null,
            model: null,
            modelSelected: [],
            liste: [
                "Lore dol atque eveniet",
                "Lore dol atque evenie",
                "Lore dol atque even",
                "Lore dol atque ev",
            ]
        }
    },

    components : {
        AddModel
    },

    props: {

        infoReserve: {
            type: Array,
            required: true
        },

        observateurId : {
            type : String,
            required : true
        }
    },

    methods: {

        supprimerCommentaire() {
            Commentaires.delete(this.commentaireId)
            .then((result) => {
                console.log(result);
                return this.$emit('annuler', this.infoReserve);
            })
            .catch((error) => {
                console.log(error)
            });
        },

        edit(value) {
            console.log(value);
        },

        ajouterModel(value) {
            this.liste.push(value)
            this.flagAddModel = false;
        },

        annulerAddModel() {
            this.flagAddModel = false;
        },

        choisir() {
            if(!this.modelSelected.includes(this.model)) {

                this.modelSelected.push({
                    name : this.model,
                    status : false
                });

                const index = this.liste.findIndex((el) => el == this.model);
                this.liste.splice(index, 1);
            }
        },

        supprimer(value) {
            const index = this.modelSelected.findIndex((el) => el.name == value);
            this.modelSelected.splice(index, 1);
            this.liste.push(value);
        },

        ajouter() {
            this.flagAddModel = true;
        },


        valider() {

            Commentaires.create(this.observateurId, this.infoReserve[0], this.infoReserve[1], this.infoReserve[2], this.modelSelected)
            .then((result) => {
                if(result) {
                    return this.$emit('valider', this.infoReserve);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }

    },

    created() {
        Commentaires.select(this.infoReserve[0], this.infoReserve[1], this.infoReserve[2], this.infoReserve[3])
        .then((result) => {

            this.commentaireId = result.data._id;
            this.flagExisteCommentaire = true;
            
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
    width: 1024px;
    height: 768px;
    position: fixed;
    z-index: 999;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.select-liste-model {
    width: 850px;
    height: 50px;
    border: 1px solid #04AA6D;
    font-size: large
}

.select-liste-model > option {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 900px;
}

.table-data {
    overflow: scroll;
}

.head {
    width: 100%;
    height: auto;
    background-color: #efefef;
    border-bottom: 1px solid black;
}

.bottom-content {
    width: 100%;
    background-color: white;
    margin-top: 10px;
}

.bottom-content>button:nth-child(1) {
    background-color: #1d04aa;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: 0px;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
}

.bottom-content>button:nth-child(2) {
    background-color: #1d04aa;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: 0px;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
}

.content {
    width: 100%;
    height: 500px;
    background-color: white;
}

.bottom {
    height: auto;
    width: 100%;
    background-color: #efefef;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-top: 1px solid black;
}

.bottom button:nth-child(1) {
    margin-left: 5px;
    margin-right: 5px;
    border: 0px;
    background-color: #04AA6D;
    padding: 10px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.bottom button:nth-child(2) {
    margin-left: 5px;
    margin-right: 5px;
    border: 0px;
    background-color: #aa0f04;
    padding: 10px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.table-data {
    width: 100%;
}

</style>