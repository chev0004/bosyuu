'use client';

import { formatTimestamp } from '@/libs/format';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ImageWithFallback from './ImageWithFallback';

const VictimProfile = ({ victim }: any) => {
	const [showProfile, setShowProfile] = useState(false);

	const Profile = () => {
		const [isVisible, setIsVisible] = useState(false);

		useEffect(() => {
			document.body.classList.remove(`overflow-scroll`);
			document.body.classList.add(`overflow-hidden`);
			setIsVisible(true);
		}, []);

		const toggleProfile = () => {
			document.body.classList.remove(`overflow-hidden`);
			document.body.classList.add(`overflow-scroll`);
			setIsVisible(false);
			setTimeout(() => {
				setShowProfile(false);
			}, 300);
		};

		return (
			<>
				{}
				<div
					key={victim.userid}
					className={`w-[700px] h-[600px] bg-darkMain rounded-xl text-white overflow-hidden fixed z-50 inset-x-0 mx-auto inset-y-0 my-auto transition-all duration-1000 ${
						isVisible ? 'scale-100 opacity-100' : 'opacity-0'
					}`}
				>
					{/* gender banner */}
					<div
						className={`h-[6rem] ${
							victim.gender == '1'
								? 'bg-main'
								: victim.gender === '2'
								? 'bg-pink-300'
								: 'bg-lightMain'
						}`}
					></div>

					{/* icon */}
					<div className="bg-darkMain w-[134px] h-[134px] flex items-center justify-center rounded-full top-8 left-4 absolute">
						<ImageWithFallback
							src={victim.icon}
							fallbackSrc={`/default.png`}
							width={114}
							height={114}
						/>
					</div>

					{/* tags and description */}
					<div className="h-full bg-darkMain px-4 pt-">
						{/* gap (was thinking of adding nitro badge here) */}
						<div className="h-14 my-2 flex items-center justify-end gap-1">
							{/* alt discriminator */}
							{victim.username == 'hiyorishiina' && (
								<p className="bg-darkerMain rounded-lg p-1 font-sans text-[0.8rem] font-light">
									ᴀʟᴛ
								</p>
							)}
							{/* timestamp */}
							<p className="bg-darkerMain rounded-lg p-1 font-sans text-[0.8rem] font-light">
								{`Bumped ${formatTimestamp(victim.timestamp)}`}
							</p>
						</div>
						<div className="h-[416px] bg-darkerMain rounded-md p-3">
							{/* global name */}
							<p className="text-white font-semibold font-sans text-lg">
								{victim.displayname}
							</p>
							{/* username */}
							<p className="text-white font-sans font-medium text-[0.7rem] rounded-full">
								{victim.username}
							</p>
							{/* divider line */}
							<div className="mt-2 mb-2 bg-darkMain w-12/12 h-[2px]"></div>
							{/* scrollable container for tags and description */}
							<div
								className="h-[330px] overflow-y-scroll "
								id="jailcell"
							>
								{/* shrunken div for scroll space */}
								<div className="w-[94%]">
									{victim.tags.length !== 0 && (
										<div>
											{/* tags (as if I can't tell) */}
											<p className="text-white font-sans font-semibold text-[0.8rem]">
												Tags
											</p>
											<div className="flex flex-row gap-1 flex-wrap">
												{victim.tags.map(
													(
														tag: string,
														index: React.Key
													) => (
														<a
															key={index}
															className="text-white font-sans text font-light text-[0.86rem] bg-back rounded-md w-fit h-fit p-1 flex flex-row gap-1 flex-wrap items-center"
															href={`/board?tag=${tag}`}
														>
															{/* dot thing */}
															<div className="w-1 h-1 rounded-full bg-white"></div>
															{tag}
														</a>
													)
												)}
											</div>
										</div>
									)}
									<p className="text-white font-sans font-semibold text-[0.8rem]">
										Description
									</p>
									<p className="text-white font-sans text font-light text-[0.86rem]">
										{
											//damn wtf I can't display \n's
											victim.description
												.split('\n')
												.map(
													(
														i: string,
														j: React.Key
													) => {
														return (
															<span key={j}>
																{i}
																<br />
															</span>
														);
													}
												)
										}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					className={`fixed bg-black opacity-${
						isVisible ? '40' : '0'
					} w-screen h-screen top-0 left-0 z-40 transition-opacity duration-200 `}
					onClick={toggleProfile}
				></div>
			</>
		);
	};

	return (
		<>
			{showProfile && <Profile />}
			<div
				className="opacity-0 hover:opacity-100 absolute transition-opacity duration-100 flex items-center justify-center hover:cursor-pointer"
				onClick={() => setShowProfile(true)}
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
