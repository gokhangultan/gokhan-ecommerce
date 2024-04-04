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
import { fetchProduct } from "../store/actions/productAction";
import ReactPaginate from "react-paginate";
import ProductCard from "../components/ProductCard";
import Companies from "../components/Companies";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductList(direction) {
  const navItems = [
    ["Default", ""],
    ["Price Low to High", "price:asc"],
    ["Price High to Low", "price:desc"],
    ["Rating Low to High", "rating:asc"],
    ["Rating High to Low", "rating:desc"],
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { category } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const categories = useSelector((state) => state.global.categories);
  const productList = useSelector((state) => state.products.productList);
  const [orderBy, setOrderBy] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const totalProductCount = productList.products
    ? productList.products.length
    : 0;

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleOrder = (newOrder) => {
    setOrderBy(newOrder);
  };
  //Filter Submit
  const handleSubmit = async (searchValue, dispatch) => {
    toast.success("Ürünleriniz Filtreleniyor..", { position: "top-right" });
    try {
      const response = await dispatch(
        fetchProduct(50, 0, null, searchValue, null)
      );
      history.push(`/products?filter=${encodeURIComponent(searchValue)}`);
    } catch (error) {
      console.error("Ürünler alınamadı.", error);
      toast.error("Ürünler alınamadı.", { position: "top-right" });
    }
  };

  //Sort Submit
  const handleSort = async (sortType) => {
    toast.success("Ürünleriniz Sıralanıyor..", { position: "top-right" });
    try {
      const response = await dispatch(
        fetchProduct(50, 0, null, null, sortType)
      );
      console.log(response);
      history.push(`/products?sort=${sortType}`);
    } catch (error) {
      console.error("Ürünler sıralanamadı.", error);
      toast.error("Ürünler sıralanamadı.", { position: "top-right" });
    }
  };

  // React Pagination
  const productsToDisplay = productList.products;
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
      dispatch(fetchProduct());
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
        <div className="flex sm:flex-row flex-col gap-4 justify-between ">
          <div className="flex sm:flex-row flex-col gap-4 justify-between ">
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
              direction="left"
              className="text-sm leading-7 text-secondaryColor rounded"
            >
              <DropdownToggle className="text-secondaryColor border-1 border-[#DDDDDD] hover:bg-gray-300 hover:text-black py-2.5">
                {orderBy === "Order By "}
                {orderBy === "price:asc" && "Price Low to High"}
                {orderBy === "price:desc" && "Price High to Low"}
                {orderBy === "rating:asc" && "Rating Low to High"}
                {orderBy === "rating:desc" && "Rating High to Low"}
                <FontAwesomeIcon icon={faChevronDown} size="lg" />
                <span onClick={setOrderBy}> Order By</span>
              </DropdownToggle>
              <DropdownMenu>
                {navItems.map((item, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => {
                      handleSort(item[1]);
                      handleOrder();
                    }}
                  >
                    {item[0]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <div>
              <button
                className="button bg-primaryColor hover:text-primaryColor hover:bg-white rounded hover:border-primaryColor"
                onClick={toggleSearch}
              >
                Filter
              </button>
              {isSearchOpen && (
                <div>
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
                    onClick={() => handleSubmit(searchValue, dispatch)}
                  >
                    Sitede Bul
                  </button>
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
