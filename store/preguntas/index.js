export const state = () => ({
    misPreguntas : [],
    paginaMisPreguntas: 0,
    sinRespuesta : [],
    paginaSinRespuesta: 0,
    sinVerificar : [],
    paginaSinVerificar : 0,
    verificadas : [],
    paginaVerificadas : 0,
    paginacionPosible : {
        misPreguntas : false,
        sinRespuesta : false,
        sinVerificar : false,
        verificadas : false
    }
})

export const mutations = {
    FIN_PAGINACION:(state, puntero)=>{
        switch(puntero) {
            case 'mis_preguntas':
                state.paginacionPosible.misPreguntas = true
                break
            case 'sin_responder':
                state.paginacionPosible.sinRespuesta = true
                break
            case 'sin_verificar':
                state.paginacionPosible.sinVerificar = true
                break
            case 'verificadas':
                state.paginacionPosible.verificadas = true
                break
        } 
    },
    SET_MIS_PRIMERAS_PREGUNTAS:(state, data)=>{
        state.misPreguntas=data;
        state.paginaMisPreguntas = 2
    },
    SET_MIS_PREGUNTAS_PAGINACION:(state, data)=>{
        state.misPreguntas= state.misPreguntas.concat(data)
        state.paginaMisPreguntas = state.paginaMisPreguntas + 1
    },
    SET_PRIMERAS_PREGUNTAS_SIN_RESPUESTA:(state, data)=>{
        state.sinRespuesta=data;
        state.paginaSinRespuesta = 2
    },
    SET_PREGUNTAS_SIN_RESPUESTA_PAGINACION:(state, data)=>{
        state.sinRespuesta = state.sinRespuesta.concat(data)
        state.paginaSinRespuesta = state.paginaSinRespuesta + 1
    },
    SET_PRIMERAS_PREGUNTAS_SIN_VERIFICAR:(state, data)=>{
        state.sinVerificar=data;
        state.paginaSinVerificar = 2
    },
    SET_PREGUNTAS_SIN_VERIFICAR_PAGINACION:(state, data)=>{
        state.sinVerificar = state.sinVerificar.concat(data)
        state.paginaSinVerificar = state.paginaSinVerificar + 1
    },
    SET_PRIMERAS_PREGUNTAS_VERIFICADAS:(state, data)=>{
        state.verificadas=data;
        state.paginaVerificadas = 2
    },
    SET_PREGUNTAS_VERIFICADAS_PAGINACION:(state, data)=>{
        state.verificadas = state.verificadas.concat(data)
        state.paginaVerificadas = state.paginaVerificadas + 1
    },
}

export const actions = {
    async GET_MIS_PRIMERAS_PREGUNTAS ({ commit }, user) {
        const { data } = await this.$axios.get(`preguntas?user_id=${user}&page=1&opc=mis_preguntas`)
        if(data.data.data.length == 0) {
            commit('FIN_PAGINACION', 'mis_preguntas')
        } else {
            commit('SET_MIS_PRIMERAS_PREGUNTAS', data.data.data)
        }
    },
    async GET_MIS_PREGUNTAS_PAGINACION ({ commit }, consulta) {
        const { data } = await this.$axios.get(`preguntas?user_id=${consulta.usuario}&page=${consulta.pagina}&opc=mis_preguntas`)
        if(data.data.data.length == 0) {
            commit('FIN_PAGINACION', 'mis_preguntas')
        } else {
            commit('SET_MIS_PREGUNTAS_PAGINACION', data.data.data)
        }
    },
    async GET_PRIMERAS_PREGUNTAS_SIN_RESPUESTA ({ commit }) {
        const { data } = await this.$axios.get(`preguntas?page=1&opc=sin_responder`)
        if(data.data.data.length == 0) {
            commit('FIN_PAGINACION', 'sin_responder')
        } else {
            commit('SET_PRIMERAS_PREGUNTAS_SIN_RESPUESTA', data.data.data)
        }
    },
    async GET_PREGUNTAS_SIN_RESPUESTA_PAGINACION ({ commit }, consulta) {
        const { data } = await this.$axios.get(`preguntas?page=${consulta.pagina}&opc=sin_responder`)
        if(data.data.data.length == 0) {
            commit('FIN_PAGINACION', 'sin_responder')
        } else {
            commit('SET_PREGUNTAS_SIN_RESPUESTA_PAGINACION', data.data.data)
        }
    },
    async GET_PRIMERAS_PREGUNTAS_SIN_VERIFICAR ({ commit }) {
        const { data } = await this.$axios.get(`preguntas?page=1&opc=sin_verificar`)
        if(data.data.data.length == 0) {
            commit('FIN_PAGINACION', 'sin_verificar')
        } else {
            commit('SET_PRIMERAS_PREGUNTAS_SIN_VERIFICAR', data.data.data)
        }
    },
    async GET_PREGUNTAS_SIN_VERIFICAR_PAGINACION ({ commit }, consulta) {
        const { data } = await this.$axios.get(`preguntas?page=${consulta.pagina}&opc=sin_verificar`)
        if(data.data.data.length == 0) {
            commit('FIN_PAGINACION', 'sin_verificar')
        } else {
            commit('SET_PREGUNTAS_SIN_VERIFICAR_PAGINACION', data.data.data)
        }
    },
    async GET_PRIMERAS_PREGUNTAS_VERIFICADAS ({ commit }) {
        const { data } = await this.$axios.get(`preguntas?page=1&opc=verificadas`)
        if(data.data.data.length == 0) {
            commit('FIN_PAGINACION', 'verificadas')
        } else {
            commit('SET_PRIMERAS_PREGUNTAS_VERIFICADAS', data.data.data)
        }
    },
    async GET_PREGUNTAS_VERIFICADAS_PAGINACION ({ commit }, consulta) {
        const { data } = await this.$axios.get(`preguntas?page=${consulta.pagina}&opc=verificadas`)
        if(data.data.data.length == 0) {
            commit('FIN_PAGINACION', 'verificadas')
        } else {
            commit('SET_PREGUNTAS_VERIFICADAS_PAGINACION', data.data.data)
        }
    },
}