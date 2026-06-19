const cfg = PAYLINK_CONFIG;

document.getElementById("contact-note").textContent = cfg.contactNote;

function payLink(service) {
  const params = new URLSearchParams({
    t: service.title,
    a: service.amount,
    w: cfg.wallet,
    d: cfg.contactNote,
  });
  return `pay.html?${params}`;
}

const walletOk = /^0x[a-fA-F0-9]{40}$/.test(cfg.wallet);

["pay-service-1", "pay-service-2", "pay-service-3"].forEach((id, i) => {
  const btn = document.getElementById(id);
  const keys = ["paymentPage", "landing", "metamask"];
  if (!walletOk) {
    btn.textContent = "Wallet not configured";
    btn.classList.add("btn-ghost");
    btn.removeAttribute("href");
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.5";
    return;
  }
  btn.href = payLink(cfg.services[keys[i]]);
});
