class Forca {
    erros = 0;
    mensagemFinal = '';
    palavraSecreta = '';
    letrasEncontradas = [];
  
    constructor() {
      this.palavraSecreta = this.obterPalavraSecreta();
      this.letrasEncontradas = this.popularLetrasEncontradas(this.palavraSecreta.length);
    }
  
    obterQuantidadeErros() {
      return this.erros;
    }
  
    obterQuantidadeLetras() {
      return this.palavraSecreta.length;
    }
  
    obterPalavraParcial() {
      return this.letrasEncontradas.join('');
    }
  
    jogar(palpite) {
      let letraFoiEncontrada = false;
  
      for (let i = 0; i < this.obterQuantidadeLetras(); i++) {
        if (palpite == this.palavraSecreta[i]) {
            this.letrasEncontradas[i] = palpite;
            letraFoiEncontrada = true;
        }
      }
      
      if (letraFoiEncontrada === false)
        this.erros++;
  
      const jogadorAcertou = this.obterPalavraParcial() === this.palavraSecreta;
  
      if (jogadorAcertou)
        this.mensagemFinal = `Você acertou a palavra ${this.palavraSecreta}, parabéns!`;
  
      else if (this.jogadorPerdeu())
        this.mensagemFinal = 'Você perdeu! Tente novamente...'
  
      
      return jogadorAcertou;
    }
  
    jogadorPerdeu() {
      return this.obterQuantidadeErros() === 6;
    }
  
    obterPalavraSecreta() {
      const palavras = [
        "ABACATE", "ABACAXI", "ACEROLA", "ACAI", "ARACA", "ABACATE", "BACABA", 
        "BACURI", "BANANA", "CAJA", "CAJU", "CARAMBOLA", "CUPUACU", "GRAVIOLA", 
        "GOIABA", "JABUTICABA", "JENIPAPO", "MACA", "MANGABA", "MANGA", "MARACUJA", 
        "MURICI", "PEQUI", "PITANGA", "PITAYA", "SAPOTI", "TANGERINA", "UMBU", 
        "UVA", "UVAIA"
      ];
  
      const indiceAleatorio = Math.floor(Math.random() * palavras.length);
  
      return palavras[indiceAleatorio];
    }
  
    popularLetrasEncontradas(tamanho) {
      const letrasEncontradas = new Array(tamanho).fill('_');
  
      return letrasEncontradas;
    }
  }
  
  class TelaForca {
    pnlConteudo = document.getElementById('pnlConteudo');
    pnlJogo = document.getElementById('pnlJogo');
    pbImagemForca = document.getElementById('pbImagemForca');
    pnlPalavra = document.getElementById('pnlPalavra');
    lblDica = document.getElementById('lblDica');
    pnlTeclado = document.getElementById('pnlTeclado');
    btnReset = document.getElementById('btnReiniciar');
    jogoDaForca = null;
  
    constructor() {
      this.jogoDaForca = new Forca();
      
      this.registrarEventos();
      this.obterPalavraParcial();
      this.obterDicaPalavra();
    }
  
    registrarEventos() {
      for (let botao of this.pnlTeclado.children) {
        botao.addEventListener('click', (sender) => this.darPalpite(sender))
        botao.addEventListener('click', this.atualizarBotoesPainel.bind(this));
      }
  
      this.btnReset.addEventListener('click', () => this.reiniciarJogo());
    }
  
    reiniciarJogo() {
      this.jogoDaForca = new Forca();
  
      this.obterPalavraParcial();
  
      this.obterDicaPalavra();
  
      this.atualizarForca();
  
      this.pnlJogo.querySelector('.notificacao')?.remove();
  
      for (let botao of this.pnlJogo.children)
        botao.disabled = false;
    }
  
    atualizarBotoesPainel(event) {
      const botaoClicado = event.target;
      botaoClicado.disabled = true;
    } 
  
    darPalpite(sender) {
      const botaoClicado = sender.target;
  
      const palpite = botaoClicado.textContent[0];
  
      if (this.jogoDaForca.jogar(palpite) || this.jogoDaForca.jogadorPerdeu()) {
        this.finalizarJogo();
      }
  
      this.obterPalavraParcial();
  
      this.atualizarForca();
    }
  
    finalizarJogo() {
      const jogadorPerdeu = this.jogoDaForca.jogadorPerdeu();
  
      const lblMensagemFinal = document.createElement('p');
  
      lblMensagemFinal.classList.add('notificacao');
      lblMensagemFinal.textContent = this.jogoDaForca.mensagemFinal;
  
      if (jogadorPerdeu)
        lblMensagemFinal.classList.add('notificacao-erro');
      else
        lblMensagemFinal.classList.add('notificacao-acerto');
  
      this.pnlJogo.appendChild(lblMensagemFinal);
  
      for (let botao of this.pnlJogo.children) {
        if (botao.textContent != 'Reiniciar')
          botao.disabled = true;
      }
    }
  
    obterPalavraParcial() {
      this.pnlPalavra.replaceChildren();
  
      const palavraSecreta = this.jogoDaForca.obterPalavraParcial();
  
      for (let i = 0; i < palavraSecreta.length; i++) {
        const lblLetra = document.createElement('p');
        lblLetra.textContent = palavraSecreta[i];
  
        this.pnlPalavra.appendChild(lblLetra);
      }
    }
  
    atualizarForca() {
      const imagensForca = [
        'forca_1',
        'forca_2',
        'forca_3',
        'forca_4',
        'forca_5',
        'forca_6',
        'forca_7',
      ];
  
  
      this.pbImagemForca.src = `Imagens/${
        imagensForca[this.jogoDaForca.erros]
      }.png`;
    }
  
    obterDicaPalavra() {
      this.lblDica.textContent = `${this.jogoDaForca.obterQuantidadeLetras()} letras`;
    }
  }
  
  window.addEventListener('load', () => new TelaForca());