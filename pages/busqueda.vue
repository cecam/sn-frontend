<template>
    <v-main> 
        <v-container fluid> 
            <center>
                <v-card elevation="0">
                    <v-row justify="center" align="center">
                        <v-col cols="4">
                            <v-text-field
                                v-model="texto"
                                :label="`Buscar ${tipo_local}`"
                                prepend-icon="mdi-search-web"
                                @keyup.enter="iniciaBusqueda()"
                            />
                        </v-col>
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" 
                                    link :to="`/busqueda-etiquetas?nombre=${texto}&tipo=${tipo_local}`"
                                >
                                    <v-icon>mdi-tag-multiple-outline</v-icon>
                                </v-btn>
                                </template>
                                <span>Buscar por etiquetas</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col>

                            <v-btn v-if="tipo_local == 'usuarios'" @click="cambiarBusqueda()" color="#00D6B9" dark>Cambiar a Apuntes</v-btn>
                            <v-btn v-else-if="tipo_local == 'apuntes'" @click="cambiarBusqueda()" color="#00D6B9" dark>Cambiar a Preguntas</v-btn>
                            <v-btn v-else-if="tipo_local == 'preguntas'" @click="cambiarBusqueda()" color="#00D6B9" dark>Cambiar a Portafolios</v-btn>
                            <v-btn v-else @click="cambiarBusqueda()" color="#00D6B9" dark>Cambiar a Usuarios</v-btn>

                                <v-btn @click="iniciaBusqueda()" color="primary" >Buscar</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </center>
            <div v-if="!loader">
                <div v-if="datos.length > 0">
                    <v-row align="center" justify="space-around" > 
                        <v-col cols="12" md="3" sm="12" v-for="dato in datos" :key="dato._id"> 
                            <Documento :apunte="dato" v-if="tipo_local == 'apuntes'" />               
                            <Usuario :usuario="dato" v-else-if="tipo_local == 'usuarios'" />
                            <Pregunta :pregunta="dato" v-else-if="tipo_local == 'preguntas'" />
                            <Portafolio :portafolio="dato" v-else-if="tipo_local == 'portafolios'" />
                        </v-col>                        
                    </v-row>
                    <v-row justify="center" >
                        <v-btn outlined color="green" @click="busqueda()" :disabled="datosData.current_page == datosData.last_page" :loading="loading">
                            Ver más {{tipo_local}}...
                        </v-btn>
                    </v-row>
                </div>
                <div v-else>
                    <v-row align="center" justify="center"> 
                        <v-card-title>Al parecer no hay resultados en tu busqueda...</v-card-title>
                    </v-row>
                </div>
            </div>
            <div v-else>
                <v-row align="center" justify="center"> 
                    <v-card-title>Cargando {{tipo_local}}...</v-card-title>
                </v-row>
            </div>
        </v-container>
    </v-main>
</template>

<script>
    import Documento from '@/components/documentos/Documento'
    import Usuario from '@/components/usuario/Usuario'
    import Pregunta from '@/components/preguntas/Pregunta'
    import Portafolio from '@/components/portafolios/Portafolio'
export default {
    layout: 'login',
    components: {
        Documento,
        Usuario,
        Pregunta,
        Portafolio,
    },
    data() {
        return {
            page : 1,
            loading: false,    
            loader: false,    
            tipo_local: '', 
            buscar: '',       
            datos: [],       
            datosData: [],       
            texto: '',
        }
    },
    asyncData({query , $axios}) {
        return {
            texto : query.nombre.replace("-", " "),
            tipo_local : query.tipo,
        }
    },
    head() {
        return {
            titleTemplate: `SN - Búsqueda`
        }
    },
    mounted(){
        this.iniciaBusqueda();
    },
    methods: {
        iniciaBusqueda(){
            this.loader = true;
            this.page = 1;
            this.datos = [];
            this.busqueda();
        },
        async busqueda(){
            this.loading = true;
            let url = `buscar?page=${this.page}`;
            let info = {
                data: this.texto,
                tipo: this.tipo_local,
            }
            try{
                const {data} = await this.$axios.post(url,info);
                this.datosData = data.data;
                this.datos = this.datos.concat(data.data.data);
                this.page = this.page+1;
            }catch(e){
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }   
            this.loader = false;
            this.loading = false;
        },
        cambiarBusqueda(){
            if(this.tipo_local == 'usuarios'){
                this.tipo_local = 'apuntes';
            }else if(this.tipo_local == 'apuntes'){
                this.tipo_local = 'preguntas';
            }else if(this.tipo_local == 'preguntas'){
                this.tipo_local = 'portafolios';
            }else{
                this.tipo_local = 'usuarios';
            }
            this.$router.push(`/busqueda?nombre=${this.string_to_slug(this.texto)}&tipo=${this.tipo_local}`)
            this.iniciaBusqueda();
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