<template>
    <div class="insert">
        <div class="parent">
            <div class="message">
                Veuillez écrire la valeur ci-dessous?
            </div>
            <textarea v-model="val" id="" cols="30" rows="10"></textarea>
            <div class="buttons">
                <button @click="valider">Valider</button>
                <button @click="annuler">Annuler</button>
            </div>
        </div>
    </div>
</template>
  
<script>


export default {
    name: 'insert-component',
    data() {
        return {
            val : ""
        }
    },

    props : {
        typeInsert : String,
        valueInsert : String
    },

    methods: {

        valider() {
            return this.$emit('valider', this.val, this.typeInsert);
        },

        annuler() {
            return this.$emit('annuler');
        }
    },

    created() {
        this.val = this.valueInsert;
    }


}
</script>


<style scoped>
.insert {
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
    justify-content: center;
    align-items: center;
}

.insert .parent {
    width: 800px;
    height: 600px;
    margin: 0;
    padding: 10px;
    height: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
}

.insert .parent .message {
    font-size: larger;
    color: black;
    margin: 10px
}

.insert .parent .buttons {
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

textarea {
    border: 2px solid black;
}

.insert .parent .buttons button:nth-child(1) {
    color: white;
    background-color: green;
    padding: 10px;
    margin-right : 5px; 
    border: 0px;
    cursor: pointer;
}

.insert .parent .buttons button:nth-child(2) {
    color: white;
    background-color: red;
    padding: 10px;
    margin-left : 5px; 
    border: 0px;
    cursor: pointer;
}



</style>