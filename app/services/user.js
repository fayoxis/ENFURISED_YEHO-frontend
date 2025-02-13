export const state = () => ({
    user: null, // User state
  });
  
  export const mutations = {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  };
  
  export const actions = {
    login({ commit }, user) {
      // Simulate user login
      commit("setUser", user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout({ commit }) {
      commit("clearUser");
      localStorage.removeItem("user");
    },
    initializeUser({ commit }) {
      const user = localStorage.getItem("user");
      if (user) {
        commit("setUser", JSON.parse(user));
      }
    },
  };
  
  export const getters = {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  };
  
  