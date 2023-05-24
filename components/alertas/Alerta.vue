<template>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="alerta.color"
      bottom
    >
      {{ alerta.data }}
    </v-snackbar>
</template>

<script>
	export default {
	    data () {
	      return {
	      	timeout: 5000
	      }
	    },
	    computed:{
	    	snackbar:{
	    		get(){
	    			return this.$store.state.alertas.data.snackbar
	    		},
	    		set(newVal){
	    			const data = {
					    color : '',
					    snackbar : newVal,
					    data : ''
					}
				   this.$store.dispatch('alertas/GET_DATA', data);
	    		}
	    	},
	    	alerta(){
	    			return this.$store.state.alertas.data
	    	}
	    }
	}
</script>
