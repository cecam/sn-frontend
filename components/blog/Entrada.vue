<template>
    <v-card elevation="400"
        link :to="`/blog/${string_to_slug(entrada.titulo)}`"
    > 
        <v-container fluid>
            <v-row align="center" justify="center">
                <h3>{{entrada.titulo}}</h3>
            </v-row>
            <v-row>
                <v-img
                    :src="entrada.img"
                    contain
                ></v-img>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        props: ['entrada'],
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

<style scoped>
    h3{
        text-align: center;
        font-size: 16px;
    }
</style>