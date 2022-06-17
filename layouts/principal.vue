<template>
  <div>
    <nav>
      <ul>
        <div class="wrapper">
            <!-- <div class="box0">
                <li>
                    <NuxtLink style="color:white" to="/resumen">Resumen</NuxtLink>
                </li>
            </div>
            <div class="box2">
                <li>
                    <NuxtLink style="color:white" to="/admins">Administratores</NuxtLink>
                </li>
            </div>
            <div class="box2">
                <li>
                    <NuxtLink style="color:white" to="/logs">Logs</NuxtLink>
                </li>
            </div>
            <div class="box2">
                <li>
                    <NuxtLink style="color:white" to="/red">Red</NuxtLink>
                </li>
            </div>
            <div class="box1">
                <li>
                    <NuxtLink style="color:white" to="/configuracion">Configuración</NuxtLink>
                </li>
            </div>
            <div class="box3">
                <li>
                    <NuxtLink style="color:white" to="/login">Login</NuxtLink>
                </li>
            </div> -->
        </div>
      </ul>
    </nav>
    <div class="row justify-content-md-center">
        <div class="col-9">
            <main>
                <Nuxt />
            </main>
        </div>
        <!-- <div class="col-1">
            <div class="form-check" align="center">
                <b-form>
                    <b-button class="custom" pill>
                        Agregar administrador
                    </b-button>
                    <br><br>
                    <b-button class="custom" pill>
                        Cambiar Status
                    </b-button>
                    <br><br>
                    <b-button class="custom" pill>
                        Editar administrador
                    </b-button>
                </b-form>
            </div>
        </div> -->
    </div>
  </div>
</template>

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
.custom{
    width: 100 !important;
}

</style>
