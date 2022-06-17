<template>
    <div id="contenedor">
        <div id="tabla">
            <h1 class="text-white">Editar Permisos {{this.nombrecompleto}}</h1> <br>
            <div class="form-group left col-sm-10">
                <b-input-group v-if="form.id.length > 0">
                    <b-input-group-prepend is-text @click.prevent="setinfo()">
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
            <div class="container form-group col-sm-10">
                <b-form-group>
                    <template #label>
                        <label for="" class="control-label text-white">Selecciona los servicios:</label><br>
                        <b-form-checkbox
                        size="lg"
                        v-model="allSelected"
                        :indeterminate="indeterminate"
                        @change="toggleAll"
                        class="control-label text-white"
                        stacked
                        >
                        {{ allSelected ? 'Quitar todos' : 'Selecciona todos' }}
                        </b-form-checkbox>
                    </template>
                    <template v-slot="{ ariaDescribedby }">
                        <b-form-checkbox-group
                        size="lg"
                        v-model="selected"
                        :options="listservicios"
                        :aria-describedby="ariaDescribedby"
                        class="ml-4 control-label text-white"
                        value-field="item"
                        text-field="name"
                        stacked
                        ></b-form-checkbox-group>
                    </template>
                </b-form-group>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-primary" v-on:click="salir()">
                    Salir
                </button>
                <b-button class="btn btn-primary" v-on:click="limpiar" variant="primary">Limpiar</b-button>
                <b-button type="button" style="color:white" class="btn btn-primary" variant="primary" v-on:click="setpermisos" :disabled="bloqueado" to="/admins">
                    Finalizar
                </b-button>
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
            bloqueado:true,
            selected: [],
            allSelected: false,
            indeterminate: false,
            listservicios:[],
            nombrecompleto:null,
            form: {
                id: "",
            },
            tareaa:[],
            mensaje:null
        };
    },
    components: {
    },
    methods: {
        toggleAll(checked) {
            let listavariable = [];
            let variable;
            for (let index = 0; index < this.listservicios.length; index++) {
                variable = this.listservicios[index].item;
                listavariable.push(variable)
            }
            this.selected = checked ? listavariable : []
        },
        salir() {
            this.$router.push("/admins");
        },
        limpiar(){
            this.nombrecompleto="";
            this.form.id="";
            this.selected=[];
            this.bloqueado=true;
        },
        async setinfo(){
            let lista=[];
            let listaapintar=[];
            let resp = `http://127.0.0.1:8000/api/showcatservicioa/${this.form.id}`;
            await axios.get(resp).then((data) => {
                for (let index = 0; index < this.listservicios.length; index++) {
                    if (data.data.admins[index]) {
                        // console.log(data.data.admins[index].tareaenadmin);
                        listaapintar.push(data.data.admins[index].tareaenadmin); 
                    }else{
                        lista.push(this.listservicios[index]);
                    }
                }
            this.selected=listaapintar;
            this.bloqueado=false;
            // console.log("Aqui ta")
            // console.log(listaapintar);
            // console.log("Lista a borrar")
            // console.log(lista)
            });
            let admin = `http://127.0.0.1:8000/api/show/${this.form.id}`;
            axios.get(admin).then((data) => {
                this.nombrecompleto=data.data.data[0].Nombre_Admin + " " +data.data.data[0].Apellido_P_Admin;
                // console.log(this.nombrecompleto);
            });
        },
        async setpermisos(){
            let adminenuso=localStorage.getItem("id");
            // console.log(this.selected);
            let resp = `http://127.0.0.1:8000/api/addservicio?lista_insert=${this.selected}&Id_Administrador=${this.form.id}&id=${adminenuso}`;
            await axios.get(resp).then((data) => {
            // console.log(data);
            });
        },
        makeToast(variant = null) {
        this.$bvToast.toast(this.mensaje, {
            title: "Mensaje",
            variant: variant,
            solid: true,
            delay: 2000 
        })
        }
    },
    watch: {
        selected(newValue, oldValue) {
            // Handle changes in individual flavour checkboxes
            if (newValue.length === 0) {
                this.indeterminate = false
                this.allSelected = false
            } else if (newValue.length === this.listservicios.length) {
                this.indeterminate = false
                this.allSelected = true
            } else {
                this.indeterminate = true
                this.allSelected = false
            }
        }
    },
    mounted: function () {
        let catservicios = "http://127.0.0.1:8000/api/muestracatservicio";
        axios.get(catservicios).then((data) => {
            // console.log(data);
            this.catservicios = data.data;
            for (let index = 0; index < this.catservicios.length; index++) {
                this.listservicios.push({name:this.catservicios[index].Nom_Cat_Servicios,item:this.catservicios[index].Id_Cat_Servicios});
            }
            // console.log(this.listservicios);
        });
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