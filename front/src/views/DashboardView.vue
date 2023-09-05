<template>
    <div class="dashboard">
      <button @click="deconnexion">Déconnexion</button>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'DashboardView',
    components: {
    },
    methods : {
      deconnexion() {
        this.$router.push("/")
      }
    }
  }
  </script>
  