'use client';

import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/logo';

export default function Home() {
	const [position, setPosition] = useState({ x: 100, y: 100 });
	const [velocity, setVelocity] = useState({ dx: 2, dy: 2 });
	const logoRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let animationFrameId: number;

		const moveLogo = () => {
			setPosition((prevPosition) => {
				let newX = prevPosition.x + velocity.dx;
				let newY = prevPosition.y + velocity.dy;

				// Get screen width and height
				const screenWidth = window.innerWidth;
				const screenHeight = window.innerHeight;

				// Get logo width and height
				const logoWidth = logoRef.current ? logoRef.current.offsetWidth : 100;
				const logoHeight = logoRef.current ? logoRef.current.offsetHeight : 100;

				// Logic when you hit the edge of the screen
				let dx = velocity.dx;
				let dy = velocity.dy;

				if (newX <= 0 || newX + logoWidth >= screenWidth) {
					dx = -dx; // Reverses horizontal velocity
					newX = newX <= 0 ? 0 : screenWidth - logoWidth;
				}
				if (newY <= 0 || newY + logoHeight >= screenHeight) {
					dy = -dy; // Reverses vertical velocity
					newY = newY <= 0 ? 0 : screenHeight - logoHeight;
				}

				setVelocity({ dx, dy });

				return { x: newX, y: newY };
			});

			animationFrameId = requestAnimationFrame(moveLogo);
		};

		animationFrameId = requestAnimationFrame(moveLogo);

		// Cancel animation when component is unmounted
		return () => cancelAnimationFrame(animationFrameId);
	}, [position, velocity.dx, velocity.dy]); // Changed dependencies to be based on location updates

	return (
		<main className='bg-black h-screen w-screen relative overflow-hidden'>
			<div
				ref={logoRef} // See logo elements
				className='absolute max-w-96'
				style={{
					top: `${position.y}px`,
					left: `${position.x}px`,
					width: '30%',
				}}
			>
				<Logo />
			</div>
		</main>
	);
}
