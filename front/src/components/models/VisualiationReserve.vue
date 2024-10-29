<template>
    <div class="visualiation">
        <div class="parent">
            <h4 class="titre">listes des observation saisies</h4>
            <ul class="content">
                <li v-for="(item, index) in commentaires" :key="index">
                    <p class="critique" v-if="item.status == 'critique'" >{{  item.status  }} </p>
                    <p class="non_critique" v-if="item.status == 'non critique'">{{  item.status  }}</p>
                    <span>{{  item.name  }}</span>
                    <p>{{  item.status  }}</p>
                    <button @click="supprimer(item.titre, item.ref, item.name, index)">supprimer</button>
                </li>
            </ul>
            <div class="buttons">
                <button @click="quitter">Quitter</button>
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

.visualiation .parent {
    height: 400px;
    width: 1000px;
    padding: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
}

.visualiation .parent .titre {
    width: 100%;
    height: 50px;
    margin: 0;
    background-color: #0b0a68e6;
    color: white;
    border: 0px;
    font-size: large;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.visualiation .parent .content {
    overflow-y: auto;
    margin: 0;
    width: 90%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}


ul > li {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;;
    text-decoration: none;
}

ul > li > span {
    font-size: large;
    margin-left: 10px;
}

ul > li > .critique {
    font-size: large;
    background-color: red;
    color: white;
    height: fit-content;
    width: fit-content;
    padding: 5px;
    border-radius: 5px;
    margin-left: 10px;
}

ul > li > .non_critique {
    font-size: large;
    background-color: green;
    color: white;
    height: fit-content;
    width: fit-content;
    padding: 5px;
    border-radius: 5px;
    margin-left: 10px;
}

ul > li > button {
    font-size: large;
    background-color: red;
    color: white;
    cursor: pointer;
    border: 0px;
    border-radius: 5px;
    margin-left: 10px;
    padding: 3px;
}


.visualiation .parent .buttons button {
    height: 40px;
    width: 150px;
    background-color: red;
    color: white;
    cursor: pointer;
    border: 0px;
    border-radius: 5px;
}

</style>