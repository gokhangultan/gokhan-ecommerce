import { faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { GlobalAction } from "../store/reducers/ShoppingCardReducer";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Cart() {
  const cart = useSelector((state) => state.shoppingCard.cart);
  const totalItemCount = cart.reduce((total, item) => total + item.count, 0);
  const dispatch = useDispatch();
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [shippingPrice, setShippingPrice] = useState(29.9);
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [couponCodeApplied, setCouponCodeApplied] = useState(false);
  const [discountAppliedText, setDiscountAppliedText] = useState("");

  const createOrder = () => {
    const orderData = {
      cardTotal: cardTotal.toFixed(2),
      shippingPrice: shippingPrice,
      totalPrice: totalPrice.toFixed(2),
      discountAmount: DiscountAmount.toFixed(2),
      couponCodeApplied: couponCodeApplied,
      discountAppliedText: discountAppliedText,
      items: cart.map((item) => ({
        name: item.product.name,
        count: item.count,
        detail: item.product.description,
        product_id: item.product.id,
        price: item.product.price,
      })),
    };

    sessionStorage.setItem("orderData", JSON.stringify(orderData));
  };

  const cardTotal = cart.reduce(
    (total, item) => total + item.count * item.product.price,
    0
  );
  const DiscountAmount = cardTotal - totalPrice;

  useEffect(() => {
    const calculateTotalPrice = cart.reduce(
      (total, item) => total + item.count * item.product.price,
      0
    );
    if (calculateTotalPrice > 150) {
      setShippingPrice(0);
    } else {
      setShippingPrice(29.9);
    }
    setTotalPrice(calculateTotalPrice + shippingPrice);
  }, [cart, shippingPrice]);

  const closeConfirm = () => {
    setConfirmOrder(false);
  };
  const handleButtonClick = () => {
    setConfirmOrder(true);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: GlobalAction.setRemoveCard, payload: productId });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const couponCode = e.target.elements.couponCode.value;
    if (couponCode === "GG") {
      setTotalPrice(totalPrice * 0.9); // 10% indirim
      setCouponCodeApplied(true);
      setDiscountAppliedText("%10 discount applied");
    }
    setShowForm(false); // Formu tekrar gizle
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
    <div className="flex flex-col md:flex-row container">
      <div className="flex flex-col gap-1 container basis-3/4">
        <h2 className="m-3 text-3xl">Sepetim ({totalItemCount} ürün)</h2>
        {cart.map((item) => (
          <div
            key={`${item.product.id}_${item.count}`}
            className="p-2 border-1 rounded-md border-primaryColor mx-5 my-1 bg-gray-50"
          >
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
          {" "}
          <button
            className="button bg-primaryColor text-white hover:bg-gray-300 px-3 py-3"
            onClick={handleButtonClick}
          >
            Siparişi Tamamla
          </button>
        </div>
      </div>
      <div
        className={`bg-gray-100 flex-col flex basis-1/4 my-20 ${
          confirmOrder ? "flex" : "hidden"
        }`}
      >
        <div
          className={` confirm-order flex flex-row justify-between items-start `}
        >
          <h3 className=" text-primaryColor font-bold text-lg m-3">
            Sipariş Özeti
          </h3>
          <button onClick={closeConfirm}>
            <FontAwesomeIcon
              icon={faX}
              className="bg-primaryColor text-white m-2  p-3 rounded-full"
            />
          </button>
        </div>
        <div className="flex flex-col border-2 border-gray-200 m-4 gap-4 p-2">
          <div className="flex flex-row  gap-2  items-center justify-around">
            <h5>Ürün Toplamı</h5>
            <h5 className="font-bold text-lg text-primaryColor">
              ${cardTotal.toFixed(2)}
            </h5>
          </div>
          <div>
            {cardTotal >= 150 ? (
              <div className="flex flex-row justify-around gap-2 items-center ">
                <h5>$150 Üzeri Kargo Bedava</h5>
                <h5 className="text-red-700 font-bold line-through text-lg">
                  -${shippingPrice}
                </h5>
              </div>
            ) : (
              <div className="flex flex-row justify-around gap-2 items-center">
                <h5>Kargo Toplamı</h5>
                <h5 className="text-red-700 font-bold  text-lg">$29.9</h5>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              disabled={showForm}
              className={`bg-primaryColor text-white rounded p-1 ${
                showForm && "opacity-50 cursor-not-allowed"
              }`}
            >
              <FontAwesomeIcon icon={faPlus} /> İndirim Kodu
            </button>
            {showForm && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                  type="text"
                  name="couponCode"
                  placeholder="Kupon Kodunuzu Giriniz."
                  className="p-2"
                />
                <button
                  type="submit"
                  className="bg-primaryColor text-white p-1 rounded mx-3"
                >
                  Uygula
                </button>
              </form>
            )}
          </div>
          <div className="flex flex-row justify-around gap-2">
            <div>{couponCodeApplied && <span>{discountAppliedText}</span>}</div>
            <div>
              {" "}
              {couponCodeApplied && (
                <span className="text-red-700 ">
                  ${DiscountAmount.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-around gap-2  items-center">
            <h5 className="font-bold text-sm">Toplam Fiyat</h5>
            <h5 className="font-bold text-lg text-primaryColor">
              ${totalPrice.toFixed(2)}
            </h5>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-primaryColor p-3 rounded text-white"
              onClick={() => {
                history.push("/confirm");
                createOrder();
              }}
            >
              Sipariş Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
