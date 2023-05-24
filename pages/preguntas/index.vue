<template>
    <v-main> 
        <v-container fluid> 
            <v-row justify="space-around"> 
                <v-col sm="12" md="9"> 
                    <InstruccionesPreguntas />
                </v-col>
            </v-row>
            <v-row justify="space-around">
                <v-col sm="12" md="11"> 
                    <v-tabs fixed-tabs dark 
                        background-color="#002659" 
                        v-model="tabulador"
                    > 
                        <v-tab v-for="(tab) in tabs" :key="tab.status"> 
                            {{tab.nombre}}
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tabulador">
                        <v-tab-item v-for="(tab) in tabs" :key="tab.status"> 
                            <GridPreguntas :preguntas="preguntas" :state="tab.status"/>
                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
    import InstruccionesPreguntas from '@/components/instrucciones/InstruccionesPreguntas'
    import Pregunta from '@/components/preguntas/Pregunta'
    import GridPreguntas from '@/components/preguntas/GridPreguntas'

    export default {
        layout: 'login',
        components: {
            Pregunta,
            InstruccionesPreguntas,
            GridPreguntas
        },
        data () {
            return {
                tabs : [
                    {
                        nombre: 'Mis Preguntas',
                        status: 'mis_preguntas'
                    },
                    {
                        nombre: 'Nuevas',
                        status: 'sin_responder'
                    },
                    {
                        nombre: 'Respondidas',
                        status: 'sin_verificar'
                    },
                    {
                        nombre: 'Verificadas',
                        status: 'verificadas'
                    },
                ],
                tabulador : 0,
            }
        },
        async asyncData ({ store, $auth }) {
            let usuario = $auth.user._id
            try {
                await store.dispatch('preguntas/GET_MIS_PRIMERAS_PREGUNTAS', usuario);
                await store.dispatch('preguntas/GET_PRIMERAS_PREGUNTAS_SIN_RESPUESTA');
                await store.dispatch('preguntas/GET_PRIMERAS_PREGUNTAS_SIN_VERIFICAR');
                await store.dispatch('preguntas/GET_PRIMERAS_PREGUNTAS_VERIFICADAS');
            } catch (e) {
                console.log(e);
            }
        },
        head() {
            return {
                titleTemplate: `SN - Preguntas`
            }
        },
        computed : {
            preguntas () {
                switch (this.tabulador) {
                    case 0 :
                        return this.$store.state.preguntas.misPreguntas
                        break
                    case 1 :
                        return this.$store.state.preguntas.sinRespuesta
                        break
                    case 2 :
                        return this.$store.state.preguntas.sinVerificar
                        break
                    case 3 :
                        return this.$store.state.preguntas.verificadas
                        break
                }
            }
        }
        
    }
</script>