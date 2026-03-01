export const state = () => ({
  authUser: null
})

export const getters = {
  isLoggedIn: state => !!state.authUser
}

export const actions = {
  async onAuthStateChanged({ commit }, { authUser, claims }) {
    if (!authUser) {
      commit('RESET_STORE')
      return;
    }
    commit('SET_USER', { authUser, claims })
  }
}

export const mutations = {
  RESET_STORE(state) {
    state.authUser = null
  },
  SET_USER(state, { authUser, claims }) {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName,
      photoURL: authUser.photoURL,
    }
  }
}
