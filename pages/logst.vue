<template>
    <div id="logs">
        <b-table
        responsive
        sticky-header
        id="tablalogs"
        striped
        hover
        :items="items"
        :fields="fields"
        ></b-table>
        <div id="formLogs">
        <div>
            <p style="color: white">Filtros</p>
        </div>
        <div id="formsInput">
            <b-input-group>
            <b-input-group-prepend is-text @click.prevent="filtraporid">
                <b-icon icon="search" style="color: black"> </b-icon>
            </b-input-group-prepend>
            <b-input
                v-model="form.id"
                id="input-1"
                type="text"
                placeholder="Busca por id del administrador"
                required
            />
            </b-input-group>
            <p></p>
            <b-form-select
            v-model="form.servicio"
            :options="opciones"
            class="mb-2"
            @change="filtroservicios"
            ></b-form-select>
            <b-form-datepicker
            v-model="form.fechaI"
            class="mb-2"
            @input="buscaporinicio"
            ></b-form-datepicker>
            <b-form-datepicker
            v-model="form.fechaF"
            class="mb-2"
            @input="buscaporfin"
            ></b-form-datepicker>
            <b-form-select
            v-model="form.estatus"
            :options="opcionesEstatus"
            @change="filtroestatus"
            ></b-form-select>
        </div>
        <b-button
            class="btn btn-primary"
            v-on:click="limpiar('todo')"
            variant="primary"
            >Limpiar</b-button
        >
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'logst',
    middleware:"session",
    component: {},
    data() {
        return {
        selected: null,
        opciones: [],
        opcionesEstatus: [],
        form: {
            id: null,
            servicio: null,
            fechaI: null,
            fechaF: null,
            estatus: null,
        },
        fields: [
            {
            key: "Id_Administradores_Tareas_Log",
            label: "Id",
            sortable: false,
            },
            {
            key: "Id_Administradores",
            label: "Administrador",
            sortable: false,
            },
            {
            key: "Id_Cat_Tareas[0].Nom_Cat_Tareas",
            label: "Tarea",
            sortable: false,
            },
            {
            key: "Id_Status_Log[0].Nom_Status_Log",
            label: "Estatus",
            sortable: false,
            },
            {
            key: "IP_Dispositivo_Orig",
            label: "Ip Origen",
            sortable: false,
            },
            {
            key: "MAC_Dispositivo_Orig",
            label: "MAC Origen",
            sortable: false,
            },
            {
            key: "Id_Admin_Obj",
            label: "Tarea X",
            sortable: false,
            },
            {
            key: "Fecha_Init_Serv",
            label: "Fecha inicio",
            sortable: false,
            },
            {
            key: "Fecha_Fin_Serv",
            label: "Fecha fin",
            sortable: false,
            },
        ],
        items: [],
        logs: [],
        bandera: null,
        };
    },
    methods: {
        limpiar(bandera) {
        // console.log(bandera);
        if (bandera == "todo") {
            this.form.estatus = null;
            this.form.id = null;
            this.form.servicio = null;
            this.form.fechaI = null;
            this.form.fechaF = null;
            this.items = this.logs;
        } else if (bandera == "servicio") {
            this.items = this.logs;
            this.form.estatus = null;
            this.form.fechaI = null;
            this.form.fechaF = null;
            this.form.id = null;
        } else if (bandera == "estatus") {
            this.items = this.logs;
            this.form.servicio = null;
            this.form.fechaI = null;
            this.form.fechaF = null;
            this.form.id = null;
        } else if (bandera == "identificador") {
            this.items = this.logs;
            this.form.fechaI = null;
            this.form.fechaF = null;
            this.form.servicio = null;
            this.form.estatus = null;
        } else if (bandera == "fechaI") {
            this.items = this.logs;
            this.form.estatus = null;
            this.form.id = null;
            this.form.servicio = null;
            this.form.fechaF = null;
        } else if (bandera == "fechaF") {
            this.items = this.logs;
            this.form.estatus = null;
            this.form.id = null;
            this.form.servicio = null;
            this.form.fechaI = null;
        }
        },
        filtroservicios() {
        this.bandera = "servicio";
        this.limpiar(this.bandera);
        let listafiltrada = this.logs.filter(
            (x) => x.Id_Cat_Tareas[0].Nom_Cat_Tareas === this.form.servicio
        );
        this.items = listafiltrada;
        },
        filtroestatus() {
        this.bandera = "estatus";
        this.limpiar(this.bandera);
        let listafiltrada = this.logs.filter(
            (x) => x.Id_Status_Log[0].Nom_Status_Log === this.form.estatus
        );
        this.items = listafiltrada;
        },
        filtraporid() {
        this.bandera = "identificador";
        this.limpiar(this.bandera);
        let listaporid = this.logs.filter(
            (x) => x.Id_Administradores === parseInt(this.form.id)
        );
        this.items = listaporid;
        },
        buscaporinicio() {
        this.bandera = "fechaI";
        this.limpiar(this.bandera);
        // console.log(this.form.fechaI)
        // console.log(this.logs[0].Fecha_Init_Serv.split(' ')[0])
        let fecha = this.logs.filter(
            (x) => x.Fecha_Init_Serv.split(' ')[0] == this.form.fechaI
        );
        this.items = fecha;
        },
        buscaporfin() {
        this.bandera = "fechaF";
        this.limpiar(this.bandera);
        let fecha = this.logs.filter((x) => x.Fecha_Fin_Serv.split(' ')[0] == this.form.fechaF);
        this.items = fecha;
        },
    },
    mounted: function () {
        let logtareaadmin = "http://127.0.0.1:8000/api/muestraadmintarealog";
        axios.get(logtareaadmin).then((data) => {
        // console.log(data);
        this.logs = data.data;
        this.items = this.logs;
        this.opciones.push({ value: null, text: "Selecciona una tarea" });
        for (let index = 0; index < this.logs.length; index++) {
            if (
            !this.opciones.includes(
                this.logs[index].Id_Cat_Tareas[0].Nom_Cat_Tareas
            )
            ) {
            this.opciones.push(
                this.logs[index].Id_Cat_Tareas[0].Nom_Cat_Tareas
            );
            }
        }
        // console.log(this.opciones);
        this.opcionesEstatus.push({ value: null, text: "Selecciona un estatus" });
        for (let index = 0; index < this.logs.length; index++) {
            if (
            !this.opcionesEstatus.includes(
                this.logs[index].Id_Status_Log[0].Nom_Status_Log
            )
            ) {
            this.opcionesEstatus.push(
                this.logs[index].Id_Status_Log[0].Nom_Status_Log
            );
            }
        }
        // console.log(this.opcionesEstatus);
        });
    },
};
</script>

<style>
#logs {
    display: flex;    
}
#tablalogs {
    color: black;
    width: 70%;
    margin: 2px;
    background-color: whitesmoke;
}

#formLogs {
    width: 30%;
    /* background-color: rgb(255, 255, 255); */
    margin: 2px;
    padding: 5px;
    border-radius: 10px;
    min-height: 400px;
}

#formsInput {
    margin-bottom: 10px;
    min-height: 70%;
}
</style>