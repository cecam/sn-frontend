<template>
    <v-container fluid class="ma-0">
        <v-row align="center" class="bloqueTitulo pa-0 mt-0">
            <v-col cols="12" md="6">
                <v-img src="/blog/autodidacta.png" contain> </v-img>
            </v-col>
            <v-col cols="12" md="6">
                <h1 class="titulo">Los 4 pasos definitivos para ser autodidacta</h1>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/ybkXLkEpq_s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <p>
                    Actualmente, el convertirse en una persona autodidacta se ha vuelto más que un lujo, en una necesidad. No es un secreto que las personas que son capaces de aprender por sí mismas y adquirir conocimiento extra al necesariamente requerido, son las que mejores oportunidades tienen en un ámbito laboral.
                </p>
                <p>
                    Para ello, te traemos los puntos con los que sí o sí, ¡conseguirás convertirte en un autodidacta de primer nivel RÁPIDAMENTE!
                </p>
                <h2>Encuentra un tema que te apasione</h2>
                <p>
                    Este punto podría llevarse de la mano con “elije una meta o un objetivo fijo”. Es casi imposible poder llevar a cabo los puntos siguientes si tu objetivo no te gusta lo suficiente como para levantarte de la cama, lo principal es encontrar algo que no tomes como “lo tengo que hacer” y en tu cabeza resuene un “lo quiero hacer”; de otra forma, las probabilidades de quedarse como un intento más, son altas.
                </p>
                <p>
                    Lo primero que debes hacer, es encontrar ese tema en el que quieras destacar. Para esto, te recomendamos el método ikigai, la cual, es una técnica increíblemente efectiva para encontrar ese “algo” en lo que podrás destacar y quien sabe, tal vez incluso cambiar al mundo.
                </p>
                <h2>Disciplina > Motivación</h2>
                <p>
                    Así es, para in un poco en contra de todas las personas que mencionan que lo más importante es el encontrarse motivado 24/7, sonreír y disfrutar de cada cosa sea buena o mala; sabemos que eso es algo casi imposible, los fallos duelen, que hay días en los que simplemente no quieres hacer nada por más motivado que hayas estado el día anterior. 
                </p>
                <p>
                    Como conclusión, es más importante el conseguir trabajar en esos días en los que cualquier otro descansaría o pararía, cuando nadie más lo haría, levantarse y hacerlo, aunque sea menos tiempo o más flojo, pero hacerlo de igual forma.
                </p>
                <h2>Identifica cuándo ser aprendiz y cuándo ser maestro</h2>
                <p>
                    Durante tu proceso de aprendizaje,  te verás envuelto en un sin fin de pláticas o debates con personas profesionales en su ámbito y en tu mismo nivel, por lo que, deberás de ser capaz de admitir y aceptar que muchas veces te tocará aceptar que la otra persona tiene más conocimientos del tema que tú, o en otras ocasiones, tendrás que ser paciente para compartir tu conocimiento con la otra persona adaptándote a su ritmo, al fin y al cabo, no hay mejor forma de aprender que en comunidad.
                </p>
                <h2>Aprende a aprender</h2>
                <p>
                    Como todo en esta vida, es imposible dominar cualquier cosa de la noche a la mañana, por lo que tendrás que aceptar que habrá altas y bajas, no todos los temas podrás comprenderlos al leer un par de artículos o al ver un par de videos, incluso en ocasiones, tendrás que terminar un curso y ponerlo en práctica para poder comenzar a comprenderlo. El proceso más importante al momento de volverte autodidacta, es el aprender a aprender.
                </p>
                <p>
                    Si encuentras tu propio método y tus técnicas en las que absorbes y retienes información, notarás como cada tema que pasas, aceleras el proceso y lo pules cada vez, con lo que aprender, se volverá un proceso más en tu día a día.
                </p>
            </v-col>
        </v-row>
        <Monetizacion />
        <RegistroDirecto :etiquetas="etiquetas" />
    </v-container>
</template>

<script>
    import Monetizacion from '@/components/paginaInicio/Monetizacion'
    import RegistroDirecto from '@/components/paginaInicio/RegistroDirecto'

    export default {
        layout: 'noLogin',
        components: {
            Monetizacion,
            RegistroDirecto
        },
        async asyncData ({ $axios, params }) {
            const { data } = await $axios.get(`etiquetas`)
            return { etiquetas: data.data }
        },
    }
</script>

<style scoped>
    .bloqueTitulo{
        background-color: #333;
        padding: 0;
        margin-top: 0;
    }
    .titulo{
        text-align: center;
        color: #e6e6e6;
    }
    iframe {
        display: block;
        margin: auto;
    }
    h2 {
        text-align: center;
        color: #002659;
    }
</style>