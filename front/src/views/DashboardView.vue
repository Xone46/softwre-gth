<template>
  <div class="dashboard">
    <div class="dashboard-cover">
      <img src="@/assets/person.png" alt="">
      <p class="inspecteur">{{ nom }} {{ prenom }}</p>
      <button @click="interventions">Interventions en cours</button>
      <!-- <button @click="transferer">Transférer des minutes</button> -->
      <button @click="previsualisation">Prévisualisation rapports ({{ conterTransfer }})</button>
      <button @click="modification">Modification rapport</button>
      <button @click="sauvgarder">Sauvgarder de secours</button>
      <button class="deconnexion" @click="deconnexion">Déconnexion</button>
      <Succes v-if="flagSucces" />
    </div>
  </div>
</template>

<script>
import Succes from "@/components/models/Succes.vue"
import Observateurs from "@/requests/Observateurs"
// import Chekin from "@/requests/Chekin"

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

    sauvgarder() {

      this.$router.push("/sauvgarder").catch(() => { });

      // Chekin.sauvgarde(sessionStorage.getItem("id"))
      //   .then((result) => {

      //     if (result.data) {
      //       this.flagSucces = true;
      //       setTimeout(() => {
      //         this.flagSucces = false;
      //       }, 8000);
      //     }

      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });

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
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  background-image: url("@/assets/ind1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.dashboard-cover {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00000093;
}

.dashboard-cover img {
  margin: 5px;
  width: 200px;
  height: 200px;
}

.dashboard-cover .inspecteur {
  color: white;
  font-size: x-large;
  font-weight: 800;
}

.dashboard-cover button {
  margin: 5px;
  width: 400px;
  height: 60px;
  border: 0px;
  cursor: pointer;
  border-radius: 5px;
  font-size: larger;
  text-align: center;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.dashboard-cover button:hover {
  background-color: #243064;
  border: 2px solid white;
  color: white;
  font-size: x-large;
  transition: 2s;
}


.dashboard-cover button:nth-child(3) {
  background-color: #74C365;
}

.dashboard-cover button:nth-child(4) {
  background-color: #ff3b00;
}

.dashboard-cover button:nth-child(5) {
  background-color: #0095ff;
}

.dashboard-cover button:nth-child(6) {
  background-color: #780080;
}


.dashboard-cover .deconnexion {
  margin: 5px;
  margin-top: 10px;
  height: 40px;
  width: 200px;
  background-color: rgb(218, 52, 52);
  color: white;
  cursor: pointer;
  font-size: large;
}

.dashboard-cover .deconnexion:hover {
  background-color: red;
  font-size: large;
}
</style>