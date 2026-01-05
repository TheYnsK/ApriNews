import { clsx } from 'clsx';

// CSS classlarını şartlı birleştirmek için (Tailwind ile çok işe yarar)
export function cn(...inputs) {
  return clsx(inputs);
}

// Tarihi "10 Temmuz 2025" formatına çevirir
export function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Metni belli karakterden sonra kesip "..." koyar
export function truncate(str, length = 100) {
  if (!str) return "";
  return str.length > length ? str.substring(0, length) + "..." : str;
}