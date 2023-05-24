<template>
    <div>
        <v-tooltip bottom >
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on" @click="modal = !modal" color="#013c8aa1" large
            >
              mdi-share
            </v-icon>
          </template>
          <span>Compartir Codigo con Amigos</span>
        </v-tooltip>

        <v-dialog v-model="modal" max-width="800">
            <v-card>
                <v-container fluid>
                    <v-row class="pl-5 pr-5">
                        <h3>
                            Compartir
                        </h3>
                        <v-spacer></v-spacer>
                        <v-btn @click="modal = !modal" icon>
                            <v-icon color="#cb4040">mdi-close-thick</v-icon>
                        </v-btn>
                    </v-row>
                </v-container>
                <v-container fluid>
                    <v-row align="start">
                        <v-col cols="12" md="8">
                            <small>
                                <v-text-field
                                    v-model="url"
                                    label="Toca aqui para copiar"
                                    outlined
                                    readonly
                                    onclick="this.select();"
                                    @click="copiar()"
                                />

                            </small>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-btn @click="show = !show" color="#013c8aa1" large dark>
                                Compartir en...
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-alert
                                :value="show"
                                border="top"
                                transition="scale-transition"
                            >
                                <v-row justify="space-around">
                                    <v-col cols="3">
                                        <a class="enlaceAPerfil" :href="url_whatspp" target="_blank">
                                            <v-btn color="green" dark>
                                                WhatsApp
                                            </v-btn>
                                        </a>
                                    </v-col>
                                    <v-col cols="3">
                                        <a class="enlaceAPerfil" :href="url_facebook" target="_blank">
                                            <v-btn color="blue" dark>
                                                Facebook
                                            </v-btn>
                                        </a>
                                    </v-col>
                                    <v-col cols="3">
                                        <button type="button" id="shareButton">
                                            <v-btn dark @click="compartir()">
                                                Otro...
                                            </v-btn>
                                        </button>
                                    </v-col>
                                </v-row>
                            </v-alert>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            mensaje: '¿No has usado SchoolNotes?, Registrate ahora y llevate '+this.$auth.user.codigo_creador.clips_registro+' clips gratis con mi codigo de creador: '+this.$auth.user.codigo_creador.codigo+', y en cada compra que hagas de diamond clips llevate un '+this.$auth.user.codigo_creador.descuento_compra+'% de descuento! ',
            modal:false,
            show:false,
            url:'',
            dominio: '',
            pathName: '',
            rutaAbosuluta: '',
            url_message: '',
            url_whatspp: '',
            url_facebook:'',

        }
    },
    mounted(){
        this.getURL()
    },
    methods:{
        getURL(){
            this.url = 'https://schoolnotes.live/registro?codecreator='+this.$auth.user.codigo_creador._id;
            
            this.message = this.mensaje+this.url;
            this.url_whatspp = 'https://api.whatsapp.com/send?text='+this.message;
            this.url_facebook = 'https://www.facebook.com/sharer.php?u='+encodeURIComponent(this.url)+'&t='+this.mensaje;
        },
        async copiar(){
            try {
                let exito = document.execCommand("copy");// devuelve true o false
                let msg = exito ? "exito" : "error";
                let alerta = {
                    color : 'success',
                    snackbar : true,
                    data : 'Enlace copiado correctamente, es hora de compartir!',
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            } catch (error) {
                let alerta = {
                    color : 'success',
                    snackbar : true,
                    data : 'Oops.. ha ocurrido un error: '+error,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
        },
        compartir(){
            if (navigator.userAgent.match(/Android/i)) {
                /* Use the Web Share API from Chrome 61+ */
                    navigator.share({title: 'SchoolNotes', url: this.url}).then(console.log('Share successful'));
                }
            /* Caso contrario mostramos mensaje de alerta */
            else { alert('Esta opcion solo funciona en dispositivos moviles...') }
        }
    }
}
</script>
<style scoped>
    .enlaceAPerfil {
        text-decoration: none;
        color: black;
        margin-right: 10px;
    }

</style>