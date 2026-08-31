export function formatMoney(amountCent) {
  return `$${(amountCent / 100).toFixed(2)}`;
}
