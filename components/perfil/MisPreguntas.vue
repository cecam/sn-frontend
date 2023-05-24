<template>
    <div>
        <v-card class="mx-auto" elevation="0">
            <v-card-title >
                <h2 v-if="$auth.user._id != usuario._id">Preguntas de {{usuario.name}}</h2>
                <h2 v-else>Mis Preguntas</h2>
            </v-card-title>
            <v-card-subtitle v-if="!loading">
                <center v-if="preguntas.length != 0">
                    <p class="titulo" v-if="$auth.user._id == usuario._id">¿Tienes alguna pregunta para que la comunidad responda?,
                        <a href="/preguntas/nueva-pregunta">
                            <span class="activador">¡Vamos a crearla!</span>
                        </a>!
                    </p>
                    <v-row justify="space-around"> 
                        <v-col sm="12" lg="6" v-for="pregunta in preguntas" :key="pregunta._id"> 
                            <Pregunta :pregunta=pregunta :vistaIndependiente="false" />
                        </v-col>
                    </v-row>
                    <div v-if="dataPreguntas.data.current_page != dataPreguntas.data.last_page">
                        <v-btn :loading="btn_loading" @click="getPreguntas()" outlined color="green">
                            Ver mas Preguntas...
                        </v-btn>
                    </div>
                    <div v-else>
                        <v-btn disabled outlined>Ya no hay mas preguntas</v-btn>
                        <v-btn outlined
                            color="#013c8aa1" 
                            to="/preguntas/nueva-pregunta" 
                            v-if="$auth.user._id == usuario._id"
                        >
                            Crear Pregunta
                        </v-btn>
                    </div>
                </center>
                <center v-else>
                    <br>
                    <div v-if="$auth.user._id == usuario._id">
                        <p class="titulo">Aun no has creado ninguna pregunta... 
                            <a href="/crear-documento">
                                <span class="activador">¡crear mi primer preguna!</span>
                            </a>!
                        </p>
                    </div>
                    <div v-else>
                        <p class="titulo">{{usuario.name}} aun no crea una pregunta :(</p>
                    </div>
                </center>
            </v-card-subtitle>
            <v-card-subtitle v-else>
                <v-skeleton-loader v-bind="attrs" type="article" />
                <v-skeleton-loader v-bind="attrs" type="card-avatar, article" />
                <v-skeleton-loader v-bind="attrs" type="article, date-picker" />
                <v-skeleton-loader v-bind="attrs" type="table-tfoot, article" />
            </v-card-subtitle>
        </v-card>
    </div>
</template>

<script>
    import Pregunta from '@/components/preguntas/Pregunta';
    import GridPreguntas from '@/components/preguntas/GridPreguntas';

    export default {
        components: {
            GridPreguntas,
            Pregunta,
        },
        props: ['usuario'],
        data() {
            return  {
                loading: true,
                btn_loading: false,
                page: 1,
                preguntas:[],
                dataPreguntas:[],
                attrs: {
                    class: 'mb-6',
                    boilerplate: true,
                    elevation: 2,
                },
            }
        },
        mounted(){
            this.page = 1;
            this.getPreguntas();
        },
        
        methods: {
            async getPreguntas(){
                this.btn_loading = true;
                let url = `preguntas?page=${this.page}&opc=mis_preguntas&user_id=${this.usuario._id}`;
                try{
                    const { data } = await this.$axios.get(url);
                    this.dataPreguntas = data;
                    this.preguntas = this.preguntas.concat(data.data.data);
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