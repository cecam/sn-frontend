<template>
    <v-card
        class="mx-auto"
        elevation="900"
    >
        <v-container fluid>
            <v-row justify="center" align="center">
                <v-col cols="3" md="3">
                    <v-avatar size="80">
                        <img
                            :src="`${portafolio.user.img_perfil}`"
                            :alt="`${portafolio.user.name} - SchoolNotes`"
                        >
                    </v-avatar>
                </v-col>
                <v-col cols="10" md="8">
                    <v-container fluid>
                        <v-row align="center" class="ma-0 pa-0"> 
                            <LinkAPerfil 
                                :nombre="portafolio.user.name"
                                :id="portafolio.user._id"
                            />
                            <hr />
                            <v-card-subtitle>
                                {{portafolio.created_at | dateFormat}}
                            </v-card-subtitle>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0"> 
                <h2 class="centrado">
                    {{portafolio.nombre}}
                </h2>
            </v-row>
            <v-img
                v-if="portafolio.img"
                :src="portafolio.img"
                height="150px"
            />            
            <v-img
                v-else
                :src="portafolio.user.img_perfil"
                height="150px"
            />          
            <v-card-actions>
                <v-btn
                    color="#002659"
                    text
                    link :to="`/portafolios/${string_to_slug(portafolio.nombre)}?id=${portafolio._id}`"
                >
                    Ver Portafolio
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    icon
                    @click="show = !show"
                >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="show">
                    <v-card-text justify="left" align="left">
                        <strong>Apuntes Totales: </strong> {{portafolio.apuntes_ids.length}} <br />
                        <strong>Precio Estimado: </strong> {{precioPortafolio(portafolio.apuntes_ids.length)}} clips <br />
                        <div v-if="$auth.user._id == portafolio.user._id">
                            <strong>Ganancia: </strong> {{gananciaPortafolio(precioPortafolio(portafolio.apuntes_ids.length))}} clips
                            <br />
                            <br />
                            <v-row>
                                <v-col cols="12" md="6"><ModificarPortafolio :portafolio="portafolio" /></v-col>
                                <v-col cols="12" md="6"><EliminarPortafolio :portafolio="portafolio" /></v-col>
                            </v-row>
                        </div>
                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-container>
    </v-card>
</template>

<script>
    import EliminarPortafolio from "@/components/portafolios/EliminarPortafolio";
    import ModificarPortafolio from "@/components/portafolios/ModificarPortafolio";
    import moment from 'moment'
    moment.locale('es')

    export default {
        props: ['portafolio'],
        components:{
            EliminarPortafolio,
            ModificarPortafolio,
        },
        filters: {
            dateFormat(value) {
            if (!value) return ''
                var newFecha= moment(value).fromNow();
                return newFecha
            },
              
        },
        data(){
            return{
                show: false,
            }
        },
        methods:{
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

            precioPortafolio(apuntesTotales){
                let precio_porta = apuntesTotales * 0.90 * 25;
                return Math.trunc(precio_porta);
            },
            gananciaPortafolio(precioPorta){
                let paga_user = precioPorta * 0.50;
                return Math.trunc(paga_user);
            }
        }
    }
</script>

<style>
    .centrado {
        text-align: left;
    }
</style>