<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <h1>Crea una descripción con la que te reconocerán</h1>
        </v-row>
        <v-row align="center" justify="center"> 
            <v-col cols="12" md="8">
                <div style="border: 1px solid #a1a1a1; border-radius:15px">
                    <editor ref="editor" autofocus 
                        @save="onSave"
                        :initialized="onInitialized" 
                        header list
                    />   
                </div>
            </v-col>
        </v-row>
        <v-row justify="center"> 
            <v-col cols="12" sm="10" md="8">
                <v-btn block dark 
                    color="#40cb4d" 
                    @click="guardarDescripcion()" 
                    :loading="btn_loader"
                >
                    guardar descripción
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            btn_loader:false
        }
    },
    methods: {
        async guardarDescripcion() {
            await this.$refs.editor.save()
        },
        async onSave(response) {
            this.btn_loader = true;
            try {
                let info = {
                    descripcion_perfil : JSON.stringify(response.blocks),
                }
                const {data} = await this.$axios.put(`/usuarios/${this.$auth.user._id}`, info)
                await this.$auth.fetchUser()
                this.$router.push(`/${this.string_to_slug(this.$auth.user.name)}?id=${this.$auth.user._id}`)
                let alerta = {
                    color : 'success',
                    snackbar : true,
                    data : data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            } catch (e) {
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
            this.btn_loader = false;
        },
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