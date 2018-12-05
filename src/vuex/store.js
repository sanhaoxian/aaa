import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/** 面包屑的状态储存 **/
const state = {
	roomHide: false,
	currentRoom: '',
	path: "总览",
    addressHide: true,
    softwareInfo: false
}

/** 面包屑的变更 **/
const mutations = {
	roomHide(state, status) {
		state.roomHide = status
	},
	currentRoom(state, room) {
		state.currentRoom = room
	},
	path(state, path){
		state.path = path
    },
    visible_softwareInfo(state, change) {
        state.softwareInfo = change
    }
}

export default new Vuex.Store({
	state,
	mutations
})