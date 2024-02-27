import { faEye, faHeart, faStarHalf } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
} from 'reactstrap';
import ProductCard from './ProductCard';
import { fetchProduct } from '../store/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router';
import Companies from './Companies';


function ProductDetailCard() {

    const items = [
        {
            src: 'detail1.jpeg',
            key: 1,
        },
        {
            src: 'details2.jpeg',
            key: 2,
        },
        {
            src: 'detail3.jpeg',
            key: 3,
        },
    ];

    const customStyles = {
        height: '450px',
        objectFit: 'cover',
        objectPosition: 'top',
    };
    const dispatch = useDispatch();
    const customClass = "md:w-[540px] w-[350px] h-full lg:h-auto carousel-image";

    const { productId } = useParams();


    const [activeTab, setActiveTab] = useState('description');
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const productList = useSelector(state => state.products.productList);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const sortByPopularity = () => {
        const sorted = [...productList.products].sort((a, b) => b.rating - a.rating);
        setSortedProducts(sorted);
    };
    // React Pagination
    const productsToDisplay = sortedProducts.length > 0 ? sortedProducts : productList.products;
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

    //products fetchle al productList ve Total dönüyor
    useEffect(() => {
        if (!productList || !productList.products || productList.products.length === 0) {
            dispatch(fetchProduct());
        } else {
            sortByPopularity();
        }
    }, [dispatch, productList]);

    // productList yüklenene kadar bekle
    if (!productList || !productList.products || productList.products.length === 0) {
        return <div className='flex flex-col items-center'>
            <h1>Loading...</h1>
            <img src='loading.gif' className='w-[200px] h-[200px]' />

        </div>;
    }
    //url hacking :)
    const product = productList.products.find(product => product.id === parseInt(productId));
    if (!product) {
        return <div>Ürün bulunamadı</div>;
    }

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={product.images[0].url}
            >
                <img src={product.images[0].url} alt={item.altText} style={customStyles} className={customClass} />
            </CarouselItem>
        );
    });
    const categories = {
        1: { id: 1, code: 'k:tisort' },
        2: { id: 2, code: 'k:ayakkabi' },
        3: { id: 3, code: 'k:ceket' }
    };
    const categoryCode = categories[product.category_id].code;
    const smallThumbnails = (
        <div className='flex flex-row gap-3'>
            {items.map((item, index) => (
                <div key={index} className={`cursor-pointer ${index !== activeIndex ? 'inactive-thumbnail' : ''}`}>
                    <img
                        src={product.images[0].url}
                        alt={item.altText}
                        onClick={() => setActiveIndex(index)}
                        className='w-[100px] h-[75px]'
                    />
                </div>
            ))}
        </div>
    );
    return (
        <div className=''>
            <section className='bg-[#FAFAFA] product-detail-data  w-[full] px-[30px] md:px-[195px]'>
                <div className="breadcrumb flex md:justify-between justify-center md:flex-row flex-col py-8 gap-3 ">
                    <div className="flex gap-2">
                        <Link to="/" className="font-bold text-sm leading-6 text-[#252B42] ">Home</Link>
                        <Link><FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#BDBDBD", }} /> </Link>
                        <Link to="/products" className="font-bold text-sm leading-6 text-[#BDBDBD]">Shop</Link>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5 '>
                    <div className='basis-1/2'>
                        <div className='flex flex-col'>
                            <Carousel
                                activeIndex={activeIndex}
                                next={next}
                                previous={previous}
                                className="w-full max-w-[506px] h-[450px] lg:max-w-none lg:h-full"
                            >
                                {slides}
                                <CarouselControl
                                    direction="prev"
                                    directionText="Previous"
                                    onClickHandler={previous}
                                />
                                <CarouselControl
                                    direction="next"
                                    directionText="Next"
                                    onClickHandler={next}
                                />
                            </Carousel>
                            <div style={{ marginTop: '20px' }}>
                                {smallThumbnails}
                            </div>
                        </div>
                    </div>
                    <div className='basis-1/2' >
                        <div className='flex flex-col gap-3'>
                            <h4 className='text-xl leading-8 text-textColor '>{product.name}</h4>
                            <div className='flex-row flex gap-2'>
                                <div className='flex flex-row gap-2 mt-1'>
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#F3CD03", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#F3CD03", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#F3CD03", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#F3CD03", }} />
                                    <FontAwesomeIcon icon={faStarHalf} style={{ color: "#F3CD03", }} />
                                </div>
                                <h6 className='font-bold text-secondaryColor text-sm leading-6'>{product.rating}</h6>
                            </div>
                            <div className='flex-col flex gap-1 mb-4'>
                                <h3 className='font-bold text-2xl leading text-textColor'>$ {product.price}</h3>
                                <div className='flex flex-row'>
                                    <h6 className='font-bold text-sm leading-6 text-secondaryColor'>Availability  :</h6>
                                    <h6 className='text-sm font-bold leading-6 text-primaryColor'>In Stock # {product.stock} </h6>
                                </div>
                            </div>
                            <p className='text-sm leading-5 text-[#858585]'>{product.description}</p>
                            <div className="flex gap-1 mb-3">
                                <button className="p-3 rounded-full bg-primaryColor"></button>
                                <button className="p-3 rounded-full bg-[#2DC071]"></button>
                                <button className="p-3 rounded-full bg-[#E77C40]"></button>
                                <button className="p-3 rounded-full bg-[#252B42]"></button>
                            </div>
                            <div className="flex items-center mb-3">
                                <div className="w-full border-t border-[#ECECEC]"></div>
                            </div>
                            <div className='flex flex-row gap-3'>
                                <button className='bg-primaryColor text-white px-[20px] py-[10px] rounded'>Select Options</button>
                                <button className="bg-white rounded-full px-2 py-1 border-1 border-[#E8E8E8]"><FontAwesomeIcon icon={faHeart} /></button>
                                <button className="bg-white rounded-full px-2 py-1 border-1 border-[#E8E8E8]"><FontAwesomeIcon icon={faCartShopping} /></button>
                                <button className="bg-white rounded-full px-2 py-1 border-1 border-[#E8E8E8]"><FontAwesomeIcon icon={faEye} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='product-detail-description mt-5  w-[full] px-[30px] md:px-[195px]'>
                <div className='flex flex-row gap-5 justify-center mb-5'>
                    <button className={`text-secondaryColor text-sm leading-6 font-semibold ${activeTab === 'description' ? 'text-[#23856D] font-bold' : ''}`} onClick={() => setActiveTab('description')}>
                        Description
                    </button>
                    <button className={`text-secondaryColor text-sm leading-6 font-semibold ${activeTab === 'additional' ? 'text-[#23856D] font-bold' : ''}`} onClick={() => setActiveTab('additional')}>
                        Additional Information
                    </button>
                    <div className='flex-row flex gap-1'>
                        <button className={`text-secondaryColor text-sm leading-6 font-semibold ${activeTab === 'reviews' ? 'text-[#23856D] font-bold' : ''}`} onClick={() => setActiveTab('reviews')}>
                            Reviews
                        </button>
                        <button className={`text-[#23856D] text-sm font-bold leading-6 ${activeTab === 'reviews' ? 'text-[#23856D] font-bold' : ''}`}>(0)</button>
                    </div>
                </div>
                <div className="flex items-center mb-5">
                    <div className="w-full border-t border-[#ECECEC]"></div>
                </div>
                <div>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <img src={product.images[0].url} alt='Product Image' className=' w-[316px] h-[472px] rounded-md shadow-lg object-contain' />
                        <div style={{ display: activeTab === 'description' ? 'block' : 'none' }}>
                            <div className='flex-col flex gap-4'>
                                <h3 className='font-bold text-2xl text-textColor leading-8'>{product.name} </h3>
                                <p className='text-sm leading-5 text-secondaryColor'>{product.description}</p>
                                <p className='text-sm leading-5 text-secondaryColor'>{product.description}</p>
                                <p className='text-sm leading-5 text-secondaryColor'>{product.description}</p>
                            </div>
                        </div>
                        <div style={{ display: activeTab === 'additional' ? 'block' : 'none' }}>
                            <div className='flex-col flex gap-4'>
                                <h3 className='font-bold text-2xl text-textColor leading-8'>{product.name}</h3>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>StoreId: {product.store_id}</h6>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>Stock: {product.stock}</h6>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>Sell Count: {product.sell_count}</h6>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>Category: {product.categoryCode} </h6>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: activeTab === 'reviews' ? 'block' : 'none' }}>
                            <div className='flex-col flex gap-4'>
                                <h3 className='font-bold text-2xl text-textColor leading-8'>Avg Ratio {product.name}  </h3>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>{product.rating}</h6>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>{product.rating}</h6>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>{product.rating}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bestseller container mt-5'>
                <div className="">
                    <h3 className='text-textColor font-bold text-2xl'>BESTSELLER PRODUCTS</h3>
                    <div className="flex items-center my-5">
                        <div className="w-full border-t border-[#ECECEC]"></div>
                    </div>
                    <section className="best-seller mb-10 text-center ">
                        <div className=" flex flex-wrap flex-row gap-2 justify-between  ">
                            {displayProducts}
                        </div>
                        <div className="flex justify-center ">
                            <section className="pagination mt-5">
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
                    </section>
                    <Companies />
                </div>
            </section>
        </div>
    );
}

export default ProductDetailCard;
