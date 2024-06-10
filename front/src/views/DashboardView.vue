<template>
    <div class="dashboard">
      <img src="@/assets/person.png" alt="">
      <p class="inspecteur">{{ nom }} {{ prenom  }}</p>
      <button @click="interventions">Interventions en cours</button>
      <!-- <button @click="transferer">Transférer des minutes</button> -->
      <button @click="previsualisation">Prévisualisation rapports ({{  conterTransfer }})</button>
      <button @click="modification">Modification rapport</button>
      <button @click="sauvgarde">Sauvgarde de secours</button>
      <button class="deconnexion" @click="deconnexion">Déconnexion</button>
    </div>
  </template>
  
  <script>
  import Completed from "@/requests/completed"
  export default {
    name: 'DashboardView',
    data() {
      return {
        nom : null,
        prenom : null,
        conterTransfer : 0
      }
    },
    components: {
    },
    methods : {

      interventions() {
        this.$router.push("/interventions").catch(()=>{});
      },

      transferer() {
        this.$router.push("/transferer").catch(()=>{});
      },

      previsualisation() {
        this.$router.push("/previsualisation").catch(()=>{});
      },

      modification() {
        this.$router.push("/modification").catch(()=>{});
      },

      sauvgarde() {
        this.$router.push("/sauvgarde").catch(()=>{});
      },

      deconnexion() {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("nom");
        sessionStorage.removeItem("prenom");
        this.$router.push("/").catch(()=>{});
      }
      
    },

    created() {
        this.nom = sessionStorage.getItem("nom")
        this.prenom = sessionStorage.getItem("prenom")

        Completed.read()
        .then((result) => {
          this.conterTransfer = result.data
        })
        .catch((error) => {
          console.log(error);
        });
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

    .dashboard button:hover{
        background-color: #243064;
    }

    .dashboard .deconnexion {
        margin: 5px;
        width: 200px;
        height: 40px;
        border: 0px;
        background-color:rgb(218, 52, 52);
        color: white;
        cursor: pointer;
    }
    
    .dashboard .deconnexion:hover{
        margin: 5px;
        width: 200px;
        height: 40px;
        border: 0px;
        background-color:red;
        color: white;
        cursor: pointer;
    }


  </style>
  