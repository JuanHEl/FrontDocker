<template>
  <FormPerfil/>
</template>
<script>
import FormPerfil from '../components/FormPerfil';
export default {
  components: { FormPerfil },
  name: 'perfil',
  middleware:"session",
};
</script>