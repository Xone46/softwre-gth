<template>
    <div class="formulaire">
        <h3>{{ formulaire.observateurId }}</h3>
    </div>
</template>
  
<script>

export default {
    name: 'FormulaireView',
    data() {
        return { 
            formulaire : {
                observateurId : null
            }
        }
    },

    components: {
    },

    methods: {

    },

    created() {
        this.formulaire.observateurId = this.$route.params.id;
    }
}
</script>
  
<style scoped>
.formulaire {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

</style>