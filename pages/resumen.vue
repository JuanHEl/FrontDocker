<template>
    <div id="logs">
        <b-table
        responsive
        id="tablalogs"
        striped
        hover
        :items="items"
        :fields="fields"
        ></b-table>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'resumen',
    middleware:"session",
    component: {},
    data() {
        return {
        fields: [
            {
            key: "idSolicitud",
            label: "Id",
            sortable: true,
            },
            {
            key: "NombreDispo",
            label: "Nombre del Dispositivo",
            sortable: false,
            },
            {
            key: "Memoria",
            label: "Memoria",
            sortable: true,
            },
            {
            key: "CPU",
            label: "CPU",
            sortable: true,
            },
            {
            key: "AnchoB",
            label: "Ancho de Banda",
            sortable: true,
            },
            {
            key: "Storage",
            label: "Almacenamiento obtenido",
            sortable: true,
            },
            {
            key: "IPDispositivo",
            label: "Ip del Dispositivo",
            sortable: true,
            }
        ],
        items: [],
        logs: [],
        }
    },
    methods: {},
    mounted: function () {
        let disp = "http://127.0.0.1:8000/api/dipositivo";
        axios.get(disp).then((data) => {
            this.logs = data.data;
            console.log(this.logs.data);
            this.items = this.logs.data;
        });
    }
}
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
</style>
