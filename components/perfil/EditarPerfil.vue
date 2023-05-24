<template>
    <div>
        <v-row class="pa-2">
            <v-col sm="12" md="6">
                <v-text-field
                    v-model="nombre"
                    :loading="loading"
                    label="Nombre"
                    name="nombre"
                    prepend-icon="mdi-account"
                />
                <v-text-field
                    v-model="correo"
                    :loading="loading"
                    label="Correo Eletronico"
                    name="Correo"
                    disabled
                    prepend-icon="mdi-at"
                />
                <div class="espacio">
                    <v-select multiple 
                        :rules="selectRules"
                        v-model="etiquetasUsuario" 
                        :items="etiquetas" 
                        item-value="_id"
                        item-text="nombre"
                        label="Etiquetas"
                        v-on:input="limiter"
                    ></v-select>
                    <CrearEtiqueta :crearEtiqueta="crearEtiqueta" />
                </div>
                <div class="espacio">
                    <v-autocomplete
                        no-data-text="No hay coincidencias con ése nombre"
                        v-model="universidadUsuario"
                        :items="universidades"
                        item-text="nombre"
                        item-value="_id"
                        label="Busca tu universidad"
                        prepend-icon="mdi-school-outline"
                    ></v-autocomplete>
                    <CrearUniversidad :crearUniversidad="crearUniversidad" /> 
                </div>
                <div class="espacio">
                    <v-autocomplete
                        no-data-text="No hay coincidencias con ése nombre"
                        v-model="carreraUsuario"
                        :items="carreras"
                        item-text="nombre"
                        item-value="_id"
                        label="Busca tu carrera"
                        prepend-icon="mdi-bookshelf"
                    ></v-autocomplete>
                    <CrearCarrera :crearCarrera="crearCarrera" /> 
                </div>
            </v-col>
            <v-col sm="12" md="6">
                <h3>Fecha de Nacimiento</h3>
                <v-date-picker 
                    v-model="fecha" 
                    :disabled="loader" 
                    :show-current="this.$auth.user.fecha_nacimiento" 
                    lang="es" 
                    color="#002659" 
                />
            </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
            <v-col cols="12" md="5">
                <v-btn block dark
                    color="#40cb4d"
                    @click="updateUsuario()" 
                    :loading="loader" 
                >
                    guardar Cambios
                </v-btn>
                <EditarContrasena class="mt-5" />
            </v-col>
            <v-col cols="12" md="5">
                <CodigoCreador />
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import EditarContrasena from '@/components/perfil/EditarContrasena'
    import CodigoCreador from '@/components/perfil/CodigoCreador'
    import CrearEtiqueta from '@/components/modales/CrearEtiqueta'
    import CrearUniversidad from '@/components/universidades/CrearUniversidad'
    import CrearCarrera from '@/components/carreras/CrearCarrera'

export default {
    components: {
        EditarContrasena,
        CodigoCreador,
        CrearEtiqueta,
        CrearUniversidad,
        CrearCarrera
    },

    data(){
        return{
            nombre:'',
            correo:'',
            fecha:'',
            etiquetasUsuario : [],
            etiquetas: [],
            universidades: [],
            universidadUsuario: {},
            carreras: [],
            carreraUsuario: {},
            loader:false,
        }
    },
    mounted(){
        this.getUsuario();
        this.getEtiquetas();
        this.getUniversidades()
        this.getCarreras()
    },
    methods: {
        async crearUniversidad(nombre) {
            let info = {
                nombre : nombre,
            }
            try {
                let { data } = await this.$axios.post('universidad', info)
                this.universidades = this.universidades.concat(data.data)
                let alerta = {
                    color : 'success',
                    snackbar : true,
                    data : 'Ya puedes encontrar la universidad con las demás',
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }catch(e) {
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
        },
        async crearCarrera(nombre) {
            let info = {
                nombre : nombre,
            }
            try {
                let { data } = await this.$axios.post('carrera', info)
                this.carreras = this.carreras.concat(data.data)
                let alerta = {
                    color : 'success',
                    snackbar : true,
                    data : 'Ya puedes encontrar la carrera con las demás',
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }catch(e) {
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
        },
        async crearEtiqueta(nombre) {
            let info = {
                nombre : nombre,
                user_id : this.$auth.user._id
            }
            try {
                let { data } = await this.$axios.post('etiquetas', info)
                this.etiquetas = this.etiquetas.concat(data.data)
                let alerta = {
                    color : 'success',
                    snackbar : true,
                    data : 'Ya puedes encontrar la etiqueta con las demás',
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }catch(e) {
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
        },
        async getEtiquetas(){
            try {
                const { data } = await this.$axios.get('etiquetas')
                this.etiquetas = data.data
            }catch(e){
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
        },
        async getUniversidades(){
            try {
                const { data } = await this.$axios.get('universidad')
                this.universidades = data.data
            }catch(e){
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
        },
        async getCarreras(){
            try {
                const { data } = await this.$axios.get('carrera')
                this.carreras = data.data
            }catch(e){
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
        },
        async getUsuario(){
            this.loader = true;
            let url = `usuarios/${this.$auth.user._id}`
            try{
                const {data} = await this.$axios.get(url);
                this.nombre = data.data.name;
                this.correo = data.data.email;
                this.fecha = data.data.fecha_nacimiento;
                this.etiquetasUsuario = data.data.etiquetas_ids
                this.universidadUsuario = data.data.universidad_id
                this.carreraUsuario = data.data.carrera_id
            }catch(e){
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
            this.loader = false;
        },
        async updateUsuario(){
            this.loader = true;
            let url = `usuarios/${this.$auth.user._id}`
            let info = {
                name: this.nombre,
                fecha_nacimiento: this.fecha,
                etiquetas_ids : this.etiquetasUsuario,
                universidad_id : this.universidadUsuario,
                carrera_id: this.carreraUsuario
            }
            try{
                const {data} = await this.$axios.put(url,info);
                let alerta = {
                    color : 'success',
                    snackbar : true,
                    data : data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
                this.$router.push(`/${this.string_to_slug(this.$auth.user.name)}?id=${this.$auth.user._id}`)
            }catch(e){
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
            this.loader = false;
        },
        limiter(e) {
            if(e.length > 6) {
                e.pop()
            }
        },
        string_to_slug (str) {
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();

            // remove accents, swap ñ for n, etc
            var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to   = "aaaaeeeeiiiioooouuuunc------";
            for (var i=0, l=from.length ; i<l ; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

            return str;
        }
    }
}
</script>

<style scoped>
    .espacio {
        margin-bottom: 10px;
    }
</style>
