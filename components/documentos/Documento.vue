<template>
    <v-card
        class="mx-auto"
        elevation="900"
        link :to="`/apuntes/${apunte.slug}`"
    >
        <v-container fluid>
            <v-row justify="center" align="center">
                <v-col cols="3" md="3">
                    <v-avatar size="80">
                        <img
                            :src="`${apunte.user.img_perfil}`"
                            :alt="`${apunte.user.name} - SchoolNotes`"
                        >
                    </v-avatar>
                </v-col>
                <v-col cols="10" md="8">
                    <v-container fluid>
                        <v-row align="center" class="ma-0 pa-0"> 
                            <LinkAPerfil 
                                :nombre="apunte.user.name"
                                :id="apunte.user._id"
                            />
                            <hr />
                            <v-card-subtitle>
                                {{apunte.created_at | dateFormat}}
                            </v-card-subtitle>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row class="ma-0 pa-0"> 
                <h2 class="centrado">
                    {{apunte.titulo}}
                </h2>
            </v-row>
            <v-img
                v-if="apunte.img_destacada"
                :src="apunte.img_destacada"
                height="150px"
            />            
            <v-img
                v-else
                :src="apunte.user.img_perfil"
                height="150px"
            />            
        </v-container>
    </v-card>
</template>

<script>
    import moment from 'moment'
    moment.locale('es')

    export default {
        props: ['apunte'],
        filters: {
            dateFormat(value) {
            if (!value) return ''
                let newFecha= moment(value).fromNow();
                return newFecha
            },
              
        },
        
    }
</script>

<style>
    .centrado {
        text-align: center;
    }
</style>