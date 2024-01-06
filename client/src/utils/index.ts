export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(price);
}
export function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}
