<template>
  <div class="login">

      <div class="form" v-if="flagForm">
        <p v-if="flagMessage">{{ message }}</p>
        <input type="text" v-model="email">
        <input type="password" v-model="password">
        <button @click="connexion">Connexion</button>
        <button @click="quitter">Quitter</button>
      </div>

      <div class="spinner" v-if="flagSpinner">
        <Spinner />
      </div>

  </div>
</template>

<script>
import Account from "@/requests/Account"
import Spinner from 'vue-simple-spinner'
export default {
    name: 'LoginComponent',
    data() {
      return {
        message : "",
        email : null,
        password : null,
        flagSpinner : false,
        flagForm : true,
        flagMessage : false
      }
    },

    components : {
      Spinner
    },

    methods : {

      quitter() {
        this.$emit("quitter");
      },

      connexion() {

        this.flagForm = false;
        this.flagSpinner = true;


        setTimeout(() => {

            Account.connexion(this.email, this.password)
            .then((result) => {

                  if(result) {

                    console.log(result.data.case)

                        if(result.data.case === true) {
                            sessionStorage.setItem("id", result.data.id);
                            sessionStorage.setItem("nom", result.data.nom);
                            sessionStorage.setItem("prenom", result.data.prenom);
                            this.$router.push("/dashboard");
                        }

                        if(result.data.case === false) {
                            this.flagMessage = true;
                            this.message = result.data.msg;
                        }

                        this.flagSpinner = false;

                  }

            })
            .catch((error) => {
              console.log(error)
              // if(error) {
              //   this.flagForm = true;
              //   this.flagSpinner = false;
              // }
            });

        }, 8000);





      }
    },

    created() {
    }
}
</script>

<style scoped>

  .login .form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .login .form input , .login .form button {
    padding: 5px;
    margin: 3px;
    
  }
  .login .form button {
    width: 100px;
    cursor: pointer;
  }


</style>