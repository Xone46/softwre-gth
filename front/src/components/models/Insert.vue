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
        typeInsert : String
    },

    methods: {

        valider() {
            return this.$emit('valider', this.val, this.typeInsert);
        },

        annuler() {
            return this.$emit('annuler');
        }
    },


}
</script>


<style scoped>
.insert {
    width: 1024px;
    height: 768px;
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
    width: auto;
    margin: 0;
    padding: 10px;
    height: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
}

.insert .parent .message{
    color: black;
    padding: 5px;
}


</style>