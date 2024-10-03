'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props: {
	[x: string]: any;
	src: string;
	fallbackSrc: string;
	width?: number;
	height?: number;
}) => {
	const { src, fallbackSrc, ...rest } = props;
	const [imgSrc, setImgSrc] = useState(src);

	const checkImageExists = async (url: string) => {
		try {
			const response = await fetch(url, { method: 'HEAD' });
			return response.ok; // Returns true if status is 2xx
		} catch (error) {
			return false; // Handle network errors
		}
	};

	useEffect(() => {
		const checkImage = async () => {
			const exists = await checkImageExists(src);
			setImgSrc(exists ? src : fallbackSrc);
		};

		checkImage();
	}, [src, fallbackSrc]); // Re-run when src or fallbackSrc changes

	return (
		<Image
			{...rest}
			src={imgSrc}
			alt="icon"
			width={props.width}
			height={props.height}
			className="rounded-full"
		/>
	);
};

export default ImageWithFallback;
//thanks stackoverflow
