import Carousel from "../components/Carousel";

export default function Home() {
    return (
        <div>
            <div className="relative text-white">
                <Carousel />

                <div className="absolute top-0 left-0 z-10 flex flex-col text-left py-[40px] gap-[24px] ml-20">
                    <div><h5 className="font-bold text-[16px] font-container leading-[24px]">SUMMER 2020</h5></div>
                    <div>
                        <h1 className="font-bold text-[58px] font-container leading-[80px]">Multicoloured </h1>
                        <br/>
                        <h1 className="font-bold text-[58px] font-container leading-[80px]">Tie-dye Sweater </h1>
                    </div>
                    <div><h4 className="text-[20px] leading-[30px] font-container">We know how large objects will act,</h4></div>
                    <button className="text-center border-1 w-[163px] h-[52px]">SHOP NOW</button>
                </div>
            </div>
        </div>
    )
}
