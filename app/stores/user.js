export const state = () => ({
  user: null, // Holds the currently authenticated user
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
    // Simulates login and persists user in localStorage
    commit("setUser", user);
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout({ commit }) {
    // Clears user state and removes from localStorage
    commit("clearUser");
    localStorage.removeItem("user");
  },
  initializeUser({ commit }) {
    // Initializes user state from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) commit("setUser", user);
  },
  async fetchUserById({ commit }, userId) {
    // Simulate fetching user data by ID
    const mockUsers = {
      "1": { name: "Alice", email: "alice@example.com" },
      "2": { name: "Bob", email: "bob@example.com" },
    };
    const user = mockUsers[userId] || null;
    commit("setUser", user);
    return user;
  },
};

export const getters = {
  isAuthenticated: (state) => !!state.user,
  getUser: (state) => state.user,
};
