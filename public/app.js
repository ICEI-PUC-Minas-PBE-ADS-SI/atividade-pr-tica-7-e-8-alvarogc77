const dados = [
  {
    "id": 1,
    "titulo": "Gin Tônica",
    "descricao": "O clássico drink que conquistou o mundo com sua simplicidade e elegância.",
    "conteudo": "O gin tônica surgiu no século XIX. Originalmente, o gin era usado para fins medicinais. O tônico, com quinina, ajudava a combater a malária. Soldados britânicos na Índia começaram a misturar gin com tônico para tornar o remédio mais palatável. Com o tempo, a bebida se popularizou entre os civis. Hoje, é um dos coquetéis mais consumidos no mundo.",
    "categoria": "Clássicos",
    "autor": "Álvaro Carvalho",
    "data": "2024-04-09",
    "imagem": "imgs/gin_tonica.webp",
    "ingredientes": [
      "50 ml de gin",
      "2 doses de água tônica",
      "Gelo"
    ]
  },
  {
    "id": 2,
    "titulo": "Moscow Mule",
    "descricao": "O drink que revolucionou o consumo de vodka nos Estados Unidos.",
    "conteudo": "O Moscow Mule é um coquetel que ganhou popularidade na década de 1940 nos Estados Unidos. Sua base é o vodka, misturado com gengibre e suco de limão, e é servido tradicionalmente em uma caneca de cobre. A história do drink está ligada à combinação de dois produtos: o vodka russo e a cerveja de gengibre, um dos produtos mais consumidos nos EUA na época.",
    "categoria": "Clássicos",
    "autor": "Álvaro Carvalho",
    "data": "2024-04-09",
    "imagem": "imgs/moscow_mule.avif",
    "ingredientes": [
      "50 ml de vodka",
      "3 colheres (chá) de xarope de gengibre",
      "100 ml de água com gás",
      "Suco de ½ limão",
      "½ colher (sopa) de açúcar",
      "Gelo"
    ]
  },
  {
    "id": 3,
    "titulo": "Piña Colada",
    "descricao": "O drink tropical que transporta você para as praias do Caribe.",
    "conteudo": "A Piña Colada é um coquetel tropical originado em Porto Rico na década de 1950. Sua receita clássica combina rum, creme de coco e suco de abacaxi, criando um sabor doce e refrescante. Acredita-se que tenha sido criada por Ramón 'Monchito' Marrero, bartender do Caribe Hilton, que buscava um drink que capturasse a essência da ilha.",
    "categoria": "Tropicais",
    "autor": "Álvaro Carvalho",
    "data": "2024-04-09",
    "imagem": "imgs/pina_colada.webp",
    "ingredientes": [
      "1 e 1/2 doses de rum",
      "3 doses de suco de abacaxi",
      "1 dose leite de coco",
      "1 dose leite condensado",
      "6 pedras de gelo"
    ]
  },
  {
    "id": 4,
    "titulo": "Mojito",
    "descricao": "O drink cubano que conquistou o mundo com seu frescor e simplicidade.",
    "conteudo": "O Mojito é um clássico cubano que remonta ao século XVI, quando os indígenas já usavam a mistura de folhas de hortelã, rum, açúcar e limão. A versão moderna do coquetel ganhou fama em Havana, nos anos 1930, especialmente com a preferência de figuras históricas como Ernest Hemingway.",
    "categoria": "Clássicos",
    "autor": "Álvaro Carvalho",
    "data": "2024-04-09",
    "imagem": "imgs/mojito.webp",
    "ingredientes": [
      "1 limão",
      "1 dose de rum branco (cerca de 50 ml)",
      "3 ramos de hortelã",
      "1 colher (chá) de açúcar",
      "Cubos de gelo a gosto",
      "Club soda ou água com gás para completar"
    ]
  }
];

function criarCard(drink) {
  // Função para remover acentos e caracteres especiais
  const removerAcentos = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase();
  };

  const id = removerAcentos(drink.titulo);
  
  return `
    <div class="col" id="${id}">
      <div class="card h-100 shadow-sm">
        <div class="d-flex justify-content-center">
          <img src="${drink.imagem}" class="card-img-top w-25" alt="${drink.titulo}">
        </div>
        <div class="card-body">
          <h2 class="card-title">${drink.titulo}</h2>
          <p class="card-text">${drink.conteudo}</p>
          <ul class="ingredientes">
            ${drink.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
          </ul>
          <a href="detalhes.html?id=${drink.id}" class="btn btn-primary mt-3">Ver Detalhes</a>
        </div>
      </div>
    </div>
  `;
}

function renderizarCards() {
  const container = document.querySelector('.row.row-cols-1.g-4');
  if (container) {
    container.innerHTML = dados.map(drink => criarCard(drink)).join('');
  }
}

function renderizarDetalhes() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));
  
  if (id) {
    const drink = dados.find(d => d.id === id);
    if (drink) {
      const container = document.querySelector('.container');
      if (container) {
        container.innerHTML = `
          <div class="row">
            <div class="col-md-6">
              <img src="${drink.imagem}" class="img-fluid rounded" alt="${drink.titulo}">
            </div>
            <div class="col-md-6">
              <h1>${drink.titulo}</h1>
              <p class="lead">${drink.descricao}</p>
              <h3>Ingredientes:</h3>
              <ul class="list-group mb-4">
                ${drink.ingredientes.map(ingrediente => `
                  <li class="list-group-item">${ingrediente}</li>
                `).join('')}
              </ul>
              <h3>História:</h3>
              <p>${drink.conteudo}</p>
              <div class="mt-4">
                <p><strong>Autor:</strong> ${drink.autor}</p>
                <p><strong>Data:</strong> ${drink.data}</p>
                <p><strong>Categoria:</strong> ${drink.categoria}</p>
              </div>
              <a href="index.html" class="btn btn-primary mt-3">Voltar para Home</a>
            </div>
          </div>
        `;
      }
    }
  }
}

// Renderizar os cards quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('detalhes.html')) {
    renderizarDetalhes();
  } else {
    renderizarCards();
  }
});
