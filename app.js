(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  if (!id || !window.FORMS || !window.FORMS[id]) {
    document.body.innerHTML =
      '<div style="background:#b60000;color:white;padding:40px;font-family:Arial">' +
      "<h2>Invalid or missing form ID</h2>" +
      "<p>Example: <code>form.html?id=rif</code></p>" +
      "</div>";
    return;
  }

  const cfg = window.FORMS[id];

  // Title + headings
  document.title = cfg.title || "Form";
  document.getElementById("page-title").textContent = cfg.title || "";
  document.getElementById("section-title").textContent = cfg.sectionTitle || "";

  // Background image
  if (cfg.backgroundImage) {
    document.body.style.backgroundImage = `url("${cfg.backgroundImage}")`;
  }

  const buttonsWrap = document.getElementById("buttonsWrap");
  const buttonsEl = document.getElementById("buttons");
  const mediaEl = document.getElementById("media");

  // Helper: mark completed
  function markDone() {
    if (cfg.completedKey) localStorage.setItem(cfg.completedKey, "true");
  }

  // EMBED MODE (Construction Check Sheet)
  if (cfg.embedUrl) {
    buttonsWrap.style.display = "none";
    mediaEl.style.display = "block";
    mediaEl.innerHTML = `<iframe class="embed" src="${cfg.embedUrl}" title="${cfg.title || ""}"></iframe>`;
    markDone();
    return;
  }

  // IMAGE MODE (Transformer)
if (cfg.embedUrl) {
  buttonsWrap.style.display = "none";
  mediaEl.style.display = "block";
  mediaEl.innerHTML = `<iframe class="embed" src="${cfg.embedUrl}" title="${cfg.title || ""}"></iframe>`;
  markDone();
  return;
}

  // BUTTON MODE
  buttonsWrap.style.display = "inline-block";
  mediaEl.style.display = "none";
  buttonsEl.innerHTML = "";

  (cfg.buttons || []).forEach((b) => {
    const a = document.createElement("a");
    a.className = "btn";
    a.textContent = b.text || "Open";
    a.href = b.href || "#";

    // External links open new tab; internal stay same tab
    if (/^https?:\/\//i.test(a.href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    a.addEventListener("click", markDone);
    buttonsEl.appendChild(a);
  });
})();
