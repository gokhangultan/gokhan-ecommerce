import Carousel from "../components/Carousel";
import Carousel2 from "../components/Carousel2";
import ProductCard from "../components/ProductCard";

export default function Home() {
    return (
        <div>
            <div className="relative text-white hero-section">
               
                <Carousel />
                <div className="absolute top-0 left-0 z-10 flex flex-col xl:text-left 2xl:text-left lg:text-left md:text-left sm:text-left xl:py-[290px] lg:py-[180px] md:py-[120px] sm:py-[100px] py-[40px] gap-[1px] 2xl:gap-[24px] xl:gap-[24px] lg:gap-[18px] md:gap-[14px] sm:gap-[12px] xl:ml-[200px] 2xl:ml-[200px] lg:ml-[120px] md:ml-[80px] sm:ml-[60px] ml-[30px]">
                    <div><h5 className="font-2xl:bold 2xl:text-[16px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[12px] text-[16px] font-container leading-[24px]">SUMMER 2020</h5></div>
                    <div>
                        <h1 className="font-bold xl:text-[58px] 2xl:text-[58px] lg:text-[40px] md:text-[32px] sm:text-[28px] text-[40px] font-container leading-[80px]">NEW COLLECTION </h1>
                     
                    </div>
                    <div><h4 className="2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[20px] leading-[30px] font-container">We know how large objects will act,</h4>
                    <h4 className="2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[20px] leading-[30px] font-container">but things on a small scale.</h4></div>
                    <div><button className="text-center  w-[221px] h-[62px] 2xl:w-[221px] 2xl:h-[62px] xl:w-[221px] xl:h-[62px] lg:w-[180px] lg:h-[42px] md:w-[160px] md:h-[38px] sm:w-[120px] sm:h-[32px] text-[24px] 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[16px] sm:text-[14px] font-bold bg-[#2DC071] rounded-[5px]">SHOP NOW</button></div>
                </div>
            </div>

            <section className="editor-pick py-[80px] relative">
             <h3 className="font-bold text-[24px] leading-[32px] font-container text-[#252B42] align-middle mb-3">EDITOR'S PICK</h3>
             <p className="text-[14px] leading-[20px] align-middle">Problems trying to resolve the conflict between </p>
               <div className="flex gap-3 justify-center mt-[50px] relative">
                 <div className="flex">
                  <img src="editor.jpeg" className="object-cover w-[500px] h-[509px]" />
                  <button className="absolute bg-white mt-[426px] xl:ml-[31px] sm:ml-[11px] xl:w-[170px] xl:h-[48px] sm:w-[105px] sm:h-[28px] lg:w-[135px] lg:h-[36px] md:sm:w-[125px] md:h-[32px]  w-[85px] h-[24px] z-10 font-bold xl:text-[16px] sm:text-[10px] lg:text-[14px] md:text-[12px] text-[10px]">MEN</button>
                </div>
              <div className="flex">
                <img src="editor.jpeg" className="object-cover w-[250px]  h-[509px]"/>
                <button className="absolute bg-white mt-[434px] xl:ml-[31px] sm:ml-[11px] xl:w-[170px] xl:h-[48px] sm:w-[105px] sm:h-[28px] lg:w-[135px] lg:h-[36px] md:sm:w-[125px] md:h-[32px]  w-[85px] h-[24px] z-10 font-bold xl:text-[16px] sm:text-[10px] lg:text-[14px] md:text-[12px] text-[10px]">WOMEN</button>
              </div>
              <div className="flex-col relative ">
                 <div className="flex mb-2">
                  <img src="editor.jpeg" className="object-cover w-[250px] h-[250px]" />
                  <button className="absolute bg-white mt-[426px] xl:ml-[31px] sm:ml-[11px] xl:w-[170px] xl:h-[48px] sm:w-[105px] sm:h-[28px] lg:w-[135px] lg:h-[36px] md:sm:w-[125px] md:h-[32px]  w-[85px] h-[24px] z-10 font-bold xl:text-[16px] sm:text-[10px] lg:text-[14px] md:text-[12px] text-[10px]">KIDS</button>
                  <button className="absolute bg-white mt-[176px] xl:ml-[31px] sm:ml-[11px] xl:w-[170px] xl:h-[48px] sm:w-[105px] sm:h-[28px] lg:w-[135px] lg:h-[36px] md:sm:w-[125px] md:h-[32px]  w-[85px] h-[24px] z-10 font-bold xl:text-[16px] sm:text-[10px] lg:text-[14px] md:text-[12px] text-[10px]">ACCESSORIES</button>
              </div>
             <div className="flex">
                 <img src="editor.jpeg" className="object-cover w-[250px] h-[250px]" />
          </div>
        </div>
    </div>
            </section>

            <section className="best-seller mb-10">
    <h4 className="font-container text-[20px] leading-[30px] align-middle mb-3">Featured Products</h4>
<h3 className="font-bold text-[24px] leading-[32px] font-container text-[#252B42] align-middle mb-3">BESTSELLER PRODUCTS</h3>
    <p className="text-[14px] leading-[20px] align-middle mb-5">Problems trying to resolve the conflict between</p>
        <div className="product-mapping flex mx-[50px] xl:mx-[50px] 2xl:mx-[300px] ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        
        </div>
        <div className="product-mapping flex mx-[50px] xl:mx-[50px] 2xl:mx-[300px]  mt-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        
        </div>
            </section>
            
            <div className="relative text-white carousel-item2">
               <div className="">
                <Carousel2 />
                <div className="absolute top-0 left-0 z-10 flex flex-col xl:text-left 2xl:text-left lg:text-left md:text-left sm:text-left xl:py-[200px] lg:py-[180px] md:py-[120px] sm:py-[100px] py-[40px] gap-[1px] 2xl:gap-[24px] xl:gap-[24px] lg:gap-[18px] md:gap-[14px] sm:gap-[12px] xl:ml-[200px] 2xl:ml-[200px] lg:ml-[120px] md:ml-[80px] sm:ml-[60px] ml-[30px]">
                    <div><h5 className="font-2xl:bold 2xl:text-[16px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[12px] text-[16px] font-container leading-[24px]">SUMMER 2020</h5></div>
                    <div>
                    <h1 className="font-bold xl:text-[58px] 2xl:text-[58px] lg:text-[40px] md:text-[32px] sm:text-[28px] text-[40px] font-container leading-[80px]">Vita Classic</h1>
                    <h1 className="font-bold xl:text-[58px] 2xl:text-[58px] lg:text-[40px] md:text-[32px] sm:text-[28px] text-[40px] font-container leading-[80px]">Product</h1>
                     
                    </div>
                    <div><h4 className="2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[20px] leading-[30px] font-container">We know how large objects will act,</h4>
                    <h4 className="2xl:text-[20px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[20px] leading-[30px] font-container">but things on a small scale.</h4></div>
                    <div><button className="text-center  w-[221px] h-[62px] 2xl:w-[221px] 2xl:h-[62px] xl:w-[221px] xl:h-[62px] lg:w-[180px] lg:h-[42px] md:w-[160px] md:h-[38px] sm:w-[120px] sm:h-[32px] text-[24px] 2xl:text-[24px] xl:text-[24px] lg:text-[20px] md:text-[16px] sm:text-[14px] font-bold bg-[#2DC071] rounded-[5px]">SHOP NOW</button></div>
                </div>
                </div>
            </div>
            <section className="collection">
    <div className="flex flex-col-reverse items-center mx-4 md:flex-row md:justify-between md:mx-0">
        <div className="w-full md:w-3/5 md:h-auto md:flex md:items-center">
            <img src="collection.png" alt="Collection" className="object-cover w-full" />
        </div>
        <div className="collection-text flex flex-col mt-8 md:mt-0 md:w-2/5 md:ml-8">
            <h5 className="font-container font-bold text-sm leading-6 text-gray-400 tracking-widest mb-4 md:mb-4">SUMMER 2020</h5>
            <h1 className="font-bold font-container text-2xl leading-10 tracking-wide text-gray-800 md:text-4xl md:leading-12">Part of the Neural</h1>
            <h1 className="font-bold font-container text-2xl leading-10 tracking-wide text-gray-800 md:text-4xl md:leading-12 mb-4">Universe</h1>
            <h4 className="text-gray-600 text-lg leading-7 tracking-wide font-container ">We know how large objects will act,</h4>
            <h4 className="text-gray-600 text-lg leading-7 tracking-wide font-container mb-4">but things on a small scale.</h4>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                <button className="text-white bg-green-500 rounded-md px-4 py-2 md:px-6 md:py-3">BUY NOW</button>
                <button className="border-2 border-green-500 bg-white text-green-500 rounded-md px-4 py-2 md:px-6 md:py-3">READ MORE</button>
            </div>
        </div>
    </div>
</section>



        </div>
    )
}
