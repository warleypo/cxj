function destacarLinkAtual() {
  const currentPage = window.location.hash || "index.html";
  const menuItems = document.querySelectorAll(".nav-links a");

  menuItems.forEach((link) => {
    const linkPage = link.getAttribute("href");

    // Remove classe active prévia
    link.classList.remove("active");

    // Se o link corresponder à página atual, adiciona a classe active
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("hashchange", destacarLinkAtual);

document.addEventListener("DOMContentLoaded", () => {
  // 1. Alternar Menu Mobile
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  //Destacar link da página atual no Menu
  destacarLinkAtual();

  // 2. Formulário de Contato
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const contato = document.getElementById("contato").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();
      const adminEmail = "admin@email.prov.br";

      if (!nome || !contato || !mensagem) {
        formFeedback.style.color = "#dc2626";
        formFeedback.textContent = "Por favor, preencha todos os campos.";
        return;
      }

      const mailtoSubject = encodeURIComponent(
        `Contato de ${nome} - Clube de Xadrez Jaíba`,
      );
      const mailtoBody = encodeURIComponent(
        `Nome: ${nome}\n` +
          `Contato: ${contato}\n\n` +
          `Mensagem:\n${mensagem}`,
      );

      window.location.href = `mailto:${adminEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

      formFeedback.style.color = "#16a34a";
      formFeedback.textContent = "Abertura do cliente de e-mail solicitada!";
      contactForm.reset();
    });
  }

  // 3. Lógica para a Página de Notícia
  const newsTitle = document.getElementById("newsTitle");
  if (newsTitle) {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get("id");

    const newsData = {
      1: {
        title: "Inscrições Abertas para o Torneio Regional de Jaíba",
        date: "Julho de 2026",
        content: `
                    <p>É com grande alegria que o <strong>Clube de Xadrez Jaíba</strong> anuncia a abertura das inscrições para o Torneio Regional de Jaíba 2026!</p>
                    <p>O evento acontecerá na sede do clube e contará com competidores de toda a região do Norte de Minas. Serão disputadas 5 rodadas no sistema Suíço em ritmo Rápido (15 min + 5 seg).</p>
                    <p><strong>Premiação:</strong> Troféus para os 3 primeiros colocados e medalhas para as categorias Sub-14, Sub-18 e Melhor Feminino.</p>
                    <p>Para se inscrever, envie uma mensagem através do nosso formulário de contato até o dia 28 do corrente mês.</p>
                `,
      },
      2: {
        title: "Projeto Xadrez nas Escolas em Expansão",
        date: "Junho de 2026",
        content: `
                    <p>O xadrez pedagógico tem se mostrado um excelente aliado no desenvolvimento do raciocínio lógico e da concentração de crianças e jovens.</p>
                    <p>Em parceria com as escolas municipais e estaduais de Jaíba, os instrutores do Clube de Xadrez Jaíba iniciaram oficinas semanais que já atendem mais de 100 alunos na região.</p>
                    <p>Quer levar o projeto para a sua escola? Entre em contato com a nossa diretoria!</p>
                `,
      },
    };

    const post = newsData[newsId] || newsData["1"];
    document.getElementById("newsDate").textContent = post.date;
    newsTitle.textContent = post.title;
    document.getElementById("newsBody").innerHTML = post.content;
  }

  // 4. Lógica para o Carrossel do Álbum
  const carouselSlide = document.getElementById("carouselSlide");
  if (carouselSlide) {
    const urlParams = new URLSearchParams(window.location.search);
    const albumType = urlParams.get("album") || "torneio";

    const albums = {
      torneio: {
        title: "Álbum: Torneio Regional de Xadrez",
        photos: [
          {
            src: "foto1.jpg",
            fallback:
              "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80",
            caption: "Mesa principal das finais do torneio",
          },
          {
            src: "foto_torneio2.jpg",
            fallback:
              "https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&w=1000&q=80",
            caption: "Concentração dos enxadristas nas rodadas decisivas",
          },
          {
            src: "foto_torneio3.jpg",
            fallback:
              "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=1000&q=80",
            caption: "Premiação dos campeões das categorias",
          },
        ],
      },
      treino: {
        title: "Álbum: Treino e Oficinas",
        photos: [
          {
            src: "foto2.jpg",
            fallback:
              "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=1000&q=80",
            caption: "Oficina de aberturas com os iniciantes",
          },
          {
            src: "foto_treino2.jpg",
            fallback:
              "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80",
            caption: "Análise coletiva de partidas clássicas",
          },
        ],
      },
      amistosos: {
        title: "Álbum: Partidas Amistosas",
        photos: [
          {
            src: "foto3.jpg",
            fallback:
              "https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&w=1000&q=80",
            caption: "Desafios Blitz de fim de semana",
          },
          {
            src: "foto_amistoso2.jpg",
            fallback:
              "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=1000&q=80",
            caption: "Encontro de enxadristas de todas as idades",
          },
        ],
      },
      campeonato: {
        title: "Álbum: Campeonato Mundial de Xadrez",
        photos: [
          {
            src: "foto_torneio4.jpg",
            fallback:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuCgr5sWLRKVsdG-ZJXqHsccXm-oMfM8YaRNMIeEXz1kpswDFNBqrdw9l8&s=10",
            caption: "Campeonato Mundial de Xadrez - Nepo x Carlsen",
          },
          {
            src: "foto_torneio4.jpg",
            fallback:
              "https://images.chesscomfiles.com/uploads/v1/news/1018003.a30e752f.5000x5000o.01120a0563e9.png",
            caption: "Vacilo de Nepo na 8ª partida do match",
          },
          {
            src: "foto_torneio4.jpg",
            fallback:
              "https://images.chesscomfiles.com/uploads/v1/news/1017461.e17658fd.668x375o.eb0ffa5b59b3@2x.png",
            caption: "Carlsen vence a 6ª partida do match",
          },
          {
            src: "foto_torneio4.jpg",
            fallback:
              "https://conteudo.imguol.com.br/c/esporte/3a/2021/11/25/o-russo-ian-nepomniachtchi-e-o-noruegues-magnus-carlsen-na-abertura-do-mundial-de-xadrez-1637883409486_v2_900x506.jpg",
            caption: "Campeonato Mundial de Xadrez - Início do match em Dubai",
          },
          {
            src: "logo.png",
            fallback:
              "https://rafaelleitao.com/wp-content/uploads/2021/12/3bba07f7-0a74-435e-9a8f-ca4bd8a641bc_Untitled.jpg",
            caption: "Clube de Xadrez Jaíba acompanha o Mundial de Xadrez 2021",
          },
        ],
      },
    };

    const currentAlbum = albums[albumType] || albums["torneio"];
    document.getElementById("albumTitle").innerHTML =
      `<i class="fas fa-images"></i> ${currentAlbum.title}`;

    // Inserir imagens
    currentAlbum.photos.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo.src;
      img.onerror = () => {
        img.src = photo.fallback;
      };
      img.alt = photo.caption;
      carouselSlide.appendChild(img);
    });

    // Indicadores e navegação
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const captionEl = document.getElementById("carouselCaption");
    const indicatorsContainer = document.getElementById("carouselIndicators");

    let currentIndex = 0;

    currentAlbum.photos.forEach((_, idx) => {
      const ind = document.createElement("div");
      ind.classList.add("indicator");
      if (idx === 0) ind.classList.add("active");
      ind.addEventListener("click", () => goToSlide(idx));
      indicatorsContainer.appendChild(ind);
    });

    function updateCarousel() {
      carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
      captionEl.textContent = currentAlbum.photos[currentIndex].caption;

      const indicators = document.querySelectorAll(".indicator");
      indicators.forEach((ind, idx) => {
        ind.classList.toggle("active", idx === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    prevBtn.addEventListener("click", () => {
      currentIndex =
        currentIndex > 0 ? currentIndex - 1 : currentAlbum.photos.length - 1;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex =
        currentIndex < currentAlbum.photos.length - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    });

    updateCarousel();
  }
});
