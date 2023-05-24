<template>
    <v-main> 
        <v-container fluid>
            <v-row justify="center" align="center"> 
                <v-col cols="12" sm="3"> 
                    <v-container fluid>
                        <v-row justify="center">
                            <v-avatar size="150">
                                <img
                                    :src="`${documento.user.img_perfil}`"
                                    :alt="`${documento.user.name} - SchoolNotes`"
                                >
                            </v-avatar>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="9" md="5" > 
                    <v-container fluid> 
                        <v-row align="center">
                            <LinkAPerfil 
                                :nombre="documento.user.name"
                                :id="documento.user._id"
                            />
                        </v-row>
                        <v-row align="center">
                            <h1 style="font-size: 45px;">{{documento.titulo}}</h1>
                        </v-row>
                    </v-container>
                    <v-card-title> </v-card-title>
                </v-col>
                <v-col cols="12" md="1">
                    <v-container fluid>
                        <v-row justify="space-around" align="center">
                            <v-col cols="2" md="12">
                                <div v-if="$auth.user.apuntes_comprados.includes(documento._id) || comprado">
                                    <v-btn icon
                                        v-if="documento.reacciones.includes($auth.user._id)"
                                        @click="eliminarReaccion()"
                                    >
                                        <v-icon color="red darken-1">mdi-heart</v-icon>
                                        {{documento.reacciones.length}}
                                    </v-btn>
                                    <v-btn icon
                                        v-else
                                        @click="reaccionar()"
                                    >
                                        <v-icon>mdi-heart-outline</v-icon>
                                        {{documento.reacciones.length}}
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col cols="2" md="12">
                                <CompartirApunte />
                            </v-col>
                            <v-col cols="2" md="12" v-if="documento.user._id == $auth.user._id">
                                <v-btn icon @click="eliminar()">
                                    <v-icon color="red">mdi-delete</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>       
                </v-col>
            </v-row>
            <v-row align="center" justify="space-around">
                <v-col cols="4" v-for="(etiqueta, i) in documento.etiquetas" :key="i" class="text-center">
                    <EtiquetaPildora :etiqueta="etiqueta" tipo="apuntes" />
                </v-col>
            </v-row>
            <v-row justify="center" align="center"> 
                <v-col cols="12" md="5" >
                    <v-img
                        contain
                        max-height="300" 
                        :src="documento.img_destacada"
                    />
                </v-col>
                <v-col cols="12" md="6">
                    <Descripcion :descripcion="documento.descripcion" />
                </v-col>
            </v-row>
            <v-divider> </v-divider>
            <v-row align="center" justify="center"> 
                <v-col cols="12" md="9">
                    <div v-if="$auth.user.apuntes_comprados.includes(documento._id)">
                        <div v-if="$auth.user._id == documento.user_id">
                            <v-card-subtitle style="text-align: center;">
                                ¡No olvides compartir el documento con tus amigos para una obtener mas descargas y mas clips!
                            </v-card-subtitle>
                        </div>
                        <div v-else>
                            <p class="textoCompra">
                                Gracias por apoyar a {{documento.user.name}}. ¡Descarga tu documento y no pares de aprender!
                            </p>
                            <v-card-subtitle style="text-align: center;">
                                No olvides dar me gusta al documento para seguir mejorando
                            </v-card-subtitle>
                        </div>
                        <v-btn block dark
                            :href="documento.archivo" 
                            target="_blank" color="#40cb4d"
                        >
                            descargar documento
                        </v-btn>
                    </div>
                    <div v-else>
                        <p class="textoCompra">
                            !Puedes comprar este documento de por vida por sólo 25 clips!
                        </p>
                        <v-btn block color="#40cb4d"  dark
                            @click="comprarApunte()" 
                            :loading="loading_btn" 
                        >
                            comprar documento
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row align="top" justify="center">
                <v-col cols="12" md="8">
                    <v-card-title>{{documento.comentarios.length}} comentarios</v-card-title>
                    <ComentarioDocumento 
                        v-for="(comentario, index) in documento.comentarios" :key="index"
                        :comentario="comentario" 
                    />
                    <NuevoComentarioDocumento 
                        v-if="$auth.user.apuntes_comprados.includes(documento._id) || comprado"
                        :guardarComentario="guardarComentario"
                        :loading="loading"
                    />
                </v-col>
                <v-col cols="12" md="4"> 
                    <v-card class="mt-15"> 
                        <h3 style="font-size: 24px; text-align: center" class="mb-5">
                            ¿Te gustaría ganar también clips?
                        </h3>
                        
                        <p style="font-size: 25px; text-align: center" class="mb-3">
                            ¡Intenta compartiendo un documento a la comunidad!
                        </p>
                        <v-btn block dark
                            href="/crear-documento"
                            color="#013c8aa1"
                        >
                            Crear Mi Documento
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
    import Descripcion from '@/components/descripcion/Descripcion'
    import NuevoComentarioDocumento from '@/components/documentos/NuevoComentarioDocumento'
    import ComentarioDocumento from '@/components/documentos/ComentarioDocumento'
    import CompartirApunte from '@/components/modales/CompartirApunte'
    import LinkAPerfil from '@/components/usuario/LinkAPerfil'
    import EtiquetaPildora from '@/components/etiquetas/EtiquetaPildora'

    export default {
        layout: "login",
        components: {
            Descripcion,
            NuevoComentarioDocumento,
            ComentarioDocumento,
            CompartirApunte,
            LinkAPerfil,
            EtiquetaPildora
        },
        data() {
            return {
                loading_btn:false,
                loading : false
            }
        },
        head() {
            return {
                titleTemplate: `SN - ${this.documento.titulo}`
            }
        },
        methods: {
            async eliminar(){
                try{
                    await this.$axios.delete(`apuntes/${this.documento._id}`)
                    await this.$auth.fetchUser()
                    this.$router.push('/mis-guardados')
                }catch(e){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
            },
            async comprarApunte() {
                this.loading_btn = true
                let info = {
                    user_id : this.$auth.user._id,
                    apunte_id : this.documento._id
                }
                try {
                    const { data } = await this.$axios.post('comprar-apunte', info)
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    await this.$auth.fetchUser()
                } catch(e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.loading_btn = false
            },
            async reaccionar() {
                let info = {
                    tipo : 'apunte',
                    tipo_id : this.documento._id,
                    user_id : this.$auth.user._id
                }
                try {
                    await this.$axios.post('reaccion' , info)
                    this.documento.reacciones.push(this.$auth.user._id)
                } catch (e) {
                    console.log(e)
                }
            },
            async eliminarReaccion() {
                let info = {
                    tipo : 'apunte',
                    tipo_id : this.documento._id,
                    user_id : this.$auth.user._id
                }
                try {
                    await this.$axios.post('reaccion' , info)
                    let i = this.documento.reacciones.indexOf(this.$auth.user._id)

                    if( i !== -1) {
                        this.documento.reacciones.splice(i , 1)
                    }
                } catch (e) {
                    console.log(e)
                }
            },
            async guardarComentario(comentario) {
                let info = {
                    user_id : this.$auth.user._id,
                    comentario : comentario,
                    apunte_id : this.documento._id
                }
                this.loading= true
                try {
                    let { data } = await this.$axios.post('comentarios', info )
                    this.documento.comentarios.push(data.data)
                }catch(e){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.loading= false
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
        },
        async asyncData ({ $axios, params }) {
            const { data } = await $axios.get(`apuntes/${params.slug}`)
            return { documento: data.data }
        },
    }
</script>

<style scoped>
    .textoCompra {
        font-size: 20px;
        text-align: center;
    }
</style>