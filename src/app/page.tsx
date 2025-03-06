'use client';

import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/logo';

export default function Home() {
	// Initial values only set the sign; actual speed is calculated later based on the logo size
	const [position, setPosition] = useState({ x: 100, y: 100 });
	const [velocity, setVelocity] = useState({ dx: 1, dy: 1 });
	const [color, setColor] = useState('#f00');
	const logoRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#ffa500'];
		let animationFrameId: number;
		// Reference logo width (e.g., 384px)
		const referenceLogoWidth = 384;
		// Base speed (speed at the reference size)
		const baseSpeed = 1.5;

		const moveLogo = () => {
			setPosition((prevPosition) => {
				// Get screen width and height
				const screenWidth = window.innerWidth;
				const screenHeight = window.innerHeight;

				// Get logo width and height
				const logoWidth = logoRef.current ? logoRef.current.offsetWidth : 100;
				const logoHeight = logoRef.current ? logoRef.current.offsetHeight : 100;

				// Calculate speed factor based on the ratio of the current logo width to the reference width
				const speedFactor = logoWidth / referenceLogoWidth;
				// Calculate new velocity while preserving the sign
				const computedDx = Math.sign(velocity.dx) * baseSpeed * speedFactor;
				const computedDy = Math.sign(velocity.dy) * baseSpeed * speedFactor;

				// Calculate new position
				let newX = prevPosition.x + computedDx;
				let newY = prevPosition.y + computedDy;

				// Logic when you hit the edge of the screen
				let dx = computedDx;
				let dy = computedDy;

				if (newX <= 0 || newX + logoWidth >= screenWidth) {
					dx = -dx; // Reverses horizontal velocity
					newX = newX <= 0 ? 0 : screenWidth - logoWidth;
				}
				if (newY <= 0 || newY + logoHeight >= screenHeight) {
					dy = -dy; // Reverses vertical velocity
					newY = newY <= 0 ? 0 : screenHeight - logoHeight;
				}

				// Set new velocity
				setVelocity({ dx: dx, dy: dy });

				// Change color when logo hits the edge
				if (
					newX <= 0 ||
					newX + logoWidth >= screenWidth ||
					newY <= 0 ||
					newY + logoHeight >= screenHeight
				) {
					setColor(colors[Math.floor(Math.random() * colors.length)]);
				}

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
				<Logo color={color} />
			</div>
		</main>
	);
}
