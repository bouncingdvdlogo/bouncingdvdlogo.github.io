import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Bouncing DVD logo',
	description: 'Watch the bouncing DVD logo on the internet',
	metadataBase: new URL('https://bouncingdvdlogo.github.io'),
	openGraph: {
		title: 'Bouncing DVD logo',
		description: 'Watch the bouncing DVD logo on the internet',
	},
	twitter: {
		title: 'Bouncing DVD logo',
		description: 'Watch the bouncing DVD logo on the internet',
		creator: '@minagishl',
		card: 'summary',
	},
	verification: { google: 'osRcS4LozGm8N8EcA9Uu_D8ZgymTHS1GSaBiH_VO5yQ' },
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
