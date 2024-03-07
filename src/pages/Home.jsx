import Carousel from "../components/Carousel";
import Carousel2 from "../components/Carousel2";
import ProductCard from "../components/ProductCard";
import FeaturedCard from "../components/FeaturedCard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProduct } from "../store/actions/productAction";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [pageNumber, setPageNumber] = useState(0);
  const [sortedProducts, setSortedProducts] = useState([]);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products.productList);
  const sortByPopularity = () => {
    const sorted = [...productList.products].sort(
      (a, b) => b.rating - a.rating
    );
    setSortedProducts(sorted);
  };
  // React Pagination
  const productsToDisplay =
    sortedProducts.length > 0 ? sortedProducts : productList.products;
  const productsPerPage = 8;
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

  //products fetchle al productList ve Total dönüyor
  useEffect(() => {
    if (
      !productList ||
      !productList.products ||
      productList.products.length === 0
    ) {
      dispatch(fetchProduct());
    } else {
      sortByPopularity();
    }
  }, [dispatch, productList]);

  // productList yüklenene kadar bekle
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
      <div className="relative text-white hero-section collection-text ">
        <Carousel />
        <div className="absolute top-5 left-0 z-10 flex flex-col xl:text-left 2xl:text-left lg:text-left md:text-left sm:text-left xl:py-[290px] lg:py-[180px] md:py-[120px] sm:py-[100px] py-[180px] gap-[1px] 2xl:gap-[24px] xl:gap-[24px] lg:gap-[18px] md:gap-[14px] sm:gap-[12px] xl:ml-[200px] 2xl:ml-[200px] lg:ml-[120px] md:ml-[80px] sm:ml-[60px] ml-[30px]">
          <div>
            <h5 className="font-2xl:bold 2xl:text-[16px] xl:text-[16px] lg:text-sm md:text-xs sm:text-xs text-[16px]  leading-[24px]">
              SUMMER 2020
            </h5>
          </div>
          <div>
            <h1 className="font-bold xl:text-[58px] 2xl:text-[58px] lg:text-[40px] md:text-[32px] sm:text-[28px] text-[40px]  leading-[80px]">
              NEW COLLECTION{" "}
            </h1>
          </div>
          <div>
            <h4 className="2xl:text-xl xl:text-xl lg:text-[18px] md:text-[16px] sm:text-sm text-xl leading-[30px] ">
              We know how large objects will act,
            </h4>
            <h4 className="2xl:text-xl xl:text-xl lg:text-[18px] md:text-[16px] sm:text-sm text-xl leading-[30px] ">
              but things on a small scale.
            </h4>
          </div>
          <div>
            <Link to="/products">
              <button className="carousel-button hover:bg-white hover:text-[#2DC071]">
                SHOP NOW
              </button>
            </Link>
          </div>
        </div>
      </div>

      <section className="editor-pick py-[80px] relative text-center">
        <h3 className="font-bold text-2xl leading-[32px]  text-[#252B42] align-middle mb-3">
          EDITOR'S PICK
        </h3>
        <p className="text-sm leading-5 align-middle">
          Problems trying to resolve the conflict between{" "}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-[50px] relative mx-4">
          <Link to="/products">
            {" "}
            <div className="flex">
              <img
                src="editor.jpeg"
                className="object-cover w-[500px] h-[509px]"
              />
              <button className="editor-button border-1">MEN</button>
            </div>
          </Link>
          <Link to="/products">
            <div className="flex">
              <img
                src="editor2.jpeg"
                className="object-cover w-[500px] sm:w-[250px]  h-[509px]"
              />
              <button className="editor-button border-1 ">WOMEN</button>
            </div>
          </Link>
          <div className="flex-col relative ">
            <Link to="/products">
              <div className="flex mb-2">
                <img
                  src="editor3.jpeg"
                  className="object-cover w-[500px] sm:w-[250px] h-[250px]"
                />
                <button className="editor-button border-1">KIDS</button>
                <button className=" editor-button mt-[176px] border-1">
                  ACCESSORIES
                </button>
              </div>
            </Link>
            <div className="flex">
              <img
                src="editor4.jpeg"
                className="object-cover w-[500px] sm:w-[250px] h-[250px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="best-seller mb-10 text-center container ">
        <h4 className=" text-xl leading-[30px] align-middle mb-3">
          Featured Products
        </h4>
        <h3 className="font-bold text-2xl leading-[32px]  text-[#252B42] mb-3">
          BESTSELLER PRODUCTS
        </h3>
        <p className="text-sm leading-5 align-middle mb-5">
          Problems trying to resolve the conflict between
        </p>
        <div className=" flex flex-wrap flex-row gap-3 justify-between mb-5 ">
          {displayProducts}
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
      </section>

      <div className="relative text-white carousel-item2 mb-5  ">
        <div className="">
          <Carousel2 />
          <div className="absolute top-[20px] left-[10px] sm:top-[180px] lg:left-[240px] z-10 flex flex-col text-left gap-4 carousel-2 w-[300px] md:w-[400px]">
            <div>
              <h5 className="text-xl font-bold  leading-[24px]">SUMMER 2020</h5>
            </div>
            <div>
              <h1 className="font-bold text-4xl sm:text-6xl leading-[40px] sm:leading-[80px]">
                Vita Classic Product
              </h1>
            </div>
            <div>
              <h4 className="text-xl leading-[30px] ">
                We know how large objects will act,
              </h4>
              <h4 className="text-xl leading-[30px] ">
                but things on a small scale.
              </h4>
            </div>
            <div className="flex flex-col sm:flex-row  gap-2 items-center">
              <h3 className=" text-white  text-2xl leading-8 font-bold mr-0 sm:mr-10 ">
                $16.48
              </h3>
              <Link to="/card">
                <button className="carousel-button hover:bg-white hover:text-green-500 bg-[#2DC071] ">
                  ADD TO CART
                </button>
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>

      <section className="test max-w-[1400px] m-auto  pt-5 pb-5 ">
        <div className="flex flex-col-reverse sm:flex-row ">
          <div className="basis-1/2 flex justify-end items-end">
            <img
              src="collection.png"
              className=" sm:w-[704px] sm:h-[682px] w-[463px] :h-[403px] sm:object-cover object-cover"
            />
          </div>
          <div className="basis-1/2 flex justify-center items-center  ">
            <div className="w-[400px] flex flex-col gap-4 collection-text">
              <h5 className=" font-bold text-sm text-gray-800 ">SUMMER 2020</h5>
              <h2 className="h2-home">Part of the Neural Universe</h2>
              <div className="text-gray-600 text-lg  ">
                We know how large objects will act, but things on a small scale.
              </div>
              <div className="flex flex-col sm:flex-row  gap-3 ">
                <Link to="/productpage">
                  <button className="button primary-button px-4 ">
                    BUY NOW
                  </button>
                </Link>
                <Link to="/">
                  {" "}
                  <button className="button secondary-button ">
                    READ MORE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-post pb-5 ">
        <div className="flex flex-col items-center flex-wrap gap-3 ">
          <h6 className="font-bold text-sm leading-6 primary-text">
            Practice Advice
          </h6>
          <h2 className="h2-home text-5xl">Featured Posts</h2>
          <p className="secondary-text  text-sm leading-5 w-[369px] text-center">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
        </div>
        <div className="featured-card flex flex-row  gap-2 mt-5 justify-center flex-wrap ">
          <FeaturedCard />
          <FeaturedCard />
          <FeaturedCard />
        </div>
      </section>
    </div>
  );
}
