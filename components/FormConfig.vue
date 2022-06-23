<template>
    <div class="">
        <h1 v-if="permisos.length==0" class="text-white">No tienes permisos para configurar la RED</h1>
        <div v-for="permiso in permisos" :key="permiso">
            <b-card-group deck >
                <b-card
                title="Router"
                v-if="permiso==2"
                >
                    <div align="center" class="center">
                        <b-form @submit.stop.prevent="configrouter" class="control-label text-black">
                            <b-form-group align="center" id="input-group-2" label="IP ROUTER" label-for="input-2">
                                <vue-ip style="background:#2E4053 " v-model="router.ip" :ip="ip" :on-change="change" theme="material"></vue-ip>
                                <!-- <b-form-input style="width: 20%"  id="input-1" type="text" required placeholder="ip del router"></b-form-input> -->
                            </b-form-group>
                        </b-form>
                        <b-form-group
                        class="ml-4 control-label text-black"
                        label="Selecciona la configuración"
                        v-slot="{ ariaDescribedby }"
                        >
                        <b-form-checkbox-group
                            class="control-label text-black"
                            v-model="selectedrouter"
                            :options="optionsrouter"
                            :aria-describedby="ariaDescribedby"
                            switches
                        ></b-form-checkbox-group>
                        </b-form-group>
                        <b-button class="btn btn-primary" variant="primary" type="submit" :disabled="flagip" v-on:click="configrouter">Configurar Router</b-button>
                    </div>
                </b-card>
                <b-card
                v-if="permiso==3"
                title="Switch"
                >
                    <div align="center" class="center">
                        <b-form @submit.stop.prevent="configswitch" class="control-label text-black">
                            <b-form-group align="center" id="input-group-2" label="IP SWITCH" label-for="input-2">
                                <vue-ip style="background:#2E4053 " v-model="switches.ip" :ip="ipsw" :on-change="changesw" theme="material"></vue-ip>
                                <!-- <b-form-input style="width:20%" v-model="switches.ip" id="input-1" type="text" required placeholder="ip del switch"></b-form-input> -->
                            </b-form-group>
                        </b-form>
                        <b-form-group
                        class="ml-4 control-label text-black"
                        label="Selecciona la configuración"
                        v-slot="{ ariaDescribedby }"
                        >
                        <b-form-checkbox-group
                            class="control-label text-black"
                            v-model="selectedswitch"
                            :options="optionsswitch"
                            :aria-describedby="ariaDescribedby"
                            switches
                        ></b-form-checkbox-group>
                        </b-form-group>
                        <b-button class="btn btn-primary" variant="primary" type="submit" :disabled="flagipsw" v-on:click="configswitch">Configurar Switch</b-button>
                    </div>
                </b-card>
                <b-card 
                title="Servidor"
                v-if="permiso==4"
                >
                    <div align="center" class="center">
                        <b-form @submit.stop.prevent="configservidor" class="control-label text-black">
                            <b-form-group align="center" id="input-group-2" label="IP SERVIDOR" label-for="input-2">
                                <vue-ip style="background:#2E4053 " v-model="servidor.ip" :ip="ipsv" :on-change="changesv" theme="material"></vue-ip>
                                <!-- <b-form-input style="width:20%" v-model="servidor.ip" id="input-1" type="text" required placeholder="ip del servidor"></b-form-input> -->
                            </b-form-group>
                        </b-form>
                        <b-form-group
                        class="ml-4 control-label text-black"
                        label="Selecciona la configuración"
                        v-slot="{ ariaDescribedby }"
                        >
                        <b-form-checkbox-group
                            class="control-label text-black"
                            v-model="selected"
                            :options="options"
                            :aria-describedby="ariaDescribedby"
                            switches
                        ></b-form-checkbox-group>
                        </b-form-group>
                        <b-button class="btn btn-primary" variant="primary" type="submit" :disabled="flagipsv" v-on:click="configservidor">Configurar Servidor</b-button>
                    </div>
                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name:'FormConfig',
    data(){
        return{
            mensaje: '',
            ip:null,
            port:'3000',
            flagip:true,
            ipsw:null,
            portsw:'3000',
            flagipsw:true,
            ipsv:null,
            portsv:'3000',
            flagipsv:true,
            servidor:{
                ip: "",
                servicios: "",
            },
            switches: {
                ip: "",
                servicios: "",
            },
            router: {
                ip: "",
                servicios: "",
            },
            selected: [],
            options: [
                {text: "Servicio de almacenamiento", value: "servicioalm"},
                {text: "Balanceo de cargas", value: "balanceodecarg"},
                {text: "Servicio web php", value: "serphp"},
                {text: "Servicio web django", value: "django"},
                {text: "Servicio web apache", value: "apache"},
                {text: "Servicio base de datos", value: "servbd"},
                {text: "Servicio de DNS", value: "dns"},
                {text: "Servicio de VPN", value: "vpn"},
            ],
            selectedswitch: [],
            optionsswitch: [
                {text: "Configurar balanceo de carga", value: "configbal"},
                {text: "Monitoreo DNS", value: "monitoreodns"},
                {text: "Responder solicitudes ARP", value: "resparp"},
                {text: "Comprobador de conexiones", value: "comprobarconexiones"},
            ],
            selectedrouter: [],
            optionsrouter: [
                {text: "Configurar balanceo de carga", value: "configbal"},
                {text: "Monitoreo DNS", value: "monitoreodns"},
                {text: "Responder solicitudes ARP", value: "resparp"},
                {text: "Comprobador de conexiones", value: "comprobarconexiones"},
            ],
            permisos:[]
        }
    },
    computed:{},
    methods:{
        async configswitch(){
            let adminenuso=localStorage.getItem("id");
            let resp = `http://127.0.0.1:8000/api/scriptconfigswitch?Id_Administradores=${adminenuso}&IP_Dispositivos_Desp=${this.switches.ip}&IP_Dispositivos_Ant=${this.switches.ip}`;
            await axios.post(resp).then((data) => {
            // console.log(resp);
            if (data.data.message == 'Servicio realizado con éxito') {
                this.mensaje = data.data.message;
                this.switches.ip="";
                this.ipsw=null;
                this.makeToast('success');
            } else {
                this.mensaje=data.data.message;
                this.switches.ip="";
                this.ipsw=null;
                this.makeToast('danger');
            }
        });
        },
        async configrouter(){
            let adminenuso=localStorage.getItem("id");
            let resp = `http://127.0.0.1:8000/api/scriptconfigrouter?Id_Administradores=${adminenuso}&IP_Dispositivos_Desp=${this.router.ip}&IP_Dispositivos_Ant=${this.router.ip}`;
            await axios.post(resp).then((data) => {
            // console.log(resp);
            if (data.data.message == 'Servicio realizado con éxito') {
                this.mensaje = data.data.message;
                this.router.ip="";
                this.ip=null;
                this.makeToast('success');
            } else {
                this.mensaje=data.data.message;
                this.router.ip="";
                this.ip=null;
                this.makeToast('danger');
            }
        });
        },
        async configservidor(){
            let adminenuso=localStorage.getItem("id");
            let resp = `http://127.0.0.1:8000/api/scriptconfigservidor?Id_Administradores=${adminenuso}&IP_Dispositivos_Desp=${this.servidor.ip}&IP_Dispositivos_Ant=${this.servidor.ip}`;
            await axios.post(resp).then((data) => {
            // console.log(resp);
            if (data.data.message == 'Servicio realizado con éxito') {
                this.mensaje = data.data.message;
                this.servidor.ip="";
                this.ipsv=null;
                this.makeToast('success');
            } else {
                this.mensaje=data.data.message;
                this.servidor.ip="";
                this.ipsv=null;
                this.makeToast('danger');
            }
        });
        },
        change(ip, port, valid) {
            // console.log(ip, port, valid);
            if (valid) {
                this.flagip=false;
                this.router.ip=ip;
            }else{
                this.flagip=true;
            }
        },
        changesw(ipsw, portsw, valid) {
            // console.log(ipsw, portsw, valid);
            if (valid) {
                this.flagipsw=false;
                this.switches.ip=ipsw;
            }else{
                this.flagipsw=true;
            }
        },
        changesv(ipsv, portsv, valid) {
            // console.log(ipsv, portsv, valid);
            if (valid) {
                this.flagipsv=false;
                this.servidor.ip=ipsv;
            }else{
                this.flagipsv=true;
            }
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
        let permisos=this.$cookies.get("tareaa").admins;
        for (let index = 0; index < permisos.length; index++) {
            const element = permisos[index];
            this.permisos.push(element.tareaenadmin);
            // console.log(element.tareaenadmin)
        }
    }
}
</script>
<style scoped>
    .center {
    text-align: center;
    justify-content: center;
    }
</style>
