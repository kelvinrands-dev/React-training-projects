export function formatMoney(amountCent: number) {
  return `$${(amountCent / 100).toFixed(2)}`;
}
