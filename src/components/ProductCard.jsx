import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEye,
  faStar,
  faDownload,
  faChartArea,
  faChartLine,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faClock } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { GlobalAction } from "../store/reducers/ShoppingCardReducer";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

export default function ProductCard({ product }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = {
    1: { id: 1, code: "k:tisort" },
    2: { id: 2, code: "k:ayakkabi" },
    3: { id: 3, code: "k:ceket" },
  };
  const categoryCode = categories[product.category_id];

  const handleAddToCart = () => {
    dispatch({ type: GlobalAction.setAddCard, payload: product });
    toast.success("Ürün Sepete Eklendi..", {
      position: "top-right",
    });
  };

  return (
    <div className="flex flex-grow-1 basis-[250px] justify-between border-1 border-gray-150 shadow-sm">
      <div className="product-card m-3 relative">
        <img
          src={product.images[0].url}
          alt="Product Image"
          className="w-100 object-cover"
        />
        <button className="product-card-info">Sale</button>
        <button className="product-card-icon left-[75px]">
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button
          className="product-card-icon left-[125px]  "
          onClick={handleAddToCart}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
        <button className="product-card-icon left-[175px] ">
          <FontAwesomeIcon icon={faEye} />
        </button>
        <div className="flex-col text-left m-3">
          <div className="flex justify-between mb-3">
            <h4 className="primary-text text-sm  leading-6 font-bold">
              English Department
            </h4>
            <button className="w-[50px] h-[26px] bg-[#252B42] text-white  text-xs leading-[16px] rounded-xl hover:bg-gray-400">
              <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />{" "}
              {product.rating}
            </button>
          </div>
          <h5 className="text-[16px] leading-6  font-bold text[#252B42] mb-3">
            {product.name}
          </h5>
          <p className="text-sm leading-5  secondary-text text- mr-3 mb-3">
            {product.description}
          </p>
          <h6 className="font-bol text-sm leading-6  secondary-text  mb-3 font-bold">
            <FontAwesomeIcon icon={faDownload} /> {product.sell_count} SOLD !
          </h6>
          <div className="flex gap-1 mb-3">
            <h5 className="text-[#BDBDBD] text-[16px] leading-6  font-bold">
              ${product.price}
            </h5>
            <h5 className="text-[#23856D] text-[16px] leading-6  font-bold">
              $6.48
            </h5>
          </div>
          <div className="flex gap-1 mb-3">
            <button className="p-2 rounded-full bg-[#23A6F0]"></button>
            <button className="p-2 rounded-full bg-[#23856D]"></button>
            <button className="p-2 rounded-full bg-[#E77C40]"></button>
            <button className="p-2 rounded-full bg-[#252B42]"></button>
          </div>
          <div className="flex gap-1 mb-3 justify-between">
            <h6 className="text-xs  leading-4 secondary-text ">
              <FontAwesomeIcon
                icon={faClock}
                size="lg"
                style={{ color: "#23A6F0" }}
              />{" "}
              22hr 30min
            </h6>
            <h6 className="text-xs  leading-4 secondary-text ">
              <FontAwesomeIcon
                icon={faChartLine}
                size="lg"
                style={{ color: "#E77C40" }}
              />{" "}
              64 Lessons
            </h6>
            <h6 className="text-xs  leading-4 secondary-text ">
              <FontAwesomeIcon
                icon={faChartArea}
                size="lg"
                style={{ color: "#23856D" }}
              />{" "}
              STOCK {product.stock}
            </h6>
          </div>
          <button
            className="product-card-more"
            onClick={() => {
              history.push(
                `/product/${categoryCode}/${product.id}/${product.name}/`
              );
            }}
          >
            Learn More <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
