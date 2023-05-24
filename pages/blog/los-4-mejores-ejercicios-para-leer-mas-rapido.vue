<template>
    <v-container fluid class="ma-0">
        <v-row align="center" class="bloqueTitulo pa-0 mt-0">
            <v-col cols="12" md="6">
                <v-img src="/blog/lectura.png" contain> </v-img>
            </v-col>
            <v-col cols="12" md="6">
                <h1 class="titulo">Los 4 mejores ejercicios para leer más rápido</h1>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/6JLPTcZkW5I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <p>
                    Es común escuchar que las personas leen, no sólo leen, leen mucho; estas personas terminan 1 libro a la semana, o a veces mucho más. ¿Alguna vez te has preguntado cómo lo hacen?, muy simple, con práctica, pero como siempre decimos en SchoolNotes, es mejor trabajar inteligente a trabajar duro, por ello, te daremos 4 ejercicios que deberás hacer diariamente, no te llevarán más de 20min y los resultados valdrán la pena.
                </p>
                <p>
                    Para cada ejercicio deberás encontrar un libro con mucho texto en sus páginas, a menos imágenes mejor. Procura hacer cada ejercicio dos o tres veces, con un descanso de 1 minuto entre series.
                </p>
                <h2>Leer rápido captando las ideas del texto</h2>
                <p>
                    En este ejercicio lo único que tendrás que leer rápido cada renglón de texto en tu página, lo más recomendable será leer cada renglón en 1 segundo durante 30 segundos.
                </p>
                <p>
                    No importa si no alcanzas a entender mucho de lo que tus ojos están percibiendo, no te preocupes, te darás cuenta que con el pasar de los días, tus ojos serán capaces de percibir cada vez más información
                </p>
                <h2>Leer aún más rápido</h2>
                <p>
                    La temática es la misma que en el ejercicio anterior, deberás pasar los ojos por cada renglón, pero ahora necesitaremos más velocidad aún, leyendo cada renglón en medio  segundo.
                </p>
                <p>
                    Insistimos en el tema de la paciencia, al principio son pocas personas las que alcanzan a detectar lo que están “leyendo”.
                </p>
                <p>
                    Los primeros dos ejercicios están enfocados en mejorar la comprensión, de nada nos sirve detectar más palabras por minuto si el cerebro no es capaz de procesar cada palabra que entra en él.
                </p>
                <h2>La primera no, la última tampoco</h2>
                <p>
                    Volvemos a la velocidad normal de lectura, en este ejercicio no deberás apresurarte, procura mantener tu ritmo al leer, intentando que sea lo más fluido posible. “Ni muy rápido, ni muy lento”
                </p>
                <p>
                    Tal cual lo dice el nombre del ejercicio, deberás leer cada renglón de la página, pero omitiendo la primera palabra y la última del mismo. Repite esto por un minuto.
                </p>
                <h2>Lo mismo, pero más difícil</h2>
                <p>
                    Repetimos el método, pero esta vez, evitarás las primeras dos palabras y las últimas dos de cada renglón. Esto tiene el objetivo de ampliar tu campo visual, es decir, que tanto alcanzan a percibir tus ojos mientras te concentras. Esto es lo que dará como resultado el aumento de velocidad en la lectura al reducir los movimientos del ojo al pasar cada renglón, a menos movimiento, más optimizas el tiempo y avanzarás más rápido al leer.
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