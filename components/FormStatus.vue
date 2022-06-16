<template>
    <div id="contenedor">
        <div id="tabla">
            <div class="form-group left col-sm-10">
                <b-input-group v-if="form.id.length > 0">
                    <b-input-group-prepend is-text @click.prevent="buscanombre">
                        <b-icon icon="search" style="color:black">
                        </b-icon>
                    </b-input-group-prepend>
                        <b-input
                            v-model="form.id"
                            id="input-1"
                            type="text"
                            placeholder="Buscar por id de administrador"
                            required
                        />
                </b-input-group>
                <b-input-group v-else>
                    <b-input-group-prepend is-text >
                        <b-icon icon="search" style="color:black">
                        </b-icon>
                    </b-input-group-prepend>
                        <b-input
                            v-model="form.id"
                            id="input-1"
                            type="text"
                            placeholder="Buscar por id de administrador"
                            required
                        />
                </b-input-group>
            </div>
            <div class="form-group left">
                <label for="" class="control-label col-sm-2 text-white">Nombre</label>
                <div class="col-sm-10">
                    <input
                    type="text"
                    class="form-control"
                    name="nombre"
                    id="nombre"
                    v-model="form.nombre"
                    disabled
                    />
                </div>
            </div>
            <div class="form-group left">
                <label for="" class="control-label col-sm-2 text-white"
                    >Apellido Paterno</label
                >
                <div class="col-sm-10">
                    <input
                    type="text"
                    class="form-control"
                    name="nombre"
                    id="nombre"
                    v-model="form.apellidop"
                    disabled
                    />
                </div>
            </div>
            <div class="form-group left">
                <label for="" class="control-label col-sm-2 text-white"
                    >Apellido Materno</label
                >
                <div class="col-sm-10">
                    <input
                    type="text"
                    class="form-control"
                    name="nombre"
                    id="nombre"
                    v-model="form.apellidom"
                    disabled
                    />
                </div>
            </div>
            <div class="form-group left">
                <label for="" class="control-label col-sm-2 text-white"
                    >Nombre Usuario</label
                >
                <div class="col-sm-10">
                    <input
                    type="text"
                    class="form-control"
                    name="direccion"
                    id="direccion"
                    v-model="form.nombreusuario"
                    disabled
                    />
                </div>
            </div>
            <div>
                <div class="form-check-inline">
                    <b-form-group label="Status" class="text-white">
                        <b-form-select v-model="form.statusa" required :disabled="bloqueado">
                            <template #first>
                                <b-form-select-option :value="null" disabled>
                                    Selecciona un status
                                </b-form-select-option>
                                <b-form-select-option v-for="stat in statusadmin" :key="stat.index" :value="stat.Id_Status_Admin">{{stat.Nom_Tipo_Admin}}
                                </b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                </div>
            <br /><br />
                <div class="form-group">
                    <button type="button" class="btn btn-primary" v-on:click="salir()">
                        Salir
                    </button>
                    <b-button type="button" style="color:white" class="btn btn-primary" variant="primary" v-on:click="setinfo" to="/admins" :disabled="bloqueado">
                        Finalizar
                    </b-button>
                </div>
            </div>
        </div>
        <div id="botones">
            <div v-for="(tarea,index) in tareaa" :key="index">
            <!-- <h1>{{tarea}}</h1> -->
                <b-button v-if="tarea==4" block class="buttons" pill variant="primary" to="/nuevoadmin" font-scale="3"> Agregar Nuevo Administrador</b-button>
                <br v-if="tarea==4">
                <b-button v-if="tarea==6" block class="buttons" pill variant="primary" to="/cambiastatus" font-scale="3"> Cambiar Status </b-button>
                <br v-if="tarea==6">
                <b-button v-if="tarea==5" block class="buttons" pill variant="primary" to="/editaradmin" font-scale="3"> Editar Administrador</b-button>
                <br v-if="tarea==5">
                <b-button v-if="tarea>=7" block class="buttons" pill variant="primary" to="/editarpermisos" font-scale="3">Editar Permisos</b-button>
                <br v-if="tarea>=7">
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "FormStatus",
    data: function () {
        return {
            fechaenviar:null,
            bloqueado:true,
            statusadmin: null,
            Listaadmins: null,
            logs:[],
            form: {
                id: "",
                nombre: "",
                apellidop: "",
                apellidom: "",
                nombreusuario: "",
                statusa: null,
            },
            tareaa:[]
        };
    },
    components: {
    },
    methods: {
        buscanombre(){
            this.logs=this.Listaadmins;
            let listapornombre = this.logs.filter(x => x.Id_Administradores == this.form.id);
            this.logs=listapornombre;
            this.form.id=this.logs[0].Id_Administradores;
            this.form.nombre=this.logs[0].Nombre_Admin;
            this.form.apellidop=this.logs[0].Apellido_P_Admin;
            this.form.apellidom=this.logs[0].Apellido_M_Admin;
            this.form.nombreusuario=this.logs[0].Nombre_Usuario;
            this.form.statusa=this.logs[0].Id_Status_Admin[0].Id_Status_Admin;
            this.bloqueado=false;
            // console.log(this.logs);
        },
        salir() {
            this.$router.push("/admins");
        },
        async setinfo(){
            let adminenuso=localStorage.getItem("id");
            // console.log(adminenuso);
            let resp = `http://127.0.0.1:8000/api/update?Id_Administradores=${this.form.id}&Id_Status_Admin=${this.form.statusa}&Nombre_Admin=${this.form.nombre}&Apellido_P_Admin=${this.form.apellidop}&Apellido_M_Admin=${this.form.apellidom}&Nombre_Usuario=${this.form.nombreusuario}&Id_Tipo_Admin=${this.logs[0].Id_Tipo_Admin[0].Id_Tipo_Admin}&Password_Hash=${this.logs[0].Password_Hash}&Cant_dias_limit=${this.logs[0].Cant_dias_limit}&Fecha_ingreso=${this.fechaenviar}&Fecha_Ultimo_Cambio_Pass=${this.logs[0].Fecha_Ultimo_Cambio_Pass}&id=${adminenuso}`;
            await axios.put(resp).then((data) => {
            // console.log(resp);
        });
        },
        obtenfecha: function (){
            return new Date().toLocaleDateString();
        }
    },
    watch: {
    },
    mounted: function () {
        let admin = "http://127.0.0.1:8000/api/muestra";
        axios.get(admin).then((data) => {
            // console.log(data);
            this.Listaadmins = data.data;
            this.logs = this.Listaadmins;
        });
        let statusadmin = "http://127.0.0.1:8000/api/muestrastatusa";
        axios.get(statusadmin).then((data) => {
            // console.log(data);
            this.statusadmin = data.data;
        });
        this.fechaenviar=this.obtenfecha();
        let tareaa=this.$cookies.get("tipoa").admins;
        tareaa.sort(function(a, b){return a - b}); 
        // console.log(tareaa)
        if (tareaa.length) {
            for (let index = 0; index < tareaa.length; index++) {
                const element = tareaa[index];
                this.tareaa.push(element.tareaenadmin);
                if(tareaa[index].tareaenadmin==7) {
                    break;
                }
                // console.log(element.tareaenadmin)
            }
            // console.log(this.tareaa)
        }
    },
};
</script>
<style scoped>
#contenedor {
    display: flex;
}
.left {
    text-align: left;
}
#botones {
    width: 35%;
    margin: 2px;
    padding: 5px;
    border-radius: 10px;
    min-height: 400px;
    color: white;
}
#tabla {
    width: 100%;
    /* background-color: rgb(255, 255, 255); */
    /* margin: 2px;
    padding: 5px;
    border-radius: 10px;
    min-height: 400px; */
}
</style>