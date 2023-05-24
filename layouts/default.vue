<template>
  <v-app dark>
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
        fixed: false,
      }
    },
    methods: {
      
    }
}
</script>
