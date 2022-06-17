<template>
  <div class="container">
    <div class="logo drop">
      <h1 class="text-white">Bienvenido a SoNetCo</h1>
      <!-- <h1 class="text-white"></h1> -->
      <b-img src="../assets/logo.png"></b-img>
    </div>
    <div class=" login drop">
      <FormLogin/>
    </div>
  </div>
</template>

<script>
import FormLogin from '../components/FormLogin.vue'
export default {
  name: 'login',
  layout: 'principal',
  component: {FormLogin}
};
</script>

<style scoped>
.logo{
  width: 60%;
  height: 100%;
}
.login{
  width: 30%;
  padding: 0;
  margin: 0;
}
.container{
  display: flex;
}
.drop { filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.7)); }
</style>
