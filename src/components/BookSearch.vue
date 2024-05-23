<template>
  <div class="container">
    <div v-if="loading">Carregando...</div>
    <div v-else>
      <div v-if="displayedBooks.length > 0" class="book-container">
        <div class="book" v-for="book in displayedBooks" :key="book.id">
          <img :src="getThumbnail(book)" alt="Capa do livro" class="book-image" loading="lazy" />
          <div>
            <h3>{{ book.title }}</h3>
            <p> Preço: {{ getPrice(book) }}</p>
            <button :disabled="!priceAvailable(book)" @click="toggleFavorite(book)" class="fas fa-heart" >
              {{ isFavorite(book) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos' }}
            </button>
          </div>
        </div>
      </div>
      <div v-else class="no-books">Nenhum livro encontrado.
        <Erro />
      </div>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Erro from './Erro.vue';

export default {
  components: {
    Erro
  },
  data() {
    return {
      displayedBooks: [],
      loading: false,
      error: null,
      searchQuery: ''
    };
  },
  computed: {
    ...mapState(['books', 'favoriteBooks'])
  },
  mounted() {
    this.displayedBooks = this.books;
  },
  methods: {
    async searchBooks() {
      if (!this.searchQuery.trim()) {
        this.displayedBooks = [];
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.searchQuery}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          this.displayedBooks = data.items.map(item => ({
            title: item.volumeInfo?.title || 'Título indisponível',
            image: item.volumeInfo?.imageLinks?.thumbnail || '',
            price: item.saleInfo?.listPrice?.amount || null
          }));
          this.$store.commit('addBooks', this.displayedBooks);
        } else {
          this.displayedBooks = [];
          this.error = 'Nenhum livro encontrado.';
        }
      } catch (err) {
        console.error('Erro ao buscar livros:', err);
        this.error = 'Erro ao buscar livros.';
      } finally {
        this.loading = false;
      }
    },
    priceAvailable(book) {
      return typeof book.price === 'number' && !isNaN(book.price);
    },
    getPrice(book) {
      return this.priceAvailable(book) ? `${book.price.toFixed(2)}` : 'Esgotado';
    },
    getThumbnail(book) {
      return book.image || 'default-thumbnail.jpg';
    },
    ...mapMutations(['addFavorite', 'removeFavorite']),
    isFavorite(book) {
      return this.favoriteBooks.some(favBook => favBook.id === book.id);
    },
    toggleFavorite(book) {
      if (this.isFavorite(book)) {
        this.removeFavorite(book);
      } else {
        this.addFavorite(book);
      }
    },
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-bar {
  width: 100%;
  margin-bottom: 20px;
}

.book-container {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  background-color: rgb(241, 240, 238);
}

.book {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.book button {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.book button:hover {
  background-color: #0056b3;
}

.no-books,
.error-message {
  margin-top: 10px;
  color: red;
}
</style>