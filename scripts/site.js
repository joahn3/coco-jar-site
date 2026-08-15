(async function () {
  const path = location.pathname.split("/").pop() || "index.html";

  const config = await loadJson("./data/site-config.json");
  const defaults = {
    siteName: "Coco Jar",
    tagline: "Meniu tradițional",
    locality: "Popești-Leordeni",
    fullAddress: "Popești-Leordeni, Ilfov",
    phone: "+40 000 000 000",
    whatsapp: "+40000000000",
    email: "contact@cocojar.ro",
    hours: "Luni-Duminica: 09:00 - 22:00",
    social: {
      facebook: "https://www.facebook.com/people/Coco-Jar/61592924622016/"
    }
  };
  const c = { ...defaults, ...(config || {}) };
  const phoneDigits = normalizePhone(c.phone);
  const whatsappDigits = normalizePhone(c.whatsapp || c.phone);

  // Fill repeated text values from config
  fillText("[data-fill='siteName']", c.siteName);
  fillText("[data-fill='tagline']", c.tagline);
  fillText("[data-fill='locality']", c.locality);
  fillText("[data-fill='fullAddress']", c.fullAddress);
  fillText("[data-fill='hours']", c.hours);

  // Fill contact links
  document.querySelectorAll("[data-link='phone']").forEach((el) => {
    el.href = `tel:${phoneDigits}`;
    el.textContent = c.phone;
  });
  document.querySelectorAll("[data-link='whatsapp']").forEach((el) => {
    el.href = `https://wa.me/${whatsappDigits}`;
    el.textContent = "WhatsApp";
  });
  document.querySelectorAll("[data-link='facebook']").forEach((el) => {
    el.href = c.social?.facebook || "#";
  });

  const mapLinks = [
    ...document.querySelectorAll("#map-link"),
    ...document.querySelectorAll("[data-map-link]")
  ];
  if (mapLinks.length) {
    const query = encodeURIComponent(`${c.siteName} ${c.fullAddress}`);
    mapLinks.forEach((mapNode) => {
      mapNode.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
    });
  }

  // Active menu
  document.querySelectorAll("nav a").forEach((a) => {
    const href = a.getAttribute("href");
    const isCurrent = href === path || (href === "index.html" && (path === "" || path === "/"));
    if (isCurrent) {
      a.classList.add("active");
    }
  });

  // Daily menu
  const dailyContainer = document.getElementById("daily-menu");
  if (dailyContainer) {
    const dayMenu = (await loadJson("./data/meniu-zilei.json")) || {};
    const daysRo = ["duminica", "luni", "marti", "miercuri", "joi", "vineri", "sambata"];
    const dayName = daysRo[new Date().getDay()];
    const title = document.getElementById("daily-title");
    const items = Array.isArray(dayMenu[dayName]) ? dayMenu[dayName] : [];

    if (title) {
      title.textContent = `Meniul zilei — ${capitalize(dayName)}`;
    }

    if (!items.length) {
      dailyContainer.innerHTML = "<p>Nu avem încă meniul zilei încărcat. Actualizăm zilnic.</p>";
    } else {
      dailyContainer.innerHTML = items
        .map(
          (item) => `
            <article class="service">
              <h3>${escapeHtml(item.name)}</h3>
              <p class="mini">${escapeHtml(item.description)}</p>
              <strong>${escapeHtml(item.price)}</strong>
            </article>
          `
        )
        .join("");
    }
  }

  // Full menu
  const fullMenuNode = document.getElementById("full-menu");
  if (fullMenuNode) {
    const fullMenu = (await loadJson("./data/meniu-complet.json")) || {};
    const categories = [
      ["supe", "Supă"],
      ["gratar", "Grătar"],
      ["preparate-specifice", "Preparate specifice"],
      ["deserturi", "Deserturi"]
    ];
    const html = categories
      .map(([key, title]) => {
        const rows = (fullMenu[key] || []).map(
          (item) => `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.desc)}</td><td>${escapeHtml(item.price)}</td></tr>`
        ).join("");
        return `<section class="card"><h2>${title}</h2><table><thead><tr><th>Preparat</th><th>Descriere</th><th>Preț</th></tr></thead><tbody>${rows}</tbody></table></section>`;
      })
      .join("");

    fullMenuNode.innerHTML = html || "<p>Nu există încă meniu complet încărcat.</p>";
  }

  // Form handlers
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const ok = form.querySelector(".msg-ok");
      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());
      const required = ["name", "phone"];
      const hasAllRequired = required.every((name) => !!(data[name] || "").trim());

      if (!hasAllRequired) {
        window.alert("Completează nume și telefon.");
        return;
      }

      const payload = {
        nume: data.name,
        telefon: data.phone,
        email: data.email || "",
        tipEveniment: data.type || "",
        dataEveniment: data.eventDate || "",
        mesaj: data.message || ""
      };

      if (c.formspreeEndpoint) {
        const res = await fetch(c.formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          window.alert("A apărut o eroare la trimitere. Încearcă din nou.");
          return;
        }
      } else {
        const subject = encodeURIComponent("Cerere nouă din website Coco Jar");
        const body = encodeURIComponent(
          `Nume: ${payload.nume}\nTelefon: ${payload.telefon}\nEmail: ${payload.email}\nTip eveniment: ${payload.tipEveniment}\nData evenimentului: ${payload.dataEveniment}\nMesaj: ${payload.mesaj}`
        );
        window.location.href = `mailto:${c.email}?subject=${subject}&body=${body}`;
      }

      if (ok) {
        ok.style.display = "block";
        ok.textContent = "Mulțumim! Cererea ta a fost transmisă. Te contactăm rapid.";
      }
      form.reset();
    });
  });

  // CTA / telefon / WhatsApp click tracking placeholders
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      const event = el.getAttribute("data-track");
      if (window.gtag) {
        window.gtag("event", event, {
          event_category: "interactiuni",
          event_label: window.location.pathname
        });
      }
    });
  });

  function fillText(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function normalizePhone(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function capitalize(value) {
    return String(value || "")
      .slice(0, 1)
      .toUpperCase() + String(value || "").slice(1);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  async function loadJson(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) return null;
      return await response.json();
    } catch (_error) {
      return null;
    }
  }
})();
