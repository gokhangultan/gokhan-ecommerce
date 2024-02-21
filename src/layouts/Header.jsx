import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react';
import { useGravatar } from 'use-gravatar';

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavLink,
} from 'reactstrap';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function Header({ direction, ...args }) {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const token = localStorage.getItem('token');
    //localStorage.removeItem('userName'); logout da eklemeyi unutma
    const userName = useSelector(state => state.user.user.name);
    const userEmail = useSelector(state => state.user.user.email);
    const gravatarUrl = useGravatar(userEmail);
    const history = useHistory();

    const handleLogout = () => {
        // Redux store'u güncellemeden logout icin tokenı sil
        // localStorage.removeItem('token');
        // history.push('/login');
    };

    const toggleMenuVisibility = () => {
        setMenuVisible(!isMenuVisible);
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const toggleSearch = () => {
        setSearchOpen(!isSearchOpen);
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Arama yapılıyor:', searchValue);
    };

    return (
        <header className={`xl:mx-[118px] lg:mx-[30px] md:mx-[15px] mx-[10px] lg:h-[91px]   ${isMenuVisible ? 'h-[501px]' : ''} pt-4`} >
            <div className='flex '>
                <div className='hidden  sm:hidden xl:flex lg:flex md:hidden basis-2/5 '>
                    <Link to="/"><h3 className=' xl:mx-[136px] lg:mx-[40px] md:mx-[20px] mx-[5px] text-[24px] font-bold font- text-[#252B42] leading-8'>BrandName</h3></Link>
                </div>
                <div className=' sm:hidden xl:flex lg:flex md:hidden basis-4/5'>
                    <nav className='hidden sm:flex xl:flex lg:flex md:flex xl:gap-4 sm:gap-2'>
                        <Link to="/"><button className="py-1.5">Home</button></Link>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                            <DropdownToggle caret className="text-black border-none  hover:bg-gray-300 ">Shop</DropdownToggle>
                            <DropdownMenu {...args}>

                                <DropdownItem text>Team</DropdownItem>
                                <DropdownItem disabled>Action (disabled)</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem header>Category</DropdownItem>
                                <Link to="/products"><DropdownItem>For Men</DropdownItem></Link>
                                <Link to="/products"><DropdownItem>For Women</DropdownItem></Link>
                                <Link to="/products"><DropdownItem>Accessories</DropdownItem></Link>
                                <Link to="/products"><DropdownItem>For Kids Action</DropdownItem></Link>
                            </DropdownMenu>
                        </Dropdown>
                        <Link to="/about"><button className="py-1.5">About</button></Link>
                        <Link to="/team"><button className="py-1.5">Team</button></Link>
                        <Link to="/contact"><button className="py-1.5">Contact</button></Link>
                        <Link to="/"><button className="py-1.5">Pages</button></Link>
                    </nav>
                </div >
                <div className='flex basis-2/5 mx-1'>
                    <div className=' hidden  sm:hidden xl:flex lg:flex md:hidden gap-4 '>
                        <Link to={userName ? "/" : "/signup"} className="header-link">
                            <div className="flex-row flex">
                                {/* Eğer token varsa Gravatar resmini, yoksa faUser ikonunu göster */}
                                {token ? <img src={gravatarUrl} alt="User Avatar" className="avatar w-10 h-10" /> : <FontAwesomeIcon icon={faUser} />}
                                <button className='header-button' onClick={token && handleLogout}>
                                    {token ? `${userName} - Logout` : 'Login / Register'}
                                </button>
                            </div>
                        </Link>
                        <button className=' header-button' onClick={toggleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
                        {isSearchOpen && (
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={handleChange}
                                        placeholder="Ne aramıştınız..."
                                    />
                                    <button type="submit" className="bg-primaryColor text-white p-2 rounded mx-5">Sitede Bul</button>
                                </form>
                            </div>
                        )}
                        <Link to="/card"><button className=' header-button'><FontAwesomeIcon icon={faCartShopping} /> 1</button></Link>
                        <Link to="/favorites"><button className=' header-button'><FontAwesomeIcon icon={faHeart} /> 1</button></Link>
                    </div>
                </div>
            </div >
            <div className="flex justify-between">
                <div className='flex lg:hidden  '>
                    <Link to="/"><h3 className='  xl:mx-[136px] lg:mx-[40px] md:mx-[20px] mx-[5px] text-[24px] font-bold font- text-[#252B42] leading-8 pb-2'>BrandName</h3></Link>
                </div>
                <div className='flex-2 mx-1 my-2 flex lg:hidden'>
                    <div className='flex gap-4 '>

                        <button onClick={toggleMenuVisibility} className="text-secondaryColor" ><FontAwesomeIcon icon={faBars} /></button>
                    </div>
                </div>
            </div>
            <div className={`${isMenuVisible ? 'flex flex-col' : 'hidden'}`}>
                <nav className='flex lg:hidden  flex-col  mt-2 gap-1 items-center'>
                    <Link to="/"><button className='text-[30px] leading-[45px]  text-secondaryColor'>Home</button></Link>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} className="text-center">
                        <DropdownToggle caret className="text-[30px] leading-[45px]  text-secondaryColor border-none mt-1 hover:bg-gray-300">Shop</DropdownToggle>
                        <DropdownMenu {...args}>
                            <DropdownItem divider />
                            <DropdownItem header>Category</DropdownItem>
                            <Link to="/products"><DropdownItem>For Men</DropdownItem></Link>
                            <Link to="/products"><DropdownItem>For Women</DropdownItem></Link>
                            <Link to="/products"><DropdownItem>Accessories</DropdownItem></Link>
                            <Link to="/products"><DropdownItem>For Kids Action</DropdownItem></Link>
                        </DropdownMenu>
                    </Dropdown>
                    <Link to="/about"><button className='text-[30px] leading-[45px]  text-secondaryColor'>About</button></Link>
                    <Link to="/team"><button className='text-[30px] leading-[45px]  text-secondaryColor'>Team</button></Link>
                    <Link to="/contact"><button className='text-[30px] leading-[45px]  text-secondaryColor'>Contact</button></Link>

                    <div className=' flex flex-col items-center  lg:hidden  gap-1 '>
                        <Link to="/login"><button className='  header-button'><FontAwesomeIcon icon={faUser} /> Login / Register</button></Link>
                        <button className=' header-button' onClick={toggleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
                        {isSearchOpen && (
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={handleChange}
                                        placeholder="Ne aramıştınız..."
                                    />
                                    <button type="submit" className="bg-primaryColor text-white p-2 rounded mx-5">Sitede Bul</button>
                                </form>
                            </div>
                        )}
                        <Link to="/card"><button className=' header-button'><FontAwesomeIcon icon={faCartShopping} /> 1</button></Link>
                        <Link to="/favorites"><button className=' header-button'><FontAwesomeIcon icon={faHeart} /> 1</button></Link>
                    </div>

                </nav>
            </div>
        </header >
    );
}
