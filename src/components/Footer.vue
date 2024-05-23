<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section about">
            <h2 class="logo">Projeto 1</h2>
            <p>
              Um site dedicado aos amantes de livros, onde você pode descobrir, ler e compartilhar suas histórias favoritas.
            </p>
            <div class="contact">
              <span><i class="fas fa-envelope"></i> contato@projeto1.com</span>
            </div>
            <div class="socials">
              <a href="/"><i class="fab fa-facebook"></i></a>
              <a href="/"><i class="fab fa-twitter"></i></a>
              <a href="/"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
          <div class="footer-section links">
            <h2>Links Úteis</h2>
            <ul>
              <li><a href="/">Sobre Nós</a></li>
              <li><a href="/">Livros</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/favoritos">Favorito</a></li>
            </ul>
          </div>
          <div class="footer-section contact-form">
            <h2>Entre em Contato</h2>
            <form>
              <input type="email" name="email" class="text-input contact-input" placeholder="Seu Email">
              <textarea name="message" class="text-input contact-input" placeholder="Sua Mensagem"></textarea>
              <button type="submit" class="btn btn-primary">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2024 Projeto 1. Todos os direitos reservados.
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterInt',
  }
  </script>
  
  <style lang="scss">
  .footer {
    background-color: #bfb224;
    color: #fff;
    padding: 0 30px;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .footer-section {
    flex: 1;
    margin: 0 50px;
  }
  
  .about {
    max-width: 300px;
  }
  
  .links ul {
    list-style: none;
    padding: 0;
  }
  
  .links ul li {
    margin-bottom: 10px;
    margin: 20px;
  }
  
  .contact-form form {
    display: flex;
    flex-direction: column;
    margin: 20px;
  }
  
  .contact-input {
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #4caf50;
    color: #fff;
  }
  
  .socials a {
    color: #fff;
    margin-right: 10px;
    font-size: 24px;
  }

  .fas  {
    margin: 20px;
  }
  </style>
  