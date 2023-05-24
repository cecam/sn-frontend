<template>
    <div>
        <div class="pildoraActiva" 
            v-if="etiqueta.activo == 1"
            @click="$router.push(`/busqueda-etiquetas?nombre=${etiqueta.slug}&tipo=${tipo}`)">
            <p class="enlace">
                {{etiqueta.nombre}}
            </p>
        </div>
        <div class="pildoraInactiva" v-else>
            <p class="enlace">
                {{etiqueta.nombre}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['etiqueta', 'tipo']   
    }
</script>

<style scoped>
    .pildoraActiva {
        background-color: green;
        border-radius: 15px;
        cursor: pointer;
    }
    .pildoraInactiva {
        background-color: orangered;
        border-radius: 15px;
    }
    .enlace {
        text-decoration: none;
        color: white;
    }
</style>