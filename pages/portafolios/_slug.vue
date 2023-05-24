<template>
    <v-main>
        <v-container fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="3">
                    <v-avatar size="150">
                        <img
                            :src="`${portafolio.user.img_perfil}`"
                            :alt="`${portafolio.user.name} - SchoolNotes`"
                        >
                    </v-avatar>
                </v-col>
                <v-col cols="10" sm="7" md="5">
                    <v-row justify="start" align="center">
                        <LinkAPerfil 
                            :nombre="portafolio.user.name"
                            :id="portafolio.user._id"
                        />
                    </v-row>
                    <v-row>
                        <h1>{{portafolio.nombre}}</h1>
                        <div v-if="loading">
                            <br>
                            <p>Cargando Precios...</p>
                        </div>
                        <div v-else>
                            <div v-if="apuntes_no_desbloqueados==0">
                                Ya tienes este portafolio comprado o has comprado sus apuntes por separado.
                            </div>
                            <div v-else>
                                <p v-if="apuntes_desbloqueados!=0">Al parecer tienes <strong>{{apuntes_desbloqueados}} apuntes comprados</strong> de este portafolio y faltan <strong>{{apuntes_no_desbloqueados}} apuntes por comprar</strong>.</p>
                                <p v-else>Aún no tienes ningun apunte comprado de este portafolio</p>
                                <div>Este portafolio vale {{precio_portafolio}} clips <p v-if="apuntes_desbloqueados!=0">&nbsp;(Con descuento de apuntes ya desbloqueados)</p></div>
                            </div>
                        </div>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="3"><v-btn text :loading="loading" @click="compararApuntes()" color="primary">Validar Costo</v-btn></v-col>
                        <v-col cols="12" md="3"><v-btn text :loading="loading" :disabled="apuntes_no_desbloqueados==0" @click="realizarComprar()" color="green">Comprar</v-btn></v-col>
                        <v-col cols="12" md="3" v-if="$auth.user._id == portafolio.user_id"><ModificarPortafolio :portafolio="portafolio" /></v-col>
                        <v-col cols="12" md="3" v-if="$auth.user._id == portafolio.user_id"><EliminarPortafolio :portafolio="portafolio" /></v-col>
                    </v-row>
                    <v-row>
                        <v-checkbox
                            v-model="guardado"
                            :label="guardado ? 'Quitar de Guardados' : 'Guardar Portafolio'"
                            @click="guardadPortafolio()"
                        />
                    </v-row>
                </v-col>
            </v-row>
            <v-row align="center" justify="space-around">
                <v-col cols="10" md="4">
                    <v-img
                        :src="portafolio.img"
                        max-height="300" 
                        contain
                    ></v-img>
                </v-col>
                <v-col cols="10" md="5">
                    <Descripcion :descripcion="portafolio.descripcion" />
                </v-col>
            </v-row>
            <v-row justify="space-around">
                <v-col cols="11" sm="5" md="4" lg="3" 
                    v-for="(apunte, index) in portafolio.apuntes"
                    :key="index"
                >
                    <v-progress-linear
                        color="green"
                        :value="loading ? 0 : 100"
                        buffer-value="0"
                        stream
                        v-if="$auth.user.apuntes_comprados.includes(apunte._id)"
                    />
                    <v-progress-linear
                        color="warning"
                        :value="loading ? 0 : 100"
                        buffer-value="0"
                        stream
                        v-else
                    />
                    <Documento :apunte="apunte" />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
    import Descripcion from '@/components/descripcion/Descripcion'
    import LinkAPerfil from '@/components/usuario/LinkAPerfil'
    import Documento from '@/components/documentos/Documento'
    import EliminarPortafolio from "@/components/portafolios/EliminarPortafolio";
    import ModificarPortafolio from "@/components/portafolios/ModificarPortafolio";

    export default {
        layout: 'login',
        data(){
            return{
                loading:false,
                total_apuntes:1,
                precio_portafolio:1,
                ganancias:1,
                apuntes_desbloqueados: 0,
                apuntes_no_desbloqueados: 0,
                varificacion_peticiones:0,
                guardado:false,
                apuntes_no_guardados:[],
            }
        },
        components: {
            Descripcion,
            LinkAPerfil,
            Documento,
            EliminarPortafolio,
            ModificarPortafolio,
        },
        mounted(){
            this.compararApuntes();
            this.verificaGuardado();
        },
        async asyncData ({ $axios, query }) {
            const { data } = await $axios.get(`portafolios/${query.id}`)
            return { portafolio: data.data }
        },
        methods:{
            verificaGuardado(){
                let porta = this.$auth.user.portafolios_comprados ? this.$auth.user.portafolios_comprados : [];
                if(porta.includes(this.portafolio._id)){
                    this.guardado = true;
                }else{
                    this.guardado = false;
                }
            },
            async compararApuntes(){
                console.log('inicia');
                this.loading=true;
                try{
                    await this.$auth.fetchUser();
                }catch(e){
                    console.log(e);
                }

                this.apuntes_desbloqueados = 0;
                this.apuntes_no_desbloqueados = 0;
                var y = 0;
                for (var i = 0; i < this.portafolio.apuntes_ids.length; i++) {
                    if(this.$auth.user.apuntes_comprados.includes(this.portafolio.apuntes_ids[i])){
                        this.apuntes_desbloqueados = this.apuntes_desbloqueados+1;
                        console.log(this.portafolio.apuntes_ids[i]);
                        console.log('existe')
                    }else{
                        this.apuntes_no_desbloqueados = this.apuntes_no_desbloqueados+1;
                        this.apuntes_no_guardados[y] = this.portafolio.apuntes_ids[i]
                        console.log(this.portafolio.apuntes_ids[i]);
                        console.log('no existe')
                        y++;
                    }
                }
                
                this.total_apuntes = this.apuntes_no_desbloqueados;
                this.precio_portafolio = Math.trunc(this.total_apuntes*0.90*25);
                this.ganancias = Math.trunc(this.precio_portafolio*0.50);

                if(this.varificacion_peticiones!=0){
                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : 'Precios Actualizados',
                    }
                    this.$store.dispatch('alertas/GET_DATA', alerta);
                }
                this.varificacion_peticiones=this.varificacion_peticiones+1;
                this.loading=false;
                this.verificaGuardado();
                console.log('termina');
            },

            async realizarComprar(){
                this.loading= true;
                let url = 'comprar-portafolio';
                let info = {
                    portafolio_id: this.portafolio._id,
                    precio_portafolio: this.precio_portafolio,
                    ganancia: this.ganancias,
                    apuntes_ids_faltantes: JSON.stringify(this.apuntes_no_guardados)
                }
                try{
                    const {data} = await this.$axios.post(url,info);

                    let alerta = {
                        color : 'success',
                        snackbar : true,
                        data : data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    await this.$auth.fetchUser();
                    this.compararApuntes();
                    this.verificaGuardado();
                }catch(e){
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : e.response.data.message,
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    console.log(e.response.data);
                }
                this.loading=false;
            },
            async guardadPortafolio(){
                let bool = this.guardado;
                let url = 'guardar-portafolio';
                let info = {
                    portafolio_id: this.portafolio._id
                };
                try {
                    await this.$axios.post(url,info);
                } catch (error) {
                    console.log(error);
                    let alerta = {
                        color : 'error',
                        snackbar : true,
                        data : 'Algo ha salido mal...',
                    }
                    await this.$store.dispatch('alertas/GET_DATA', alerta);
                    this.guardado = !bool

                }
            }
        }
    }
</script>