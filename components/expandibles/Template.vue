<template>
    <v-expansion-panels focusable v-model="expandible">
        <v-expansion-panel 
            v-if="visible"
        >
            <v-expansion-panel-header>
                ¡Bienvenido!
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <h1>¡Bienvenido!</h1><br>
                    Muchas gracias por usar SchoolNotes en su primera versión. <br>
                    Dentro de la sección de <a href="/mis-guardados">mis guardados</a> encontrarás un documento de bienvenida y explicando cómo funciona todo por aquí.<br>
                    No olvides que esto es una comunidad, por lo tanto, para mantenerla viva no olvides:
                    <ul>
                        <li>¡Aportar tus documentos! - será como compartir tu libreta con cualquier estudiante de cualquier universidad</li>
                        <li>Responde preguntas - No hay mejor forma de conocer a gente de tu ramo que ayudando a los que les interesa un tema  relacionado al tuyo</li>
                        <li>Motívate y motiva a los demás, la forma más eficiente de aprender es mientras lo disfrutas</li>
                    </ul>
                    <br>
                    <p>Es importante que completes tu perfil para tener la experiencia de SchoolNotes completa</p>
                    <p class="discord">
                        Entra en nuestra
                        <a href="https://discord.gg/4saEfTNYBZ"> comunidad de Discord</a>
                        para entrarte de las actualizaciones y hablar con el equipo directamente
                    </p>
                    <br>
                    El equipo de SchoolNotes te agradece que estes usando la pataforma 🥳 <br>
                    <br> 
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="Date.parse(fecha_novedad) <= Date.parse(fecha_desaparece)">
            <v-expansion-panel-header>
                <strong> Hola {{$auth.user.name}}, Estas son las Novedades del {{fecha_novedad | dateFormat}}</strong> 
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Hemos agregado una nuevas funciones, esperemos te gusten:
                <v-row align="center" justify="center">
                    <ul>
                        <li>Hemos agregado una nueva funcion para poder organizar tus apuntes, Puedes crear portafolios</li>
                        <li><a href="/portafolios/crear">¡Crea portafolios!</a>, <a href="/portafolios/guardados">¡Mira tus portafolios guardados!</a>.</li>
                        <li><a href="/busqueda?nombre=&tipo=portafolios">¡Busca portafolios!</a>.</li>
                        <li>Se ha removido la fecha de cumpleaños en los perfiles.</li>
                        <li>Se ha modificado el pie de pagina, ¡Encuentra nuestras redes sociales más facil!.</li>
                    </ul>
                </v-row>
                <br>
                Sin mas que decir Feliz Navidad y Año Nuevo.
                <br>
                <p class="discord">
                    Para cualquier error, mejoras, sugerencias, etc. Entre al servidor de 
                    <a href="https://discord.gg/4saEfTNYBZ" target="_blank">Discord</a>
                    para entrarte de las actualizaciones y hablar con el equipo directamente
                </p>
                <br>
                Estas novedades dejaran de aparecer el <strong>{{fecha_desaparece | dateFormat}}</strong>
            </v-expansion-panel-content>
        </v-expansion-panel>
  </v-expansion-panels>

</template>

<script>
    import moment from 'moment'
    moment.locale('es')
    export default {
        data() {
            return {
                expandible: null,
                visible: false,

                //Novedades
                fecha_novedad: '12/31/2020',
                fecha_desaparece: '01/10/2021',
                visible_novedades: false,
                expandible_novedades: null,
            }
        },
        mounted(){
            if(!this.$auth.user.descripcion_perfil || !this.$auth.user.universidad_id  || !this.$auth.user.carrera_id ) {
                this.visible = true
                this.expandible = 1
            }
        },
        filters: {
            dateFormat(value) {
                console.log(value);
                if (!value) return ''
                return moment(value).format('D [de] MMMM [del] YYYY');
            },
              
        },
    }
</script>