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
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { faAws, faHooli, faLyft, faPiedPiperHat, faRedditAlien, faStripe } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from '../store/actions/categoryAction';
import { fetchProduct } from '../store/actions/productAction';
import ReactPaginate from 'react-paginate';
import { useParams } from "react-router-dom";


export default function ProductList({ direction, ...args }) {
    const { categoryId, category } = useParams();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const categories = useSelector(state => state.global.categories);
    const productList = useSelector(state => state.products.productList);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        dispatch(fetchProduct({ category_id: categoryId }));
    }, [dispatch, categoryId]);

    useEffect(() => {
        filterProductsByCategory();
    }, [productList, sortBy, pageNumber, categoryId]);


    const filterProductsByCategory = () => {
        if (productList && productList.products && productList.products.length > 0) {
            if (categoryId) {
                const filteredProducts = productList.products.filter(product => product.category_id == categoryId);
                setSortedProducts(filteredProducts);
            } else {
                // Kategori ID yoksa, tüm ürünleri göster.
                setSortedProducts(productList.products);
            }
            // Sayfa numarasını güncelle
            setPageNumber(0); // veya başka bir sayfa numarası değeri
        }
    };

    useEffect(() => {
        if (sortBy === "priceHighToLow") {
            sortByPriceHighToLow();
        } else if (sortBy === "priceLowToHigh") {
            sortByPriceLowToHigh();
        } else if (sortBy === "popularity") {
            sortByPopularity();
        }
    }, [sortBy, productList]);
    const handleSortByPriceHighToLow = () => {
        setSortBy("priceHighToLow");
    };

    const handleSortByPriceLowToHigh = () => {
        setSortBy("priceLowToHigh");
    };

    const handleSortByPopularity = () => {
        setSortBy("popularity");
    };
    const sortByPriceHighToLow = () => {
        const sorted = [...productList.products].sort((a, b) => b.price - a.price);
        setSortedProducts(sorted);
    };

    const sortByPriceLowToHigh = () => {
        const sorted = [...productList.products].sort((a, b) => a.price - b.price);
        setSortedProducts(sorted);
    };

    const sortByPopularity = () => {
        const sorted = [...productList.products].sort((a, b) => b.rating - a.rating);
        setSortedProducts(sorted);
    };

    // React Pagination
    const productsToDisplay = sortedProducts.length > 0 ? sortedProducts : productList;
    const productsPerPage = 6;
    const pagesVisited = pageNumber * productsPerPage;
    const displayProducts = productsToDisplay && productsToDisplay.length > 0
        ? productsToDisplay
            .slice(pagesVisited, pagesVisited + productsPerPage)
            .map((product) => (
                <ProductCard key={product.id} product={product} />
            ))
        : null;

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };


    useEffect(() => {
        if (!categories || categories.length === 0) {
            dispatch(fetchCategory());
        }
    }, [dispatch, categories]);



    if (!productList || !productList.products || productList.products.length === 0) {
        return (
            <div className='flex flex-col items-center'>
                <h1>Loading...</h1>
                <img src='loading.gif' className='w-[200px] h-[200px]' />
            </div>
        );
    }

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
                <div>
                    <div className="flex flex-row gap-3">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} className="text-sm leading-7 text-secondaryColor rounded">
                            <DropdownToggle className="text-secondaryColor border-1 border-[#DDDDDD] hover:bg-gray-300 hover:text-black py-2.5">
                                {sortBy === null && "Order By "}
                                {sortBy === "priceLowToHigh" && "Price Low to High"}
                                {sortBy === "priceHighToLow" && "Price High to Low"}
                                {sortBy === "popularity" && "Popularity"}
                                <FontAwesomeIcon icon={faChevronDown} size="lg" />
                            </DropdownToggle>
                            <DropdownMenu {...args}>
                                <DropdownItem onClick={handleSortByPriceLowToHigh}>Price Low to High</DropdownItem>
                                <DropdownItem onClick={handleSortByPriceHighToLow}>Price High to Low</DropdownItem>
                                <DropdownItem onClick={handleSortByPopularity}>Popularity</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <button className="button bg-primaryColor hover:text-primaryColor hover:bg-white rounded hover:border-primaryColor">Filter</button>
                    </div>
                </div>
            </div>
            <div className="px-[10px] sm:px-[195px]">
                <section className="best-seller mb-10 text-center">
                    <div className="flex flex-wrap flex-row gap-2 justify-between">
                        {displayProducts}
                    </div>
                </section>
            </div>
            <div className="flex justify-center ">
                <section className="pagination">
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={Math.ceil(productsToDisplay.length / productsPerPage)}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        previousLinkClassName={'pagination__link'}
                        nextLinkClassName={'pagination__link'}
                        disabledClassName={'pagination__link--disabled'}
                        activeClassName={'pagination__link--active'}
                        className="bg-primaryColor flex gap-2 text-white rounded p-2 font-bold text-md" />
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
    );
}

