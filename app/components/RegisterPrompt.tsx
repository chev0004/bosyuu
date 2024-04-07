// 'use client';

// import { useState } from 'react';
// import { RxCross1 } from 'react-icons/rx';

// const RegisterPrompt = (props: any) => {
//     const [visible, setVisible] = useState(props.victimData.valid === false);
//     if (props.victimData && props.victimData.valid === false) {
//         return (
//             <div
//                 className={`flex justify-center ${
//                     visible ? 'opacity-100' : 'opacity-0'
//                 }`}
//             >
//                 <div
//                     className={
//                         'bg-discordYellow z-10 w-full pl-5 pr-2 h-8 text-black flex justify-center items-center fixed opacity-100 bottom-0'
//                     }
//                 >
//                     <p>
//                         Edit your{' '}
//                         <a
//                             style={{
//                                 cursor: 'pointer',
//                                 textDecoration: 'underline',
//                             }}
//                             href='/profile'
//                         >
//                             profile
//                         </a>{' '}
//                         to bump and display it.
//                     </p>
//                     <button
//                         onClick={() => setVisible(false)}
//                         className='cursor-pointer right-4 absolute'
//                     >
//                         <RxCross1 size={12} />
//                     </button>
//                 </div>
//             </div>
//         );
//     }
// };

// export default RegisterPrompt;
