<template>
    <div>
        <v-btn dark block 
            @click="dialog_edit = !dialog_edit" 
            color="#013c8aa1" 
        >
            Cambiar mi Contraseña
        </v-btn>
        <v-dialog max-width="360" v-model="dialog_edit">
            <v-card max-width="360">
                <v-card-title>
                    Cambiar contraseña.
                </v-card-title>
                <v-card-text>
                <v-text-field
                    v-model="pass_actual"
                    :loading="loading"
                    label="Anota tu contraseña Actual"
                    prepend-icon="mdi-key"
                />
                <v-text-field
                    v-model="pass_new"
                    :loading="loading"
                    label="Anota tu nueva contraseña"
                    prepend-icon="mdi-key"
                />
                <v-text-field
                    v-model="pass_new_confirm"
                    :loading="loading"
                    label="Repite tu contraseña nueva"
                    prepend-icon="mdi-key"
                />
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="dialog_edit = !dialog_edit" color="red" outlined>
                        Cancelar
                    </v-btn>
                    <v-btn @click="updatePassword()" :loading="loader" color="success" outlined>
                        Cambiar Contraseña
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    components: {
        
    },
    
    data(){
        return{
            dialog_edit: false,
            pass_actual: '',
            pass_new: '',
            pass_new_confirm: '',
        }
    },
    methods: {
        async updatePassword(){
            this.loader = true;
            let url = `cambiar-contrasena`
            let info = {
                id: this.$auth.user._id,
                vieja_contrasena: this.pass_actual,
                nueva_contrasena: this.pass_new,
                repetir_contrasena: this.pass_new_confirm,
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
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
            this.loader = false;
        },
    }
}
</script>