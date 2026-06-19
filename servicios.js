const cfg = COBROLINK_CONFIG;

document.getElementById("contact-github").href = cfg.githubIssues;

function payLink(service) {
  const params = new URLSearchParams({
    t: service.title,
    a: service.amount,
    w: cfg.wallet,
    d: `Tras pagar, abre un GitHub Issue con el hash TX: ${cfg.githubIssues}`,
  });
  return `pay.html?${params}`;
}

document.getElementById("pay-service-1").href = payLink(cfg.services.paymentPage);
document.getElementById("pay-service-2").href = payLink(cfg.services.landing);
document.getElementById("pay-service-3").href = payLink(cfg.services.metamask);
