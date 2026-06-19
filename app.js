const form = document.getElementById("payment-form");
const result = document.getElementById("result");
const shareUrl = document.getElementById("share-url");
const previewLink = document.getElementById("preview-link");
const copyBtn = document.getElementById("copy-link");
const addressInput = document.getElementById("address");

function buildPayUrl({ title, description, amount, address }) {
  const params = new URLSearchParams({
    t: title,
    a: amount,
    w: address,
  });
  if (description) params.set("d", description);
  return `${window.location.origin}${window.location.pathname.replace(/index\.html$/, "")}pay.html?${params}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const amount = document.getElementById("amount").value;
  const address = document.getElementById("address").value.trim();

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    addressInput.setCustomValidity("Invalid Ethereum address");
    addressInput.reportValidity();
    return;
  }
  addressInput.setCustomValidity("");

  const url = buildPayUrl({ title, description, amount, address });
  shareUrl.value = url;
  previewLink.href = url;
  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(shareUrl.value);
  copyBtn.textContent = "Copied!";
  setTimeout(() => { copyBtn.textContent = "Copy"; }, 2000);
});
