import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ProductDetailCard from "../components/ProductDetailCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetail() {
  return (
    <div>
      <div className=" ">
        <ProductDetailCard />
      </div>
    </div>
  );
}
