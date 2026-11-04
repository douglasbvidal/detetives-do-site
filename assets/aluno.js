(function () {
  "use strict";
  var CHAVE = "detetives-do-site-v1";
  var estado = { grupo: {}, respostas: {} };
  var memoriaOk = true;

  function ler() {
    try { var t = localStorage.getItem(CHAVE); if (t) { var o = JSON.parse(t); estado.grupo = o.grupo || {}; estado.respostas = o.respostas || {}; } }
    catch (e) { memoriaOk = false; }
  }
  function gravar() {
    estado.salvoEm = new Date().toISOString();
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); memoriaOk = true; }
    catch (e) { memoriaOk = false; }
    var s = document.getElementById("status");
    s.textContent = memoriaOk ? "Salvo neste aparelho às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
                              : "Atenção: este navegador não está guardando. Baixem o arquivo antes de sair.";
    s.style.color = memoriaOk ? "" : "#C0362C";
  }

  function el(tag, attrs, filhos) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "texto") e.textContent = attrs[k]; else if (k === "classe") e.className = attrs[k]; else e.setAttribute(k, attrs[k]);
    });
    (filhos || []).forEach(function (f) { if (f) e.appendChild(f); });
    return e;
  }
  function campoTexto(id, rotulo, linhas, classe) {
    return el("textarea", { "data-campo": "r." + id, id: "c_" + id.replace(/[^a-z0-9]/gi, "_"), rows: String(linhas || 3), "aria-label": rotulo, classe: classe || "" });
  }

  function montar() {
    var raiz = document.getElementById("missoes");
    window.MISSOES.forEach(function (m) {
      var h2 = el("h2", { texto: m.titulo });
      h2.appendChild(el("span", { classe: "etq" + (m.todos ? "" : " esc"), texto: m.todos ? "todos os grupos" : "missão indicada" }));
      var sec = el("section", { classe: "cartao missao", id: m.id }, [h2]);
      m.questoes.forEach(function (q) {
        var enun = el("div", { classe: "enun" }, [el("span", { classe: "num", texto: q.id }), document.createTextNode(q.texto)]);
        var bloco = el("div", { classe: "q" }, [enun]);
        if (q.tipo === "tabela") {
          var thead = el("tr", null, q.colunas.map(function (c) { return el("th", { texto: c, scope: "col" }); }));
          var tb = el("tbody");
          for (var r = 0; r < q.linhas; r++) {
            var tr = el("tr");
            q.colunas.forEach(function (c, ci) {
              if (q.fixa && ci === 0) { tr.appendChild(el("td", { classe: "fixa", texto: c + " " + q.fixa[r] })); return; }
              tr.appendChild(el("td", { "data-rotulo": c }, [campoTexto(q.id + "|" + r + "|" + ci, q.id + " linha " + (r + 1) + " " + c, 2)]));
            });
            tb.appendChild(tr);
          }
          bloco.appendChild(el("div", { classe: "tab" }, [el("table", null, [el("thead", null, [thead]), tb])]));
        } else if (q.tipo === "arvore") {
          var a = campoTexto(q.id, "Resposta " + q.id, 9, "arvore"); a.placeholder = q.dica; bloco.appendChild(a);
        } else {
          bloco.appendChild(campoTexto(q.id, "Resposta " + q.id, q.linhasTexto || 3));
        }
        sec.appendChild(bloco);
      });
      raiz.appendChild(sec);
    });
  }

  function valorDe(campo) {
    if (campo.indexOf("grupo.") === 0) return estado.grupo[campo.slice(6)] || "";
    return estado.respostas[campo.slice(2)] || "";
  }
  function definir(campo, v) {
    if (campo.indexOf("grupo.") === 0) estado.grupo[campo.slice(6)] = v; else estado.respostas[campo.slice(2)] = v;
  }

  function preencher() {
    document.querySelectorAll("[data-campo]").forEach(function (c) { c.value = valorDe(c.getAttribute("data-campo")); });
    progresso();
  }

  function camposVisiveis() {
    var missao = estado.grupo.missao || "";
    var ids = [];
    window.MISSOES.forEach(function (m) {
      if (!m.todos && missao !== "todas" && missao !== m.id) return;
      m.questoes.forEach(function (q) {
        if (q.tipo === "tabela") { for (var r = 0; r < q.linhas; r++) q.colunas.forEach(function (c, ci) { if (!(q.fixa && ci === 0)) ids.push(q.id + "|" + r + "|" + ci); }); }
        else ids.push(q.id);
      });
    });
    return ids;
  }
  function progresso() {
    var ids = camposVisiveis();
    var feitos = ids.filter(function (i) { return (estado.respostas[i] || "").trim(); }).length;
    document.getElementById("cheio").style.width = (ids.length ? Math.round(100 * feitos / ids.length) : 0) + "%";
    document.getElementById("txtProgresso").textContent = feitos + " de " + ids.length + " campos respondidos" + (estado.grupo.missao ? "" : " (escolham a missão indicada para completar a contagem)");
    var missao = estado.grupo.missao || "";
    window.MISSOES.forEach(function (m) {
      if (m.todos) return;
      var s = document.getElementById(m.id);
      s.style.opacity = (missao === "" || missao === "todas" || missao === m.id) ? "1" : ".55";
    });
  }

  var tempo;
  document.addEventListener("input", function (ev) {
    var c = ev.target.getAttribute && ev.target.getAttribute("data-campo");
    if (!c) return;
    definir(c, ev.target.value);
    progresso();
    clearTimeout(tempo); tempo = setTimeout(gravar, 400);
  });
  document.addEventListener("change", function (ev) {
    var c = ev.target.getAttribute && ev.target.getAttribute("data-campo");
    if (c) { definir(c, ev.target.value); progresso(); gravar(); }
  });

  function pacote() {
    return { atividade: "detetives-do-site", versao: window.VERSAO_ATIVIDADE, salvoEm: new Date().toISOString(), grupo: estado.grupo, respostas: estado.respostas };
  }
  function nomeArquivo() {
    var g = (estado.grupo.nome || "grupo").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "grupo";
    return "respostas_" + g + "_" + new Date().toISOString().slice(0, 10) + ".json";
  }
  function msg(t) { document.getElementById("msgAcoes").textContent = t; }

  document.getElementById("btnBaixar").addEventListener("click", function () {
    if (!(estado.grupo.nome || "").trim()) { msg("Preencham o nome do grupo antes de baixar."); document.getElementById("g_nome").focus(); return; }
    var blob = new Blob([JSON.stringify(pacote(), null, 2)], { type: "application/json" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nomeArquivo();
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    msg("Arquivo " + a.download + " baixado. Enviem esse arquivo ao professor.");
  });

  function textoCompleto() {
    var g = estado.grupo, L = [];
    L.push("DETETIVES DO SITE — respostas");
    L.push("Grupo: " + (g.nome || "") + " | Turma: " + (g.turma || ""));
    L.push("Integrantes: " + (g.integrantes || "").split("\n").filter(Boolean).join(", "));
    L.push("Produto sorteado: " + (g.produto || "") + " | Missão indicada: " + (g.missao || ""));
    window.MISSOES.forEach(function (m) {
      L.push(""); L.push(m.titulo.toUpperCase());
      m.questoes.forEach(function (q) {
        if (q.tipo === "tabela") {
          L.push(q.id + ")");
          for (var r = 0; r < q.linhas; r++) {
            var partes = q.colunas.map(function (c, ci) { return c + ": " + ((q.fixa && ci === 0) ? q.fixa[r] : (estado.respostas[q.id + "|" + r + "|" + ci] || "—")); });
            L.push("   • " + partes.join(" | "));
          }
        } else L.push(q.id + ") " + (estado.respostas[q.id] || "—"));
      });
    });
    return L.join("\n");
  }
  document.getElementById("btnCopiar").addEventListener("click", function () {
    var t = textoCompleto();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(function () { msg("Respostas copiadas. Cole na mensagem para o professor."); }, function () { msg("Não foi possível copiar. Use o botão de baixar arquivo."); });
    } else msg("Este navegador não permite copiar. Use o botão de baixar arquivo.");
  });

  document.getElementById("btnImprimir").addEventListener("click", function () {
    var r = document.getElementById("resumo");
    r.innerHTML = "";
    var pre = el("div", { classe: "cartao" }, [el("h2", { texto: "Detetives do site — respostas do grupo" }), el("div", { classe: "lin", texto: textoCompleto() })]);
    pre.lastChild.style.whiteSpace = "pre-wrap";
    r.appendChild(pre);
    document.getElementById("form").classList.add("oculta"); r.classList.remove("oculta");
    setTimeout(function () { window.print(); document.getElementById("form").classList.remove("oculta"); r.classList.add("oculta"); }, 50);
  });

  document.getElementById("arqAbrir").addEventListener("change", function (ev) {
    var f = ev.target.files && ev.target.files[0]; if (!f) return;
    var leitor = new FileReader();
    leitor.onload = function () {
      try {
        var o = JSON.parse(leitor.result);
        if (o.atividade !== "detetives-do-site") throw new Error("arquivo de outra atividade");
        if (!confirm("Substituir as respostas deste aparelho pelas do arquivo " + f.name + "?")) return;
        estado.grupo = o.grupo || {}; estado.respostas = o.respostas || {}; preencher(); gravar(); msg("Arquivo carregado.");
      } catch (e) { msg("Não foi possível abrir: " + e.message); }
      ev.target.value = "";
    };
    leitor.readAsText(f);
  });

  document.getElementById("btnLimpar").addEventListener("click", function () {
    if (!confirm("Apagar todas as respostas deste aparelho? Baixem o arquivo antes, se ainda não baixaram.")) return;
    estado = { grupo: {}, respostas: {} };
    try { localStorage.removeItem(CHAVE); } catch (e) {}
    preencher(); msg("Respostas apagadas deste aparelho.");
  });

  montar(); ler(); preencher();
  if (!memoriaOk) { var s = document.getElementById("status"); s.textContent = "Atenção: este navegador não guarda automaticamente. Baixem o arquivo antes de sair."; s.style.color = "#C0362C"; }
})();
