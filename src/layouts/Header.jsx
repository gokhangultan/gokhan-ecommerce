import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faCartShopping,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useGravatar } from "use-gravatar";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  CardBody,
  Card,
} from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function Header({ direction, ...args }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const token = localStorage.getItem("token");
  //localStorage.removeItem('userName'); logout da eklemeyi unutma
  const userName = useSelector((state) => state.user.user.name);
  const userEmail = useSelector((state) => state.user.user.email);
  const cart = useSelector((state) => state.shoppingCard.cart);
  const gravatarUrl = useGravatar(userEmail);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);
  const totalItemCount = cart.reduce((total, item) => total + item.count, 0);

  const handleLogout = () => {
    // Redux store'u güncellemeden logout icin tokenı sil
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const toggleMenuVisibility = () => {
    setMenuVisible(!isMenuVisible);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Arama yapılıyor:", searchValue);
  };

  return (
    <header
      className={`xl:mx-[118px] lg:mx-[30px] md:mx-[15px]               mx-[10px] lg:h-[91px]   ${
        isMenuVisible ? "h-[501px]" : ""
      } pt-4`}
    >
      <div className="flex ">
        <div className="hidden  sm:hidden xl:flex lg:flex md:hidden basis-2/5 ">
          <Link to="/">
            <h3 className=" xl:mx-[136px] lg:mx-[40px] md:mx-[20px] mx-[5px] text-[24px] font-bold font- text-[#252B42] leading-8">
              BrandName
            </h3>
          </Link>
        </div>
        <div className=" sm:hidden xl:flex lg:flex md:hidden basis-4/5">
          <nav className="hidden sm:flex xl:flex lg:flex md:flex xl:gap-4 sm:gap-2">
            <button
              className="py-1.5"
              onClick={() => {
                history.push("/");
              }}
            >
              Home
            </button>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              direction={direction}
            >
              <DropdownToggle
                caret
                className="text-black border-none  hover:bg-gray-300 "
              >
                Shop
              </DropdownToggle>
              <DropdownMenu {...args}>
                <DropdownItem header>Category</DropdownItem>
                <Link to="/products">
                  <DropdownItem>For Men</DropdownItem>
                  <DropdownItem divider />
                </Link>
                <Link to="/products">
                  <DropdownItem>For Women</DropdownItem>
                  <DropdownItem divider />
                </Link>
                <Link to="/products">
                  <DropdownItem>Accessories</DropdownItem>
                  <DropdownItem divider />
                </Link>
                <Link to="/products">
                  <DropdownItem>For Kids Action</DropdownItem>
                </Link>
              </DropdownMenu>
            </Dropdown>
            <button
              className="py-1.5"
              onClick={() => {
                history.push("/about");
              }}
            >
              About
            </button>
            <button
              className="py-1.5"
              onClick={() => {
                history.push("/team");
              }}
            >
              Team
            </button>
            <button
              className="py-1.5"
              onClick={() => {
                history.push("/contact");
              }}
            >
              Contact
            </button>
            <button
              className="py-1.5"
              onClick={() => {
                history.push("/");
              }}
            >
              Pages
            </button>
          </nav>
        </div>
        <div className="flex basis-2/5 mx-1 ">
          <div className=" hidden  sm:hidden xl:flex lg:flex md:hidden gap-4 w-[280px]">
            <Link to={userName ? "/" : "/login"} className="header-link">
              <div className="flex-row flex">
                {/* Eğer token varsa Gravatar resmini, yoksa faUser ikonunu göster */}
                {userName ? (
                  <img
                    src={gravatarUrl}
                    alt="User Avatar"
                    className="avatar w-10 h-10"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
                <button
                  className="header-button border-1 border-primaryColor ml-3"
                  onClick={token && handleLogout}
                >
                  {userName ? `${userName}  Logout` : "Login / Register"}
                </button>
              </div>
            </Link>
            <button className=" header-button" onClick={toggleSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
            </button>
            {isSearchOpen && (
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleChange}
                    placeholder="Ne aramıştınız..."
                  />
                  <button
                    type="submit"
                    className="bg-primaryColor text-white p-2 rounded mx-5"
                  >
                    Sitede Bul
                  </button>
                </form>
              </div>
            )}
            <button className=" header-button" onClick={toggleCart}>
              <FontAwesomeIcon icon={faCartShopping} /> {totalItemCount}
            </button>
            <Collapse isOpen={isOpen} {...args}>
              <Card className="w-[380px] absolute z-10 left-[70%] top-[9%]">
                <CardBody className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <h2>Sepetim ({totalItemCount} ürün)</h2>
                    <button
                      className="bg-gray-300 rounded-full p-2 hover:bg-primaryColor"
                      onClick={closeCart}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </div>{" "}
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className=" bg-gray-50 flex flex-row gap-3 p-2 border-1 rounded-md border-primaryColor"
                    >
                      <div className="flex basis-1/4 justify-center items-center">
                        <img
                          src={item.product.images[0].url}
                          className="object-contain w-[100px] h-[100px]"
                          alt="product"
                        />
                      </div>
                      <div className="flex flex-col basis-3/4">
                        <div>{item.product.name}</div>
                        <div className="flex flex-row gap-3">
                          <div>Price: ${item.product.price}</div>
                          <div>Count: {item.count}</div>
                        </div>
                        <div className="text-primaryColor text-2xl">
                          ${(item.count * item.product.price).toFixed(2)}
                        </div>

                        <div className="border-2"></div>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-row gap-2 justify-center">
                    <button
                      className="button bg-gray-300 text-black hover:bg-primaryColor px-2 py-2 "
                      onClick={() => {
                        history.push("/cart");
                        closeCart();
                      }}
                    >
                      Sepete Git
                    </button>

                    <button
                      className="button bg-primaryColor text-black hover:bg-gray-300 px-2 py-2"
                      onClick={() => {
                        history.push("/confirm");
                      }}
                    >
                      Siparişi Tamamla
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Collapse>
            <button
              className=" header-button"
              onClick={() => {
                history.push("/favorites");
              }}
            >
              <FontAwesomeIcon icon={faHeart} /> 1
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex lg:hidden  ">
          <Link to="/">
            <h3 className="  xl:mx-[136px] lg:mx-[40px] md:mx-[20px] mx-[5px] text-[24px] font-bold font- text-[#252B42] leading-8 pb-2">
              BrandName
            </h3>
          </Link>
        </div>
        <div className="flex-2 mx-1 my-2 flex lg:hidden">
          <div className="flex gap-4 ">
            <button
              onClick={toggleMenuVisibility}
              className="text-secondaryColor"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuVisible ? "flex flex-col" : "hidden"}`}>
        <nav className="flex lg:hidden  flex-col  mt-2 gap-1 items-center">
          <button
            className="text-[30px] leading-[45px]  text-secondaryColor"
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </button>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            direction={direction}
            className="text-center"
          >
            <DropdownToggle
              caret
              className="text-[30px] leading-[45px]  text-secondaryColor border-none mt-1 hover:bg-gray-300"
            >
              Shop
            </DropdownToggle>
            <DropdownMenu {...args}>
              <DropdownItem divider />
              <DropdownItem header>Category</DropdownItem>
              <Link to="/products">
                <DropdownItem>For Men</DropdownItem>
              </Link>
              <Link to="/products">
                <DropdownItem>For Women</DropdownItem>
              </Link>
              <Link to="/products">
                <DropdownItem>Accessories</DropdownItem>
              </Link>
              <Link to="/products">
                <DropdownItem>For Kids Action</DropdownItem>
              </Link>
            </DropdownMenu>
          </Dropdown>
          <button
            className="text-[30px] leading-[45px]  text-secondaryColor"
            onClick={() => {
              history.push("/about");
            }}
          >
            About
          </button>
          <button
            className="text-[30px] leading-[45px]  text-secondaryColor"
            onClick={() => {
              history.push("/team");
            }}
          >
            Team
          </button>
          <button
            className="text-[30px] leading-[45px]  text-secondaryColor"
            onClick={() => {
              history.push("/contact");
            }}
          >
            Contact
          </button>

          <div className=" flex flex-col items-center  lg:hidden  gap-2 ">
            <Link to={userName ? "/" : "/login"} className="header-link">
              <div className="flex-row flex">
                {/* Eğer token varsa Gravatar resmini, yoksa faUser ikonunu göster */}
                {userName ? (
                  <img
                    src={gravatarUrl}
                    alt="User Avatar"
                    className="avatar w-10 h-10 rounded-full"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
                <button
                  className="header-button"
                  onClick={token && handleLogout}
                >
                  {userName ? `${userName} - Logout` : "Login / Register"}
                </button>
              </div>
            </Link>
            <button className=" header-button" onClick={toggleSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
            </button>
            {isSearchOpen && (
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleChange}
                    placeholder="Ne aramıştınız..."
                  />
                  <button
                    type="submit"
                    className="bg-primaryColor text-white p-2 rounded mx-5"
                  >
                    Sitede Bul
                  </button>
                </form>
              </div>
            )}
            <button className=" header-button" onClick={toggleCart}>
              <FontAwesomeIcon icon={faCartShopping} /> {totalItemCount}
            </button>
            <Collapse isOpen={isOpen} {...args}>
              <Card className="w-[380px] absolute z-10 left-[1%] top-[6%]">
                <CardBody className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <h2>Sepetim ({totalItemCount} ürün)</h2>
                    <button
                      className="bg-gray-300 rounded-full p-2 hover:bg-primaryColor"
                      onClick={closeCart}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </div>
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className=" bg-gray-50 flex flex-row gap-3 p-2 border-1 rounded-md border-primaryColor"
                    >
                      <div className="flex basis-1/4 justify-center items-center">
                        <img
                          src={item.product.images[0].url}
                          className="object-contain w-[100px] h-[100px]"
                          alt="product"
                        />
                      </div>
                      <div className="flex flex-col basis-3/4">
                        <div>{item.product.name}</div>
                        <div className="flex flex-row gap-3">
                          <div>Price: ${item.product.price}</div>
                          <div>Count: {item.count}</div>
                        </div>
                        <div className="text-primaryColor text-2xl">
                          ${(item.count * item.product.price).toFixed(2)}
                        </div>

                        <div className="border-2"></div>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-row gap-2 justify-center">
                    <button
                      className="button bg-gray-300 text-black hover:bg-primaryColor px-2 py-2"
                      onClick={() => {
                        history.push("/cart");
                      }}
                    >
                      Sepete Git
                    </button>

                    <button
                      className="button bg-primaryColor text-black hover:bg-gray-300 px-2 py-2"
                      onClick={() => {
                        history.push("/confirm");
                      }}
                    >
                      Siparişi Tamamla
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Collapse>{" "}
            <button
              className=" header-button"
              onClick={() => {
                history.push("/favorites");
              }}
            >
              <FontAwesomeIcon icon={faHeart} /> 1
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
