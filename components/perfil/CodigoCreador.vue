<template>
  <div>
    <div v-if="codigo">
      <h4>Codigo de Creador:</h4>
      <v-row>
        <v-col cols="10" sm="8">
          <v-text-field
            v-model="this.$auth.user.codigo_creador.codigo"
            label="Toca aqui para copiar"
            outlined
            readonly
            onclick="this.select();"
            @click="copiar()"
          />
        </v-col>
        <v-col cols="1" sm="4">
          <CompartirCodigoCreador />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <p class="centrado"> No cuentas con Codigo de Creador, ¡Crea uno!</p>
      <center>
        <v-btn @click="modal = !modal" color="success" rounded :loading="modal">
          comenzar
        </v-btn>
      </center>
    </div>
    <v-dialog v-model="modal" max-width="700">
      <v-card>
        <v-card-title>
          Crear un codigo de Creador
        </v-card-title>
        <v-card-subtitle>
          <br>
          <h2>¿Para que un codigo de creador?</h2> <br>
          Los codigos de creador son muy sencillos de usar, solo los compartes con tus amigos, y cuando ellos usen tu codigo al momento de registrarse o hacer una compra de diamond clips, tu recibes clips de forma gratuita!
          <br><br>
          Si quieres crear un codigo de Creador solo introduce aqui un nuevo codigo, nosotros te validamos si esta disponible para que lo puedas crear y lo empieces a compartir. <br><br>
          <strong>Una vez ya creado tu codigo de credor, NO podras modificarlo o eliminarlo despues.</strong>
          <br><br>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="codigoTexto"
                label="Introduce aqui un codigo"
                outlined
                :onkeyup="mayuscula(codigoTexto)"
                :onkeypress="mayuscula(codigoTexto)"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-btn @click="crearCodigo()" :loading="loading" outlined color="success" :disabled="codigoTexto==''">
                Crear Codigo
              </v-btn>
            </v-col>
          </v-row>

          

        </v-card-subtitle>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="modal = !modal" outlined color="red">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CompartirCodigoCreador from '@/components/modales/CompartirCodigoCreador'
export default {
  components: {
    CompartirCodigoCreador
  },
  data(){
    return{
      loading: false,
      codigo: false,
      modal:false,
      codigoTexto: '',

    }
  },
  mounted(){
    this.validaCondigo();
  },
  methods: {
    validaCondigo(){
      this.codigo = this.$auth.user.codigo_creador!=null ? true : false;
    },
    async copiar(){
        try {
            let exito = document.execCommand("copy");// devuelve true o false
            let msg = exito ? "exito" : "error";
            let alerta = {
                color : 'success',
                snackbar : true,
                data : 'Codigo copiado correctamente',
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
    async crearCodigo(){
      this.loading = true
      this.mayuscula(this.codigoTexto);
      let url = `codigo-creador`
      let info = {
        user_id : this.$auth.user._id,
        codigo : this.codigoTexto,
      }
      try {
        const {data} = await this.$axios.post(url,info)
        await this.$auth.fetchUser()
        this.modal = false;
        this.codigoTexto='';
        let alerta = {
            color : 'success',
            snackbar : true,
            data : data.message,
        }
        await this.$store.dispatch('alertas/GET_DATA', alerta);
        this.validaCondigo();
      } catch (e) {
        let mensaje = e.response.data
        let alerta = {
          color : 'error',
          snackbar : true,
          data : mensaje,
        }
        await this.$store.dispatch('alertas/GET_DATA', alerta);
      }
      this.loading = false
    },
    mayuscula(str){
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

      this.codigoTexto = str.toUpperCase();
    }

  }
}
</script>
<style scoped>
