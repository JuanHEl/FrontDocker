<template>
    <div class="">
        <div align="center">
            <b-card title="Inicio de sesion" body-text-variant="white" style="background-color: #6b123c" class="">
                <b-form @submit.stop.prevent="loginuser">
                    <b-form-group id="input-group-1" label="Nombre usuario" label-for="input-1">
                        <b-form-input v-model="usuario.username" id="input-1" type="text" required placeholder="Ingresar nombre de usuario"></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
                        <b-form-input v-model="usuario.password" id="input-2" type="password" required placeholder="Ingresar contraseña"></b-form-input>
                    </b-form-group>
                    <b-button class="btn btn-primary" variant="primary" type="submit">Iniciar sesión</b-button>
                </b-form>
            </b-card>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name:'FormLogin',
    data(){
        return{
            usuario:{
                username:null,
                password:null
            },
            mensaje:null,
            id:""
        }
    },
    computed:{

    },
    methods:{
        async loginuser(){
            // let msg = await this.$store.dispatch("admin/setinfo", this.usuario);
            let user = `http://127.0.0.1:8000/api/login?Nombre_Usuario=${this.usuario.username}&Password=${this.usuario.password}`;
            await axios.post(user).then((data) => {
                // console.log(data);
                if (data.data.message == 'Usuario ingresado con éxito') {
                    localStorage.setItem("level", data.data.data.Id_Tipo_Admin); //agregar al localstore
                    localStorage.setItem("id", data.data.data.Id_Administradores); 
                    this.mensaje=data.data.message;
                    // this.$cookies.set('user',data.data.data);
                    this.$cookies.set("user",data.data.data,{
                        path: "/", 
                        maxAge:60*60*24*7
                    });
                    this.id=data.data.data.Id_Administradores;
                    // console.log(data.data.message);
                }else{
                    this.mensaje=data.data.message;
                    this.makeToast('danger');
                    this.$router.push("/login");
                    // console.log(data.data.message);
                }
            });
            if (this.id) {
                let tipo = `http://127.0.0.1:8000/api/showcattareaa/${this.id}`;
                await axios.get(tipo).then((data) => {
                    if (data.data) {
                        // console.log(data.data);
                        this.$cookies.set("tipoa",data.data,{
                            path: "/", 
                            maxAge:60*60*24*7
                        });  
                    }
                });
                let tarea = `http://127.0.0.1:8000/api/showcatservicioa/${this.id}`;
                await axios.get(tarea).then((data) => {
                    if (data.data) {
                        // console.log("tareaa:");
                        // console.log(data.data);
                        this.$cookies.set("tareaa",data.data,{
                            path: "/", 
                            maxAge:60*60*24*7
                        });  
                    }
                });
            }
            this.$router.push("/admins");
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
    mounted: function () {
    }
}
</script>
