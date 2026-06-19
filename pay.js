function decodeParam(value) {
  if (!value) return "";
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
}

const params = new URLSearchParams(window.location.search);
const title = decodeParam(params.get("t")) || "Solicitud de pago";
const description = decodeParam(params.get("d"));
const amount = params.get("a") || "0";
const address = params.get("w") || "";

document.getElementById("pay-title").textContent = title;
document.getElementById("pay-amount").textContent = Number(amount).toLocaleString("es-ES", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 6,
});

const descEl = document.getElementById("pay-description");
if (description) {
  descEl.textContent = description;
  descEl.classList.remove("hidden");
}

const addressEl = document.getElementById("pay-address");
if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
  addressEl.textContent = address;
  const qr = document.getElementById("qr-code");
  qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`;
} else {
  addressEl.textContent = "Dirección no válida";
  document.getElementById("pay-card").classList.add("error");
}

document.title = `${title} — ${amount} USDT`;

document.getElementById("copy-address").addEventListener("click", async () => {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return;
  await navigator.clipboard.writeText(address);
  const btn = document.getElementById("copy-address");
  btn.textContent = "¡Copiado!";
  setTimeout(() => { btn.textContent = "Copiar dirección"; }, 2000);
});
