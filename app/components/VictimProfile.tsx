'use client';

import { formatTimestamp } from '@/libs/format';
import Image from 'next/image';
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
			<>
				{/* <div
					className={`w-[300px] h-[300px] fixed bg-main z-50 inset-x-0 mx-auto inset-y-0 my-auto transition-transform duration-200 ${
						isVisible ? 'scale-100' : 'scale-0'
					}`}
				></div> */}

				<div
					key={victim.userid}
					className={`w-[800px] h-[600px] bg-darkMain rounded-md text-white overflow-hidden fixed z-50 inset-x-0 mx-auto inset-y-0 my-auto transition-transform duration-200 ${
						isVisible ? 'scale-100' : 'scale-0'
					}`}
				>
					{/* gender banner */}
					<div
						className={`h-16 ${
							victim.gender == '1'
								? 'bg-main'
								: victim.gender === '2'
								? 'bg-pink-300'
								: 'bg-lightMain'
						}`}
					></div>

					{/* icon */}
					<div className="bg-darkMain w-[74px] h-[74px] flex items-center justify-center rounded-full top-6 left-2 absolute">
						<Image
							src={victim.icon}
							alt="icon"
							width={64}
							height={64}
							className="rounded-full"
						/>

						{/* view profile hover effect */}
						<VictimProfile
							victim={JSON.parse(JSON.stringify(victim))}
						/>
					</div>

					{/* tags and description */}
					<div className="h-fit bg-darkMain px-4 pb-4">
						{/* gap (was thinking of adding nitro badge here) */}
						<div className="h-10 my-2 flex items-center justify-end gap-1">
							{/* alt discriminator */}
							{victim.username == 'hiyorishiina' && (
								<p className="bg-darkerMain rounded-lg p-1 font-sans text-[0.8rem] font-light">
									ᴀʟᴛ
								</p>
							)}
							{/* timestamp */}
							<p className="bg-darkerMain rounded-lg p-1 font-sans text-[0.8rem] font-light">
								{formatTimestamp(victim.timestamp)}
							</p>
						</div>
						<div className="h-80 bg-darkerMain rounded-md p-3">
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
								className="h-56 overflow-y-scroll"
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
					} w-screen h-screen top-0 left-0 z-40 transition-opacity duration-200`}
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
