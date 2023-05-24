<template>
    <div>
        <v-card class="mx-auto" elevation="0">
            <v-card-title >
                <h2 v-if="$auth.user._id != usuario._id">Apuntes de {{usuario.name}}</h2>
                <h2 v-else>Mis Apuntes</h2>
            </v-card-title>
            <v-card-subtitle v-if="!loading">
                <center v-if="apuntes.length != 0">
                    <p class="titulo" v-if="$auth.user._id == usuario._id">¿Te gustaría crear un apunte?
                        <a href="/crear-documento">
                            <span class="activador">¡Vamos a crearlo!</span>
                        </a>!
                    </p>
                    <v-row justify="space-around"> 
                        <v-col sm="12" lg="3" v-for="apunte in apuntes" :key="apunte._id"> 
                            <Documento :apunte="apunte" />      
                        </v-col>
                    </v-row>

                    <div v-if="dataApuntes.data.current_page != dataApuntes.data.last_page">
                        <v-btn :loading="btn_loading" outlined color="green" @click="getApuntes()">
                            Ver mas Apuntes...
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn disabled outlined>Ya no hay mas Apuntes</v-btn>
                        <v-btn outlined
                            color="#013c8aa1"  
                            to="/crear-documento" 
                            v-if="$auth.user._id == usuario._id"
                        >
                            Crear Apunte
                        </v-btn>
                    </div>
                </center>
                <center v-else>
                    <br>
                    <div v-if="$auth.user._id == usuario._id">
                        <p class="titulo">Aun no has creado ningun apunte... 
                            <a href="/crear-documento">
                                <span class="activador">¡crear mi primer apunte!</span>
                            </a>!
                        </p>
                    </div>
                    <div v-else>
                        <p class="titulo">{{usuario.name}} aun no crea un apunte :(</p>
                    </div>
                </center>
            </v-card-subtitle>
            <v-card-subtitle v-else>
                <v-row>
                    <v-col sm="12" lg="3">
                        <v-skeleton-loader v-bind="attrs" type="list-item-avatar-three-line, image" />
                    </v-col>
                    <v-col sm="12" lg="3">
                        <v-skeleton-loader v-bind="attrs" type="list-item-avatar-three-line, image" />
                    </v-col>
                    <v-col sm="12" lg="3">
                        <v-skeleton-loader v-bind="attrs" type="list-item-avatar-three-line, image" />
                    </v-col>
                    <v-col sm="12" lg="3">
                        <v-skeleton-loader v-bind="attrs" type="list-item-avatar-three-line, image" />
                    </v-col>
                </v-row>
            </v-card-subtitle>
        </v-card>
    </div>
</template>

<script>
    import Documento from '@/components/documentos/Documento'

    import moment from 'moment'
    moment.locale('es')

    export default {
        components: {
            Documento,
        },
        props: ['usuario'],
        data() {
            return  {
                loading: true,
                btn_loading: false,
                page: 1,
                apuntes:[],
                dataApuntes:[],
                attrs: {
                    class: 'mb-6',
                    boilerplate: true,
                    elevation: 2,
                },
                iframeObserver: null
            }
        },
        mounted(){
            this.page = 1;
            this.getApuntes();
        },
        
        methods: {
            async getApuntes(){
                this.btn_loading = true;
                let url = `apuntes/${this.usuario._id}/usuario?page=${this.page}`;
                try{
                    const { data } = await this.$axios.get(url);
                    this.dataApuntes = data;
                    this.apuntes = this.apuntes.concat(data.data.data);
                    this.page = this.page+1;
                }catch (e){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.btn_loading = false;
                this.loading = false;
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
            },
        },
        filters: {
            dateFormat(value) {
            if (!value) return ''
                let newFecha= moment(value).fromNow();
                return newFecha
            },
              
        },
    }
</script>

<style scoped>
    .banner {
        background: linear-gradient(180deg, rgba(0,0,0,1) 1%, rgba(0,38,89,1) 50%, rgba(0,109,254,1) 100%);
    }
    .titulo{
        font-size: 16px;
        text-align:center;
    }
    .activador {
        color: #013c8a;
    }
</style>