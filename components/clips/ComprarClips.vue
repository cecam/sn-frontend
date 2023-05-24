<template>
    <v-container>
        <v-row align="center" justify="center">
            <h2>¡Momento de vender <span class="letra-verde">Dclips</span>!</h2>
        </v-row>
        <v-row justify="center" align="space-around">
            <v-col cols="8" md="5">
                <v-text-field
                    v-model="ventaDclips"
                    type="number"
                    label="¿Cuantos Dclips quieres vender?"
                    prepend-icon="mdi-paperclip"
                    min="0"
                    @input="validarCompra"
                />
            </v-col>
            <v-col cols="8" md="5">
                <v-text-field readonly outlined
                    v-model="clipsRegulares" 
                    label="Clips que conseguirás"
                />
            </v-col>
        </v-row>
        <v-row v-if="error" class="error" justify="center">
            <h3 class="errorText">No tienes los Dclips suficientes para hacer el cambio</h3>
        </v-row>
        <v-row v-else class="precio" justify="center">
            <h3 class="errorText">10 clips = <span class="letra-verde">1 Dclips</span></h3>
        </v-row>
        <v-row class="mt-2">
            <v-btn block color="success" 
                :disabled=" error == true || ventaDclips <= 0"  :loading="loading_btn"
                @click="comprarClips()"
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
                ventaDclips: 0,
                clipsRegulares : 0,
                error: false,
                loading_btn: false,
            }
        },
        mounted() {
            this.validarCompra
        },
        methods: {
            validarCompra() {
                let clipsComprados = this.ventaDclips * 10
                if(this.$auth.user.diamond_clips - this.ventaDclips < 0) {
                    this.clipsRegulares = this.$auth.user.diamond_clips * 10
                    this.error = true
                } else {
                    this.error = false
                    this.clipsRegulares = this.ventaDclips * 10
                }
            },
            async comprarClips() {
                this.loading_btn = true
                let url = `intercambio-diamonds-a-clips`
                let info = {
                    user_id: this.$auth.user._id,
                    diamonds: this.ventaDclips,
                    clips: this.clipsRegulares,
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