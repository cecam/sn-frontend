<template>
    <v-container>
        <v-row align="center" justify="center">
            <h2>¡Momento de comprar <span class="letra-verde">Dclips</span>!</h2>
        </v-row>
        <v-row justify="center" align="space-around">
            <v-col cols="8" md="5">
                <v-text-field
                    v-model="compraDclips"
                    type="number"
                    label="¿Cuantos Dclips quieres comprar?"
                    prepend-icon="mdi-paperclip"
                    min="0"
                    @input="validarCompra"
                />
            </v-col>
            <v-col cols="8" md="5">
                <v-text-field readonly outlined
                    v-model="clipsUsuario" 
                    label="Clips restantes"
                />
            </v-col>
        </v-row>
        <v-row v-if="error" class="error" justify="center">
            <h3 class="errorText">No tienes los clips suficientes para hacer el cambio</h3>
        </v-row>
        <v-row v-else class="precio" justify="center">
            <h3 class="errorText"><span class="letra-verde">1 Dclips</span> = 10 clips</h3>
        </v-row>
        <v-row class="mt-2">
            <v-btn block color="success" 
                :disabled=" error == true || compraDclips <= 0" :loading="loading_btn"
                @click="comprarDclips()"
            >
                realizar cambio
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                compraDclips: 0,
                clipsUsuario : this.$auth.user.clips,
                error: false,
                loading_btn:false,
            }
        },
        methods: {
            validarCompra() {
                let clipsGastados = this.compraDclips * 10
                if((this.$auth.user.clips - clipsGastados) < 0) {
                    this.clipsUsuario = 0
                    this.error = true
                } else {
                    this.error = false
                    this.restarClips(clipsGastados)
                }
            },
            restarClips(clipsGastados) {
                let totalRestante = this.$auth.user.clips - clipsGastados
                if (totalRestante > 0){
                    this.clipsUsuario = totalRestante
                }
            },
            async comprarDclips() {
                this.loading_btn = true
                let url = `intercambio-clips-a-diamonds`
                let info = {
                    user_id: this.$auth.user._id,
                    diamonds: this.compraDclips,
                    clips: this.compraDclips*10,
                }
                try{
                    const {data} = await this.$axios.post(url,info);
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);

                }catch(e){
                    console.log(e)
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                await this.$auth.fetchUser()
                this.loading_btn = false
                this.validarCompra()
            }
        }
    }
</script>

<style scoped>
    .error {
        background: tomato;
        border-radius: 5px;
    }
    .errorText {
        color: whitesmoke;
    }
    .letra-verde {
        color: #00cba0;
    }
    .precio {
        background-color: #013c8a;
        border-radius: 5px;
    }
</style>