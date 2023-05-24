<template>
    <v-card 
        class="mx-auto" 
        elevation="300" 
        max-width="480"
        link :to="`/${string_to_slug(usuario.name)}?id=${usuario._id}`"
    > 
        <v-container fluid> 
            <v-row align="center" justify="center" class="ma-0 pa-0"> 
                <p class="nombre">{{usuario.name}}</p>
            </v-row>
            <v-row align="center" justify="center" class="ma-0 pa-0" v-if="usuario.carrera">
                <p class="carrera">
                    {{usuario.carrera.nombre}}
                </p>
            </v-row>
        </v-container>
        <v-img :src="usuario.img_perfil" height="100px" /> 
    </v-card>
</template>

<script>
export default {
    props: ['usuario'],
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
    .nombre {
        text-align: center;
        font-size: 25px;
        font-weight: 600;
    }
    .carrera {
        text-align: center;
        font-size: 14px;
        color: #8d8d8d;
    }
</style>