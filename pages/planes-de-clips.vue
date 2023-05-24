<template>
    <v-main>
        <v-container fluid class="bannerPrincipal">
            <v-row align="center" justify="center">
                <h1 class="titulo">
                    ¡Compra Diamond Clips!
                </h1>
            </v-row>
            <v-row align="center" justify="center">
                <h2 class="subtitulo">Con los diamond clips podrás comprar portafolios o cambiarlos por clips y descargar los documentos que quieras</h2>
            </v-row>
            <v-row align="center" justify="space-around">
                
                <v-col cols="12" sm="6" md="4" v-for="(paquete, i) in paquetes" :key="i">
                    <v-card>
                        <v-container fluid>
                            <v-row align="center" justify="center">
                                <h3 class="nombrePaquete">{{paquete.nombre_paquete}}</h3>
                            </v-row>
                            <v-row align="center" justify="center">
                                <p class="clipsAComprar">
                                    <v-icon class="icono" color="#20FFFF">mdi-paperclip</v-icon>  
                                    {{paquete.diamond_clips}} Dclips
                                </p>
                            </v-row>
                            <v-row align="center" justify="center" v-if="paquete.descuento == 0">
                                <p class="precio">Pago único de ${{paquete.precio}}mxn</p>
                            </v-row>
                            <v-row align="center" justify="center" v-else>
                                <p class="precio">Pago único de <s>${{paquete.precio}}mxn</s> a ${{descuentoPorPack(paquete.descuento, paquete.precio)}}mxn <br> <center>{{paquete.descuento}}% de descuento</center></p>
                            </v-row>
                            <v-row align="center" justify="center" v-if="paquete.recomendado"
                                class="barraRecomendado d-flex align-center" 
                            >
                                <p class="recomendado">
                                <v-icon color="#00cba0">mdi-crown-outline</v-icon>  
                                    Plan recomendado
                                </p>
                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="10" draggable="" v-for="(caracteristica, y) in paquete.caracteristicas" :key="y">
                                    <v-icon color="#00cba0">
                                        mdi-check-bold
                                    </v-icon>
                                    {{caracteristica}}
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="9">
                                    <v-btn dark block color="#013c8a" :loading="modal"
                                        
                                    >
                                        próximamente...
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid class="porQueComprar">
            <v-row align="center" justify="center">
                <h2 class="titulo">¿Por qué comprar clips?</h2>
            </v-row>
            <v-row align="center" justify="space-around">
                <v-col cols="12" md="5">
                    <v-container fluid>
                        <v-row justify="center">
                            <v-col cols="8">
                                <h4 class="razones">Compra inmediata para que empieces a disfrutar de SchoolNotes hoy mismo</h4>
                            </v-col>
                            <v-col cols="2">
                                <v-icon size="50" color="yellow darken-2">mdi-clock-fast</v-icon>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col cols="12" md="5">
                    <v-container fluid>
                        <v-row justify="center">
                            <v-col cols="2">
                                <v-icon size="50" color="light-blue darken-3">mdi-download</v-icon>
                            </v-col>
                            <v-col cols="8">
                                <h4 class="razones">No esperes a descargar documentos o preguntas sin tener que compartir contenido</h4>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="modal" max-width="600">
            <v-card>
                <v-card-title>
                    {{pack.nombre_paquete}}
                    <v-spacer />
                    <v-btn @click="limpiar(true)" text color="red">
                        X
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <h3>Nombre del Paquete:</h3> <p>{{pack.nombre_paquete}}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <h3>Diamonds clips a recibir:</h3> <p>{{pack.diamond_clips}}</p>
                        </v-col>
                    </v-row>
                    <v-row>        
                        <v-col cols="12" md="3">
                            <h3>Precio:</h3> <p>${{sub_total}}</p>
                        </v-col >
                        <v-col cols="12" md="5">
                            <h3>Descuento de Creador:</h3> <p>{{descuento}}%</p>
                        </v-col>
                        <v-col cols="12" md="4">
                            <h3>Total a Pagar:</h3> <p>${{total_pagar}}</p>
                        </v-col>
                    </v-row>
                    <v-checkbox
                        v-model="check_codigo"
                        label="Tengo un Codigo de Creador"
                        color="#00cba0"
                        hide-details
                    />
                    <v-row v-if="check_codigo">
                        <v-col cols="12" md="8">
                            <v-text-field 
                                v-model="text_codigo"
                                label="Ingresa tu codigo de Creador"
                                :disabled="!check_codigo"
                                @keyup.enter="validarCodigo()"
                                
                            />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-btn block rounded color="primary" :loading="btn_loading_codigo" :disabled="text_codigo == ''" @click="validarCodigo()" class="mt-3">
                                Validar Codigo
                            </v-btn>
                        </v-col>
                    </v-row>
                    <br>
                    <v-btn block color="#013c8a" @click="comprarPaquete()" dark :loading="loading_btn">
                        ¡Comprar Ahora! {{this.text_codigo_validado=='' ? `` : `Codigo de Creador: `+this.text_codigo_validado}}
                    </v-btn>
                </v-card-text>

            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
    export default {
        data(){
            return{
                paquetes:[
                    {
                        pack: 1,
                        nombre_paquete: 'Nombre del paquete',
                        diamond_clips: 50,
                        precio: 179.99,
                        caracteristicas: [
                            'Úsalos cuando quieras',
                            'NUNCA Vencen',
                        ],
                        recomendado: false,
                        descuento: 0,
                    },
                    {
                        pack: 2,
                        nombre_paquete: 'Nombre del paquete',
                        diamond_clips: 100,
                        precio: 299.99,
                        caracteristicas: [
                            'Úsalos cuando quieras',
                            'NUNCA Vencen',
                        ],
                        recomendado: true,
                        descuento: 10,
                    },
                    {
                        pack: 3,
                        nombre_paquete: 'Nombre del paquete',
                        diamond_clips: 150,
                        precio: 429.99,
                        caracteristicas: [
                            'Úsalos cuando quieras',
                            'NUNCA Vencen',
                        ],
                        recomendado: false,
                        descuento: 0,
                    },
                ],
                modal:false,
                pack: [],
                descuento: 0,
                total_pagar: 0,
                sub_total: 0,
                loading_btn: false,

                //Codigo Creador
                check_codigo: false,
                text_codigo:'',
                text_codigo_validado:'',
                btn_loading_codigo: false,
                datos_codigo:[],
            }
        },
        layout : 'login',
        head() {
            return {
                titleTemplate: `SN - Comprar clips`
            }
        },
        methods : {
            abrirModal(paquete, precio){
                this.modal = true;
                this.pack = paquete;
                this.sub_total = precio;
                this.descuentoTotalPagar(this.sub_total)
            },
            descuentoPorPack(descuento, precio){
                let off = descuento/100;
                off = precio * off;
                off = precio - off;
                return off;
            },
            descuentoTotalPagar(precio){
                let off = (this.descuento+this.pack.descuento)/100;
                off = this.pack.precio * off;
                off = this.pack.precio - off;
                this.total_pagar = off;
            },
            async comprarPaquete() {
                this.loading_btn = true;
                let info = {
                    user_id : this.$auth.user._id,
                    clips_diamond_compra : this.pack.diamond_clips,
                    codigo_creador : this.text_codigo_validado,
                    total_pagar : this.total_pagar,
                }
                try {
                    const {data} = await this.$axios.post('comprar-clips', info)
                    await this.$auth.fetchUser()
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    this.limpiar(true);
                } catch(e) {
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.loading_btn = false;
            },
            async validarCodigo(){
                this.btn_loading_codigo = true;
                let url = `codigo-creador/${this.text_codigo}`
                try {
                    const {data} = await this.$axios.get(url);
                    if(data.data.user_id == this.$auth.user._id){
                        var mensaje = 'No puedes usar tu propio codigo de creador '
                        throw mensaje
                    }
                    this.descuento = data.data.descuento_compra;
                    this.text_codigo_validado = this.text_codigo;
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    this.descuentoTotalPagar(this.pack.precio)
                    alert('Codigo validado correctamente, Se aplicará el '+data.data.descuento_compra+'% de descuento en tu compra!')
                } catch (e) {
                    this.limpiar(false);
                    if(e == mensaje){
                        alert(mensaje);
                    }else{
                        let alerta = {
                            color : 'error',
                            snackbar : true,
                            data : e.response.data.message,
                        }
                        await this.$store.dispatch('alertas/GET_DATA', alerta)
                    }
                }

                this.btn_loading_codigo = false;

            },
            limpiar(cerrar){
                this.descuento = 0;
                this.text_codigo_validado = '';
                this.text_codigo = '';
                this.descuentoTotalPagar(this.pack.precio)
                this.modal = !cerrar;
            }
        }
    }
</script>

<style scoped>
    .bannerPrincipal {
        background: linear-gradient(180deg, rgba(0,38,89,1) 0%, rgba(0,109,254,1) 100%);
    }
    .titulo {
        text-align : center;
        color : white;
    }
    .subtitulo {
        color: #e4e4e4;
        text-align: center;
    }
    .nombrePaquete {
        font-size: 18px;
        text-align: center;
    }
    .clipsAComprar {
        font-size: 28px;
        font-weight: 800;
    }
    .precio {
        font-size: 14px;
        color: #adadad;
    }
    .icono {
        transform: rotate(45deg);
    }
    .barraRecomendado {
        background-color:#013c8a;
    }
    .recomendado {
        color: white;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
    }
    .porQueComprar {
        background-color: #333;
    }
    .razones {
        color: #bbbbbb;
    }
</style>