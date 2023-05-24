<template>
    <div>
        <v-list subheader>
        <v-subheader><strong>{{usuario.name}} sigue a {{usuario.seguidos.length}} personas</strong></v-subheader>
        <v-list-item
            v-for="seguidor in seguidos"
            :key="seguidor.name"
        >
            <v-list-item-avatar>
            <v-img
                :alt="`${seguidor.name} - SchoolNotes`"
                :src="seguidor.img_perfil"
            />
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title>
              <LinkAPerfil :nombre="seguidor.name" :id="seguidor._id" />
            </v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon v-if="$auth.user._id != seguidor._id">
                <BotonSeguir 
                    :usuario="seguidor" 
                />
            </v-list-item-icon>
            <v-list-item-icon v-else>
                <b><i>Tú</i></b>
            </v-list-item-icon>
        </v-list-item>
        <center>
            <small>
                <v-btn outlined color="green" @click="getSeguidos()" :disabled="usuario.seguidos.length == seguidosData.to || seguidos.length == 0" :loading="loading">
                    Ver más...
                </v-btn>
            </small>
        </center>
        </v-list>
    </div>
</template>
<script>
import BotonSeguir from '@/components/perfil/BotonSeguir'
import LinkAPerfil from '@/components/usuario/LinkAPerfil'
export default {
    components: {
        BotonSeguir,
        LinkAPerfil
    },
    props: ['usuario'],
    data(){
        return{
            loading: false,
            seguidos: [],
            seguidosData: [],
            page: 0,
        }
    },
    mounted(){
        this.page = 1;
        this.getSeguidos();
    },
    methods: {
        async getSeguidos(){
            this.loading = true;
            let url = `yo-sigo/${this.usuario._id}?page=${this.page}`
            try{
                const {data} = await this.$axios.get(url)
                console.log(data.data)
                this.seguidos = this.seguidos.concat(data.data.data);
                this.seguidosData = data.data;
                this.page = this.page + 1;
            }catch(e){
                console.log(e)
            }
            this.loading = false;
        }
    }
}
</script>