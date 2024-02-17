import { faEye, faHeart, faStarHalf } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselCaption,
} from 'reactstrap';
import ProductCard from './ProductCard';
import { faAws, faHooli, faLyft, faPiedPiperHat, faRedditAlien, faStripe } from '@fortawesome/free-brands-svg-icons';

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

const customClass = "md:w-[540px] w-[350px] h-full lg:h-auto carousel-image";

function ProductDetailCard() {
    const [activeTab, setActiveTab] = useState('description');
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

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
                key={item.src}
            >
                <img src={item.src} alt={item.altText} style={customStyles} className={customClass} />
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    const smallThumbnails = (
        <div className='flex flex-row gap-3'>
            {items.map((item, index) => (
                <div key={index} className={`cursor-pointer ${index !== activeIndex ? 'inactive-thumbnail' : ''}`}>
                    <img
                        src={item.src}
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
                        <Link href="" className="font-bold text-sm leading-6 text-[#252B42] ">Home</Link>
                        <Link><FontAwesomeIcon icon={faChevronRight} size="md" style={{ color: "#BDBDBD", }} /> </Link>
                        <Link href="" className="font-bold text-sm leading-6 text-[#BDBDBD]">Shop</Link>
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
                            <h4 className='text-xl leading-8 text-textColor '>Floating Phone</h4>
                            <div className='flex-row flex gap-2'>
                                <div className='flex flex-row gap-2 mt-1'>
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#F3CD03", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#F3CD03", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#F3CD03", }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#F3CD03", }} />
                                    <FontAwesomeIcon icon={faStarHalf} style={{ color: "#F3CD03", }} />
                                </div>
                                <h6 className='font-bold text-secondaryColor text-sm leading-6'>10 Reviews</h6>
                            </div>
                            <div className='flex-col flex gap-1 mb-4'>
                                <h3 className='font-bold text-2xl leading text-textColor'>$1,139.33</h3>
                                <div className='flex flex-row'>
                                    <h6 className='font-bold text-sm leading-6 text-secondaryColor'>Availability  :</h6>
                                    <h6 className='text-sm font-bold leading-6 text-primaryColor'>In Stock </h6>
                                </div>
                            </div>
                            <p className='text-sm leading-5 text-[#858585]'>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
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
                        <img src='detail1.jpeg' alt='Product Image' className=' w-[316px] h-[372px] rounded-md shadow-lg' />
                        <div style={{ display: activeTab === 'description' ? 'block' : 'none' }}>
                            <div className='flex-col flex gap-4'>
                                <h3 className='font-bold text-2xl text-textColor leading-8'>the quick fox jumps over </h3>
                                <p className='text-sm leading-5 text-secondaryColor'>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                                <p className='text-sm leading-5 text-secondaryColor'>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                                <p className='text-sm leading-5 text-secondaryColor'>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                            </div>
                        </div>
                        <div style={{ display: activeTab === 'additional' ? 'block' : 'none' }}>
                            <div className='flex-col flex gap-4'>
                                <h3 className='font-bold text-2xl text-textColor leading-8'>the quick fox jumps over </h3>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>the quick fox jumps over the lazy dog</h6>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>the quick fox jumps over the lazy dog</h6>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>the quick fox jumps over the lazy dog</h6>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>the quick fox jumps over the lazy dog</h6>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: activeTab === 'reviews' ? 'block' : 'none' }}>
                            <div className='flex-col flex gap-4'>
                                <h3 className='font-bold text-2xl text-textColor leading-8'>the quick fox jumps over </h3>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>the quick fox jumps over the lazy dog</h6>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>the quick fox jumps over the lazy dog</h6>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ color: "#737373", }} />
                                    <h6 className='text-sm leading-6 text-secondaryColor font-bold'>the quick fox jumps over the lazy dog</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bestseller px-[10px] sm:px-[195px] mt-5 bg-[#FAFAFA]'>
                <div className="">
                    <h3 className='text-textColor font-bold text-2xl'>BESTSELLER PRODUCTS</h3>
                    <div className="flex items-center my-4">
                        <div className="w-full border-t border-[#ECECEC]"></div>
                    </div>
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
                    <div className="flex flex-col lg:flex-row gap-5 justify-between py-5">
                        <FontAwesomeIcon icon={faHooli} size="5x" style={{ color: "#737373", }} />
                        <FontAwesomeIcon icon={faLyft} size="5x" style={{ color: "#737373", }} />
                        <FontAwesomeIcon icon={faPiedPiperHat} size="5x" style={{ color: "#737373", }} />
                        <FontAwesomeIcon icon={faStripe} size="5x" style={{ color: "#737373", }} />
                        <FontAwesomeIcon icon={faAws} size="5x" style={{ color: "#737373", }} />
                        <FontAwesomeIcon icon={faRedditAlien} size="5x" style={{ color: "#737373", }} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetailCard;