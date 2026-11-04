/* Detetives do site — questões (versão do estudante, sem respostas). */
window.SITE_MOSTRA = "https://douglasbvidal.github.io/matematica-dos-dados/";
window.VERSAO_ATIVIDADE = "2026-11-04";
window.MISSOES = [
  { id: "m1", titulo: "Missão 1 · O mapa do site", todos: true, questoes: [
    { id: "1.1", texto: "Quais são as quatro seções do menu do topo? Que símbolo abre a busca e qual é o atalho de teclado no computador?" },
    { id: "1.2", texto: "Montem o mapa do site em forma de árvore: no alto a página inicial; embaixo, as seções; e, dentro delas, as páginas que vocês encontrarem. Usem setas (→) e recuos.", tipo: "arvore",
      dica: "Início\n├─ Seção A\n│  └─ página…\n└─ Seção B" },
    { id: "1.3", texto: "Imagine que um visitante abriu uma página e não sabe onde está. Que elemento no topo de cada página mostra a localização? Copiem um exemplo exatamente como aparece." },
    { id: "1.4", texto: "No rodapé, os atalhos estão em dois grupos. Qual é o nome de cada grupo e que páginas cada um oferece? Que outro botão útil aparece ali?" }
  ]},
  { id: "m2", titulo: "Missão 2 · A página inicial e as cestas", todos: true, questoes: [
    { id: "2.1", texto: "No topo da página inicial há quatro números em destaque. Escrevam cada número e o que ele conta.", tipo: "tabela", colunas: ["Número", "O que ele conta"], linhas: 4 },
    { id: "2.2", texto: "Na escolha dos meses aparece “Jul —”. O que esse traço quer dizer? Encontrem outro lugar do site onde essa informação também aparece e anotem o caminho." },
    { id: "2.3", texto: "Abram dois meses diferentes em “Uma cesta. Cinco mercados.” e anotem quantos itens comparáveis cada um tem. Por que esse número muda de um mês para outro?" },
    { id: "2.4", texto: "Para que serve o botão “Ver em tabela”? Para que tipo de visitante ele pode ser mais útil?" },
    { id: "2.5", texto: "A página “Comparar as cestas” usa duas comparações: entre mercados no mesmo mês e ao longo do tempo com 12 itens fixos. Criem uma comparação do dia a dia (esporte, escola, jogo…) que ajude um visitante a entender a diferença entre elas.", linhasTexto: 5 }
  ]},
  { id: "m3", titulo: "Missão 3 · Por dentro de um produto", todos: true, questoes: [
    { id: "3.1", texto: "Encontrem o produto sorteado de duas maneiras diferentes e anotem os dois caminhos." },
    { id: "3.2", texto: "Na página “Produtos”, usem os filtros de categoria. Quantos produtos há em cada uma? A soma confere com o número de destaque da página inicial?", tipo: "tabela", colunas: ["Alimentação", "Limpeza", "Higiene", "Soma"], linhas: 1 },
    { id: "3.3", texto: "Toda página de produto tem quatro abas. Escrevam o nome de cada aba e, em uma frase, que tipo de informação ela guarda.", tipo: "tabela", colunas: ["Aba", "Que informação ela guarda"], linhas: 4 },
    { id: "3.4", texto: "Na tabela de registros (“Da etiqueta ao registro”), qual é a diferença entre “Preço registrado” e “Preço utilizado”? O que acontece quando vocês escolhem um único mercado no filtro? Como voltar a ver tudo?" },
    { id: "3.5", texto: "O produto sorteado faz parte do conjunto fixo de 12 itens? Em que lugar da página vocês descobriram? Desafio extra: descubram qual é o único produto do conjunto fixo que não é de alimentação." },
    { id: "3.6", texto: "A aba “Estudo e referências” é dividida em três partes numeradas. Quais são? Que instituição aparece como fonte no estudo do seu produto?" },
    { id: "3.7", texto: "Caça rápida: encontrem dois produtos que, em setembro, tiveram dados em menos de cinco mercados. Onde essa informação aparece sem precisar abrir o produto?" }
  ]},
  { id: "m4", titulo: "Missão 4 · Os mercados", questoes: [
    { id: "4.1", texto: "As figuras dos mercados são fotografias ou logomarcas das lojas? Onde o site informa isso? Por que vocês acham que a equipe fez essa escolha?" },
    { id: "4.2", texto: "Na página de um mercado aparece “Preços utilizados: ___ de 180 registros previstos”. Expliquem de onde vem o número 180. Visitem os cinco mercados: qual teve mais preços utilizados?" },
    { id: "4.3", texto: "Quais são as três abas da página de um mercado? Como passar de um mercado para outro sem voltar à lista?" }
  ]},
  { id: "m5", titulo: "Missão 5 · Embalagens e o simulador", questoes: [
    { id: "5.1", texto: "Escrevam a fórmula usada no simulador da página “Preços e embalagens”. Depois testem: um pacote de biscoito de 0,3 kg custa R$ 6,00. Quanto custariam 0,2 kg (a referência da cesta)? Confiram no simulador." },
    { id: "5.2", texto: "O que diz a regra da “tolerância vigente” de ±20%? Expliquem com um exemplo inventado pelo grupo." },
    { id: "5.3", texto: "Na tabela “As anotações da pesquisa”, filtrem um mês e um mercado e copiem uma anotação original escrita pelos colegas na coleta. Por que é importante o site mostrar a anotação original?" },
    { id: "5.4", texto: "Usar o simulador muda os dados da pesquisa? Onde o site responde isso?" }
  ]},
  { id: "m6", titulo: "Missão 6 · A pesquisa e as fontes", questoes: [
    { id: "6.1", texto: "A página “A pesquisa” mostra seis etapas numeradas. Escrevam as seis em ordem e escolham um símbolo ou emoji para cada uma.", tipo: "tabela", colunas: ["Nº", "Etapa", "Símbolo"], linhas: 6, fixa: ["01", "02", "03", "04", "05", "06"] },
    { id: "6.2", texto: "No bloco “O que os dados não resolvem sozinhos”, escolham dois limites e expliquem cada um como se fosse para um estudante do 6º ano.", linhasTexto: 5 },
    { id: "6.3", texto: "Onde o visitante pode baixar os resultados públicos? Em que formato de arquivo?" },
    { id: "6.4", texto: "Na página “Referências consultadas”, que elementos aparecem em cada cartão de fonte? Citem três instituições diferentes." },
    { id: "6.5", texto: "O último cartão diz: “Contexto é diferente de causalidade”. Criem um exemplo do cotidiano que mostre a diferença entre um contexto e uma causa." }
  ]},
  { id: "m7", titulo: "Missão 7 · Desafio criativo: guias da Mostra", todos: true, questoes: [
    { id: "7.1", texto: "Apresentação de 1 minuto. Escrevam a fala de um guia que apresenta o site a um visitante, passando por pelo menos três páginas diferentes (até 6 linhas).", linhasTexto: 6 },
    { id: "7.2", texto: "Perguntas de visitante. Inventem três perguntas que um visitante poderia fazer e mostrem como o guia chegaria à resposta no site.", tipo: "tabela", colunas: ["Pergunta do visitante", "Caminho de cliques", "Que tipo de informação ele vai ver"], linhas: 3 },
    { id: "7.3", texto: "Caça ao tesouro. Criem duas pistas para outro grupo descobrir uma página do site. Exemplo: “Sou um produto de higiene vendido em pacote com 4 unidades. Na minha terceira aba falo do tamanho. Quem sou eu?”", linhasTexto: 4 },
    { id: "7.4", texto: "Olhar de usuário. O que no site foi mais fácil de encontrar? O que foi mais difícil? Que melhoria vocês sugeririam?" }
  ]}
];

/* Lista plana de campos (id, rótulo) usada pelas duas páginas. */
window.camposDaAtividade = function () {
  var c = [];
  window.MISSOES.forEach(function (m) {
    m.questoes.forEach(function (q) {
      if (q.tipo === "tabela") {
        for (var r = 0; r < q.linhas; r++) {
          q.colunas.forEach(function (col, ci) {
            if (q.fixa && ci === 0) return;
            c.push({ id: q.id + "|" + r + "|" + ci, rotulo: q.id + " · linha " + (r + 1) + " · " + col });
          });
        }
      } else {
        c.push({ id: q.id, rotulo: q.id });
      }
    });
  });
  return c;
};
