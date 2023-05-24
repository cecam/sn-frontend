<template>
    <div>
        <v-list subheader>
        <v-subheader><strong> {{usuario.seguidores.length}} Seguidores</strong></v-subheader>
        <v-list-item
            v-for="seguidor in seguidores"
            :key="seguidor.name"
        >
            <v-list-item-avatar>
            <v-img
                :alt="`${seguidor.name} - SchoolNotes`"
                :src="seguidor.img_perfil"
            ></v-img>
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
                <v-btn outlined color="green" @click="getSeguidores()" :disabled="usuario.seguidores.length == seguidoresData.to || seguidores.length == 0" :loading="loading">
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
            seguidoresData: [],
            seguidores: [],
            page: 0,
        }
    },
    mounted(){
        this.page = 1;
        this.getSeguidores();
    },
    methods: {
        async getSeguidores(){
            let url = `me-siguen/${this.usuario._id}?page=${this.page}`
            try{
                const {data} = await this.$axios.get(url)
                console.log(data)
                this.seguidores = this.seguidores.concat(data.data.data);
                this.seguidoresData = data.data;
                this.page = this.page + 1;
            }catch(e){
                console.log(e)
            }
        }
    }
}
</script>