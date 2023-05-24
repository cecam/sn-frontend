<template>
    <div>
        <center>
            <v-avatar size="250" class="mb-5">
                <img
                    :src="`${this.$auth.user.img_perfil}`"
                    :alt="`${this.$auth.user.name} - SchoolNotes`"
                >
            </v-avatar> <br />
            <v-btn dark
                color="#40cb4d" 
                @click="dialog_edit =! dialog_edit"
            >
                Editar foto
            </v-btn>
        </center>
        <v-dialog v-model="dialog_edit" max-width="480">
            <v-card>
                <v-row class="pa-5">
                    <h3>
                        Sube tu foto
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn icon color="#cb4040"
                        @click="dialog_edit =! dialog_edit"    
                    >
                        <v-icon>mdi-close-thick</v-icon>
                    </v-btn>
                </v-row>
                <v-card-text>
                    <v-file-input
                        v-model="foto"
                        label="Seleciona una foto de Perfil"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn block dark
                        color="#40cb4d" 
                        @click="subirFoto()"
                    >
                        Guardar
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
            foto:'',
        }
    },
    methods: {
        async subirFoto(){
            try {
                let formData = new FormData()
                let config = { headers: { 'Content-Type': 'multipart/form-data' } }
                formData.append('id', this.$auth.user._id)
                formData.append('img_perfil', this.foto)
                await this.$axios.post('usuario-img-perfil', formData, config)
                await this.$auth.fetchUser()
                this.foto = ''
                this.dialog_edit = false;
            } catch (e) {
                let alerta = {
                    color : 'error',
                    snackbar : true,
                    data : e.response.data.message,
                }
                await this.$store.dispatch('alertas/GET_DATA', alerta);
            }
        }
        
    }
}
</script>