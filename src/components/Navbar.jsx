// 'use client'
// import React from "react";
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

// function Navbar() {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const userEmail = localStorage.getItem("email");

//     const style = {
//         position: 'absolute',
//         top: '75px',
//         right: '0',
//         mr: '80px',
//         height: '300px',
//         width: '410px',
//         bgcolor: 'background.paper',
//         boxShadow: '24px 36px 64px -14px rgba(161, 161, 165, 0.15)',
//         pt: '11px',
//         outline: 'none',
//         border: '1px solid #F5F5F7',
//         borderRadius: "8px"
//     };
//     return (<div>
//         <section class="container-fluid shadow-2xl border">
//             <div class="container mx-auto flex flex-col md:flex-row items-center place-content-between py-4 gap-y-2">
//                 <div class="flex flex-row gap-x-2">
//                     <img class="w-12 border-4 border-black rounded-full" src="./img/awards-logo1.png" alt="" />
//                     <div class="h-[35px] border-l-2 border-[#D2D2D7]"></div>
//                     <p class="inline-flex border p-2 bg-[#F5F5F7] rounded-md px-6 cursor-pointer items-center"><img src="./img/svg/map-pin.svg" alt="" /><span class="text-[#87878C]">Ship to &nbsp;</span>Brisbane, Queensland </p>
//                 </div>
//                 <div class="flex ">
//                     <img class="w-full" src="./logo.png" alt="" />
//                 </div>
//                 <div class="flex flex-row gap-x-6">
//                     <a href="" class="flex inline-flex hover:scale-125 active:scale-75 duration-700">
//                         <img class="mt-3" src="/img/svg/bell.svg" alt="" />
//                         <div class="bg-[#D0011B] text-white text-base h-fit -ml-4 rounded-full px-1 font-bold border-[4px] border-white animate-pulse"> 10</div>
//                     </a>
//                     <a href="" class="flex inline-flex hover:scale-125 active:scale-75 duration-300">
//                         <img class="mt-3" src="/img/svg/heart.svg" alt="" />
//                         <p class="bg-[#D0011B] text-white text-base h-fit -ml-4 rounded-full px-1 font-bold border-[4px] border-white animate-pulse">15</p>
//                     </a>
//                     <a href="" class="flex inline-flex hover:scale-125 active:scale-75 duration-300">
//                         <img class="mt-3" src="/img/svg/cart.svg" alt="" />
//                         <p class="bg-[#D0011B] text-white text-base h-fit -ml-4 rounded-full px-1 font-bold border-[4px] border-white animate-pulse">20</p>
//                     </a>
//                     <div class="border-l-2 border-[#D2D2D7]">
//                         {/* {userEmail &&
//                   <a href="/user" class="inline-flex items-center"> */}
//                         <div class="inline-flex items-center w-[129px] h-[48px] bg-[#F5F5F7]" style={{ borderRadius: "8px" }}>
//                             <img class="w-12 rounded-full" src="./img/profile-img.png" alt="" />&nbsp;
//                             <p class="font-bold hidden lg:block" onClick={handleOpen}>Manda <span class="text-[10px]">▼</span></p>
//                         </div>
//                         {/* </a>} */}
//                         {!userEmail &&
//                             <div class="flex flex-row items-center justify-center">
//                                 <a class="text-sm font-medium px-4 py-2 rounded-md border-2 border-[#1D1D1F] mx-2" href="/log-in">Sign in</a>
//                                 <a class="text-sm font-medium px-4 py-2 bg-[#1D1D1F] text-[#fff] rounded-md border-2 border-[#1D1D1F] mx-2" href="/register">Register</a>
//                             </div>}

//                     </div>
//                 </div>
//                 {open && <Modal
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="modal-modal-title"
//                     aria-describedby="modal-modal-description"
//                 >
//                     <Box sx={style}>
//                         <div class="mx-[30px] mt-[15px] mb-[10px]">
//                             <div class="flex flex-row items-center justify-between pb-4" style={{ borderBottom: "1px solid #ECECEE" }}>
//                                 <div class="flex items-center">
//                                     <div>
//                                         <img class="w-12 rounded-full" src="./img/profile-img.png" alt="" />
//                                     </div>
//                                     <div class="flex flex-col">
//                                         <p class="font-bold hidden lg:block ml-1.5 font-black not-italic text-lg">Manda</p>
//                                         <div class="flex flex-row  ml-1.5">
//                                             <img src="./img/star.png" alt="star" />
//                                             <p class="text-[#87878C] not-italic font-medium text-xs ml-0.5">MEMBER</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="flex items-center justify-center w-10 h-10 bg-[#F5F5F7] rounded-lg">
//                                     <img src="./img/setting.png" alt="settings" />
//                                 </div>
//                             </div>
//                             <div class="pb-4" style={{ borderBottom: "1px solid #ECECEE" }}>
//                                 <div class="flex flex-row mt-3.5">
//                                     <img src="../img/genx.png" />
//                                     <p class="text-sm text-[ #1D1D1F] font-medium ml-3">My Genx</p>
//                                 </div>
//                                 <div class="flex flex-row mt-3.5">
//                                     <img src="../img/wishlist.png" alt="wishlist" />
//                                     <p class="text-sm text-[ #1D1D1F] font-medium ml-3">Wishlist</p>
//                                     <p className="pl-[16rem] text-sm text-[ #1D1D1F] font-black">22</p>
//                                 </div>
//                                 <div class="flex flex-row mt-3.5">
//                                     <img src="../img/vouchers.png" alt="vouchers" />
//                                     <p class="text-sm text-[ #1D1D1F] font-medium ml-3">Vouchers</p>
//                                     <p className="pl-[16rem] text-sm text-[ #1D1D1F] font-black">3</p>
//                                 </div>
//                                 <div class="flex flex-row mt-3.5">
//                                     <img src="../img/genx.png" />
//                                     <p class="text-sm text-[ #1D1D1F] font-medium ml-3">Previous Orders</p>
//                                 </div>
//                             </div>
//                             <div class="flex flex-row mt-3.5">
//                                 <img src="../img/Logout.png" />
//                                 <p class="text-sm text-[#87878C] font-medium ml-3">Sign Out</p>
//                             </div>
//                         </div>
//                     </Box>
//                 </Modal>}
//             </div>
//         </section>

//     </div>)
// }
// export default Navbar;