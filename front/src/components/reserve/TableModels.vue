<template>
    <div class="models">

        <h2>Attachés</h2>

        <div class="liste-models" v-for="(item, index) in attaches" :key="index">
            <label><input type="checkbox" @click="selectCommentaire(index)" :checked="item.checked">{{ item.titre }}</label>
        </div>

        <div class="buttons">
            <input type="button" value="Attacher" @click="attacher()">
            <input type="button" value="Ajouter" @click="ajouter">
        </div>

        <Error v-if="flagError" @annuller="annuller" :msg="msg" />
        <AddModel v-if="flagAddModel" @annulerAddModel="annulerAddModel" @ajouterModel="ajouterModel" />

    </div>
</template>

<script>
import AddModel from "@/components/models/AddModel.vue"
import Error from "@/components/models/Error.vue"
import Commentaire from "@/requests/commentaire"
export default {
    name: 'table-observateur',
    data() {
        return {
            commentaires: [],
            models: [],
            attaches: [
                { titre: "Lorem  dolor sit, amet consectetur adipisicing elit. Dolorem dolorum est repudiandae numquam debitis doloremque, voluptatum amet, ratione aut quibusdam", checked: false },
                { titre: "Lorem  dolor consectetur adipisicing elit. Dolorem dolorum est repudiandae numquam debitis doloremque, voluptatum amet, ratione aut quibusdam", checked: false },
                { titre: "Lorem ipsum dolor sit,  consectetur adipisicing elit. Dolorem dolorum est repudiandae numquam debitis doloremque, voluptatum amet, ratione aut quibusdam", checked: false }
            ],

            flagError: false,
            flagAddModel: false

        }
    },

    props: {
        observateurId: String,
        titreReserve: String,
        commentairesReserve: Array
    },

    components: {
        Error,
        AddModel
    },

    methods: {

        attacher() {

            if (this.commentaires.length == 0) {
                this.flagError = true;
                this.msg = "Vous devez saisir au moins un élément";
            } else {
                Commentaire.create(this.commentaires, this.observateurId, this.titreReserve)
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },

        annuller() {
            this.flagError = false;
        },

        annulerAddModel() {
            this.flagAddModel = false;
        },

        selectCommentaire(index) {
            if (!this.commentaires.includes(this.attaches[index].titre)) {
                this.commentaires.push(this.attaches[index].titre);
            } else {
                this.commentaires.splice(index, 1);
            }
        },

        ajouter() {
            this.flagAddModel = true;
        },

        ajouterModel(event) {

            this.attaches.push({
                titre: event,
                checked: false
            });

            this.flagAddModel = false;
        }


    },

    computed: {
        attachesFilter: function () {
            return this.attaches;
        }
    },

    created() {

        if (this.commentairesReserve) {
            for (let i = 0; i < this.attaches.length; i++) {
                if (this.commentairesReserve.includes(this.attaches[i].titre)) {
                    this.attaches[i].checked = true;
                    this.commentaires.push(this.attaches[i].titre);
                } else {
                    this.attaches[i].checked = false;
                }
            }
        }


    }
}
</script>

<style scoped>
.models {
    width: 100%;
}

.models select {
    width: 100%;
}


.buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.buttons input {
    background-color: #04AA6D;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>