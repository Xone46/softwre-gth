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
                <button v-if="model != null" class="choisir" @click="choisir">Choisir</button>
                <button class="modele" @click="ajouter">Ajouter un autre modèle</button>
            </div>

            <h4 v-if="modelSelected.length > 0">Liste des modèles sélectionnés</h4>

            <table class="table-data">
                <tr v-for="(item, index) in modelSelected" :key="item.name">

                    <td>
                        <textarea v-model="modelSelected[index].name" placeholder="Vous devez saisir un modèle"></textarea>
                    </td>

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
            <button @click="annuler">Annuler</button>
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

        annuler() {
            return this.$emit('annuler');
        },

        supprimerCommentaire() {
            Commentaires.delete(this.commentaireId)
            .then(() => {
                return this.$emit('annuler', this.infoReserve);
            })
            .catch((error) => {
                console.log(error)
            });
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
                this.model = null;
            }
        },

        supprimer(value) {
            const index = this.modelSelected.findIndex((el) => el.name == value);
            this.modelSelected.splice(index, 1);
            this.liste.push(value.name);
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
    justify-content: center;
    align-items: center;
}

.head {
    width: 100%;
    height: auto;
    background-color: #0b0a68e6;
    color: white;
    border: 0px;
}


.select-liste-model {
    width: 90%;
    height: 50px;
    border: 1px solid #0b0a68e6;
    font-size: large
}

.table-data {
    width: 100%;
}

.table-data tr {
    width: 100%;
}

.content {
    width: 100%;
    height: 500px;
    background-color: white;
    overflow-y: auto;
}

.bottom-content {
    width: 100%;
    background-color: white;
    margin-top: 10px;
}

.choisir, .modele {
    height: 50px;
    width: fit-content;
    background-color: green;
    color: white;
    border-radius: 4px;
    border: 0px;
    font-size: large;
    margin :5px; 
    cursor: pointer;
}


.table-data tr td:nth-child(1) {
    width: auto;
    margin: 3px
}

.table-data tr td:nth-child(1) textarea {
    width: 750px;
    height: 45px;
    font-size: large;
    margin: 3px
}

.table-data tr td:nth-child(2) select {
    height: 50px;
    font-size: large;
    margin: 3px
}

.table-data tr td:nth-child(3) button {
    height: 50px;
    width: fit-content;
    background-color: red;
    color: white;
    border-radius: 4px;
    border: 0px;
    font-size: large
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
    height: 50px;
    width: fit-content;
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
    height: 50px;
    width: fit-content;
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

</style>@/requests/appareil_levage/famille1_lev1/commentaire