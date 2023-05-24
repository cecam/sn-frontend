<template>
<v-main>
    <v-container>
        <v-card>
            <v-row>
                <v-col sm="12" md="3">
                    <EditarFoto />
                </v-col>
                <v-col sm="12" md="9">
                    <EditarPerfil />
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</v-main>
</template>

<script>
    import EditarPerfil from '@/components/perfil/EditarPerfil'
    import EditarFoto from '@/components/perfil/EditarFoto'

    export default {
        layout: 'login',
        components: {
            EditarPerfil,
            EditarFoto,
        },
        head() {
            return {
                titleTemplate: `SN - Editar perfil`
            }
        },
    }
</script>