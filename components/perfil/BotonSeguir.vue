<template>
    <div>
        <div v-if="loading">
            <v-btn color="warning" rounded dark :loading="loading" icon>
                <v-icon>mdi-loading mdi-spin</v-icon>
            </v-btn>
        </div>
        <div v-else>
            <v-tooltip bottom v-if="!siguiendo">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="green"
                        v-bind="attrs"
                        v-on="on"
                        dark @click="seguir()" rounded icon
                    >
                        <v-icon>mdi-account-plus</v-icon>
                    </v-btn>
                </template>
                <span>Seguir</span>
            </v-tooltip>

            <v-tooltip bottom v-else>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="red"
                        v-bind="attrs"
                        v-on="on"
                        dark @click="seguir()" rounded icon
                    >
                        <v-icon>mdi-account-remove</v-icon>
                    </v-btn>
                </template>
                <span>Dejar de Seguir</span>
            </v-tooltip>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    moment.locale('es')

    export default {
        components: {
        },
        props: ['usuario', 'agregarSeguidor', 'dejarSeguir'],
        data() {
            return  {
                siguiendo: false,
                loading: false,
            }
        },
        mounted(){
            this.valida();
        },
        methods: {
            valida(){
                this.loading = true;
                this.siguiendo = this.usuario.seguidores.includes(this.$auth.user._id) ? true : false;
                this.loading = false;
            },

            async seguir(){
                this.loading = true;
                let url = `seguir`;
                let info = {
                    user_id: this.$auth.user._id,
                    seguir: this.usuario._id
                };
                try{
                    const { data } = await this.$axios.post(url,info);
                    this.siguiendo = !this.siguiendo;
                }catch(e){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.loading = false;
            }
        },
    }
</script>