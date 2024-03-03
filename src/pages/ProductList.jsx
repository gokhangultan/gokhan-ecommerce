import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import {
  faTableCellsLarge,
  faListCheck,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../store/actions/categoryAction";
import { fetchProduct, setProductList } from "../store/actions/productAction";
import ReactPaginate from "react-paginate";
import ProductCard from "../components/ProductCard";
import Companies from "../components/Companies";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductList({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { category, filter, sort } = useParams();
  const dispatch = useDispatch();
  const history = useHistory(); // useHistory hook'unu kullanarak history alıyoruz
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const categories = useSelector((state) => state.global.categories);
  const productList = useSelector((state) => state.products.productList);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const filterProducts = (products, filterText) => {
    if (!products) return []; // Eğer products boşsa boş bir dizi döndür
    return products.filter((product) =>
      product.name.toLowerCase().includes(filterText.toLowerCase())
    );
  };
  const totalProductCount = productList.products
    ? productList.products.length
    : 0;

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (searchValue, dispatch) => {
    toast.success("Ürünleriniz Filtreleniyor..", {
      position: "top-right",
    });

    try {
      // Filtreleme isteğini backend'e gönder
      const response = await fetchProduct({ filter: searchValue });
      console.log(response);
    } catch (error) {
      console.error("Ürünler alınamadı.", error);
      toast.error("Ürünler alınamadı.", { position: "top-right" });
    }
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
              to="/"
              className="font-bold text-sm leading-6 text-[#252B42] "
            >
              Home
            </Link>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="lg"
              style={{ color: "#BDBDBD" }}
            />{" "}
            <Link
              to="/products"
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
                <DropdownItem>Price Low to High</DropdownItem>
                <DropdownItem>Price High to Low</DropdownItem>
                <DropdownItem>Popularity</DropdownItem>
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
                  <form
                    onSubmit={handleSubmit(searchValue, dispatch)}
                    className="flex flex-row"
                  >
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
