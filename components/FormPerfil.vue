<template>
    <div id="contenedor">
        <div id="tabla">
            <div class="form-group left col-sm-10">
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
                @change="desbloqueo"
                required
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
                @change="desbloqueo"
                required
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
                @change="desbloqueo"
                required
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
                @change="desbloqueo"
                required
                />
            </div>
            </div>
            <div>
                    <div v-if="step==1" class="form-group left row">
                        <div class="col">
                            <label for="" class="control-label col-sm-3 text-white"
                            >Contraseña</label
                            >
                            <div class="col-sm-7">
                                <b-input-group>
                                    <b-input-group-prepend is-text @click.prevent="mostrarContrasena">
                                        <b-icon :icon="icon" style="color:black">
                                        </b-icon>
                                    </b-input-group-prepend>
                                        <b-input
                                            :type="showpass"
                                            class="form-control"
                                            name="correo"
                                            id="correo"
                                            v-model="form.pass"
                                            @change="desbloqueo"
                                            required
                                        />
                                </b-input-group>
                            </div>
                        </div>
                        <div class="col">
                            <button type="button" id="password" class="btn btn-primary" v-on:click="generarcontra()">
                            Generar Contraseña
                            </button>
                        </div>
                    </div>
                    <div v-if="step==0" >
                        <b-button variant="primary" id="show-btn" @click="$bvModal.show('bv-modal-example')">Cambiar Contraseña</b-button>
                        <b-modal id="bv-modal-example" hide-footer>
                            <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
                            Contraseña incorrecta
                            </b-alert>
                            <template #modal-title>
                                Ingresar contraseña actual
                            </template>
                            <div class="d-block text-center">
                                <b-form-input
                                    type="text"
                                    class="form-control"
                                    name="correo"
                                    id="correo"
                                    v-model="form.pass"
                                    @change="desbloqueo"
                                ></b-form-input>
                                <label for="" class="control-label col-sm-3 text-white"
                                >Contraseña</label
                                >
                            </div>
                            <b-button variant="primary" class="mt-3" @click="contra" block>Verificar</b-button>
                        </b-modal>
                    </div>
                <br>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-primary" v-on:click="salir()">
                    Salir
                </button>
                <b-button type="button" style="color:white" class="btn btn-primary" variant="primary" v-on:click="setinfo" to="/perfil" :disabled="bloqueado">
                    Finalizar
                </b-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "FormPerfil",
    data: function () {
        return {
            Listaadmins:[],
            step:0,
            showpass:'password',
            icon:'eye-slash',
            fechaenviar:null,
            bloqueado:true,
            logs:[],
            contras:"",
        form: {
            id:"",
            nombre: "",
            apellidop: "",
            apellidom: "",
            pass: "",
            nombreusuario: "",

            // idstatus:"",
            // idtipo:"",
            // fechaing: "",
            // fcambiopass: "",
            // cantlimdias:""
        },
        showDismissibleAlert: false,
        mensaje:null
        };
    },
    components: {
    },
    methods: {
        async setinfo(){
            let adminenuso=localStorage.getItem("id");
            let resp;
            // console.log(this.fechaenviar)
            // console.log(this.logs[0].Password_Hash)
            if (this.form.pass != this.logs[0].Password_Hash && this.step==1) {
                resp = `http://127.0.0.1:8000/api/updateperfil?Id_Administradores=${adminenuso}&Id_Status_Admin=${this.logs[0].Id_Status_Admin}&Nombre_Admin=${this.form.nombre}&Apellido_P_Admin=${this.form.apellidop}&Apellido_M_Admin=${this.form.apellidom}&Nombre_Usuario=${this.form.nombreusuario}&Id_Tipo_Admin=${this.logs[0].Id_Tipo_Admin}&Password_Hash=${this.form.pass}&Cant_dias_limit=${this.logs[0].Cant_dias_limit}&Fecha_ingreso=${this.logs[0].Fecha_ingreso}&Fecha_Ultimo_Cambio_Pass=${this.fechaenviar}&id=${adminenuso}`;
            }else {
                resp = `http://127.0.0.1:8000/api/updateperfil?Id_Administradores=${adminenuso}&Id_Status_Admin=${this.logs[0].Id_Status_Admin}&Nombre_Admin=${this.form.nombre}&Apellido_P_Admin=${this.form.apellidop}&Apellido_M_Admin=${this.form.apellidom}&Nombre_Usuario=${this.form.nombreusuario}&Id_Tipo_Admin=${this.logs[0].Id_Tipo_Admin}&Password_Hash=${this.logs[0].Password_Hash}&Cant_dias_limit=${this.logs[0].Cant_dias_limit}&Fecha_ingreso=${this.logs[0].Fecha_ingreso}&Fecha_Ultimo_Cambio_Pass=${this.logs[0].Fecha_Ultimo_Cambio_Pass}&id=${adminenuso}`;
            }
            // console.log(resp)
            await axios.put(resp).then((data) => {
                    this.mensaje=data.data.message;
                    // console.log(data.data.message);
                    this.makeToast('success');
            });
            this.bloqueado=true;
            this.showpass='password';
        },
        salir() {
            this.$router.push("/admins");
        },
        obtenfecha: function (){
            // var date = new Date();
            // const formatDate = (current_datetime)=>{
            //     let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
            //     return formatted_date;
            // }
            // console.log(formatDate(date));
            // return formatDate(date);
            let now = new Date();
            let options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            return now.toLocaleString('sv-SE', options); 
        },
        contra() {
            if (this.contras==this.form.pass) {
                this.step=1;
            }else{
                this.showDismissibleAlert=true;
                this.step=0;
            }
        },
        generarcontra(){
            let text = ""; 
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
            for( let i=0; i < 8; i++ ){
                text += possible.charAt(Math.floor(Math.random() * possible.length)); 
            } 
            this.form.pass = text;
        },
        mostrarContrasena(){
            if (this.showpass=='password') {
                this.showpass = 'text'
                this.icon = 'eye'
            }else if(this.showpass=='text'){
                this.showpass = 'password'
                this.icon = 'eye-slash'
            }
        },
        desbloqueo(){
            this.bloqueado = false;
        },
        makeToast(variant = null) {
        this.$bvToast.toast(this.mensaje, {
            title: "Mensaje",
            variant: variant,
            solid: true
        })
        }
    },
    watch: {
    },
    mounted: function () {
        let adminenuso=localStorage.getItem("id");
        // console.log(this.$cookies.get('user').Id_Tipo_Admin)
        // console.log(adminenuso);
        let admin = `http://127.0.0.1:8000/api/show/${adminenuso}`;
        axios.get(admin).then((data) => {
            // console.log(data.data.data[0]);
            this.form.nombre=data.data.data[0].Nombre_Admin;
            this.form.apellidop=data.data.data[0].Apellido_P_Admin;
            this.form.apellidom=data.data.data[0].Apellido_M_Admin;
            this.form.nombreusuario=data.data.data[0].Nombre_Usuario;
            this.contras=data.data.data[0].Password_Hash;
            this.Listaadmins = data.data.data;
            this.logs = this.Listaadmins;
            // console.log(this.logs[0].Password_Hash)
        });
        this.fechaenviar=this.obtenfecha();
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
}
</style>