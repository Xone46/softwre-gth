<template>
  <div class="home">

      <img src="@/assets/logo.png" alt="">

      <div v-if="flagSpinner" class="spinner">
        <Spinner message="Veuillez patienter, logiciel se connectera aux serveurs GTHCONSULT" />
      </div>

      <button class="ressayer" v-if="flagDemarrer" @click="demarrer">Démarrer</button>

      <button class="ressayer" v-if="counter == 3" @click="demarrerOffline">Démarrer Offline</button>

      <button class="ressayer" v-if="flagReessayer && counter != 3" @click="ressayer">Réessayer</button>

      <Login v-if="falgAuth" @quitter="quitter" />

  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/login/LoginComponent.vue'
import Checkin from "@/requests/Checkin"
import Spinner from 'vue-simple-spinner'

export default {
  name: 'HomeView',
  data() {
    return {
      flagSpinner : false,
      flagReessayer : false,
      flagDemarrer: true,
      falgAuth : false,
      counter : 0,
    }
  },
  components: {
    Login,
    Spinner
  },

  methods : {

    quitter() {
      this.counter = 0;
      this.flagDemarrer = true;
      this.flagSpinner = false;
      this.flagReessayer = false;
      this.falgAuth = false;
    },

    demarrerOffline() {
      this.counter = 0;
      this.flagDemarrer = false;
      this.flagSpinner = false;
      this.flagReessayer = false;
      this.falgAuth = true;
      sessionStorage.setItem("online", false);
    },

    ressayer() {
        return this.demarrer();
    },

    demarrer() {

      this.flagSpinner = true;
      this.flagDemarrer = false;
      this.flagReessayer = false;

      setTimeout(() => {

          Checkin.check()
          .then((result) => {
              if(result.data === true) {
                this.flagDemarrer = false;
                this.flagSpinner = false;
                this.falgAuth = true;
                sessionStorage.setItem("online", true);
              } 
          })
          .catch((error) => {
                if(error.message) {
                    this.flagReessayer = true;
                    this.flagDemarrer = false;
                    this.flagSpinner = false;
                    this.falgAuth = false;
                    this.counter = this.counter + 1;
                }
          });

      }, 10000);


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
