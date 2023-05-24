<template>
    <v-container fluid class="ma-0">
        <v-row align="center" class="bloqueTitulo pa-0 mt-0">
            <v-col cols="12" md="6">
                <v-img src="/blog/apuntes_bonitos.png" contain> </v-img>
            </v-col>
            <v-col cols="12" md="6">
                <h1 class="titulo">5 tips para hacer los apuntes más bonitos</h1>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8">
                <p>
                    Todos hemos pasado por esa situación en la que intentamos hacer nuestros apuntes con la “morra de los plumones” y no hay punto de comparación. Para que tus apuntes se vean mucho más bonitos, no hay necesidad de hacer la gran cosa.
                </p>
                <p>
                    A continuación, encontrarás los 5 tips que recomendamos para comenzar a mejorar el diseño de todas tus notas escolares.
                </p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/v86nQr1kjHY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <h2>¡Es posible hacer apuntes bonitos sin lettering!</h2>
                <p>
                    Así es, no es necesaria la escritura súper extravagante o compleja de hacer. Basta con mejorar la forma de nuestra letra (en caso de diseñar tus apuntes a mano), para ello, existen una infinidad de ejercicios hechos para este punto, pero algunos aspectos que con pulirlos, tus notas mejorarán drásticamente son:
                </p>
                <ul>
                    <li>Hacer todas las letras de caja baja del mismo tamaño y las de Caja alta, más de lo mismo</li>
                    <li>Procura hacer todas las letras de la misma forma cada vez que las escribas, no importa si te sientes como aprendiendo a escribir de nuevo, no hay mejor forma de mejorar que la práctica</li>
                </ul>
                <h2>Cada cosa en su lugar</h2>
                <p>
                    Realiza una maqueta de en qué parte de la página colocarás cada cosa o tipo de información, esto te ayudará a encontrar más rápido lo que busques al releer tus apuntes viejos para estudiar o lo necesites. De igual forma ayudará a darle una percepción de orden y organización a la libreta en general.
                </p>
                <v-container>
                    <v-row align="center" justify="center" class="encabezado">
                        <p>Título</p>
                    </v-row>
                    <v-row>
                        <v-col cols="8" class="contenido">
                            <p>Contenido del apunte</p>
                        </v-col>
                        <v-col cols="4">
                            <v-row justify="center" align="center" class="tareas">
                                <p>Tareas</p>
                            </v-row>
                            <v-row justify="center" align="center" class="notas">
                                <p>Notas importantes</p>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
                <h2>Has títulos bonitos y llamativos</h2>
                <p>
                    Los títulos son la parte principal y más llamativa de tu apunte, por lo que lo más recomendable será que te llame la atención desde el principio, es decir, que con sólo pasar la página, te incite a leerlo.
                </p>
                <h2>Apoyate de hermosos dibujos para tus apuntes</h2>
                <p>
                    Muchas veces, el leer algo no nos asegura que entendamos todo a la primera, por lo tanto, te recomendamos hacer dibujos o ilustraciones dentro de tus apuntes, para que así, puedas complementar la información y esto resulte en los apuntes más bonitos que hayas visto.
                </p>
                <h2>Utiliza plumones y colores</h2>
                <p>
                    Los apuntes son única y exclusivamente para ti y para nadie más, por lo tanto, no te preocupes por la formalidad dentro de tus apuntes, usa colores para títulos y para resaltar la información que más te llame la intención (o la más importante). Esto te ayuda a encontrar el dato que buscar mucho más rápido, así, al momento de estudiar, no perderás tiempo leyendo cada parte, sino sólo lo que esté entre colores.
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
    .encabezado {
        border-radius: 5px;
        background-color: #2f2f9e;
    }
    .contenido {
        border-radius: 5px;
        background-color: #219c21;
    }
    .tareas {
        border-radius: 5px;
        background-color: #4b4bbd;
    }
    .notas {
        border-radius: 5px;
        background-color: #af2e2e;
    }
    .encabezado p, .tareas p, .notas p, .contenido p  {
        color: #e6e6e6;
        text-align: center;
    }
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