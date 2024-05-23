<template>
  <div class="container">
    <div>
      <div>
        <div v-if="user" class="welcome">
          <p>Bem-vindo, {{ user.email }}</p>
          <button @click="logout" class="btn btn-primary">Logout</button>
        </div>
        <div v-else>
          <LoginIN />
        </div>
      </div>
      <div>
        <h1>Favoritos</h1>
        <div v-if="!favoriteBooks || favoriteBooks.length === 0">
          <p>Nenhum livro favorito.</p>
        </div>
        <div v-else>
          <div v-for="book in favoriteBooks" :key="book.id" class="book-item">
            <img :src="getThumbnail(book)" class="book-image" loading="lazy" />
            <img :src="book.image" class="book-image" loading="lazy" />
            <p>{{ book.title }}</p>
            <p>{{ getTitle(book) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import LoginIN from './LoginIN.vue';
import { auth } from '@/main';

export default {
  name: 'FavoritosList',
  components: {
    LoginIN
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.user);
    const favoriteBooks = computed(() => store.getters.favoriteBooks);

    const getThumbnail = (book) => book.volumeInfo?.imageLinks?.thumbnail || 'default-thumbnail.jpg';
    const getTitle = (book) => book?.volumeInfo?.title;

    const fetchBooks = () => {
      if (user.value) {
        store.dispatch('fetchFavoriteBooks');
      }
    };

    onMounted(() => {
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          store.dispatch('fetchUser', authUser);
        } else {
          store.dispatch('fetchUser', null);
        }
        fetchBooks();
      });
    });

    watch(user, fetchBooks);

    const logout = async () => {
      await auth.signOut();
      store.dispatch('fetchUser', null);
    };

    return {
      user,
      favoriteBooks,
      getThumbnail,
      getTitle,
      logout,
    };
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  max-width: 400px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card-body {
  padding: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #fff;
}

.form-group {
  margin-bottom: 20px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-link {
  background-color: transparent;
  color: #007bff;
}

.text-danger {
  color: #dc3545;
}

.book-list {
  margin-bottom: 20px;
}

.book {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.cart {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.cart button {
  margin-top: 10px;
}
</style>