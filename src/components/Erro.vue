
<template>
    <div class="not-found">
      <h1>Página Não Encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <div><iframe src="https://gifer.com/embed/7iJU" width=480 height=360.000 frameBorder="0" allowFullScreen></iframe></div>
      <router-link to="/" class="back-button">
        Voltar para a Página Inicial
      </router-link>
    </div>

  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
    padding: 15px;
  }
  
  .back-button {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #42b983;
    border: none;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
  }
  
  .back-button:hover {
    background-color: #339f70;
  }


  </style>
  
  
  