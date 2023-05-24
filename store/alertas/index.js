export const state =()=>({
    data : {
      color : '',
      snackbar : false,
      data : ''
    }
  })
  
  export const mutations={
  
    SET_DATA:(state, data)=>{
      state.data=data
    }
  }
  
  export const actions={
    GET_DATA({commit},data){
      commit('SET_DATA', data)
    }
  }
  