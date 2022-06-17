<template>
    <FormEditPermisos/>
</template>
<script>
import FormEditPermisos from '../components/FormEditPermisos';
export default {
    components: { FormEditPermisos },
    name: 'editarpermisos',
    middleware:"session",
};
</script>