'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props: {
	src: string;
	fallbackSrc: string;
	width?: number;
	height?: number;
	[x: string]: any;
}) => {
	const { src, fallbackSrc, ...rest } = props;
	const [imgSrc, setImgSrc] = useState(src);

	return (
		<Image
			{...rest}
			src={imgSrc}
			alt="icon"
			width={props.width}
			height={props.height}
			className="rounded-full"
			onError={() => setImgSrc(fallbackSrc)}
			priority={true}
		/>
	);
};

export default ImageWithFallback;
