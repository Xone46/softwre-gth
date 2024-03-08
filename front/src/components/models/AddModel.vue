<template>
    <div class="add-model">
        <div class="parent">
        <textarea v-model="value"></textarea>
            <div class="buttons">
                <button @click="ajouterModel">Ajouter</button>
                <button @click="annulerAddModel">Annuler</button>
            </div>
        </div>

    </div>
</template>
  
<script>
export default {
    name: 'add-model-component',
    data() {

        return {
            value : null
        }
    },

    props : {
        msg : String
    },

    methods: {

        ajouterModel() {
            return this.$emit("ajouterModel", this.value);
        },

        annulerAddModel() {
            return this.$emit("annulerAddModel");
        }
    },


}
</script>


<style scoped>

.add-model {
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

.parent {
    width: 80%;
    height: 300px;
    margin: 0;
    padding: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
}

textarea {
    width: 100%;
    height: 100%;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.buttons button {
    background-color: #04AA6D;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}



</style>

