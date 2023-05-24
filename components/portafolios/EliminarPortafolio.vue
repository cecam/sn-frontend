<template>
    <div>
        <v-btn color="error" text @click="dialog = !dialog">
            Eliminar
        </v-btn>
        <v-dialog v-model="dialog" max-width="800">
            <v-card>
                <v-card-title>
                    <h3>
                        ¿Estas seguro que quieres borrar este portafolio?
                    </h3>
                </v-card-title>
                <v-card-text>
                    Estas apunto de eliminar el portafolio <strong>{{portafolio.nombre}}</strong>, Para poder finalizar necesitamos comprobar que eres tú. <br />
                    <br />
                    <v-text-field 
                        v-model="contrasena" 
                        label="Escribe Tú Contraseña"
                        prepend-icon="mdi-key"
                        :type="show_password ? 'text' : 'password'"
                        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show_password = !show_password"
                        :disabled="loader"
                        @keyup.enter="EliminarPorta(portafolio._id)"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="error" @click="dialog = !dialog">
                        Cancelar
                    </v-btn>
                    <v-btn color="success" :disabled="contrasena==''" @click="EliminarPorta(portafolio._id)" :loading="loader">
                        Eliminar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: ['portafolio'],
        data(){
            return{
                dialog: false,
                show_password: false,
                loader: false,

                contrasena:'',
            }
        },
        methods:{
            async EliminarPorta(id){
                this.loader = true;
                let url = `portafolios/${id}?contrasena=${this.contrasena}`;
                try {
                    const {data} = await this.$axios.delete(url);
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    await this.$auth.fetchUser()
                    this.$router.push(`/inicio`)
                } catch (e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.loader = false;
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
            },
        }
    }
</script>

<style>
    .centrado {
        text-align: left;
    }
</style>