<template>
    <v-container fluid class="ma-0">
        <v-row align="center" class="bloqueTitulo pa-0 mt-0">
            <v-col cols="12" md="6">
                <v-img src="/blog/apuntes_digitales.png" contain> </v-img>
            </v-col>
            <v-col cols="12" md="6">
                <h1 class="titulo">La mejor forma de hacer tus apuntes digitales</h1>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8">
                <p>
                    Con el pasar de los años, ha habido una transición de apuntes hechos a mano a tomar todas las notas escolares de forma digital; este efecto se ha visto acelerado gracias a la pandemia que se ha vivido desde marzo de este mismo año.
                </p> 
                <p>
                    Pero siendo honestos, ¿no has sentido una limitante al momento de diseñar tus apuntes o que no quedan tan bien como podrían haber quedado?. En este post te mostraremos algunas formas de romper con los apuntes monótonos y resaltar de entre todos.
                </p>
                <h2>¡Busca fuentes de inspiración en apuntes de pinterest!</h2>
                <p>
                    Bien se dice que no hay nada realmente original, todo nace de la inspiración tomada de muchos lugares, y vaya que pinterest es una gran fuente de inspiración. Basta con hacer una búsqueda rápida para encontrar una variedad increíble de apuntes. 
                </p>
                <h2>Apps para hacer apuntes bonitos completamente gratis</h2>
                <h3>Word</h3>
                <p>
                    Ok, está bien, word no es para nada gratuito, pero es el editor de texto más común actualmente; aunque también  es mucho más que sólo texto plano para tus trabajos en formato APA, Windows Office nos ofrece una infinidad de opciones al momento de dar formato a nuestras notas.
                </p>
                <p>
                    Dentro de word, podrás hacer cosas como cambiar el fondo, poner imágenes sin fondo, establecer una profundidad y demás… Pero, ¿para distraerte leyendo lo que puedes ver con un profesional?                
                </p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/k49XgRX6Xy8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <h3>Google docs</h3>
                <p>
                    Sin duda alguna, una excelente opción para hacer apuntes hermosos es Google docs, tiene funciones muy similares, por no decir iguales, a Word Office e incluso integra algunas funcionalidades completamente únicas. No lo dejaremos a la imaginación, te dejamos otro increíble ejemplo de lo que puede ser:
                </p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/-S_CAQVjPwg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <h3>FiiNote</h3>
                <p>
                    Para terminar, una aplicación móvil, FiiNote es una especie de editor de texto estilo word, que te permitirá tomar notas rápidas desde tu celular, permitiéndole combinar escritura a mano, escritura con teclado, notas de voz, cámara, garabatos y más.
                </p>
                <p>
                    Además de todo esto, cuenta con funcionalidades increíbles como:
                </p>
                <ul>
                    <li>Libertad</li>
                    <li>Seguridad</li>
                    <li>Fácil uso</li>
                    <li>Privado</li>
                </ul>
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