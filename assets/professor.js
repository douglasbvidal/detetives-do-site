(function () {
  "use strict";
  var CHAVE = "detetives-do-site-professor-v1";
  var lotes = {}; // chave: nome do arquivo

  try { var t = localStorage.getItem(CHAVE); if (t) lotes = JSON.parse(t) || {}; } catch (e) {}
  function gravar() { try { localStorage.setItem(CHAVE, JSON.stringify(lotes)); } catch (e) {} }
  function msg(t) { document.getElementById("msg").textContent = t; }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  var sel = document.getElementById("filtro");
  window.MISSOES.forEach(function (m) { var o = el("option", null, m.titulo); o.value = m.id; sel.appendChild(o); });
  sel.addEventListener("change", desenhar);

  function lista() {
    return Object.keys(lotes).map(function (k) { return lotes[k]; })
      .sort(function (a, b) { return (a.grupo.nome || "").localeCompare(b.grupo.nome || "", "pt-BR"); });
  }

  function desenhar() {
    var G = lista();
    var gdiv = document.getElementById("grupos"); gdiv.innerHTML = "";
    if (!G.length) gdiv.appendChild(el("p", "vazio", "Nenhum arquivo carregado."));
    G.forEach(function (g) {
      var campos = window.camposDaAtividade();
      var feitos = campos.filter(function (c) { return (g.respostas[c.id] || "").trim(); }).length;
      var box = el("div", "res");
      box.appendChild(el("h3", null, (g.grupo.nome || "(sem nome)") + " · turma " + (g.grupo.turma || "—")));
      box.appendChild(el("div", "lin", "Integrantes: " + (g.grupo.integrantes || "—").split("\n").filter(Boolean).join(", ")));
      box.appendChild(el("div", "lin", "Produto: " + (g.grupo.produto || "—") + " · Missão indicada: " + (g.grupo.missao || "—") + " · Campos preenchidos: " + feitos + " de " + campos.length + " · Salvo em " + (g.salvoEm ? new Date(g.salvoEm).toLocaleString("pt-BR") : "—")));
      gdiv.appendChild(box);
    });

    var alvo = document.getElementById("porQuestao"); alvo.innerHTML = "";
    if (!G.length) return;
    window.MISSOES.forEach(function (m) {
      if (sel.value && sel.value !== m.id) return;
      alvo.appendChild(el("h3", null, m.titulo)).style.color = "var(--violeta)";
      m.questoes.forEach(function (q) {
        var box = el("div", "res");
        box.appendChild(el("h3", null, q.id + " — " + q.texto));
        G.forEach(function (g) {
          var t;
          if (q.tipo === "tabela") {
            var linhas = [];
            for (var r = 0; r < q.linhas; r++) {
              var partes = q.colunas.map(function (c, ci) { return (q.fixa && ci === 0) ? q.fixa[r] : (g.respostas[q.id + "|" + r + "|" + ci] || "—"); });
              if (partes.some(function (p, i) { return p !== "—" && !(q.fixa && i === 0); })) linhas.push("• " + partes.join(" | "));
            }
            t = linhas.join("\n");
          } else t = g.respostas[q.id] || "";
          var lin = el("div", "lin");
          lin.appendChild(el("b", null, (g.grupo.nome || "(sem nome)") + ": "));
          lin.appendChild(t.trim() ? document.createTextNode(t) : el("span", "vazio", "sem resposta"));
          box.appendChild(lin);
        });
        alvo.appendChild(box);
      });
    });
  }

  document.getElementById("arquivos").addEventListener("change", function (ev) {
    var fs = Array.prototype.slice.call(ev.target.files || []);
    var ok = 0, erros = [];
    var pend = fs.length; if (!pend) return;
    fs.forEach(function (f) {
      var r = new FileReader();
      r.onload = function () {
        try {
          var o = JSON.parse(r.result);
          if (o.atividade !== "detetives-do-site") throw new Error("não é desta atividade");
          o.grupo = o.grupo || {}; o.respostas = o.respostas || {}; o.arquivo = f.name;
          lotes[f.name] = o; ok++;
        } catch (e) { erros.push(f.name + " (" + e.message + ")"); }
        if (--pend === 0) { gravar(); desenhar(); msg(ok + " arquivo(s) carregado(s)." + (erros.length ? " Com problema: " + erros.join("; ") : "")); ev.target.value = ""; }
      };
      r.readAsText(f);
    });
  });

  function csvCelula(v) { v = String(v == null ? "" : v); return /[";\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  document.getElementById("btnCsv").addEventListener("click", function () {
    var G = lista(); if (!G.length) { msg("Carregue arquivos primeiro."); return; }
    var campos = window.camposDaAtividade();
    var cab = ["arquivo", "grupo", "turma", "integrantes", "produto", "missao_indicada", "salvo_em"].concat(campos.map(function (c) { return c.rotulo; }));
    var linhas = [cab.map(csvCelula).join(";")];
    G.forEach(function (g) {
      linhas.push([g.arquivo, g.grupo.nome, g.grupo.turma, (g.grupo.integrantes || "").split("\n").filter(Boolean).join(", "), g.grupo.produto, g.grupo.missao, g.salvoEm]
        .concat(campos.map(function (c) { return g.respostas[c.id] || ""; })).map(csvCelula).join(";"));
    });
    var blob = new Blob(["﻿" + linhas.join("\r\n")], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "detetives-do-site_respostas_" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  });
  document.getElementById("btnImprimir").addEventListener("click", function () { window.print(); });
  document.getElementById("btnLimpar").addEventListener("click", function () {
    if (!confirm("Remover todos os arquivos carregados desta página? Os arquivos originais não são apagados.")) return;
    lotes = {}; gravar(); desenhar(); msg("Lista esvaziada.");
  });
  desenhar();
})();
