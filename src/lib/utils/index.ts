import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string, format: string = "medium") {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  const formats = {
    short: { month: "short", day: "numeric" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
  };
  
  return new Intl.DateTimeFormat("en-US", formats[format as keyof typeof formats]).format(dateObj);
}

export function formatNumber(number: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-US", options).format(number);
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function calculateAge(dateOfBirth: Date | string) {
  const dob = typeof dateOfBirth === "string" ? new Date(dateOfBirth) : dateOfBirth;
  const diffMs = Date.now() - dob.getTime();
  const ageDate = new Date(diffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function getStatusColor(status: string) {
  const statusMap: Record<string, string> = {
    active: "bg-green-500",
    inactive: "bg-gray-500",
    pending: "bg-yellow-500",
    completed: "bg-blue-500",
    cancelled: "bg-red-500",
    paid: "bg-green-500",
    unpaid: "bg-red-500",
    "in-progress": "bg-yellow-500",
    overdue: "bg-red-500",
  };
  
  return statusMap[status.toLowerCase()] || "bg-gray-500";
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function generateRandomId(length: number = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function calculatePercentage(value: number, total: number) {
  if (total === 0) return 0;
  return (value / total) * 100;
}

export function getContrastColor(hexColor: string) {
  // Remove the # if it exists
  hexColor = hexColor.replace("#", "");
  
  // Convert to RGB
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

