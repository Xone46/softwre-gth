<template>
  <div class="home">

    <img src="@/assets/logo.png" alt="logo">

    <div v-if="flagSpinner" class="spinner">
      <Spinner message="Veuillez patienter, logiciel se connectera aux serveurs GTHCONSULT" />
    </div>

    <button class="ressayer" v-if="flagDemarrer" @click="demarrer">Démarrer</button>
    <Login v-if="falgAuth" @quitter="quitter()" />

  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/login/LoginComponent.vue'
import Chekin from "@/requests/Chekin"
import Spinner from 'vue-simple-spinner'

export default {
  name: 'HomeView',
  data() {
    return {
      flagSpinner: false,
      flagReessayer: false,
      flagDemarrer: true,
      falgAuth: false,
      counter: 0,
    }
  },
  components: {
    Login,
    Spinner
  },

  methods: {

    quitter() {
      this.flagDemarrer = true;
      this.flagSpinner = false;
      this.falgAuth = false;
    },


    ressayer() {
      return this.demarrer();
    },

    async demarrer() {

      this.flagSpinner = true;
      this.flagDemarrer = false;
      this.flagReessayer = false;

      //ckeck connecte internet exist or not
      var online = navigator.onLine;

      if (online) {

        const response = await fetch("https://api.ipify.org/?format=json");
        const adresse = await response.json();

        Chekin.status(adresse.ip)
          .then((result) => {

            if (result.data) {
              this.flagDemarrer = false;
              this.flagSpinner = false;
              this.falgAuth = true;
              sessionStorage.setItem("connection", true);
            }

          })
          .catch((error) => {
            if (error.message) {
              this.flagDemarrer = false;
              this.flagSpinner = false;
              this.falgAuth = false;
            }
          });

      } else {
        this.flagDemarrer = false;
        this.flagSpinner = false;
        this.falgAuth = true;
        sessionStorage.setItem("connection", false);
      }





    }


  }


}
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home img {
  height: 60px;
}

.ressayer {
  background-image: linear-gradient(-180deg, #37AEE2 0%, #1E96C8 100%);
  border-radius: .5rem;
  box-sizing: border-box;
  color: #FFFFFF;
  display: flex;
  font-size: 16px;
  justify-content: center;
  padding: 1rem 1.75rem;
  text-decoration: none;
  width: 15%;
  border: 0;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.ressayer:hover {
  background-image: linear-gradient(-180deg, #1D95C9 0%, #17759C 100%);
}

@media (min-width: 768px) {
  .ressayer {
    padding: 1rem 2rem;
  }
}
</style>
