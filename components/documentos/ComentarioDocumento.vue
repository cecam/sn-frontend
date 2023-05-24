<template>
    <v-card> 
        <v-container fluid>
            <v-row align="center" justify="center">
                <v-col sm="2">
                    <v-avatar size="80">
                        <img
                            :src="`${comentario.user.img_perfil}`"
                            :alt="`${comentario.user.name} - SchoolNotes`"
                        >
                    </v-avatar>
                </v-col>
                <v-col sm="9">
                    <v-container fluid> 
                        <v-row align="center"> 
                            <v-btn :ripple="false" text link :to="`/${string_to_slug(comentario.user.name)}?id=${comentario.user._id}`">
                                {{comentario.user.name}}
                            </v-btn>
                            <hr />
                            <v-card-subtitle>{{comentario.created_at | dateFormat}}</v-card-subtitle>
                            <hr />
                        </v-row>   
                        <v-row class="text-center blue-grey darken-3  rounded-pill pa-4"> 
                            <p style="color:whitesmoke">{{comentario.comentario}}</p>
                        </v-row> 
                    </v-container> 
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import moment from 'moment'
    moment.locale('es')

    export default {
        props: ['comentario'],
        data() {
            return {
            }
        },
        methods : {
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
        filters: {
            dateFormat(value) {
            if (!value) return ''
                let newFecha= moment(value).fromNow();
                return newFecha
            }
        }
    }
</script>