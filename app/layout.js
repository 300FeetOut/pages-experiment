import './globals.sass'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Pages Experiment',
	description: 'Trying out a page transition idea',
}

export default function RootLayout({ children }) {
	return (
	<html lang="en">
		<body className={inter.className}>{children}</body>
	</html>
	)
}
