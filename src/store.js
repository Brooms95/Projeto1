import { createStore } from 'vuex';
import { db } from './main';
import { collection, getDocs } from 'firebase/firestore';

export default createStore({
  state: {
    books: [],
    favoriteBooks: [],
    user: null,
  },
  mutations: {
    addBooks(state, books) {
      state.books = books;
    },
    addFavorite(state, book) { 
      if (!state.favoriteBooks.some(favBook => favBook.id === book.id)) {
        state.favoriteBooks.push(book);
      }
    },
    removeFavorite(state, book) {
      state.favoriteBooks = state.favoriteBooks.filter(favBook => favBook.id !== book.id);
    },
    setFavoriteBooks(state, books) {
      state.favoriteBooks = books;
    }
  },
  actions: {
    async fetchFavoriteBooks({ commit }) {
      const querySnapshot = await getDocs(collection(db, 'favorites'));
      const books = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      commit('setFavoriteBooks', books);
    },
    async fetchUser({ commit }, user) {
      commit('setUser', user);
    }
  },
  getters: {
    favoriteBooks: (state) => state.favoriteBooks,
    user: (state) => state.user,
  },
  modules: {}
});