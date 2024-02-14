import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faEye, faStar, faDownload, faChartArea, faChartLine, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faClock } from "@fortawesome/free-regular-svg-icons";


export default function ProductCard() {
    return (
        <div className="flex justify-between">
            <div className="product-card w-[308px] h-[604px] 2xl:w-[308px] 2xl:h-[604px] xl:w-[308px] xl:h-[604px] lg:w-[250px] lg:h-[574px] md:w-[200px] md:h-[564px] relative bg-slate-200 m-[10px] xl:m-[10px]">
                <img src="productcard.jpeg" className="object-cover" />
                <button className="absolute top-[20px] left-[20px] bg-[#E74040] w-[52px] h-[24px] font-container text-[14px] leading-[24px] font-bold text-white">Sale</button>
                <button className="absolute top-[160px] left-[75px] 2xl:top-[160px] 2xl:left-[75px] xl:top-[160px] xl:left-[75px] lg:top-[120px] lg:left-[55px] md:top-[80px] md:left-[45px]  p-2 rounded-full bg-white w-[40px] h-[40px]"><FontAwesomeIcon icon={faHeart} /></button>
                <button className="absolute top-[160px] left-[75px] 2xl:top-[160px] 2xl:left-[135px] xl:top-[160px] xl:left-[125px] lg:top-[120px] lg:left-[105px] md:top-[80px] md:left-[90px] p-2 rounded-full bg-white w-[40px] h-[40px]"><FontAwesomeIcon icon={faCartShopping} /></button>
                <button className="absolute top-[160px] left-[75px] 2xl:top-[160px] 2xl:left-[195px] xl:top-[160px] xl:left-[175px] lg:top-[120px] lg:left-[155px] md:top-[80px] md:left-[135px] p- rounded-full bg-white w-[40px] h-[40px]"><FontAwesomeIcon icon={faEye} /></button>
                <div className="flex-col text-left m-3">
                    <div className="flex justify-between mb-3">
                    <h4 className="text-[#23A6F0] text-[14px] font-container leading-[24px] font-bold">English Departement</h4>
                    <button className="w-[50px] h-[26px] bg-[#252B42] text-white font-container text-[12px] leading-[16px] rounded-xl"><FontAwesomeIcon icon={faStar} /> 4.9</button>
                    </div>
                    <h5 className="text-[16px] leading-[24px] font-container font-bold text[#252B42] mb-3">Graphic Design</h5>
                    <p className="text-[14px] leading-[20px] font-container text-[#737373] text- mr-3 mb-3">We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
                    <h6 className="font-bol text-[14px] leading-[24px] font-container text-[#737373] mb-3 font-bold"><FontAwesomeIcon icon={faDownload} /> 15 Sales</h6>
                    <div className="flex gap-1 mb-3">
                    <h5 className="text-[#BDBDBD] text-[16px] leading-[24px] font-container font-bold">$16.48</h5>
                    <h5 className="text-[#23856D] text-[16px] leading-[24px] font-container font-bold">$6.48</h5>
                    </div>
                    <div className="flex gap-1 mb-3">
                    <button className="p-2 rounded-full bg-[#23A6F0]"></button>
                    <button className="p-2 rounded-full bg-[#23856D]"></button>
                    <button className="p-2 rounded-full bg-[#E77C40]"></button>
                    <button className="p-2 rounded-full bg-[#252B42]"></button>
                    </div>
                    <div className="flex gap-1 mb-3 justify-between">
                    <h6 className="text-[12px] font-container leading-[16px] text-[#737373]"><FontAwesomeIcon icon={faClock} /> 22hr 30min</h6>
                    <h6 className="text-[12px] font-container leading-[16px] text-[#737373]"><FontAwesomeIcon icon={faChartLine} /> 64 Lessons</h6>
                    <h6 className="text-[12px] font-container leading-[16px] text-[#737373]"><FontAwesomeIcon icon={faChartArea} /> Progress</h6>
                    </div>
                    <button className="border-1 border-[#23A6F0] text-[#23A6F0] px-[20px] py-[10px] rounded-[37px]">Learn More <FontAwesomeIcon icon={faChevronRight} /> </button>
                </div>
            </div>
        </div>
    )
}
