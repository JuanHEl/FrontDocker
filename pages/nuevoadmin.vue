<template>
  <FormUsuario/>
</template>
<script>
import FormUsuario from '../components/FormUsuario';
export default {
  components: { FormUsuario },
  name: 'nuevoadmin',
  middleware:"session",
  // layout: 'principal'
};
</script>