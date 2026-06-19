const DEFAULT_WALLET = "0x684c0ec0a2dbabC5ee2840396Ec98ba4E64D546d";

function basePath() {
  let path = window.location.pathname;
  if (path.endsWith(".html")) return path.replace(/[^/]+$/, "");
  if (!path.endsWith("/")) return `${path}/`;
  return path;
}

function buildPayUrl({ title, description, amount, address }) {
  const params = new URLSearchParams({
    t: title,
    a: amount,
    w: address,
  });
  if (description) params.set("d", description);
  return `${window.location.origin}${basePath()}pay.html?${params}`;
}

function initGenerator() {
  const form = document.getElementById("payment-form");
  const result = document.getElementById("result");
  const shareUrl = document.getElementById("share-url");
  const previewLink = document.getElementById("preview-link");
  const copyBtn = document.getElementById("copy-link");
  const addressInput = document.getElementById("address");

  if (!form || !addressInput) return;

  addressInput.value = DEFAULT_WALLET;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const amount = document.getElementById("amount").value;
    const address = addressInput.value.trim();

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      addressInput.setCustomValidity("Invalid Ethereum address");
      addressInput.reportValidity();
      return;
    }
    addressInput.setCustomValidity("");

    const url = buildPayUrl({ title, description, amount, address });
    if (shareUrl) shareUrl.value = url;
    if (previewLink) previewLink.href = url;
    if (result) {
      result.classList.remove("hidden");
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  if (copyBtn && shareUrl) {
    copyBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(shareUrl.value);
      copyBtn.textContent = "Copied!";
      setTimeout(() => { copyBtn.textContent = "Copy"; }, 2000);
    });
  }
}

function initOfferLink() {
  const offerPay = document.getElementById("offer-pay");
  const cfg = typeof PAYLINK_CONFIG !== "undefined" ? PAYLINK_CONFIG : null;
  if (!offerPay || !cfg?.wallet || !cfg.services?.paymentPage) return;
  if (!/^0x[a-fA-F0-9]{40}$/.test(cfg.wallet)) return;

  const s = cfg.services.paymentPage;
  offerPay.href = buildPayUrl({
    title: s.title,
    amount: s.amount,
    address: cfg.wallet,
    description: cfg.contactNote,
  });
}

initGenerator();
initOfferLink();
