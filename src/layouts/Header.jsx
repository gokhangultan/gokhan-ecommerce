import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faMagnifyingGlass, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header({ direction, ...args }) {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleMenuVisibility = () => {
        setMenuVisible(!isMenuVisible);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className={`xl:mx-[118px] lg:mx-[30px] md:mx-[15px] mx-[10px] lg:h-[91px] ${isMenuVisible ? 'h-[441px]' : ''} pt-4`}>
            <div className='flex'>
                <div className='hidden sm:hidden xl:flex lg:flex md:hidden basis-2/5'>
                    <h3 className='xl:mx-[136px] lg:mx-[40px] md:mx-[20px] mx-[5px] text-[24px] font-bold text-[#252B42] leading-8'>BrandName</h3>
                </div>
                <div className='sm:hidden xl:flex lg:flex md:hidden basis-4/5 mx-1'>
                    <nav className='hidden sm:flex xl:flex lg:flex md:flex xl:gap-4 sm:gap-2'>
                        <button>Home</button>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} direction={direction}>
                            <DropdownToggle caret className="text-black border-none mt-1 hover:bg-gray-300">Shop</DropdownToggle>
                            <DropdownMenu {...args}>
                                <DropdownItem text>Team</DropdownItem>
                                <DropdownItem disabled>Action (disabled)</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem header>Category</DropdownItem>
                                <DropdownItem tag={Link} to="/products">For Men</DropdownItem>
                                <DropdownItem tag={Link} to="/products">For Women</DropdownItem>
                                <DropdownItem tag={Link} to="/products">Accessories</DropdownItem>
                                <DropdownItem tag={Link} to="/products">For Kids Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <button>About</button>
                        <button>Blog</button>
                        <button>Contact</button>
                        <button>Pages</button>
                    </nav>
                </div>
                <div className='flex basis-2/5 mx-1'>
                    <div className='hidden sm:hidden xl:flex lg:flex md:hidden gap-4'>
                        <button className='header-button'><FontAwesomeIcon icon={faUser} /> Login / Register</button>
                        <button className='header-button'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        <button className='header-button'><FontAwesomeIcon icon={faCartShopping} /> 1</button>
                        <button className='header-button'><FontAwesomeIcon icon={faHeart} /> 1</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className='flex lg:hidden'>
                    <h3 className='xl:mx-[136px] lg:mx-[40px] md:mx-[20px] mx-[5px] text-[24px] font-bold text-[#252B42] leading-8 pb-2'>BrandName</h3>
                </div>
                <div className='flex-2 mx-1 my-2 flex lg:hidden'>
                    <div className='flex gap-4'>
                        <button className='text-secondaryColor text-sm'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        <button className='text-secondaryColor text-sm'><FontAwesomeIcon icon={faCartShopping} /></button>
                        <button onClick={toggleMenuVisibility} className="text-secondaryColor"><FontAwesomeIcon icon={faBars} /></button>
                    </div>
                </div>
            </div>
            <div className={`${isMenuVisible ? 'flex flex-col' : 'hidden'}`}>
                <nav className='flex lg:hidden flex-col mt-2 gap-3'>
                    <button className='text-[30px] leading-[45px] text-secondaryColor'>Home</button>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} direction={direction} className="text-center">
                        <DropdownToggle caret className="text-[30px] leading-[45px] text-secondaryColor border-none mt-1 hover:bg-gray-300">Shop</DropdownToggle>
                        <DropdownMenu {...args}>
                            <DropdownItem text>Team</DropdownItem>
                            <DropdownItem disabled>Action (disabled)</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem header>Category</DropdownItem>
                            <DropdownItem tag={Link} to="/products">For Men</DropdownItem>
                            <DropdownItem tag={Link} to="/products">For Women</DropdownItem>
                            <DropdownItem tag={Link} to="/products">Accessories</DropdownItem>
                            <DropdownItem tag={Link} to="/products">For Kids Action</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <button className='text-[30px] leading-[45px] text-secondaryColor'>Product</button>
                    <button className='text-[30px] leading-[45px] text-secondaryColor'>Pricing</button>
                    <button className='text-[30px] leading-[45px] text-secondaryColor'>Contact</button>
                </nav>
            </div>
        </header>
    );
}
