<template>
    <v-container class="ma-0 pa-0"> 
        <v-list-item class="ma-0 pa-0" v-if="busquedaTitulo">  
            <v-list-item-avatar>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" 
                            @click="busquedaTitulo = !busquedaTitulo"
                        >
                            <v-icon>mdi-tag-multiple-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>Buscar por etiquetas</span>
                </v-tooltip>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-container class="ma-0 pa-0"> 
                    <v-row align="center" justify="center" class="pa-0 ma-0">
                        <v-col sm="12"> 
                            <v-text-field
                                v-model="nombre"
                                :placeholder="`Buscar ${tipo}`"
                                @keyup.enter="$router.push(`/busqueda?nombre=${string_to_slug(nombre)}&tipo=${tipo}`)"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-list-item-content>
        </v-list-item>
        <v-list-item class="ma-0 pa-0" v-else>  
            <v-list-item-avatar>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" 
                            @click="busquedaTitulo = !busquedaTitulo"
                        >
                            <v-icon>mdi-signature-text</v-icon>
                        </v-btn>
                    </template>
                    <span>Buscar por nombre</span>
                </v-tooltip>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-container class="ma-0 pa-0"> 
                    <v-row align="center" justify="center" class="pa-0 ma-0">
                        <v-col sm="12"> 
                            <v-autocomplete
                                no-data-text="No existen datos para esta búsqueda"
                                v-model="nombre"
                                :items="etiquetas "
                                item-text="nombre"
                                item-value="slug"
                                class="mt-5"
                                label="Buscar por etiqueta"
                                @change="$router.push(`/busqueda-etiquetas?nombre=${string_to_slug(nombre)}&tipo=${tipo}`)"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-container>
            </v-list-item-content>
        </v-list-item>
    </v-container>
</template>

<script>
export default {
    props: ['tipo'],
    data() {
        return {
            nombre : '',
            busquedaTitulo: true,
            etiquetas : {}
        }
    },
    beforeMount(){
        this.llenarEtiquetas()   
    },
    methods: {
        async llenarEtiquetas(){
            try{
                const { data } = await this.$axios.get(`etiquetas`)
                this.etiquetas = data.data
            }catch(e) {
                console.log('e')
            }
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