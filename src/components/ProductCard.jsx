import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faEye, faStar, faDownload, faChartArea, faChartLine, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faClock } from "@fortawesome/free-regular-svg-icons";


export default function ProductCard() {
    return (
        <div className="flex justify-between border-1 border-gray-150 shadow-sm">
            <div className="product-card w-[328px] h-[604px] sm:w-[308px] sm:h-[580px] m-3 relative">
                <img src="productcard.jpeg" className="object-cover" />
                <button className="product-card-info">Sale</button>
                <button className="product-card-icon left-[75px]"><FontAwesomeIcon icon={faHeart} /></button>
                <button className="product-card-icon left-[125px] "><FontAwesomeIcon icon={faCartShopping} /></button>
                <button className="product-card-icon left-[175px] "><FontAwesomeIcon icon={faEye} /></button>
                <div className="flex-col text-left m-3">
                    <div className="flex justify-between mb-3">
                        <h4 className="primary-text text-sm  leading-6 font-bold">English Departement</h4>
                        <button className="w-[50px] h-[26px] bg-[#252B42] text-white  text-xs leading-[16px] rounded-xl hover:bg-gray-400"><FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} /> 4.9</button>
                    </div>
                    <h5 className="text-[16px] leading-6  font-bold text[#252B42] mb-3">Graphic Design</h5>
                    <p className="text-sm leading-5  secondary-text text- mr-3 mb-3">We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
                    <h6 className="font-bol text-sm leading-6  secondary-text  mb-3 font-bold"><FontAwesomeIcon icon={faDownload} /> 15 Sales</h6>
                    <div className="flex gap-1 mb-3">
                        <h5 className="text-[#BDBDBD] text-[16px] leading-6  font-bold">$16.48</h5>
                        <h5 className="text-[#23856D] text-[16px] leading-6  font-bold">$6.48</h5>
                    </div>
                    <div className="flex gap-1 mb-3">
                        <button className="p-2 rounded-full bg-[#23A6F0]"></button>
                        <button className="p-2 rounded-full bg-[#23856D]"></button>
                        <button className="p-2 rounded-full bg-[#E77C40]"></button>
                        <button className="p-2 rounded-full bg-[#252B42]"></button>
                    </div>
                    <div className="flex gap-1 mb-3 justify-between">
                        <h6 className="text-xs  leading-4 secondary-text "><FontAwesomeIcon icon={faClock} style={{ color: "#23A6F0", }} /> 22hr 30min</h6>
                        <h6 className="text-xs  leading-4 secondary-text "><FontAwesomeIcon icon={faChartLine} style={{ color: "#E77C40", }} /> 64 Lessons</h6>
                        <h6 className="text-xs  leading-4 secondary-text "><FontAwesomeIcon icon={faChartArea} style={{ color: "#23856D", }} /> Progress</h6>
                    </div>
                    <button className="product-card-more ">Learn More <FontAwesomeIcon icon={faChevronRight} /> </button>
                </div>
            </div>
        </div>
    )
}
