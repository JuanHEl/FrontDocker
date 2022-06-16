<template>
    <div id="admins">
        <div>
        </div>
        <div id="botones">
            <!-- <div v-for="(permiso, index) in permisos" :key="index.tareaenadmin"> -->
            <!-- <h1 >{{permiso.tareaenadmin}}</h1> -->
            <div v-for="permiso in permisos" :key="permiso">
            <!-- <h1>{{permiso}}</h1> -->
                <b-button v-if="permiso==1" block class="buttons" pill variant="primary" to="/editarpermisos" font-scale="3">Monitorizar</b-button>
                <br v-if="permiso==1">
                <b-button v-if="permiso==2" block class="buttons" pill variant="primary" to="/editaradmin" font-scale="3">Configurar Routers</b-button>
                <br v-if="permiso==2">
                <b-button v-if="permiso==3" block class="buttons" pill variant="primary" to="/cambiastatus" font-scale="3">Configurar Switches</b-button>
                <br v-if="permiso==3">
                <b-button v-if="permiso==4" block class="buttons" pill variant="primary" to="/nuevoadmin" font-scale="3">Configurar Servidores</b-button>
                <br v-if="permiso==4">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'configuracion',
    data(){
        return{
            permisos:[]
        }
    },
    middleware:"session",
    component: {},
    mounted: function () {
        let permisos=this.$cookies.get("tareaa").admins;
        for (let index = 0; index < permisos.length; index++) {
            const element = permisos[index];
            this.permisos.push(element.tareaenadmin);
            // console.log(element.tareaenadmin)
        }
        // console.log(this.permisos)
    }
}
</script>

<style scoped>
#admins {
    display: flex;
}
#botones {
    width: 30%;
    margin: 2px;
    padding: 5px;
    border-radius: 10px;
    min-height: 400px;
    color: white;
}
</style>
