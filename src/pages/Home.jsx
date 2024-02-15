import Carousel from "../components/Carousel";
import Carousel2 from "../components/Carousel2";
import ProductCard from "../components/ProductCard";
import FeaturedCard from "../components/FeaturedCard";

export default function Home() {
    return (
        <div>
            <div className="relative text-white hero-section">

                <Carousel />
                <div className="absolute top-0 left-0 z-10 flex flex-col xl:text-left 2xl:text-left lg:text-left md:text-left sm:text-left xl:py-[290px] lg:py-[180px] md:py-[120px] sm:py-[100px] py-[40px] gap-[1px] 2xl:gap-[24px] xl:gap-[24px] lg:gap-[18px] md:gap-[14px] sm:gap-[12px] xl:ml-[200px] 2xl:ml-[200px] lg:ml-[120px] md:ml-[80px] sm:ml-[60px] ml-[30px]">
                    <div><h5 className="font-2xl:bold 2xl:text-[16px] xl:text-[16px] lg:text-sm md:text-xs sm:text-xs text-[16px]  leading-[24px]">SUMMER 2020</h5></div>
                    <div>
                        <h1 className="font-bold xl:text-[58px] 2xl:text-[58px] lg:text-[40px] md:text-[32px] sm:text-[28px] text-[40px]  leading-[80px]">NEW COLLECTION </h1>

                    </div>
                    <div><h4 className="2xl:text-xl xl:text-xl lg:text-[18px] md:text-[16px] sm:text-sm text-xl leading-[30px] ">We know how large objects will act,</h4>
                        <h4 className="2xl:text-xl xl:text-xl lg:text-[18px] md:text-[16px] sm:text-sm text-xl leading-[30px] ">but things on a small scale.</h4></div>
                    <div><button className="carousel-button hover:bg-white hover:text-[#2DC071]">SHOP NOW</button></div>
                </div>
            </div>

            <section className="editor-pick py-[80px] relative text-center">
                <h3 className="font-bold text-2xl leading-[32px]  text-[#252B42] align-middle mb-3">EDITOR'S PICK</h3>
                <p className="text-sm leading-5 align-middle">Problems trying to resolve the conflict between </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-[50px] relative mx-4">
                    <div className="flex">
                        <img src="editor.jpeg" className="object-cover w-[500px] h-[509px]" />
                        <button className="editor-button">MEN</button>
                    </div>
                    <div className="flex">
                        <img src="editor2.jpeg" className="object-cover w-[500px] sm:w-[250px]  h-[509px]" />
                        <button className="editor-button">WOMEN</button>
                    </div>
                    <div className="flex-col relative ">
                        <div className="flex mb-2">
                            <img src="editor3.jpeg" className="object-cover w-[500px] sm:w-[250px] h-[250px]" />
                            <button className="editor-button">KIDS</button>
                            <button className=" editor-button mt-[176px] ">ACCESSORIES</button>
                        </div>
                        <div className="flex">
                            <img src="editor4.jpeg" className="object-cover w-[500px] sm:w-[250px] h-[250px]" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="best-seller mb-10 text-center ">
                <h4 className=" text-xl leading-[30px] align-middle mb-3">Featured Products</h4>
                <h3 className="font-bold text-2xl leading-[32px]  text-[#252B42] mb-3">BESTSELLER PRODUCTS</h3>
                <p className="text-sm leading-5 align-middle mb-5">Problems trying to resolve the conflict between</p>
                <div className="product-mapping flex flex-wrap gap-3 justify-between  ">
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

            <div className="relative text-white carousel-item2 mb-5">
                <div className="">
                    <Carousel2 />
                    <div className="absolute top-[20px] left-[30px] sm:top-[180px] sm:left-[240px] z-10 flex flex-col text-left gap-4 carousel-2 w-[300px] sm:w-[500px]">
                        <div><h5 className="text-xl font-bold  leading-[24px]">SUMMER 2020</h5></div>
                        <div>
                            <h1 className="font-bold text-4xl sm:text-6xl leading-[40px] sm:leading-[80px]">Vita Classic Product</h1>
                        </div>
                        <div><h4 className="text-xl leading-[30px] ">We know how large objects will act,</h4>
                            <h4 className="text-xl leading-[30px] ">but things on a small scale.</h4></div>
                        <div className="flex flex-col sm:flex-row  gap-1 items-center">
                            <h3 className=" text-white  text-2xl leading-8 font-bold mr-0 sm:mr-10 ">$16.48</h3>
                            <button className="carousel-button hover:bg-white hover:text-green-500 bg-[#2DC071] ">ADD TO CART</button></div>
                    </div>
                </div>
            </div>

            <section className="test max-w-[1400px] m-auto  pt-5 pb-5 ">
                <div className="flex flex-col-reverse sm:flex-row ">
                    <div className="basis-1/2 flex justify-end items-end">
                        <img src="collection.png" className=" sm:w-[704px] sm:h-[682px] w-[463px] :h-[403px] sm:object-cover object-cover" />
                    </div>
                    <div className="basis-1/2 flex justify-center items-center  ">
                        <div className="w-[400px] flex flex-col gap-4 collection-text">
                            <h5 className=" font-bold text-sm text-gray-800 ">SUMMER 2020</h5>
                            <h2 className="h2-home">Part of the Neural Universe</h2>
                            <div className="text-gray-600 text-lg  ">We know how large objects will act, but things on a small scale.</div>
                            <div className="flex flex-col sm:flex-row  gap-3 ">
                                <button className="button primary-button ">BUY NOW</button>
                                <button className="button secondary-button ">READ MORE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="featured-post pb-5 ">
                <div className="flex flex-col items-center flex-wrap gap-3 ">
                    <h6 className="font-bold text-sm leading-6 primary-text">Practice Advice</h6>
                    <h2 className="h2-home text-5xl">Featured Posts</h2>
                    <p className="text-[#737373] text-sm leading-5 w-[369px] text-center">Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics </p>
                </div>
                <div className="featured-card flex flex-row  gap-2 mt-5 justify-center flex-wrap ">
                    <FeaturedCard />
                    <FeaturedCard />
                    <FeaturedCard />
                </div>

            </section>
        </div>
    )
}
