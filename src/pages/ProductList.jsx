import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CategoryCard from "../components/CategoryCard";
import { faTableCellsLarge, faListCheck } from "@fortawesome/free-solid-svg-icons";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {
    Pagination,
    PaginationLink,
    PaginationItem,

} from 'reactstrap';
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { faAws, faHooli, faLyft, faPiedPiperHat, faRedditAlien, faStripe } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from '../store/actions/categoryAction';



export default function ProductList({ direction, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const categories = useSelector(state => state.global.categories);

    //categories fetchle al
    useEffect(() => {
        if (!categories || categories.length === 0) {
            dispatch(postLogin());
        }
    }, [dispatch, categories]);
    return (
        <div>
            <div className="bg-[#FAFAFA] ">
                <div className="breadcrumb flex md:justify-between justify-center md:flex-row flex-col  w-[full] px-[150px] sm:px-[195px] py-8 gap-3 ">
                    <h3 className="font-bold text-2xl leading-8 text-[#252B42] ml-5 sm:ml-0">Shop</h3>
                    <div className="flex gap-2">
                        <Link href="" className="font-bold text-sm leading-6 text-[#252B42] ">Home</Link>
                        <Link><FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#BDBDBD", }} /> </Link>
                        <Link href="" className="font-bold text-sm leading-6 text-[#BDBDBD]">Shop</Link>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-4 justify-between ">
                    <div className="flex md:flex-row flex-col gap-4 justify-between ">
                        {categories.slice(0, 1).map(category => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </div>

            </div>
            <div className="flex flex-col lg:flex-row gap-4 justify-between px-[100px] sm:px-[195px] py-8 items-center ">
                <h6 className="font-bold text-sm leading-6 text-secondaryColor">Showing all 12 results</h6>
                <div className="flex flex-row gap-3">
                    <h5 className="text-sm font-bold text-secondaryColor leading-6 mt-2">Views:</h5>
                    <button className="border-1 p-2 border-[#ECECEC]"><FontAwesomeIcon icon={faTableCellsLarge} size="lg" /></button>
                    <button className="border-1 p-2 border-[#ECECEC]"><FontAwesomeIcon icon={faListCheck} size="lg" /></button>
                </div>
                <div className="flex flex-row gap-3">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} className="text-sm leading-7 text-secondaryColor  rounded ">
                        <DropdownToggle className="text-secondaryColor border-1 border-[#DDDDDD] hover:bg-gray-300 hover:text-black py-2.5">Popularity <FontAwesomeIcon icon={faChevronDown} size="lg" /></DropdownToggle>
                        <DropdownMenu {...args}>
                            <DropdownItem header>Order By</DropdownItem>
                            <DropdownItem>Price Low to High</DropdownItem>
                            <DropdownItem>Price High to Low</DropdownItem>
                            <DropdownItem>Popularity</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <button className="button bg-primaryColor hover:text-primaryColor hover:bg-white rounded hover:border-primaryColor">Filter</button>
                </div>
            </div>
            <div className="px-[10px] sm:px-[195px]">
                <section className="best-seller mb-10 text-center ">
                    <div className=" flex flex-wrap flex-row gap-2 justify-between  ">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />

                    </div>
                </section>
            </div>
            <div className="flex justify-center ">
                <section className="pagination">
                    <Pagination
                        aria-label="Page navigation example"
                        size="xs"
                    >
                        <PaginationItem >
                            <PaginationLink className="hover:bg-primaryColor hover:text-white"
                                first
                                href="#"
                            >
                                First
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="hover:bg-primaryColor hover:text-white"
                                href="#"
                                previous
                            >
                                Previous
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" className="hover:bg-primaryColor hover:text-white">
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" className="hover:bg-primaryColor hover:text-white">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" className="hover:bg-primaryColor hover:text-white">
                                3
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="hover:bg-primaryColor hover:text-white"
                                href="#"
                                next
                            >
                                Next
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="hover:bg-primaryColor hover:text-white"
                                href="#"
                                last
                            >
                                Last
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </section>
            </div>
            <div className="bg-[#FAFAFA] mt-5">
                <div className="flex flex-col lg:flex-row gap-5 px-[50px] sm:px-[195px] justify-between ">
                    <FontAwesomeIcon icon={faHooli} size="6x" style={{ color: "#737373", }} />
                    <FontAwesomeIcon icon={faLyft} size="6x" style={{ color: "#737373", }} />
                    <FontAwesomeIcon icon={faPiedPiperHat} size="6x" style={{ color: "#737373", }} />
                    <FontAwesomeIcon icon={faStripe} size="6x" style={{ color: "#737373", }} />
                    <FontAwesomeIcon icon={faAws} size="6x" style={{ color: "#737373", }} />
                    <FontAwesomeIcon icon={faRedditAlien} size="6x" style={{ color: "#737373", }} />
                </div>

            </div>
        </div>
    )
}