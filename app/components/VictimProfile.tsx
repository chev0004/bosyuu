'use client';

import { useState, useEffect } from 'react';

const VictimProfile = ({ victim }: any) => {
	const [showProfile, setShowProfile] = useState(false);

	const Profile = () => {
		const [isVisible, setIsVisible] = useState(false);

		useEffect(() => {
			setIsVisible(true);
		}, []);

		const toggleProfile = () => {
			setIsVisible(false);
			setTimeout(() => {
				setShowProfile(false);
			}, 300);
		};

		return (
			<div
				className={`fixed bg-black opacity-${
					isVisible ? '40' : '0'
				} w-screen h-screen top-0 left-0 z-40 transition-opacity duration-100`}
				onClick={toggleProfile}
			></div>
		);
	};

	return (
		<>
			{showProfile && <Profile />}
			<div
				className="opacity-0 hover:opacity-100 absolute transition-opacity duration-100 flex items-center justify-center hover:cursor-pointer"
				onClick={() => setShowProfile(!showProfile)}
			>
				<p className="text-white absolute text-[11px] text-center z-20 font-semibold select-none">
					VIEW PROFILE
				</p>
				<div className="opacity-40 bg-black w-[64px] h-[64px] rounded-full"></div>
			</div>
		</>
	);
};

export default VictimProfile;
