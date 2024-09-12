import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Bouncing DVD logo',
	description: 'Watch the bouncing DVD logo on the internet',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
