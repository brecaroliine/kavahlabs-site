// Kavah Labs — idioma (EN principal, PT opcional) e botões de WhatsApp
(function () {
  var WHATSAPP = "19785957089";
  var root = document.documentElement;

  function savedLang() {
    try { return localStorage.getItem("kavah-lang"); } catch (e) { return null; }
  }
  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    try { localStorage.setItem("kavah-lang", lang); } catch (e) {}
    updateLinks();
  }
  function current() { return root.getAttribute("data-lang") || "en"; }

  function wpp(msg) {
    return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
  }
  function updateLinks() {
    var lang = current();
    document.querySelectorAll(".js-wpp").forEach(function (a) {
      var msg = a.getAttribute("data-" + lang) || a.getAttribute("data-en") || "Hi!";
      a.href = wpp(msg);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  // Idioma: o salvo pela pessoa, senão português para quem usa o navegador em português, senão inglês
  var start = savedLang() || ((navigator.language || "").toLowerCase().indexOf("pt") === 0 ? "pt" : "en");
  setLang(start);

  document.getElementById("lang").addEventListener("click", function () {
    setLang(current() === "en" ? "pt" : "en");
  });

  // Formulário de contato: abre o WhatsApp com a mensagem pronta
  var form = document.getElementById("form");
  var note = document.getElementById("form-note");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("f-name").value.trim();
    var biz = document.getElementById("f-biz").value.trim();
    var need = document.getElementById("f-need").value;
    var pt = current() === "pt";
    if (!name) {
      note.textContent = pt ? "Escreva seu nome." : "Please enter your name.";
      return;
    }
    var msg = pt
      ? "Oi! Sou " + name + (biz ? " (" + biz + ")" : "") + ". Tenho interesse em: " + need + "."
      : "Hi! I'm " + name + (biz ? " (" + biz + ")" : "") + ". I'm interested in: " + need + ".";
    window.open(wpp(msg), "_blank", "noopener");
    note.textContent = pt ? "Abrimos o WhatsApp com a sua mensagem. É só tocar em enviar." : "WhatsApp opened with your message. Just tap send.";
  });
})();
