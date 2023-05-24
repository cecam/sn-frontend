<template>
    <div>
        <v-card class="mx-auto" elevation="0">
            <v-card-title >
                <h2 v-if="$auth.user._id != usuario._id">Portafolios de {{usuario.name}}</h2>
                <h2 v-else>Mis Portafolios</h2>
            </v-card-title>
            <v-card-subtitle v-if="!loading">
                <center v-if="portafolios.length != 0">
                    <p class="titulo" v-if="$auth.user._id == usuario._id">¿Te gustaría crear un portafolio?
                        <a href="/portafolios/crear">
                            <span class="activador">¡Vamos a crearlo!</span>
                        </a>!
                    </p>
                    <v-row justify="space-around"> 
                        <v-col sm="12" lg="3" v-for="portafolio in portafolios" :key="portafolio._id"> 
                            <Portafolio :portafolio="portafolio" />      
                        </v-col>
                    </v-row>

                    <div v-if="dataPortafolios.data.current_page != dataPortafolios.data.last_page">
                        <v-btn :loading="btn_loading" outlined color="green" @click="getPortafolios()">
                            Ver mas Portafolios...
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn disabled outlined>Ya no hay mas Portafolios</v-btn>
                        <v-btn outlined
                            color="#013c8aa1"  
                            to="/portafolios/crear" 
                            v-if="$auth.user._id == usuario._id"
                        >
                            Crear Portafolio
                        </v-btn>
                    </div>
                </center>
                <center v-else>
                    <br>
                    <div v-if="$auth.user._id == usuario._id">
                        <p class="titulo">Aun no has creado ningun portafolio... 
                            <a href="/portafolios/crear">
                                <span class="activador">¡crear mi primer portafolio!</span>
                            </a>!
                        </p>
                    </div>
                    <div v-else>
                        <p class="titulo">{{usuario.name}} aun no crea un portafolio :(</p>
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
    import Portafolio from '@/components/portafolios/Portafolio'

    import moment from 'moment'
    moment.locale('es')

    export default {
        components: {
            Portafolio,
        },
        props: ['usuario'],
        data() {
            return  {
                loading: true,
                btn_loading: false,
                page: 1,
                portafolios:[],
                dataPortafolios:[],
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
            this.getPortafolios();
        },
        
        methods: {
            async getPortafolios(){
                this.btn_loading = true;
                let url = `portafolios/${this.usuario._id}/usuario?page=${this.page}`;
                try{
                    const { data } = await this.$axios.get(url);
                    console.log(data);
                    this.dataPortafolios = data;
                    this.portafolios = this.portafolios.concat(data.data.data);
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
