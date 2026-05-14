function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value) {
  if (!isNonEmptyString(value)) {
    return false;
  }
  const trimmed = value.trim();
  const at = trimmed.indexOf("@");
  if (at < 1 || at === trimmed.length - 1) {
    return false;
  }
  return trimmed.includes(".", at);
}

function passwordsMatch(a, b) {
  return isNonEmptyString(a) && a === b;
}

function formatRupiah(amount) {
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    return "Rp0";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
