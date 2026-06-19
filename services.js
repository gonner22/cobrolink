const cfg = PAYLINK_CONFIG;
const service = cfg.services.paymentPage;

document.getElementById("contact-note").innerHTML =
  `${cfg.contactNote} <a href="${cfg.githubIssues}" target="_blank" rel="noopener"><strong>Open order form →</strong></a>`;

function payLink() {
  const params = new URLSearchParams({
    t: service.title,
    a: service.amount,
    w: cfg.wallet,
    d: cfg.contactNote,
  });
  return `pay.html?${params}`;
}

const link = payLink();
["hero-pay", "pay-service-1", "sticky-pay"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = link;
});
