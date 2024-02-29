import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { GlobalAction } from "../store/reducers/ShoppingCardReducer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Cart() {
  const cart = useSelector((state) => state.shoppingCard.cart);
  const totalItemCount = cart.reduce((total, item) => total + item.count, 0);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: GlobalAction.setRemoveCard, payload: productId });
  };

  const handleDecreaseCount = (productId) => {
    dispatch({
      type: GlobalAction.setChangeCount,
      payload: { productId, change: -1 },
    });
  };

  const handleIncreaseCount = (productId) => {
    dispatch({
      type: GlobalAction.setChangeCount,
      payload: { productId, change: 1 },
    });
  };

  return (
    <div className="flex flex-col gap-1 container">
      <h2 className="m-3 text-3xl">Sepetim ({totalItemCount} ürün)</h2>
      {cart.map((item) => (
        <div className=" p-2 border-1 rounded-md border-primaryColor mx-5 my-1 bg-gray-50">
          <div className="flex flex-row bg-gray-200  px-5 my-2">
            <input
              className="m-1"
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(item.product.id)}
            />
            <h2 className="m-1 rounded px-6 py-2">
              Satıcı: {item.product.store_id}
            </h2>
            <h2 className="m-1  rounded px-6 py-2">
              Rating: {item.product.rating}
            </h2>
          </div>
          <div
            key={item.product.id}
            className=" justify-between  flex flex-col md:flex-row gap-3"
          >
            <div className="flex flex-col md:flex-row justify-between gap-5 items-center basis-2/3">
              <div className="flex basis-2/4 justify-center items-center">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.product.id)}
                />
                <img
                  src={item.product.images[0].url}
                  className="object-contain w-[200px] h-[200px]"
                  alt="product"
                />
              </div>
              <div className="flex flex-col basis-2/4 text-base">
                <div>{item.product.name}</div>
                <div>{item.product.description}</div>
                <div className="flex flex-row gap-3">
                  <div className="text-primaryColor">
                    Price: ${item.product.price}
                  </div>
                  <div>Count: {item.count}</div>
                </div>
                <div className="flex flex-row gap-2"></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 basis-1/3 mx-5">
              <div className="flex flex-row gap-1 border-1 rounded border-primaryColor">
                <button
                  onClick={() =>
                    handleDecreaseCount(item.product.id, "decrease")
                  }
                  className="bg-gray-200 px-2 rounded hover:bg-primaryColor"
                >
                  -
                </button>
                <p className="px-2 rounded disabled">{item.count}</p>
                <button
                  onClick={() => handleIncreaseCount(item.product.id)}
                  className="bg-gray-200 px-2 rounded hover:bg-primaryColor"
                >
                  +
                </button>
              </div>
              <div className="text-primaryColor text-4xl">
                ${(item.count * item.product.price).toFixed(2)}
              </div>
              <button onClick={() => handleRemoveFromCart(item.product.id)}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  style={{ color: "#23A6F0" }}
                />
              </button>{" "}
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center m-2">
        <Link to="/confirm">
          {" "}
          <button className="button bg-primaryColor text-white hover:bg-gray-300 px-3 py-3">
            Siparişi Tamamla
          </button>
        </Link>
      </div>
    </div>
  );
}
