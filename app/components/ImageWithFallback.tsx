'use client';

import React, { useState } from 'react';
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

	return (
		<Image
			{...rest}
			src={imgSrc}
			onError={() => {
				setImgSrc(fallbackSrc);
			}}
			alt="icon"
			width={props.width}
			height={props.height}
			className="rounded-full"
		/>
	);
};

export default ImageWithFallback;
//thanks stackoverflow
