<template>
  <div class="dashboard">
    <img src="@/assets/person.png" alt="">
    <p class="inspecteur">{{ nom }} {{ prenom }}</p>
    <button @click="interventions">Interventions en cours</button>
    <!-- <button @click="transferer">Transférer des minutes</button> -->
    <button @click="previsualisation">Prévisualisation rapports ({{ conterTransfer }})</button>
    <button @click="modification">Modification rapport</button>
    <button @click="sauvgarde">Sauvgarde de secours</button>
    <button class="deconnexion" @click="deconnexion">Déconnexion</button>
    <Succes v-if="flagSucces" />
  </div>
</template>

<script>
import Succes from "@/components/models/Succes.vue"
import Observateurs from "@/requests/Observateurs"
import Chekin from "@/requests/Chekin"

export default {
  name: 'DashboardView',
  data() {
    return {
      flagSucces: false,
      nom: null,
      prenom: null,
      conterTransfer: 0
    }
  },
  components: {
    Succes
  },
  methods: {

    interventions() {
      this.$router.push("/interventions").catch(() => { });
    },

    transferer() {
      this.$router.push("/transferer").catch(() => { });
    },

    previsualisation() {
      this.$router.push("/previsualisation").catch(() => { });
    },

    modification() {
      this.$router.push("/modification").catch(() => { });
    },

    sauvgarde() {

      Chekin.sauvgarde(sessionStorage.getItem("id"))
        .then((result) => {

          if (result.data) {
            this.flagSucces = true;
            setTimeout(() => {
              this.flagSucces = false;
            }, 8000);
          }

        })
        .catch((error) => {
          console.log(error.message);
        });

    },

    deconnexion() {
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("nom");
      sessionStorage.removeItem("prenom");
      this.$router.push("/").catch(() => { });
    }

  },

  created() {

    this.nom = sessionStorage.getItem("nom")
    this.prenom = sessionStorage.getItem("prenom")

    Observateurs.readTerminer()
      .then((result) => {
        this.conterTransfer = result.data.length;
      })
      .catch((error) => {
        console.log(error);
      });

  }
}
</script>

<style scoped>
.dashboard {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dashboard img {
  margin: 5px;
  width: 80px;
  height: 80px;
}

.dashboard button {
  padding: 10px;
  margin: 5px;
  width: 250px;
  height: 40px;
  border: 0px;
  background-color: #39498f;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: medium;
}

.dashboard button:hover {
  background-color: #243064;
}

.dashboard .deconnexion {
  margin: 5px;
  width: fit-content;
  height: 40px;
  border: 0px;
  background-color: rgb(218, 52, 52);
  color: white;
  cursor: pointer;
}

.dashboard .deconnexion:hover {
  background-color: red;
}
</style>