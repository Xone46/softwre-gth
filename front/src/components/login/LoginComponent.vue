<template>
  <div class="login">

    <div class="form" v-if="flagForm">

      <img src="@/assets/logo.png" alt="logo">

      <!-- start errors -->
      <ul v-if="flagMessage">
        <li v-for="error in errors" :key="error"> - {{ error }}</li>
      </ul>
      <!-- Fin errors -->

      <!-- Start Form -->
      <label for="E-mail">
        <h3>E-mail : <span class="start" v-if="email.length == 0">*</span></h3>
        <input type="text" v-model="email">
      </label>

      <label for="Mot de pass">
        <h3>Mot de pass <span class="start" v-if="password.length == 0">*</span></h3>
        <input type="password" v-model="password">
      </label>

      <button class="connexion" @click="connexion">Connexion</button>
      <button class="quitter" @click="quitter">Quitter</button>
      <!-- Fin Form -->

    </div>

    <div class="spinner" v-if="flagSpinner">
      <Spinner />
    </div>

  </div>
</template>

<script>
import Inspecteurs from "@/requests/Inspecteurs"
import Spinner from 'vue-simple-spinner'
export default {
  name: 'LoginComponent',
  data() {
    return {
      message: "",
      email: "",
      password: "",
      flagSpinner: false,
      flagForm: true,
      flagMessage: false,
      errors: []
    }
  },

  components: {
    Spinner
  },

  methods: {

    quitter() {
      this.$emit("quitter");
    },

    connexion() {

      this.flagForm = false;
      this.flagSpinner = true;

      Inspecteurs.connexion(this.email, this.password)
        .then((result) => {

          if (result.data) {

            this.flagSpinner = false;
            this.flagForm = true;

            if (result.data) {
              sessionStorage.setItem("id", result.data.id);
              sessionStorage.setItem("nom", result.data.nom);
              sessionStorage.setItem("prenom", result.data.prenom);
              this.$router.push("/dashboard").catch(()=>{});

            }
          }

        })
        .catch((error) => {

          // instance 
          this.errors = [];
          this.flagMessage = true;
          this.flagSpinner = false;
          this.flagForm = true;

          // erorr msg
          if (error.response.data.msg) {
            console.log(error.response.data.msg)
          }

          // errors array
          if (error.response.data.errors) {
            error.response.data.errors.forEach(element => {
              this.errors.push(element);
            });
          }

        });

    }
  }
}
</script>

<style scoped>

.login {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login .form {
  width: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.login .form img {
  height: 60px;
}

.login .form ul {
  margin: 0;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.login .form ul li  {
  color: red;
}


.login .form label {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login .form label h3 {
  text-align: start;
  width: 400px;
  margin: 3px;
}

.login .form label input {
  width: 400px;
  height: 30px;
  padding: 5px;
  margin: 3px;
}

.login .form button {
  padding: 10px;
  width: 100px;
  height: 40px;
  color: white;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 0px;
  border-radius: 5px;
}

.connexion {
  background-color: #04AA6D;
  cursor: pointer;
}

.connexion:hover {
  background-color: #02be79b9;
  cursor: pointer;
}

.quitter {
  background-color: #fa0e06fb;
  cursor: pointer;
}

.quitter:hover {
  background-color: #f00e06d3;
  cursor: pointer;
}

.start {
  color: red;
}
</style>