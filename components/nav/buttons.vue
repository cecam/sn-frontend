<template>
    <div>
        <!-- botones de contcto mas y etc. -->
        <v-menu open-on-hover offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          text
        >
          Nosotros
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="item in nosotros" :key="item" :to="item.to" link>
          <v-list-item-title >{{item.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
</template>

<script>
export default {
    data(){
        return{
            nosotros: [
                {
                    title: 'proximamente',
                    to: '/'
                },
                {
                    title:'proximamente',
                    to: '/'
                }
            ],
        }
    }
}
</script>