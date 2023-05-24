<template>
    <v-container> 
        <v-row justify="center" align="center">
            <h1 style="text-align: center;">Bienvenido al blog de SchoolNotes</h1>
        </v-row>
        <v-row justify="center" align="center">
            <p style="text-align: center;">
                En este blog, encontrarás tips e información para que continues mejorando escolarmente, como mejorar tus técnicas de estudio, así como tips de lectura y demás.
            </p>
        </v-row>
        <v-row align="start" justify="center">
            <v-col cols="11" v-for="(post, index) in entradas" :key="index">
                <v-card 
                    elevation="400" 
                    class="pl-5 pr-2"
                    link :to="`/blog/${string_to_slug(post.titulo)}`"
                >
                    <v-row align="center">
                        <v-col cols="12" sm="8">
                            <v-row>
                                <h2>{{post.titulo}}</h2>
                            </v-row>
                            <v-row>
                                <p>{{post.resumen}}</p>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-img
                                :src="post.img"
                                contain
                            ></v-img>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: 'noLogin',
        data(){
            return{
                entradas:[
                    {
                        titulo: 'La mejor forma de hacer tus apuntes digitales',
                        img: '/blog/apuntes_digitales.png',
                        resumen: 'Si quieres dejar las libretas y hojas, para conseguir administrar mejor tus apuntes y aprovechar todas las ventajas que pueden darte, ¡este es un artículo para tí!.'
                    },
                    {
                        titulo: '5 tips para hacer los apuntes más bonitos',
                        img: '/blog/apuntes_bonitos.png',
                        resumen: 'No cabe duda que los apuntes son una parte escencial en el proceso de aprendizaje, ¡dales una mejora para poder usarlos a su 100%!.'
                    },
                    {
                        titulo: 'Los 4 mejores ejercicios para leer más rápido',
                        img: '/blog/lectura.png',
                        resumen: 'Vuélvete una de esas personas que leen un libro a la semana, así es, está al alcance de todo el mundo. Seguro que cone estos ejercicios, lo conseguirás'
                    },
                    {
                        titulo: '4 pasos definitivos para ser autodidacta',
                        img: '/blog/autodidacta.png',
                        resumen: '¿Te gustaría destacar profesionalmente?, debes conocer a alguien que impresiona por todo lo que sabe y no consigues descubrir cómo lo consiguió: no es más que un gran autodidacta, si quieres volverte uno de ellos, ¡lee esta entrada YA!'
                    },
                ]
            }
        },
        methods: {
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