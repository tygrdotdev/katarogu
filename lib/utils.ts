import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidEmail(email: string): boolean {
  return /.+@.+/.test(email);
}

export const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE!) ?? 12582912; // 12 MB