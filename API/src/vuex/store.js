import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const module_globalLoading = {
	namespaced: true,
	state:{
		loading:false,
		message:"",
	},
	mutations:{
	    increment (state,payload) {
	        state.loading = payload.Bool;
	        state.message = payload.Msg;
	    }
	},
	getters:{
		getFn:state=>{return state.loading},
		getFn1:state=>{return state.loading},
		getFns:(state, getters) => {return getters},

	},
	actions:{
		incrementAsync (context,{isShow,msg}) {
			context.commit({type: 'increment',Bool:isShow,Msg:msg})
		}
	},
}

const module_pageLoading = {
	namespaced: true,
	state:{
		loading:false,
		message:"",
	},
	mutations:{
	    increment (state,payload) {
	        state.loading = payload.Bool;
	        state.message = payload.Msg;
	    }
	},
	getters:{
		getFn:state=>{return state.loading},
		getFn1:state=>{return state.loading},
		getFns:(state, getters) => {return getters},

	},
	actions:{
		incrementAsync (context,{isShow,msg}) {
			context.commit({type: 'increment',Bool:isShow,Msg:msg})
		}
	},
}

export default new Vuex.Store({
	modules: {
	    IS_LOADING:module_globalLoading,
	    IS_PAGELOADING:module_pageLoading,
  	}
});