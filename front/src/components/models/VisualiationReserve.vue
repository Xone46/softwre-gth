<template>
    <div class="visualiation">
        <div class="parent">
            <h4 class="titre">listes des observation saisies</h4>
            <div class="content" v-for="item in commentaires" :key="item.titre">
                <div class="sub-content">
                    <textarea :value="item.titre"></textarea>
                    <select v-model="item.status">
                    <option v-for="critique in listCritique" :key="critique">{{ critique }}</option>
                    </select>
                </div>
            </div>
            <div class="buttons">
                <button @click="quitter">Quitter</button>
            </div>
        </div>
    </div>
</template>

<script>
import Commentaires from '@/requests/commentaire';

export default {
    name: 'reserve-component',
    data() {
        return {
            commentaires : [],
            listCritique : ["critique", "non critique"]
        }
    },

    components : {
    },

    props: {
        observateurId : String
    },

    methods: {
        quitter() {
            return this.$emit("quitter");
        }
    },

    created() {
        Commentaires.readCommentaires(this.observateurId)
        .then((result) => {
            for(let i = 0; i < result.data.length; i++) {
                    for(let j = 0; j < result.data[i].modelSelected.length; j++) {
                        this.commentaires.push({
                        titre : result.data[i].modelSelected[j].name,
                        status : result.data[i].modelSelected[j].status
                    });

                    console.log(result.data[i].modelSelected[j].status)
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

.visualiation .parent {
    width: 90%;
    height: 90%;
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
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.visualiation .parent .content .sub-content {
    display: flex;
    flex-direction: row;
}

.visualiation .parent .content .sub-content textarea {
    width: 80%;
    height: 80px;
}



.visualiation .parent .buttons {
    width: 100%;
    height: auto;
    background-color: white;
}

.visualiation .parent .buttons {
    width: 100%;
    height: auto;
    background-color: white;
}

.visualiation .parent .buttons button {
    width: fit-content;
    height: 50px;
    background-color: red;
    color: white;
    border: 0px;
    border-radius: 5px;
    font-size: large;
    cursor: pointer;
}







</style>