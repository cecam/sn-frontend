<template>
    <div>
        <v-tooltip bottom >
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on" @click="modal = !modal" color="#013c8a" large
            >
              mdi-share
            </v-icon>
          </template>
          <span>Compartir</span>
        </v-tooltip>

        <v-dialog v-model="modal" max-width="800">
            <v-card>
                <v-card-title>
                    Compartir
                </v-card-title>
                <v-card-text>
                    <v-row>
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
                            <v-btn @click="show = !show" dark>
                                Compartir en...
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-alert
                                :value="show"
                                
                                border="top"
                                icon="mdi-share"
                                transition="scale-transition"
                            >
                                <v-row>
                                    <v-col>
                                        <a class="enlaceAPerfil" :href="url_whatspp" target="_blank">
                                            <v-btn color="green" dark>
                                                WhatsApp
                                            </v-btn>
                                        </a>
                                    </v-col>
                                    <v-col>
                                        <a class="enlaceAPerfil" :href="url_facebook" target="_blank">
                                            <v-btn color="blue" dark>
                                                Facebook
                                            </v-btn>
                                        </a>
                                    </v-col>
                                    <v-col>
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
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="modal = !modal" outlined color="blue">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script type="text/javascript">
    
</script>
<script>
export default {
    data(){
        return{
            mensaje: '¿Ya viste este apunte?, ¡Deberias hacharle un vistazo! ',
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
            this.dominio = window.location.host
            var path = window.location.pathname
            this.pathName = path.replace('/apuntes/', '/documentos/')

            this.url = this.dominio+this.pathName;
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
                    data : 'Enlace copiado correctamente',
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
                    navigator.share({title: 'SchoolNotes', url: "https://schoolnotes.live"+this.pathName}).then(console.log('Share successful'));
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