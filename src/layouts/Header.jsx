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
    <header className={`container ${isMenuVisible ? "h-[501px]" : ""} py-3`}>
      <div className="flex ">
        <div className="hidden  sm:hidden xl:flex lg:flex md:hidden basis-2/5 ">
          <Link to="/">
            <h3 className="logo-text">PortaKal</h3>
          </Link>
        </div>
        <div className=" sm:hidden xl:flex lg:flex md:hidden basis-4/5">
          <nav className="hidden sm:flex gap-2">
            <button
              className=""
              onClick={() => {
                history.push("/");
              }}
            >
              Home
            </button>
            <button>
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
            </button>
            <button
              className=""
              onClick={() => {
                history.push("/about");
              }}
            >
              About
            </button>
            <button
              className=""
              onClick={() => {
                history.push("/team");
              }}
            >
              Team
            </button>
            <button
              className=""
              onClick={() => {
                history.push("/contact");
              }}
            >
              Contact
            </button>
            <button
              className=""
              onClick={() => {
                history.push("/");
              }}
            >
              Pages
            </button>
          </nav>
        </div>
        <div className="flex  ">
          <div className=" hidden  sm:hidden xl:flex lg:flex md:hidden gap-2 items-center ">
            <Link to={userName ? "/" : "/login"} className="header-link">
              <div className="flex-row flex  justify-center items-center gap-2">
                {userName ? (
                  <img
                    src={gravatarUrl}
                    alt="User Avatar"
                    className="avatar w-8 h-8 rounded-lg"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
                <button
                  className="header-button border-1 border-primaryColor"
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
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col lg:flex-row gap-2"
                >
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleChange}
                    placeholder="Ne aramıştınız..."
                    className="border-2 p-1"
                  />
                  <button type="submit" className="header-button">
                    Sitede Bul
                  </button>
                </form>
              </div>
            )}
            <button className=" header-button" onClick={toggleCart}>
              <FontAwesomeIcon icon={faCartShopping} /> {totalItemCount}
            </button>
            <Collapse isOpen={isOpen} {...args}>
              <Card className="absolute z-10 left-[70%] top-[9%] px-3">
                <CardBody className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <h2>Sepetim ({totalItemCount} ürün)</h2>
                    <button
                      className="header-button border-1 border-primaryColor"
                      onClick={closeCart}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </div>{" "}
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="  flex flex-row gap-3 p-2 border-1 rounded-lg border-primaryColor"
                    >
                      <div className="flex basis-1/5 justify-center items-center">
                        <img
                          src={item.product.images[0].url}
                          className="object-contain rounded-lg"
                          alt="product"
                        />
                      </div>
                      <div className="flex flex-col basis-4/5">
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
                      className="button-main"
                      onClick={() => {
                        history.push("/cart");
                        closeCart();
                      }}
                    >
                      Sepete Git
                    </button>

                    <button
                      className="primary-button"
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
            <h3 className="logo-text">PortaKal</h3>
          </Link>
        </div>
        <div className="button-main flex lg:hidden">
          <div className="flex">
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
        <nav className="flex lg:hidden flex-col gap-1 items-center">
          <button
            className="mobile-menu-text"
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
            className="mobile-menu-text"
            onClick={() => {
              history.push("/about");
            }}
          >
            About
          </button>
          <button
            className="mobile-menu-text"
            onClick={() => {
              history.push("/team");
            }}
          >
            Team
          </button>
          <button
            className="mobile-menu-text"
            onClick={() => {
              history.push("/contact");
            }}
          >
            Contact
          </button>

          <div className=" flex flex-col lg:hidden  gap-2 ">
            <Link to={userName ? "/" : "/login"} className="header-link">
              <div className="flex-row flex  items-center justify-center">
                {/* Eğer token varsa Gravatar resmini, yoksa faUser ikonunu göster */}
                {userName ? (
                  <img
                    src={gravatarUrl}
                    alt="User Avatar"
                    className="avatar w-8 h-8 rounded-lg"
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
                <form onSubmit={handleSubmit} className="flex flex-row gap-2">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleChange}
                    placeholder="Ne aramıştınız..."
                    className="border-2 p-1"
                  />
                  <button type="submit" className="header-button">
                    Sitede Bul
                  </button>
                </form>
              </div>
            )}
            <button className=" header-button" onClick={toggleCart}>
              <FontAwesomeIcon icon={faCartShopping} /> {totalItemCount}
            </button>
            <Collapse isOpen={isOpen} {...args}>
              <Card className="absolute z-10 top-[9%] px-3">
                <CardBody className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <h2>Sepetim ({totalItemCount} ürün)</h2>
                    <button
                      className="header-button border-1 border-primaryColor"
                      onClick={closeCart}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </div>{" "}
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="  flex flex-row gap-3 p-2 border-1 rounded-lg border-primaryColor"
                    >
                      <div className="flex basis-1/5 justify-center items-center">
                        <img
                          src={item.product.images[0].url}
                          className="object-contain rounded-lg"
                          alt="product"
                        />
                      </div>
                      <div className="flex flex-col basis-4/5">
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
                      className="button-main"
                      onClick={() => {
                        history.push("/cart");
                        closeCart();
                      }}
                    >
                      Sepete Git
                    </button>

                    <button
                      className="primary-button"
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
        </nav>
      </div>
    </header>
  );
}
