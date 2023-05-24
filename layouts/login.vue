<template>
  <v-app dark>

    <v-app-bar
      :clipped-left="clipped"
      app
      color="#000"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="#FFF" />
        <a href="/inicio" class="enlaceHome"><h1>School<span class="notes">Notes</span></h1></a>

        <v-spacer></v-spacer>  
          <!--BOTONES OPCIONALES -->
          <!--Buttons /-->

          <v-chip class="ma-2" color="#20FFFF" small outlined pill 
            link to="/planes-de-clips"
          >
              {{$auth.user.diamond_clips}}
            <v-icon right>
              mdi-paperclip
            </v-icon>
          </v-chip> 
          <IntercambioClips />  
          
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
    >
      <v-list>
        <v-list-group> 
          <template v-slot:activator> 
            <v-list-item-avatar>
              <v-img :src="`${$auth.user.img_perfil}`"></v-img>
            </v-list-item-avatar>
            <v-list-item-content dark>
              <v-list-item-title class="title">
                {{$auth.user.name}}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link :to="`/${string_to_slug($auth.user.name)}?id=${$auth.user._id}`">Ir a mi perfil</v-list-item>
          <v-list-item link to="/editar-perfil">Editar mi perfil</v-list-item>
          <v-list-item link to="/editar-perfil/descripcion"> Editar descripcion</v-list-item>
        </v-list-group>
        <v-divider></v-divider>

        <Busqueda tipo="usuarios" />
        <v-divider></v-divider>

        <v-list-group>
          <template v-slot:activator> 
            <v-list-item-avatar>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-avatar>
            <v-list-item-content> 
              <v-list-item-title>Portafolios</v-list-item-title>
            </v-list-item-content>
          </template>
          <Busqueda tipo="portafolios" />
          <v-list-item link to="/portafolios/guardados">Portafolios Guardados</v-list-item>
          <v-list-item link to="/portafolios/crear">Nuevo Portafolio</v-list-item>
        </v-list-group>
        <v-divider></v-divider>

        <v-list-group>
          <template v-slot:activator> 
            <v-list-item-avatar>
              <v-icon>mdi-file-document</v-icon>
            </v-list-item-avatar>
            <v-list-item-content> 
              <v-list-item-title>Documentos</v-list-item-title>
            </v-list-item-content>
          </template>
          <Busqueda tipo="apuntes" />
          <v-list-item link to="/mis-guardados">Documentos Guardados</v-list-item>
          <v-list-item link to="/crear-documento">Nuevo Documento</v-list-item>
        </v-list-group>
        <v-divider></v-divider>
        
        <v-list-group>
          <template v-slot:activator> 
            <v-list-item-avatar>
              <v-icon>mdi-account-question-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content> 
              <v-list-item-title>Preguntas</v-list-item-title>
            </v-list-item-content>
          </template>
          <Busqueda tipo="preguntas" />
          <v-list-item link to="/preguntas">Preguntas</v-list-item>
          <v-list-item link to="/preguntas/nueva-pregunta">Nueva Pregunta</v-list-item>
        </v-list-group>
        <v-divider></v-divider>
      </v-list>

      <v-list dense>        
        <v-list-item @click="$auth.logout()">  
          <v-list-item-avatar>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div v-if="!$auth.user.correo_verificado">
      <v-main>
        <CorreoValidado />
      </v-main>
    </div>
    <div v-else-if="$auth.user.activo == 0">
      <v-main> 
        <Banneo />
      </v-main>
    </div>
    <div v-else>
      <nuxt />
    </div>
    <Footer />
    <Alerta />
  </v-app>
</template>

<script>
  import CorreoValidado from '@/components/bloqueos/CorreoValidado'
  import Banneo from '@/components/bloqueos/Banneo'
  import Busqueda from '@/components/busqueda/Busqueda'
  import Alerta from '@/components/alertas/Alerta'
  import Footer from '@/components/nav/footer'
  import Buttons from '@/components/nav/buttons'
  import IntercambioClips from '@/components/modales/IntercambioClips'


export default {
    middleware: 'auth',
    components: {
      CorreoValidado,
      Banneo,
      Alerta,
      Busqueda,
      Footer,
      Buttons,
      IntercambioClips
    },
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
      }
    },
    beforeMount(){
        if(!this.$auth.loggedIn){
          this.$router.push('/login/')
        }
    },
    methods: {
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
  .enlaceHome {
    text-decoration: none;
    color: blanchedalmond;
    font-size: 20px;
  }
  .enlaceHome .notes {
    color: #00cba0;
  }
</style>
