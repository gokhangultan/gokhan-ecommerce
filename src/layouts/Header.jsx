import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from 'react';

export default function Header() {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenuVisibility = () => {
        setMenuVisible(!isMenuVisible);
    };

    return (
        <header className={`xl:mx-[118px] lg:mx-[30px] md:mx-[15px] mx-[10px] xl:h-[91px] lg:h-[91px] md:h-[91px] sm:h-[91px] ${isMenuVisible ? 'h-[441px]' : ''} pt-4`} >
            <div className='flex '>
                <div className='hidden  sm:flex xl:flex lg:flex md:flex basis-2/5 '>
                    <h3 className=' font-container xl:mx-[136px] lg:mx-[40px] md:mx-[20px] mx-[5px] text-[24px] font-bold font- text-[#252B42] leading-8'>BrandName</h3>
                </div>
                <div className=' sm:flex xl:flex lg:flex md:flex basis-4/5 mx-1'>
                    <nav className=' hidden  sm:flex xl:flex lg:flex md:flex xl:gap-4 sm:gap-2'>
                        <button>Home</button>
                        <button>Shop</button>
                        <button>About</button>
                        <button>Blog</button>
                        <button>Contact</button>
                        <button>Pages</button>
                    </nav>
                </div>
                <div className='flex basis-2/5 mx-1'>
                    <div className=' hidden  sm:flex xl:flex lg:flex md:flex gap-4 '>
                        <button className='font-container  text-primaryColor text-sm '><FontAwesomeIcon icon={faUser} /> Login / Register</button>
                        <button className='font-container text-primaryColor text-sm'><FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
                        <button className='font-container text-primaryColor text-sm'><FontAwesomeIcon icon={faCartShopping} /> 1</button>
                        <button className='font-container text-primaryColor text-sm'><FontAwesomeIcon icon={faHeart} /> 1</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
            <div className='flex  mobile-logo'>
                    <h3 className=' font-container xl:mx-[136px] lg:mx-[40px] md:mx-[20px] mx-[5px] text-[24px] font-bold font- text-[#252B42] leading-8 pb-2'>BrandName</h3>
                </div>
            <div className='flex-2 mx-1 my-2 font-menu'>
                    <div className='flex gap-4 '>
                        <button className='font-container text-secondaryColor text-sm'><FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
                        <button className='font-container text-secondaryColor text-sm '><FontAwesomeIcon icon={faCartShopping} /> </button>
                        <button onClick={toggleMenuVisibility} className="text-secondaryColor" ><FontAwesomeIcon icon={faBars} /></button>
                    </div>
                </div>
                </div>
            <div className={`mobile-menu  ${isMenuVisible ? '' : 'hidden'}`}>
                <nav className='2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden mt-5 gap-4'>
                    <button className='text-[30px] leading-[45px] font-container text-secondaryColor'>Home</button>
                    <button className='text-[30px] leading-[45px] font-container text-secondaryColor'>Product</button>
                    <button className='text-[30px] leading-[45px] font-container text-secondaryColor'>Pricing</button>
                    <button className='text-[30px] leading-[45px] font-container text-secondaryColor'>Contact</button>
                </nav>
            </div>
        </header>
    );
}
