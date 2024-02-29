import {
  faChevronDown,
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CategoryCard from "../components/CategoryCard";
import {
  faTableCellsLarge,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/actions/categoryAction";
import { fetchProduct } from "../store/actions/productAction";
import ReactPaginate from "react-paginate";
import Companies from "../components/Companies";
import { ToastContainer, toast } from "react-toastify";

export default function ProductList({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const categories = useSelector((state) => state.global.categories);
  const productList = useSelector((state) => state.products.productList);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const totalProductCount = productList.products
    ? productList.products.length
    : 0;

  useEffect(() => {
    if (sortBy === "priceHighToLow") {
      sortByPriceHighToLow();
    } else if (sortBy === "priceLowToHigh") {
      sortByPriceLowToHigh();
    } else if (sortBy === "popularity") {
      sortByPopularity();
    }
  }, [sortBy, productList.products]);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Ürünleriniz Filtreleniyor..", {
      position: "top-right",
    });
    const filtered = productList.products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSortedProducts(filtered);
  };
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

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
    const sorted = [...productList.products].sort(
      (a, b) => b.rating - a.rating
    );
    setSortedProducts(sorted);
  };

  // React Pagination
  const productsToDisplay =
    sortedProducts.length > 0 ? sortedProducts : productList.products;
  const productsPerPage = 6;
  const pagesVisited = pageNumber * productsPerPage;
  const displayProducts =
    productsToDisplay && productsToDisplay.length > 0
      ? productsToDisplay
          .slice(pagesVisited, pagesVisited + productsPerPage)
          .map((product) => <ProductCard key={product.id} product={product} />)
      : null;

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategory());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (
      !productList ||
      !productList.products ||
      productList.products.length === 0
    ) {
      dispatch(
        fetchProduct(/*{ limit: productsPerPage, offset: currentPage * productsPerPage }*/)
      );
    }
  }, [dispatch, productList]);

  if (
    !productList ||
    !productList.products ||
    productList.products.length === 0
  ) {
    return (
      <div className="flex flex-col items-center">
        <h1>Loading...</h1>
        <img src="loading.gif" className="w-[200px] h-[200px]" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#FAFAFA] ">
        <div className="breadcrumb flex md:justify-between justify-center md:flex-row flex-col  w-[full] px-[150px] sm:px-[195px] py-8 gap-3 ">
          <h3 className="font-bold text-2xl leading-8 text-[#252B42] ml-5 sm:ml-0">
            Shop
          </h3>
          <div className="flex gap-2">
            <Link
              href=""
              className="font-bold text-sm leading-6 text-[#252B42] "
            >
              Home
            </Link>
            <Link>
              <FontAwesomeIcon
                icon={faChevronRight}
                size="lg"
                style={{ color: "#BDBDBD" }}
              />{" "}
            </Link>
            <Link
              href=""
              className="font-bold text-sm leading-6 text-[#BDBDBD]"
            >
              Shop
            </Link>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-4 justify-between ">
          <div className="flex md:flex-row flex-col gap-4 justify-between ">
            {categories.slice(0, 1).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 justify-between px-[100px] sm:px-[195px] py-8 items-center ">
        <h6 className="font-bold text-sm leading-6 text-secondaryColor">
          Showing all {totalProductCount} results
        </h6>
        <div className="flex flex-row gap-3">
          <h5 className="text-sm font-bold text-secondaryColor leading-6 mt-2">
            Views:
          </h5>
          <button className="border-1 p-2 border-[#ECECEC]">
            <FontAwesomeIcon icon={faTableCellsLarge} size="lg" />
          </button>
          <button className="border-1 p-2 border-[#ECECEC]">
            <FontAwesomeIcon icon={faListCheck} size="lg" />
          </button>
        </div>
        <div>
          <div className="flex flex-row gap-3">
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              direction={direction}
              className="text-sm leading-7 text-secondaryColor rounded"
            >
              <DropdownToggle className="text-secondaryColor border-1 border-[#DDDDDD] hover:bg-gray-300 hover:text-black py-2.5">
                {sortBy === null && "Order By "}
                {sortBy === "priceLowToHigh" && "Price Low to High"}
                {sortBy === "priceHighToLow" && "Price High to Low"}
                {sortBy === "popularity" && "Popularity"}
                <FontAwesomeIcon icon={faChevronDown} size="lg" />
              </DropdownToggle>
              <DropdownMenu {...args}>
                <DropdownItem onClick={handleSortByPriceLowToHigh}>
                  Price Low to High
                </DropdownItem>
                <DropdownItem onClick={handleSortByPriceHighToLow}>
                  Price High to Low
                </DropdownItem>
                <DropdownItem onClick={handleSortByPopularity}>
                  Popularity
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div>
              <button
                className=" button bg-primaryColor hover:text-primaryColor hover:bg-white rounded hover:border-primaryColor"
                onClick={toggleSearch}
              >
                Filter
              </button>
              {isSearchOpen && (
                <div>
                  <form onSubmit={handleSubmit} className="flex flex-row">
                    <input
                      type="text"
                      value={searchValue}
                      onChange={handleChange}
                      placeholder="Ne aramıştınız..."
                      className="bg-white p-2 rounded text-black text-base border-2"
                    />
                    <button
                      type="submit"
                      className="button bg-primaryColor hover:text-primaryColor hover:bg-white rounded hover:border-primaryColor"
                    >
                      Sitede Bul
                    </button>
                    <ToastContainer position="top-right" autoClose={2000} />
                  </form>
                </div>
              )}
            </div>
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
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(productsToDisplay.length / productsPerPage)}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            className="bg-primaryColor flex gap-2 text-white rounded p-2 font-bold text-md"
          />
        </section>
      </div>
      <div className="bg-[#FAFAFA] py-5 mt-5">
        <Companies />
      </div>
    </div>
  );
}
