import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date))
}

export function gradeToColor(grade: string) {
  switch (grade.toUpperCase()) {
    case 'S':
    case 'A':
      return 'text-accent border-accent';
    case 'B':
    case 'C':
      return 'text-warning border-warning';
    case 'D':
    case 'F':
      return 'text-danger border-danger';
    default:
      return 'text-primary border-primary';
  }
}
