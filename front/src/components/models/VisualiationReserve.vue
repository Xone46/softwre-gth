<template>
    <div class="visualiation">
        <div class="parent">
            <h4 class="titre">Liste des réserves</h4>
            <div class="content">
                <ul>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ipsa porro quisquam optio cupiditate cumque suscipit aliquam, numquam reiciendis quasi obcaecati. Dolorem earum quo eos cum cupiditate, officia veritatis nihil!</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ipsa porro quisquam optio cupiditate cumque suscipit aliquam, numquam reiciendis quasi obcaecati. Dolorem earum quo eos cum cupiditate, officia veritatis nihil!</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ipsa porro quisquam optio cupiditate cumque suscipit aliquam, numquam reiciendis quasi obcaecati. Dolorem earum quo eos cum cupiditate, officia veritatis nihil!</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ipsa porro quisquam optio cupiditate cumque suscipit aliquam, numquam reiciendis quasi obcaecati. Dolorem earum quo eos cum cupiditate, officia veritatis nihil!</li>
                </ul>
            </div>
            <div class="buttons">
                <button @click="quitter">Quitter</button>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'reserve-component',
    data() {
        return {
        }
    },

    components : {
    },

    props: {

    },

    methods: {
        quitter() {
            return this.$emit("quitter");
        }
    },

    created() {

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