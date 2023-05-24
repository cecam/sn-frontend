<template>
    <v-card
        class="mx-auto"
        elevation="900"
        link :to="`/apuntes/${apunte.slug}`"
    >
        <v-img
            v-if="apunte.img_destacada"
            :src="apunte.img_destacada"
            height="150px"
        >
            <v-container fluid>
                <v-row justify="center">
                    <h2>{{apunte.titulo}}</h2>
                </v-row>
            </v-container>
        </v-img>            
        <v-img
            v-else
            :src="apunte.user.img_perfil"
            height="150px"
        >
            <v-container fluid>
                <v-row justify="center" align="end">
                    <h2>{{apunte.titulo}}</h2>
                </v-row>
            </v-container>
        </v-img> 
    </v-card>
</template>

<script>
export default {
    props: ['apunte']
}
</script>

<style scoped>
    h2 {
        font-size: 26px;
        font-weight: 800;
        color: #00cba0;
    }
</style>