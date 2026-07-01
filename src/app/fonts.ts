import { Red_Hat_Display, Space_Mono } from 'next/font/google'

export const fontSans = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const fontMono = Space_Mono({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-mono',
  display: 'swap',
})
