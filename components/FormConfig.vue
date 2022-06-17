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
                        <b-button class="btn btn-primary" variant="primary" type="submit" :disabled="flagip">Configurar Router</b-button>
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
                        <b-button class="btn btn-primary" variant="primary" type="submit" :disabled="flagipsw">Configurar Switch</b-button>
                    </div>
                </b-card>
                <b-card 
                title="Servidor"
                v-if="permiso==4"
                >
                    <div align="center" class="center">
                        <b-form @submit.stop.prevent="configsserv" class="control-label text-black">
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
                        <b-button class="btn btn-primary" variant="primary" type="submit" :disabled="flagipsv">Configurar Servidor</b-button>
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
                {text: "Instalar FTP", value: "FTP"},
                {text: "Instalar Proxy", value: "Proxy"},
                {text: "Instalar Hwp", value: "Hwp"},
                {text: "Instalar Apache", value: "Apache"},
            ],
            selectedswitch: [],
            optionsswitch: [
                {text: "Instalar FTP", value: "FTP"},
                {text: "Instalar Proxy", value: "Proxy"},
                {text: "Instalar Hwp", value: "Hwp"},
                {text: "Instalar Apache", value: "Apache"},
            ],
            selectedrouter: [],
            optionsrouter: [
                {text: "Instalar FTP", value: "FTP"},
                {text: "Instalar Proxy", value: "Proxy"},
                {text: "Instalar Hwp", value: "Hwp"},
                {text: "Instalar Apache", value: "Apache"},
            ],
            permisos:[]
        }
    },
    computed:{},
    methods:{
        async configswitch(){

        },
        async configrouter(){

        },
        async configsserv(){
            
        },
        change(ip, port, valid) {
            console.log(ip, port, valid);
            if (valid) {
                this.flagip=false;
                this.router.ip=ip;
            }else{
                this.flagip=true;
            }
        },
        changesw(ipsw, portsw, valid) {
            console.log(ipsw, portsw, valid);
            if (valid) {
                this.flagipsw=false;
                this.router.ip=ipsw;
            }else{
                this.flagipsw=true;
            }
        },
        changesv(ipsv, portsv, valid) {
            console.log(ipsv, portsv, valid);
            if (valid) {
                this.flagipsv=false;
                this.router.ip=ipsv;
            }else{
                this.flagipsv=true;
            }
        },
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
