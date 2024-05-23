<template>
  <div>
    <div v-for="(categoryBooks, category) in categorizedBooks" :key="category" class="category-box">
      <h2>{{ category }}</h2>
      <div class="book-grid">
        <div v-for="(book, index) in categoryBooks" :key="index" class="book-item">
          <img :src="getThumbnail(book)" alt="Capa do livro" class="book-image" loading="lazy" />
          <h3>{{ getTitle(book) }}</h3>
          <p>Preço: {{ getPrice(book) }}</p>
          <button :disabled="!priceAvailable(book)" @click="toggleFavorite(book)" class="fas fa-heart">
            {{ isFavorite(book) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos' }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading">Carregando...</div>
    <div v-if="error" class="error">{{ error }} 
      <Erro />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Erro from './Erro.vue';

export default {
  name: 'HomeId',
  components: {
    Erro
  },
  data() {
    return {
      randomBooks: [],
      loading: false,
      error: '',
    };
  },
  computed: {
    categorizedBooks() {
      const categories = {
        Computers: [],
        'Business & Economics': [],
        Fiction: [],
        Science: [],
      };
      this.randomBooks.forEach(book => {
        const category = book.volumeInfo.categories ? book.volumeInfo.categories[0] : null;
        if (category && category in categories) {
          categories[category].push(book);
        }
      });
      return categories;
    },
    ...mapState(['favoriteBooks']),
  },
  mounted() {
    this.fetchRandomBooks();
  },
  methods: {
    async fetchRandomBooks() {
      this.loading = true;
      this.error = '';

      const genres = ['Computers', 'Science', 'Business & Economics', 'Fiction'];

      try {
        const promises = genres.map(async genre => {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=40`);
          const data = await response.json();
          return data.items ? data.items.filter(item => {
            return typeof item === 'object' && 'id' in item && item.volumeInfo.categories && item.volumeInfo.categories.some(category => category === genre) && this.priceAvailable(item);
          }) : [];
        });
        const results = await Promise.all(promises);
        this.randomBooks = results.flat();
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        this.error = 'Ocorreu um erro ao carregar os livros. Por favor, tente novamente mais tarde.';
      } finally {   
        this.loading = false;
      }
    },

    getThumbnail(book) {
      return book.volumeInfo.imageLinks?.thumbnail;
    },
    getTitle(book) {
      return book.volumeInfo.title ;
    },
    priceAvailable(book) {
      return book.saleInfo && book.saleInfo.listPrice && book.saleInfo.listPrice.amount;
    },
    getPrice(book) {
      return this.priceAvailable(book) ? `$${book.saleInfo.listPrice.amount}` : 'Esgotado';
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
    }
  }
};
</script>

<style>
.category-box {
  padding: 30px;
}

.book-grid {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  background-color: rgb(241, 240, 238);
}

.book-item {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.book-image {
  max-width: 100px;
  height: auto;
}

.book-item h3 {
  margin-top: 5px;
}

.book-item button {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.book-item button:hover {
  background-color: #0056b3;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>