import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export const statusConfig = {
  active: { label: 'Đang bán', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  draft: { label: 'Nháp', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  inactive: { label: 'Ngừng bán', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

export const importStatusConfig = {
  pending: { label: 'Chờ xử lý', color: 'bg-blue-500/20 text-blue-400' },
  processing: { label: 'Đang xử lý', color: 'bg-amber-500/20 text-amber-400' },
  completed: { label: 'Hoàn thành', color: 'bg-emerald-500/20 text-emerald-400' },
  failed: { label: 'Thất bại', color: 'bg-red-500/20 text-red-400' },
};
