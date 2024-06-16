'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props: {
	[x: string]: any;
	src: any;
	fallbackSrc: any;
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
			width={64}
			height={64}
			className="rounded-full"
		/>
	);
};

export default ImageWithFallback;
//thanks stackoverflow
