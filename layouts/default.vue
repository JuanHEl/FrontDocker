<template>
<div>
  <div>
    <b-navbar toggleable="sm" type="light" variant="dark">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <!-- <div> -->
        <div style="border-style: solid; border-color: #FFFFFF">
            <p style="color:white; font-size:10px">&nbsp;Inactivo&nbsp;<v-idle
              style="color:white; font-size:10px"
              class="text-white"
              @idle="onidle"
              @remind="onremind"
              :loop="true"
              :reminders="[20]"
              :wait="5"
              :duration="120"/></p>
        </div>
        <div style="border-style: solid; border-color: #FFFFFF">
          <p style="color:white; font-size:10px">&nbsp;Sistema&nbsp;
          <vue-time style="color:white; font-size:10px" :show-date="showDate" :show-day="showDay" :show-time="showTime" :options="options"></vue-time></p>
        </div>
      <!-- </div> -->
          <div class="my-2">
          </div>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
            <h4 style="color:white" v-if="this.nombre">Bienvenido: {{nombre}}</h4>
        </b-navbar-nav>
            <b-nav-item-dropdown text="Perfil" right class="text-white">
            <b-dropdown-item style="width:100%" v-on:click="setinfo" to="/login" v-b-tooltip.hover title="Cerrar Sesion"><b-icon icon="power" style="color:black">
              </b-icon></b-dropdown-item>
            <b-dropdown-item style="width:100%" v-b-tooltip.hover title="Editar" to="/perfil"><b-icon icon="pencil" style="color:black">
              </b-icon></b-dropdown-item>
      </b-nav-item-dropdown>
      </b-collapse>
      <!-- <div class="form-group col-sm-2">
        <div class="dropdown">
          <b-button
          variant="primary"
          text="Info"
          class="m-md-2"
          >Perfil</b-button>
          <div class="dropdown-content">
            <b-button style="width:100%" variant="primary" class="btn btn-primary" v-on:click="setinfo" to="/login" v-b-tooltip.hover title="Cerrar Sesion">
              <b-icon icon="power" style="color:white">
              </b-icon>
            </b-button>
            <b-button style="width:100%" variant="primary" class="btn btn-primary" to="/perfil" v-b-tooltip.hover title="Editar">
              
            </b-button>
          </div>
        </div>
      </div> -->
    </b-navbar>
  </div>
  <nav class="nav nav-pills nav-justified" style="font-size:25px">
    <a class="nav-item nav-link"><NuxtLink style="color:white" to="/resumen">Resumen</NuxtLink></a>
    <a class="nav-item nav-link"><NuxtLink style="color:white" to="/admins">Administradores</NuxtLink></a>
    <a class="nav-item nav-link"><NuxtLink style="color:white" to="/logs">Logs Servicios</NuxtLink></a>
    <a class="nav-item nav-link"><NuxtLink style="color:white" to="/logst">Logs Tareas</NuxtLink></a>
    <a class="nav-item nav-link"><NuxtLink style="color:white" to="/configuracion">Configuración Red</NuxtLink></a>
  </nav>
  <div class="header">
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav mr-auto my-2 my-lg-0">
        <div class="wrapper my-2">
            <div class="box">
                <li>
                    <NuxtLink style="color:white" to="/resumen">Resumen</NuxtLink>
                </li>
            </div>
            <div class="box">
                <li>
                    <NuxtLink style="color:white" to="/admins">Administradores</NuxtLink>
                </li>
            </div>
            <div class="box">
                <li>
                    <NuxtLink style="color:white" to="/logs">Logs Servicios</NuxtLink>
                </li>
            </div>
            <div class="box">
                <li>
                    <NuxtLink style="color:white" to="/logst">Logs Tareas</NuxtLink>
                </li>
            </div>
            <div class="box">
                <li>
                    <NuxtLink style="color:white" to="/configuracion">Configuración Red</NuxtLink>
                </li>
            </div>
        </div>
      </ul>
    </nav> -->
    <main>
      <Nuxt />
    </main>
    </div>

</div>
</template>
<script>
import axios from "axios";
export default {
    data: function () {
        return {
          nombre:"",
          mensaje:null,
          showDate: false,
          showDay: false,
          showTime: true,
          options: {
            hour12: false,
            timeZone: 'America/Mexico_City',
            era: 'long',
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }
        };
    },
    components: {},
    methods: {
        async setinfo(){
          let adminenuso=localStorage.getItem("id");
          let resp = `http://127.0.0.1:8000/api/logout?id=${adminenuso}`;
          await axios.post(resp).then((data) => {
            // console.log(resp);
          });
          localStorage.removeItem('level');
          localStorage.removeItem('id');
          this.$cookies.remove('user');
          this.$cookies.remove('tareaa');
          this.$cookies.remove('tipoa');
          location.reload();
        },
        onidle() {
          this.setinfo();
          // alert('You have been logged out');
        },
        onremind(time) {
          // alert seconds remaining to 00:00
          // alert(time);
          this.makeToast('danger',time);
        },
        makeToast(variant = danger, time) {
        this.$bvToast.toast("Se ha detectado inactividad, saldrás del sistema en "+time+" segundos", {
            title: "Mensaje",
            variant: variant,
            solid: true,
            delay: 2000 
        })
        },
        makeToast2(variant = warning) {
        this.$bvToast.toast(this.mensaje, {
            title: "Seguridad de la cuenta",
            variant: variant,
            solid: true,
            delay: 2000 
        })
        }
    },
    watch: {},
    mounted: function () {
      this.nombre=this.$cookies.get('user').Nombre_Usuario;
      let now = new Date();
      let options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
      };
      let fecha= now.toLocaleString('sv-SE', options); 
      // console.log(this.$cookies.get('user').Fecha_Ultimo_Cambio_Pass == 'null' ? 'es null': 'no es null');
      if(this.$cookies.get('user').Fecha_Ultimo_Cambio_Pass != 'null') {
        // console.log('Usuario')
        // console.log(this.$cookies.get('user').Fecha_Ultimo_Cambio_Pass)
        // console.log('actual')
        // console.log(fecha)
        let ultimocambio = this.$cookies.get('user').Fecha_Ultimo_Cambio_Pass.split(' ')
        let actual = fecha.split(' ')
        // console.log(ultimocambio[0])
        // console.log(actual[0])
        if (actual[0]>ultimocambio[0]) {
          // console.log('Ya pasó un buen')
          let fecha1 = new Date(actual[0]);
          let fecha2 = new Date(ultimocambio[0]);
          let istime = (fecha1-fecha2)/(1000*60*60*24)
          // console.log((fecha1-fecha2)/(1000*60*60*24))
          if(istime>5) {
            // console.log('Ya debes cambiar contraseña')
            this.mensaje="Lleva "+istime+" días sin cambiar tu contraseña, sugerimos actualizarla"
            this.makeToast2('warning');
          }
          // else{
          //   console.log(istime)
          //   this.mensaje="Lleva "+istime+" días sin cambiar tu contraseña, sugerimos actualizarla"
          //   this.makeToast2('warning');
          // }
        }
      }else{
        // console.log('No tengo contraseña')
        this.mensaje="Por favor cambia tu contraseña de acceso"
        this.makeToast2('warning');
      }
      //   (makeToast,variant = null) =>{
      //     this.$bvToast.toast(this.mensaje, {
      //       title: "Mensaje",
      //       variant: variant,
      //       solid: true,
      //     })
      //   };
      }
};
</script>
<style>
/* home route and active route will show in bold as it matches / and /about */
a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  margin: 0;
}

main {
  margin: 0 auto;
  padding: 0 1rem;
  margin-top: 100px;
  max-width: 1280px;
  text-align: center;
}
img {
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
}
li {
  margin: 0 0.5rem;
  padding: 0.25rem;
  font-size: 1.2rem;
}

nav {
  padding: 0 1rem;
}

a,
a:visited {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #00c58e;
}
.wrapper{
    display:flex;
}
.wrapper > div {
    flex: 1;
}
.header {
  background-size: cover;
  min-height: 100vh;
}
.header .navbar {
  background-color: transparent !important;
}
.box {
  width: 195px;
  /* margin: 10%;
  padding: 10%; */
}
.dropdown {
  display: inline-block;
  position: relative;
}
.dropdown-content {
  display: none;
  position: absolute;
  width: 100%;
  box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.4);
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content a {
  display: block;
  color: #000000;
  padding: 5px;
  background-color: primary;
  text-decoration: none;
}
.dropdown-content a:hover {
  color: #FFFFFF;
  background-color: primary;
}
</style>
