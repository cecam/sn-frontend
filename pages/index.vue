<template>
  <div>
    <BannerPrincipal />
    <Ventajas />
    <Monetizacion />
    <Descripciones />
    <Entradas />
    <RegistroDirecto :etiquetas="etiquetas" />
  </div>

</template>

<script>
  import BannerPrincipal from '@/components/paginaInicio/BannerPrincipal'
  import Ventajas from '@/components/paginaInicio/Ventajas'
  import Descripciones from '@/components/paginaInicio/Descripciones'
  import RegistroDirecto from '@/components/paginaInicio/RegistroDirecto'
  import Monetizacion from '@/components/paginaInicio/Monetizacion'
  import Entradas from '@/components/blog/Entradas'

  export default {
    layout: 'noLogin',
    components: {
      Entradas,
      RegistroDirecto,
      Descripciones,
      Ventajas,
      BannerPrincipal,
      Monetizacion
    },
    beforeMount(){
      if(this.$auth.loggedIn){
        this.$router.push('/inicio/')
      }
    },
    async asyncData ({ $axios, params }) {
        const { data } = await $axios.get(`etiquetas`)
        return { etiquetas: data.data }
    },
}
</script>