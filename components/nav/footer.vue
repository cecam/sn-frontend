<template>
    <div>
        <v-footer
            :absolute="!fixed"
            app
            color="#464646"
            dark
        >
            <v-container>
                <v-row>
                    <v-col sm="12" md="8">
                        <strong>
                            <span>Derechos Reservados SchoolNotes | &copy; {{ new Date().getFullYear() }}</span>
                        </strong>
                        | "Cualquiera Puede Ser Un Genio"
                    </v-col>
                    <v-col sm="12" md="4">
                        <v-btn icon target="_blank"  href="https://www.facebook.com/SchoolNotes1119/"><v-icon>mdi-facebook</v-icon></v-btn>
                        <v-btn icon target="_blank" href="https://www.instagram.com/schoolnotes1119/"><v-icon>mdi-instagram</v-icon></v-btn>
                        <v-btn icon target="_blank" href="https://twitter.com/SchoolNotes2"><v-icon>mdi-twitter</v-icon></v-btn>
                        <v-btn icon target="_blank" :href='`mailto:schoolnotes.info@gmail.com?subject=${mensaje_gmail}`'><v-icon>mdi-gmail</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mensaje_gmail:'Hola SchoolNotes ',
        }
    },
}
</script>