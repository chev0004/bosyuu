'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const Profile = (props: any) => {
	const [isChanged, setIsChanged] = useState(false);

	//prevent refresh
	useEffect(() => {
		if (!isChanged) return;

		const handleWindowClose = (event: any) => {
			event.preventDefault();
		};
		window.addEventListener('beforeunload', handleWindowClose);

		return () => {
			window.removeEventListener('beforeunload', handleWindowClose);
		};
	}, [isChanged]);

	//victim data
	const { victim } = props;

	//set ref to null for now
	const inputRef = useRef<HTMLInputElement>(null);

	//state variables
	const [error, setError] = useState('');
	const [tags, setTags] = useState(victim?.tags || []);
	const [gender, setGender] = useState(victim?.gender || '3');
	const [description, setDescription] = useState(victim?.description || '');

	//tag addition handler
	useEffect(() => {
		const handleKeyDown = (event: any) => {
			if (event.key === 'Enter') {
				//if enter key is pressed
				event.preventDefault();
				const inputValue = event.target.value;
				setIsChanged(true);

				//error checking
				switch (true) {
					case inputValue.length >= 23:
						return setError(
							'Each tag must be less than 23 characters.'
						);
					case inputValue.length < 2:
						return setError(
							'Each tag must be at least 2 characters.'
						);
					case tags.includes(inputValue):
						return setError('you already have this tag bro');
					case tags.length >= 6:
						return setError('You can only have 6 tags.');
				}

				const updatedTags = [...tags, inputValue]; //add new tag to existing array
				setTags(updatedTags); //update tags
				setError(''); //clear errors
				event.target.value = ''; //clear input box
			}
		};

		//add event listener to input
		const inputElement: any = inputRef.current;

		//add event listener
		if (inputElement) {
			inputElement.addEventListener('keydown', handleKeyDown);
		}

		//remove event listener
		return () => {
			if (inputElement) {
				inputElement.removeEventListener('keydown', handleKeyDown);
			}
		};
	}, [tags]);

	//tag addition button for small screens
	const tagAdditionButton = () => {
		if (inputRef.current) {
			const event = new KeyboardEvent('keydown', {
				key: 'Enter',
			});
			inputRef.current.dispatchEvent(event);
		}
	};

	//tag removal
	const removeTag = (index: number) => {
		setIsChanged(true);
		const updatedTags = [...tags];
		updatedTags.splice(index, 1);
		setTags(updatedTags);
	};

	//submit states
	const [loading, setLoading] = useState(false);
	const [popup, setPopup] = useState(false);

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		setIsChanged(false);

		//for button
		setLoading(true);

		//data to pass
		const formData = {
			description: description,
			tags: tags,
			gender: gender,
		};

		//fake loading
		await new Promise((resolve: any) => {
			setTimeout(() => {
				setLoading(false);
				resolve();
			}, 1000);
		});

		//error checking
		switch (true) {
			case tags.length > 6:
				setLoading(false);
				return setError('You can only have 6 tags.');
			case !description:
				setLoading(false);
				return setError('You must have a description.');
		}

		//pass data to server
		props.updateProfile(formData);

		//clear errors and remove popup after 4 seconds of displaying it
		setError('');
		setPopup(true);
		setTimeout(() => {
			setPopup(false);
		}, 4000);
	};

	//remaining time calculator
	const calculateRemainingTime = (cooldownTime: number) => {
		return Math.max(0, cooldownTime - Date.now());
	};

	//bump states
	const [bumping, setBumping] = useState(false);
	const [bumpPopup, setBumpPopup] = useState(false);
	const [bumpCooldown, setBumpCooldown] = useState(victim?.cooldown);
	const [remainingTime, setRemainingTime] = useState(
		calculateRemainingTime(bumpCooldown)
	);

	const cooldownTime = 12 * 60 * 60 * 1000; //12 hours

	//initial fixed number for button
	const initialRemaining = calculateRemainingTime(bumpCooldown);

	//update bump cooldown time when component mounts
	useEffect(() => {
		setBumpCooldown(bumpCooldown + cooldownTime);
	}, [cooldownTime]);

	//update remaining time every second
	useEffect(() => {
		const timer = setInterval(() => {
			const remaining = calculateRemainingTime(bumpCooldown);
			setRemainingTime(remaining);
		}, 1000);

		return () => clearInterval(timer);
	}, [bumpCooldown, cooldownTime]);

	const handleBump = async (event: any) => {
		event.preventDefault();

		//check if the user clicked too soon
		if (Date.now() - victim?.cooldown < 43200000) {
			return setError('You must wait 12 hours before bumping again.');
		}

		setBumping(true);

		//wait 2 seconds (for fake loading)
		await new Promise((resolve: any) => {
			setTimeout(() => {
				setBumping(false);
				resolve();
			}, 2000);
		});

		//display popup and update cooldown
		setBumpPopup(true);
		setBumpCooldown(Date.now() + cooldownTime);

		//profil bumpening
		props.bumpProfile();

		//remove popup
		setTimeout(() => {
			setBumpPopup(false);
		}, 4000);
	};

	//time formatting
	const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
	const remainingMinutes = Math.floor(
		(remainingTime % (1000 * 60 * 60)) / (1000 * 60)
	);
	const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

	return (
		<div className="flex items-center justify-center py-20 px-11 gap-8">
			{/* profile preview */}
			<div
				key={victim?.userid}
				className="bg-darkMain rounded-md text-white overflow-hidden relative h-fit w-[400px] hidden lg:block"
			>
				{/* gender banner */}
				<div
					className={`h-16 ${
						gender == '1'
							? 'bg-main'
							: gender === '2'
							? 'bg-pink-300'
							: 'bg-lightMain'
					}`}
				></div>

				{/* icon */}
				<div className="bg-darkMain w-[74px] h-[74px] flex items-center justify-center rounded-full top-6 left-2 absolute">
					<Image
						src={victim?.icon}
						alt="icon"
						width={64}
						height={64}
						className="rounded-full"
					/>
				</div>

				{/* tags and description */}
				<div className="h-fit bg-darkMain px-4 pb-4">
					{/* gap (was thinking of adding nitro badge here) */}
					<div className="h-10 my-2 flex items-center justify-end"></div>
					<div className="h-80 bg-darkerMain rounded-md p-3">
						{/* global name */}
						<p className="text-white font-semibold font-sans text-lg">
							{victim?.displayname}
						</p>
						{/* username */}
						<p className="text-white font-sans font-medium text-[0.7rem] rounded-full">
							{victim?.username}
						</p>
						{/* divider line */}
						<div className="mt-2 mb-2 bg-darkMain w-12/12 h-[2px]"></div>
						{/* scrollable container for tags and description */}
						<div className="h-56 overflow-y-scroll">
							{/* shrunken div for scroll space */}
							<div className="w-[94%] text-wrap">
								{tags.length !== 0 && (
									<div>
										{/* tags (as if I can't tell) */}
										<p className="text-white font-sans font-semibold text-[0.8rem]">
											Tags
										</p>
										<div className="flex flex-row gap-1 flex-wrap">
											{tags.map(
												(
													tag: string,
													index: React.Key
												) => (
													<div
														key={index}
														className="text-white font-sans text font-light text-[0.86rem] bg-back rounded-md w-fit h-fit p-1 flex flex-row gap-1 flex-wrap items-center"
													>
														{/* dot thing */}
														<div className="w-1 h-1 rounded-full bg-white"></div>
														{tag}
													</div>
												)
											)}
										</div>
									</div>
								)}
								<p className="text-white font-sans font-semibold text-[0.8rem]">
									Description
								</p>
								<p className="text-white font-sans text font-light text-[0.86rem] break-words">
									{
										//damn wtf I can't display \n's
										description
											.split('\n')
											.map((i: string, j: React.Key) => {
												return (
													<span key={j}>
														{i}
														<br />
													</span>
												);
											})
									}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* main form */}
			<form
				className="bg-darkMain flex justify-center p-4 w-[900px] h-fit flex-wrap rounded-md relative"
				onSubmit={handleSubmit}
			>
				{/* bump popup */}
				<div
					className={`bg-discordBlue absolute z-10 w-40 h-8 text-white flex justify-center items-center ${
						bumpPopup
							? 'opacity-100 -top-[40px]'
							: 'opacity-0 -top-[64px]'
					} transition-max-height duration-500`}
				>
					<p>Profile bumped!</p>
				</div>
				{/* update popup */}
				<div
					className={`bg-discordBlue absolute z-10 w-40 h-8 text-white flex justify-center items-center ${
						popup
							? 'opacity-100 -top-[40px]'
							: 'opacity-0 -top-[64px]'
					} transition-max-height duration-500`}
				>
					<p>Profile updated!</p>
				</div>
				{/* error popup */}
				{error && (
					<div className="bg-red-500 absolute w-full rounded-md text-center -top-[24px] text-white">
						{error}
					</div>
				)}
				{/* tags parent */}
				<div className="w-full h-fit bg-darkerMain relative">
					{/* tags */}
					<div
						className={`flex gap-1 flex-wrap ${
							tags.length === 0 ? 'h-9' : 'h-fit'
						} bg-darkerMain rounded-md items-center p-1`}
					>
						{tags.map((tag: string, index: number) => (
							<div
								key={index}
								className="text-white font-sans text font-light text-[0.86rem] bg-back rounded-md w-fit h-fit p-1 flex flex-row gap-1 flex-wrap items-center"
							>
								{tag}
								{/* x buttons */}
								<button
									type="button"
									onClick={() => removeTag(index)}
									className="bg-darkerMain h-3 w-3 rounded-full flex justify-center items-center"
								>
									<div className="bg-white h-[1px] w-[8px]  rounded-full rotate-45 absolute"></div>
									<div className="bg-white h-[1px] w-[8px]  rounded-full -rotate-45 absolute"></div>
								</button>
							</div>
						))}
					</div>
					{/* divider */}
					<div className="flex justify-center">
						<div className="bg-back w-[94%] h-[2px]"></div>
					</div>
					{/* tag input field */}
					<input
						ref={inputRef}
						placeholder="Enter profile tags"
						autoComplete="off"
						onChange={(e) => {
							e.preventDefault();
							setIsChanged(true);
						}}
						className="bg-darkerMain mt-1 font-sans font-light text-sm rounded-md focus:ring-0 focus:outline-none h-9 w-full p-4 text-white"
					/>
					{/* add tag button */}
					<div className="absolute right-2 -bottom-1">
						<button
							title="Add New"
							className="group cursor-pointer outline-none hover:rotate-90 duration-300"
							onClick={tagAdditionButton}
							type="button"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="30px"
								height="30px"
								viewBox="0 0 24 24"
								className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
							>
								<path
									d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
									strokeWidth="1.5"
								></path>
								<path d="M8 12H16" strokeWidth="1.5"></path>
								<path d="M12 16V8" strokeWidth="1.5"></path>
							</svg>
						</button>
					</div>
					{/* <button
						className="bg-white h-6 w-14 absolute bottom-2 right-2 rounded-md text-[0.8rem] font-light font-sans text-center hover:opacity-90 lg:hidden"
						onClick={tagAdditionButton}
						type="button"
					>
						Add
					</button> */}
				</div>
				{/* gender and description box */}
				<div className="w-full h-fit">
					{/* description parent div */}
					<div className="bg-darkerMain mt-1 rounded-md focus:ring-0 h-36 w-full pb-4 relative">
						{/* description field */}
						<textarea
							placeholder="Enter profile description"
							defaultValue={description}
							onChange={(e) => {
								setIsChanged(true);
								setDescription(e.target.value);
							}}
							autoComplete="off"
							maxLength={604}
							className="bg-darkerMain text-wrap mt-1 resize-none font-sans font-light text-sm rounded-md focus:ring-0 focus:outline-none h-full w-full p-2 text-white text-start"
						/>
						{/* character counter */}
						<p className="text-gray-400 font-sans font-light justify-end text-[0.74rem] absolute -bottom-5 right-2">
							{description.length}/604
						</p>
					</div>
					{/* gender div */}
					<div className="flex justify-center flex-col mt-5 w-fit bg-darkerMain px-4 pb-4 pt-1 rounded-md ">
						<div className="flex justify-center items-center">
							<p className="text-gray-400 font-sans font-light text-[0.74rem]">
								Gender
							</p>
						</div>
						{/* radio buttons */}
						<label className="text-white hover:cursor-pointer font-sans font-light text-sm h-fit flex items-center gap-2 flex-row-reverse justify-end">
							<input
								type="radio"
								name="gender"
								value="1"
								className="hidden peer"
								checked={gender === '1'}
								onChange={(e) => {
									setIsChanged(true);
									setGender(e.target.value);
								}}
							></input>
							Male
							<div className="hidden peer-checked:visible peer-checked:flex border-[1px] outline-slate-400 h-4 w-4 rounded-full relative items-center justify-center peer-checked:">
								<div className="bg-white h-[6px] w-[6px] rounded-full absolute"></div>
								<div className="bg-white h-4 w-4 rounded-full scale-150 absolute opacity-0 hover:opacity-15"></div>
							</div>
							<div className="border-[1px] outline-slate-400 h-4 w-4 rounded-full relative flex items-center justify-center peer-checked:hidden">
								<div className="bg-white h-4 w-4 rounded-full scale-150 absolute opacity-0 hover:opacity-15"></div>
							</div>
						</label>
						<label className="text-white hover:cursor-pointer font-sans font-light text-sm h-fit flex items-center gap-2 flex-row-reverse justify-end">
							<input
								type="radio"
								name="gender"
								value="2"
								className="hidden peer"
								checked={gender === '2'}
								onChange={(e) => {
									setIsChanged(true);
									setGender(e.target.value);
								}}
							></input>
							Female
							<div className="hidden peer-checked:visible peer-checked:flex border-[1px] outline-slate-400 h-4 w-4 rounded-full relative items-center justify-center peer-checked:">
								<div className="bg-white h-[6px] w-[6px] rounded-full absolute"></div>
								<div className="bg-white h-4 w-4 rounded-full scale-150 absolute opacity-0 hover:opacity-15"></div>
							</div>
							<div className="border-[1px] outline-slate-400 h-4 w-4 rounded-full relative flex items-center justify-center peer-checked:hidden">
								<div className="bg-white h-4 w-4 rounded-full scale-150 absolute opacity-0 hover:opacity-15"></div>
							</div>
						</label>
						<label className="text-white hover:cursor-pointer font-sans font-light text-sm h-fit flex items-center gap-2 flex-row-reverse justify-end">
							<input
								type="radio"
								name="gender"
								value="3"
								className="hidden peer"
								checked={gender === '3'}
								onChange={(e) => {
									setIsChanged(true);
									setGender(e.target.value);
								}}
							></input>
							Do not display
							<div className="hidden peer-checked:visible peer-checked:flex border-[1px] outline-slate-400 h-4 w-4 rounded-full relative items-center justify-center peer-checked:">
								<div className="bg-white h-[6px] w-[6px] rounded-full absolute"></div>
								<div className="bg-white h-4 w-4 rounded-full scale-150 absolute opacity-0 hover:opacity-15"></div>
							</div>
							<div className="border-[1px] outline-slate-400 h-4 w-4 rounded-full relative flex items-center justify-center peer-checked:hidden">
								<div className="bg-white h-4 w-4 rounded-full scale-150 absolute opacity-0 hover:opacity-15"></div>
							</div>
						</label>
					</div>
				</div>
				{/* bump and update */}
				<div className="flex justify-end w-full gap-4 mt-4">
					{/* bump button */}
					<button
						className={
							initialRemaining > 0 || bumping
								? 'cursor-not-allowed opacity-50 w-28 h-8 text-black bg-white rounded-md p-2 text-[0.8rem] font-sans font-light'
								: 'w-28 h-8 text-black bg-white rounded-md p-2 text-[0.8rem] font-sans font-light hover:opacity-90'
						}
						onClick={handleBump}
						type="button"
						disabled={initialRemaining > 0}
					>
						{remainingTime > 0
							? `${
									remainingHours < 10
										? `0${remainingHours}`
										: remainingHours
							  }:${
									remainingMinutes < 10
										? `0${remainingMinutes}`
										: remainingMinutes
							  }:${
									remainingSeconds < 10
										? `0${remainingSeconds}`
										: remainingSeconds
							  }`
							: bumping
							? 'Bumping....'
							: 'Bump profile'}
					</button>
					{/* update button */}
					<button
						className={
							loading
								? 'cursor-not-allowed opacity-50 w-28 h-8 text-black bg-white rounded-md p-2 text-[0.8rem] font-sans font-light'
								: 'w-28 h-8 text-black bg-white rounded-md p-2 text-[0.8rem] font-sans font-light hover:opacity-90'
						}
						type="submit"
						disabled={loading}
					>
						{loading ? 'Updating....' : 'Update profile'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Profile;
