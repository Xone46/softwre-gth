<template>
    <div class="visualiation">

            <h1 v-if="commentaires.length == 0">Il n'y a pas de commentaires</h1>
            <table id="customers" v-if="commentaires.length != 0">
                <tr v-for="(item, index) in commentaires" :key="index">
                    <td>
                        <p class="critique" v-if="item.status == 'critique'" >{{  item.status  }} </p>
                        <p class="non_critique" v-if="item.status == 'non critique'">{{  item.status  }}</p>
                    </td>
                    <td>{{  item.name  }}</td>
                    <td>
                        <button @click="supprimer(item.titre, item.ref, item.name, index)">supprimer</button>
                    </td>
                </tr>
            </table>

            <div class="buttons">
                <button @click="quitter">Quitter</button>
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

.visualiation h1{
    background-color: white;
    color: red;
    text-align: center;
    padding: 20px;
}



#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
  height: 300px;
  overflow-y: auto;
  background-color: white;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

.buttons button {
    background-color: red;
    color: white;
    font-size: large;
    border: 0px;
    border-radius: 25px;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    width: 100px;
}

table tr td button {
    background-color: red;
    color: white;
    font-size: large;
    border: 0px;
    border-radius: 25px;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    width: 100px;
}

</style>