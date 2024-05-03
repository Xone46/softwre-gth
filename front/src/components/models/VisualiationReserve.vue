<template>
    <div class="visualiation">
        <div class="parent">
            <h4 class="titre">Liste des réserves</h4>
            <div class="content">
                <ul v-for="item in commentaires" :key="item.titre">
                    <label>
                        <textarea :value="item.titre"></textarea>
                        <select v-model="item.status">
                            <option v-for="critique in listCritique" :key="critique">{{ critique }}</option>
                        </select>
                    </label>
                </ul>
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
    justify-content: flex-start;
    align-items: center;
}

.visualiation .parent {
    width: 80%;
    background-color: white;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
}

.visualiation .parent .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.visualiation .parent .buttons button {
    background-color: #040faa;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}


</style>