<template>
  <nav class="navbar">
    <ul class="nav-link">
      <li><router-link to="/">Livros</router-link></li>
    </ul>
    <ul class="search-bar">
      <li>
        <div>
          <form @submit.prevent="submitSearch">
            <input type="text" v-model="searchQuery" @input="searchBooks" placeholder="Pesquisar livros">
            <button type="submit" @input="searchBooks">Pesquisar</button>
          </form>
        </div>
      </li>
    </ul>
    <ul class="nav-links">
      <li><router-link to="/favoritos" aria-label="Ir para os favoritos"><i class="fas fa-heart"></i></router-link></li>
      <li><router-link to="/login" aria-label="Faça login"><i class="fas fa-sign-in-alt"></i></router-link></li>
    </ul>    
  </nav>
</template>

<script>
import store from '@/store';

export default {
  data() {
    return {
      searchQuery: '',
      displayedBooks: [],
    };
  },
  methods: {
    submitSearch() {
      if (this.searchQuery.trim() !== '') {
        this.$router.push({ name: 'search', query: { q: this.searchQuery } });
      }
    },
    async searchBooks() {
      if (!this.searchQuery.trim()) {
        this.displayedBooks = [];
        return;
      }

      this.loading = true;
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.searchQuery}`); 
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          this.displayedBooks = data.items.map(item => ({
            title: item.volumeInfo.title,
            image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
            price: item.saleInfo && item.saleInfo.listPrice ? item.saleInfo.listPrice.amount : null
          }));
          store.commit("addBooks", this.displayedBooks);
        } else {
          this.displayedBooks = [];
          this.error = 'Nenhum livro encontrado.';
        }
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        this.error = 'Erro ao buscar livros.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #bfb224;
  padding: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.nav-links, .nav-link {
  list-style: none;
  display: flex;
}

.nav-links li, .nav-link li {
  margin-right: 10px;
}

.nav-links li a, .nav-link li a {
  color: white;
  text-decoration: none;
}

.nav-links li a:hover, .nav-link li a:hover {
  text-decoration: underline;
}

.search-bar input {
  width: 300px; 
  padding: 10px; 
  font-size: 16px;
  border: none;
  border-radius: 5px;
}

.search-bar button {
  margin-left: 10px; 
  padding: 10px 20px; 
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.search-bar {
  list-style: none;
}
</style>