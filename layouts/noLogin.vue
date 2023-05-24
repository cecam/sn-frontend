<template>
  <v-app dark>

    <v-app-bar
      :clipped-left="clipped"
      app
      color="#000"
    >
      <a href="/" class="enlaceHome">School<span class="notes">Notes</span></a>

      <v-spacer></v-spacer>
        <v-btn text to="/blog" dark>Blog</v-btn>
        <v-btn text to="/login" dark>Login</v-btn>
        <v-btn text to="/registro" dark>Registro</v-btn>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
    
    <Footer />

    <Alerta />
  </v-app>
</template>

<script>
  import Alerta from '@/components/alertas/Alerta'
  import Footer from '@/components/nav/footer'
  import Buttons from '@/components/nav/buttons'


export default {
    components: {
      Alerta,
      Footer,
      Buttons,
    },
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
      }
    },
    beforeMount(){
        if(this.$auth.loggedIn){
        this.$router.push('/inicio/')
        }
    },
    methods: {

    }
}
</script>

<style scoped>
  .enlaceHome {
    text-decoration: none;
    color: blanchedalmond;
    font-size: 32px;
  }
  .enlaceHome .notes {
    color: #00cba0;
    font-weight: 500;
  }
</style>
