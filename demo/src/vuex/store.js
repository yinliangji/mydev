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


const module_testAdd = {
	namespaced: true,
	state:{
		data:false,
	},
	mutations:{
	    increment (state,payload) {
	        state.data = payload.Msg;
	    }
	},
	getters:{
		getFn:state=>{return state.data},
		getFn1:state=>{return state.data},
		getFns:(state, getters) => {return getters},

	},
	actions:{
		incrementAsync (context,{msg}) {
			context.commit({type: 'increment',Msg:msg})
		}
	},
}


const module_loginSave = {
	namespaced: true,
	state:{
		logged:false,
	},
	mutations:{
	    increment (state,payload) {
	        state.logged = payload.Msg;
	    }
	},
	getters:{
		getFn:state=>{return state.logged},
		getFn1:state=>{return state.logged},
		getFns:(state, getters) => {return getters},

	},
	actions:{
		incrementAsync (context,{isLogin}) {
			context.commit({type: 'increment',Msg:isLogin})
		}
	},
}

const module_EMIT = {
	namespaced: true,
	state:{
		emit:false,
	},
	mutations:{
	    increment (state,payload) {
	        state.emit = payload.Msg;
	    }
	},
	getters:{
		getFn:state=>{return state.emit},
		getFn1:state=>{return state.emit},
		getFns:(state, getters) => {return getters},

	},
	actions:{
		incrementAsync (context,{isEmit}) {
			context.commit({type: 'increment',Msg:isEmit})
		}
	},
}

export default new Vuex.Store({
	modules: {
	    IS_LOADING:module_globalLoading,
	    IS_PAGELOADING:module_pageLoading,
	    ADD_DATA_TEST:module_testAdd,
	    LOGIN_SAVE:module_loginSave,
	    EVENT_EMIT:module_EMIT,
  	}
});