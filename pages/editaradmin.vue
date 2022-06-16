<template>
    <FormEdit/>
</template>
<script>
import FormEdit from '../components/FormEdit';
export default {
    components: { FormEdit },
    name: 'editaradmin',
    middleware:"session",
};
</script>