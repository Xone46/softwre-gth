<template>
  <div class="login">
    <input type="text" v-model="email">
    <input type="text" v-model="email">
    <button @click="identfier">Identfier</button>
  </div>
</template>

<script>

export default {
    name: 'LoginComponent',
    data() {
      return {
        email : null,
        password : null
      }
    },
    methods : {
      identfier() {


        this.$router.push("/dashboard");
      }
    }
}
</script>

<style>

</style>