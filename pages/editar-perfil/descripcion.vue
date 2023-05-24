<template>
<v-main>
    <v-container>
        <v-row>
            <v-col sm="12" md="12">
                <EditarDescripcion />
            </v-col>
        </v-row>
    </v-container>
</v-main>
</template>

<script>
    import EditarDescripcion from '@/components/perfil/EditarDescripcion'

    export default {
        layout: 'login',
        components: {
            EditarDescripcion,
        },
        head() {
            return {
                titleTemplate: `SN - Editar descripción`
            }
        },
    }
</script>