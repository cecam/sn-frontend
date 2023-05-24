<template>
  <v-app dark >
    <v-main class="fondoColor" v-if="error.statusCode === 404">
      <NotFound />
    </v-main>
    <v-main class="fondoColor" v-else>
      <AlgoSalioMal />
    </v-main>
  </v-app>
</template>

<script>
import NotFound from '@/components/errores/NotFound'
import AlgoSalioMal from '@/components/errores/AlgoSalioMal'
export default {
  components: {
    AlgoSalioMal,
    NotFound
  },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'Oops.. Ha ocurrido un error :('
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
  .fondoColor {
    background: rgb(0,38,89);
    background: linear-gradient(180deg, rgba(0,38,89,1) 0%, rgba(30,96,182,1) 50%, rgba(0,203,160,1) 100%);
  }
</style>



