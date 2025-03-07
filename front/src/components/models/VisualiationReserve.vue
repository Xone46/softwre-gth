<template>
    <div class="visualiation">


            <div class="sites">

                <h1 v-if="commentaires.length == 0">Il n'y a pas de commentaires</h1>

                <table class="table-data" v-if="commentaires.length != 0">
                    <tr>
                        <th colspan="3">Visualisation des réserve</th>
                    </tr>
                    <tr>
                        <th>N° Obs</th>
                        <th>Liste des observations</th>
                        <th>Status</th>
                    </tr>
                    <tr v-for="(item, index) in commentaires" :key="index">
                        <td>{{  index +  1  }}</td>
                        <td>{{  item.name  }}</td>
                        <td>
                            <p class="critique" v-if="item.status == 'critique'" >{{  item.status  }} </p>
                            <p class="non_critique" v-if="item.status == 'non critique'">{{  item.status  }}</p>
                        </td>
                        <!-- <td>
                            <button @click="supprimer(item.titre, item.ref, item.name, index)">supprimer</button>
                        </td> -->
                    </tr>
                </table>

                <div class="buttons">
                    <button @click="quitter">
                        <font-awesome-icon icon="xmark" />
                    </button>
                </div>
            </div>

        <Verified v-if="flagVerified" @confirmer="confirmer" @retirer="retirer" />

    </div>
</template>

<script>
import Commentaires from '@/requests/commentaire';
import Verified from '@/components/models/Verified.vue';

export default {
    name: 'reserve-component',
    data() {
        return {

            titre : null,
            ref : null,
            name : null,
            indexCommentaire : null,

            flagVerified : false,
            commentaires : [],
            listCritique : ["critique", "non critique"]
        }
    },

    components : {
        Verified
    },

    props: {
        observateurId : String
    },

    methods: {

        confirmer() {

            Commentaires.supprimer(this.titre, this.ref, this.name, this.observateurId)
            .then((result) => {
                if(result) {
                    this.commentaires.splice(this.indexCommentaire, 1);
                    this.titre = null,
                    this.ref = null,
                    this.name = null,
                    this.indexCommentaire = null,
                    this.flagVerified = false;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },

        retirer() {
            this.titre = null,
            this.ref = null,
            this.name = null,
            this.indexCommentaire = null,
            this.flagVerified = false;
        },


        quitter() {
            return this.$emit("quitter");
        },

        supprimer(titre, ref, name, index) {
            this.titre = titre,
            this.ref = ref,
            this.name = name,
            this.indexCommentaire = index,
            this.flagVerified = true;
        }
    },

    created() {
        Commentaires.readCommentaires(this.observateurId)
        .then((result) => {                    
            for(let i = 0; i < result.data.length; i++) {
                    for(let j = 0; j < result.data[i].modelSelected.length; j++) {
                        this.commentaires.push({
                        titre : result.data[i].titre,
                        ref : result.data[i].ref,
                        name : result.data[i].modelSelected[j].name,
                        status : result.data[i].modelSelected[j].status
                    });
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

.visualiation {
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


.sites {
    padding: 10px;
    margin: 0;
    max-width: 60%;
    height: auto;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    border-radius: 10px;
}

.visualiation .sites h1 {
    margin: 0;
    padding: 0;
    color: black;
    width: inherit;
    text-align: center;
    font-size: large;
}

.table-data {
    padding: 0px;
    width: auto;
    height: auto;
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    display: block;
    max-width: -moz-fit-content;
    max-width: fit-content;
    margin: 0 auto;
    overflow-x: auto;
    white-space: nowrap;
}


.table-data tr {
    background-color: white;
}

.table-data tr:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.table-data th {
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #35353d;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
}

.table-data td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.table-data th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.buttons {
    width: inherit;
}

.buttons button {
    background-color: red;
    color: white;
    border: 0px;
    border-radius: 10px;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    width: fit-content;
}


</style>