<template>
    <div class="dashboard">
      <img src="@/assets/person.png" alt="">
      <p class="inspecteur">{{ nom }} {{ prenom  }}</p>
      <button @click="interventions">Interventions en cours</button>
      <button @click="transferer">Transférer des minutes</button>
      <button @click="previsualisation">Prévisualisation rapports</button>
      <button @click="modification">Modification rapport</button>
      <button @click="sauvgarde">Sauvgarde de secours</button>
      <button @click="deconnexion">Déconnexion</button>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'DashboardView',
    data() {
      return {
        nom : null,
        prenom : null
      }
    },
    components: {
    },
    methods : {

      interventions() {
        this.$router.push("/interventions");
      },

      transferer() {
        this.$router.push("/");
      },

      previsualisation() {
        this.$router.push("/");
      },

      modification() {
        this.$router.push("/");
      },

      sauvgarde() {
        this.$router.push("/");
      },

      deconnexion() {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("nom");
        sessionStorage.removeItem("prenom");
        this.$router.push("/");
      }
      
    },

    created() {
        this.nom = sessionStorage.getItem("nom")
        this.prenom = sessionStorage.getItem("prenom")
    }
  }
  </script>

  <style scoped>
    .dashboard {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .dashboard img{
        margin: 5px;
        width: 80px;
        height: 80px;
    }

    .dashboard button{
        margin: 5px;
        width: 200px;
        height: 40px;
        border: 0px;
        background-color: #39498f;
        color: white;
        cursor: pointer;
    }
    .dashboard button:nth-child(8){
        margin: 5px;
        width: 200px;
        height: 40px;
        border: 0px;
        background-color:rgb(218, 52, 52);
        color: white;
        cursor: pointer;
    }
    
    .dashboard button:nth-child(8):hover{
        margin: 5px;
        width: 200px;
        height: 40px;
        border: 0px;
        background-color:red;
        color: white;
        cursor: pointer;
    }

    .dashboard button:hover{
        background-color: #243064;
    }

  </style>
  