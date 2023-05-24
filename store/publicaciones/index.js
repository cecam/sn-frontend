export const state = () => ({
    publicaciones : [],
    pagina : 0,
    finConsulta : false
})

export const mutations = {
    FIN_PAGINACION:(state)=>{
        state.finConsulta = true
    },
    SET_USUARIO_PRIMERAS_PUBLICACIONES:(state, data)=>{
        state.publicaciones=data;
        state.pagina = 2
    },
    SET_USUARIO_PAGINACION_PUBLICACIONES:(state, data)=>{
        state.publicaciones = state.publicaciones.concat(data);
        state.pagina = state.pagina + 1
    },
    SET_COMENTARIOS_PUBLICACION:(state, comentario)=>{
        state.publicaciones[comentario.indice].comentarios.push(comentario)
    },
    SET_PUBLICACION_REACCIONES:(state, reaccion)=>{
        state.publicaciones[reaccion.publicacionIndice].reacciones.push(reaccion.user_id)
    },
    SET_PUBLICACION_REACCIONES_QUITAR:(state, reaccion)=>{
        let i = state.publicaciones[reaccion.publicacionIndice].reacciones.indexOf(reaccion.user_id)
        
        if( i !== -1) {
            state.publicaciones[reaccion.publicacionIndice].reacciones.splice(i , 1)
        }
    },
    SET_COMENTARIO_REACCIONES:(state, reaccion)=>{
        state.publicaciones[reaccion.publicacionIndice].comentarios[reaccion.comentarioIndice].reacciones.push(reaccion.user_id)
    },
    SET_COMENTARIO_REACCIONES_QUITAR:(state, reaccion)=>{
        let i = state.publicaciones[reaccion.publicacionIndice].comentarios[reaccion.comentarioIndice].reacciones.indexOf(reaccion.user_id)
        
        if( i !== -1) {
            state.publicaciones[reaccion.publicacionIndice].comentarios[reaccion.comentarioIndice].reacciones.splice(i , 1)
        }
    }
}

export const actions = {
    async GET_PRIMER_PUBLICACIONES ({ commit },usuario) {
        const { data } = await this.$axios.get(`publicaciones?user_id=${usuario}&page=1`)
        if(data.data.data.length == 0) {
            commit('FIN_PAGINACION')
        } else {
            commit('SET_USUARIO_PRIMERAS_PUBLICACIONES', data.data.data)
        }
    },
    async GET_PAGINACION_PUBLICACIONES ({ commit },consulta) {
        const { data } = await this.$axios.get(`publicaciones?user_id=${consulta.usuario}&page=${consulta.pagina}`)
        if(data.data.data.length == 0) {
            commit('FIN_PAGINACION')
        } else {
            commit('SET_USUARIO_PAGINACION_PUBLICACIONES', data.data.data)
        }
    },
    async GET_COMENTARIOS ({ commit }, comentario) {
         let info = {
            user_id : this.$auth.user._id,
            comentario : comentario.comentario,
            publicacion_id : comentario.publicacion_id
        }
        await this.$axios.post('comentarios', info )
        commit('SET_COMENTARIOS_PUBLICACION', comentario)
    },
    async GET_REACCIONES ({commit}, reaccion) {
        let info = {
            tipo : reaccion.tipo,
            tipo_id : reaccion.tipo_id,
            user_id : this.$auth.user._id
        }
        await this.$axios.post('reaccion' , info)
        if(reaccion.tipo === 'publicacion') {
            commit('SET_PUBLICACION_REACCIONES', reaccion)
        }else {
            commit('SET_COMENTARIO_REACCIONES', reaccion)
        }
    },
    async GET_REACCIONES_QUITAR ({commit}, reaccion) {
        let info = {
            tipo : reaccion.tipo,
            tipo_id : reaccion.tipo_id,
            user_id : this.$auth.user._id
        }
        await this.$axios.post('reaccion' , info)
        if(reaccion.tipo === 'publicacion') {
            commit('SET_PUBLICACION_REACCIONES_QUITAR', reaccion)
        }else {
            commit('SET_COMENTARIO_REACCIONES_QUITAR', reaccion)
        }
    }
}
