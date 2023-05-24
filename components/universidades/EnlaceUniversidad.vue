<template>
    <v-container>
        <v-row justify="center">
            <p class="titulo">
                Universidad:
            </p>
        </v-row>
        <v-row justify="center">
            <p class="nombre">{{universidad.nombre}}</p>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ['universidad']
}
</script>

<style scoped>
    .titulo {
        color: rgb(192, 192, 192);
        font-weight: 700;
    }
    .nombre {
        text-align: center;
        text-decoration: none;
        color: rgb(192, 192, 192);
    }
</style>