<template>
    <v-container fluid class="post">
        <v-row align="center" justify="center">
            <h2>¡No olvides visitar nuestro blog!</h2>
        </v-row>
        <v-row align="center" justify="space-around">
            <v-col cols="6" md="3" v-for="(post, index) in entradas" :key="index">
                <Entrada :entrada="post" />
            </v-col>
            <v-col cols="6" md="2">
                <v-row align="center" justify="center">
                    <p>No te pierdas ningún post para seguir aprendiendo</p>
                </v-row>
                <v-row>
                    <v-btn color="#013c8ac4" dark rounded block
                        link to="/blog"
                    >
                        ver más...
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Entrada from '@/components/blog/Entrada'
    export default {
        components: {
            Entrada
        },
        data(){
            return {
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
                ]
            }
        }   
    }
</script>

<style scoped>
    p {
        text-align: center;
    }
    .post {
        background-color: #dddddd;
    }
</style>