(() => {
  async function loadNav() {
    const mount = document.getElementById("nav-placeholder");
    if (!mount) return;

    try {
      const res = await fetch("nav.html", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const html = await res.text();
      mount.innerHTML = html;

      // Highlight the current page link
      const current = location.pathname.split("/").pop() || "index.html";
      mount.querySelectorAll("nav a").forEach(a => {
        const href = (a.getAttribute("href") || "").split("/").pop();
        if (href === current) a.classList.add("active");
      });
    } catch (err) {
      // Fallback (if fetch fails): show a minimal message
      mount.innerHTML = `
        <header>
          <h1>WFL HUB</h1>
          <nav>
            <a href="index.html">Home</a>
          </nav>
        </header>
      `;
      console.warn("Nav failed to load:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadNav);
  } else {
    loadNav();
  }
})();
