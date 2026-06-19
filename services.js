const cfg = PAYLINK_CONFIG;
const service = cfg.services.paymentPage;
const walletOk = /^0x[a-fA-F0-9]{40}$/.test(cfg.wallet);

const contactNote = document.getElementById("contact-note");
if (contactNote) {
  if (walletOk) {
    contactNote.innerHTML =
      `${cfg.contactNote} <a href="${cfg.githubIssues}" target="_blank" rel="noopener"><strong>Open order form →</strong></a>`;
  } else {
    contactNote.textContent = "Payment is temporarily unavailable — wallet not configured.";
  }
}

function payLink() {
  const params = new URLSearchParams({
    t: service.title,
    a: service.amount,
    w: cfg.wallet,
    d: cfg.contactNote,
  });
  return `pay.html?${params}`;
}

const link = walletOk ? payLink() : null;

["hero-pay", "pay-service-1", "sticky-pay"].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (!link) {
    el.textContent = "Unavailable";
    el.removeAttribute("href");
    el.style.pointerEvents = "none";
    el.style.opacity = "0.5";
    return;
  }
  el.href = link;
});
