<template>
    <div class="verified">
        <div class="parent">
            <div class="message">
                {{ msg }}
            </div>
            <div class="buttons">
                <button @click="annuller">Je comprie</button>
            </div>
        </div>

    </div>
</template>
  
<script>


export default {
    name: 'verified-component',
    data() {

        return {

        }
    },

    props : {
        msg : String
    },

    methods: {
        annuller() {
            return this.$emit("annuller");
        }
    },


}
</script>


<style scoped>
.verified {
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
    width: auto;
    margin: 0;
    padding: 10px;
    height: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
}

.parent .message{
    color: black;
    padding: 5px;
}

.parent .buttons{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.parent .buttons button:nth-child(1){
    background-color: green;
    color: white;
    cursor: pointer;
    border: 0px;
    margin: 3px;
    padding: 5px;
    border-radius: 5px;
}
.parent .buttons button:nth-child(2){
    background-color: red;
    color: white;
    cursor: pointer;
    border: 0px;
    margin: 3px;
    padding: 5px;
    border-radius: 5px;
}
</style>