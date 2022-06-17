<template>
    <FormStatus/>
</template>
<script>
import FormStatus from '../components/FormStatus';
export default {
    components: { FormStatus },
    middleware:"session",
    name: 'cambiastatus',
};
</script>