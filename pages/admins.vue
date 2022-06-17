<template>
        <div id="admins">
            <div>
                <b-table
                style="width:82%; height:100%;"
                responsive
                sticky-header
                id="tablalogs"
                striped
                hover
                :items="items"
                :fields="fields"
                ></b-table>
            </div>
            <!-- <div> -->
            <!-- <Header/>
            <Navbar/> -->
            <!-- <div class="container" style="width:100%; height:50%; overflow-y:scroll"> -->
            <!-- <table class="table table-hover">
                <thead>
                <tr class="text-white">
                    <th scope="col">Nombre Administrator</th>
                    <th scope="col">Nombre Usuario</th>
                    <th scope="col">Apellido Paterno</th>
                    <th scope="col">Apellido Materno</th>
                    <th scope="col">Status Admin</th>
                    <th scope="col">Tipo Admin</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="admin in logs"
                    :key="admin.Id_Administradores"
                    class="text-white"
                >
                    <td>{{ admin.Nombre_Admin }}</td>
                    <td>{{ admin.Nombre_Usuario }}</td>
                    <td>{{ admin.Apellido_P_Admin }}</td>
                    <td>{{ admin.Apellido_M_Admin }}</td>
                    <td>{{ admin.Id_Status_Admin[0].Nom_Tipo_Admin }}</td>
                    <td>{{ admin.Id_Tipo_Admin[0].Nom_Tipo_Admin }}</td>
                </tr>
                </tbody>
            </table> -->
            <!-- <b-button variant="primary" to="/nuevoadmin"> Nuevo Administrador </b-button> -->
            <!-- </div> -->
            <!-- </div> -->
        <div id="botones">
            <div>
                <b-input-group>
                    <b-input-group-prepend is-text @click.prevent="buscanombre">
                        <b-icon icon="search" style="color:black">
                        </b-icon>
                    </b-input-group-prepend>
                        <b-input
                            v-model="form.nombe"
                            id="input-1"
                            type="text"
                            placeholder="Buscar por nombre de usuario"
                            required
                        />
                </b-input-group>
                <p></p>
                <h1 v-if="tareaa.length==0" class="text-white">No tienes permisos para modificar</h1>
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
            <!-- <b-form-input
            v-model="form.nombe"
            id="input-1"
            type="text"
            placeholder="Buscar por nombre de usuario"
            required
            class="mb-2"
            @change="buscanombre"
            ></b-form-input> -->
        </div>
    </div>
</template>
<script>
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import axios from "axios";
import apiTT from "../repositories/Repository";
export default {
    name: "home",
    middleware:"session",
    data() {
        return {
            form:{
                nombe: ""
            },
            Listaadmins: null,
            tareaa:[],
            logs:[],
            fields: [
                {
                key: "Nombre_Admin",
                label: "Nombre Administrator",
                sortable: false,
                },
                {
                key: "Nombre_Usuario",
                label: "Nombre Usuario",
                sortable: false,
                },
                {
                key: "Apellido_P_Admin",
                label: "Apellido Paterno",
                sortable: false,
                },
                {
                key: "Apellido_M_Admin",
                label: "Apellido Materno",
                sortable: false,
                },
                {
                key: "Id_Status_Admin[0].Nom_Tipo_Admin",
                label: "Status Admin",
                sortable: false,
                },
                {
                key: "Id_Tipo_Admin[0].Nom_Tipo_Admin",
                label: "Tipo Admin",
                sortable: false,
                }
            ],
            items: []
        };
    },
    methods: {
        buscanombre(){
            this.logs=this.Listaadmins;
            let listapornombre = this.logs.filter(x => x.Nombre_Usuario == this.form.nombe || (x.Nombre_Usuario).toLowerCase().match(this.form.nombe) || (x.Nombre_Usuario).toUpperCase().match(this.form.nombe));
            this.logs=listapornombre;
            // console.log(this.logs)
        }
    },
    components: {
        Header,
    },
    mounted: function () {
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
        let admin = "http://127.0.0.1:8000/api/muestra";
        axios.get(admin).then((data) => {
            // console.log(data);
            this.Listaadmins = data.data;
            this.logs = this.Listaadmins;
            this.items =this.logs;
        });
    },
    beforeMount: function () {
        let admin = "http://127.0.0.1:8000/api/muestra";
        axios.get(admin).then((data) => {
            // console.log(data);
            this.Listaadmins = data.data;
            this.logs = this.Listaadmins;
        });
    }
};
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