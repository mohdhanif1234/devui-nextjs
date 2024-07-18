import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function bytesToMb(bytes: number): number {
  const MB = 1048756
  return bytes / MB;
}

export function getRandomNumber(min: number, max: number): string {
  return Math.floor(Math.random() * (max - min + 1)).toString()
}
