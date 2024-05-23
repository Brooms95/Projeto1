<template>
  <div id="app">
    <NavBar @search="searchBooks" />
    <router-view :books="displayedBooks" />
    <Footer />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      displayedBooks: [],
      loading: false,
      error: ''
    };
  },
  methods: {
    async searchBooks() {
      this.loading = true;
      this.error = '';
    },
  }
}

</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  font-size: 20px;
}


.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.main-content {
  display: flex;
}

body {
  margin: auto;
}

#content {
  margin: 50px;
}
</style>