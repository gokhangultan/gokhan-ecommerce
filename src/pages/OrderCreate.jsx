import { useEffect, useState } from "react";
import { axiosInstance } from "../store/actions/addressAction";
import { useSelector } from "react-redux";

export default function OrderCreate() {
  const [orders, setOrders] = useState([]);
  const addressList = useSelector((state) => state.shoppingCard.address[0]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/order", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="p-3 flex flex-col gap-3">
        <h1 className="text-3xl">Siparislerim</h1>

        {orders.map((order) => {
          // Adres listesi boşsa
          if (!addressList || addressList.length === 0) {
            return (
              <div
                key={order.id}
                className="flex flex-col border-3 border-primaryColor p-3 rounded-lg"
              >
                <p className="text-xl font-bold">Siparis NO: {order.id}</p>
                <p className="text-xl font-bold">
                  Siparis tarihi: {new Date(order.order_date).toLocaleString()}
                </p>
                <p>Address not found</p>
              </div>
            );
          }

          const address = addressList.find(
            (addr) => addr.id === order.address_id
          );

          return (
            <div
              key={order.id}
              className="flex flex-col border-3 border-primaryColor p-3 rounded-lg "
            >
              <p className="text-xl font-bold">Siparis NO: {order.id}</p>
              <p>
                <span className="text-xl font-bold">Siparis tarihi: </span>
                {new Date(order.order_date).toLocaleString()}
              </p>
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex flex-col border-3 border-primaryColor rounded-lg p-2 mb-2 basis-1/2">
                  <div className="flex gap-2 items-center">
                    <p className="text-xl font-bold">Seçilen Adres</p>
                  </div>
                  {address ? (
                    <div className="flex flex-col gap-2 text-sm items-end">
                      <p>
                        <span className="font-bold">Address:</span>{" "}
                        {address.address}
                      </p>
                      <p>
                        <span className="font-bold">İsim:</span> {address.name}
                      </p>
                      <p>
                        <span className="font-bold">Şehir:</span> {address.city}
                      </p>
                      <p>
                        <span className="font-bold">Adres İsmi:</span>{" "}
                        {address.title}
                      </p>
                    </div>
                  ) : (
                    <p>Address not found</p>
                  )}
                </div>

                <div className="flex basis-1/2 flex-col border-3 border-primaryColor rounded-lg p-2 mb-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://www.gokhangultan.com/logo.gg.png"
                      className="lg:max-w-[50px] max-w-[50px] object-contain pb-3"
                      alt="Logo"
                    />
                    <p className="text-xl font-bold">BANK</p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm items-end">
                    <p>
                      <span className="font-bold">Card Number:</span>{" "}
                      {order.card_no}
                    </p>
                    <p>
                      <span className="font-bold">Card Name:</span>{" "}
                      {order.card_name}
                    </p>
                    <p>
                      <span className="font-bold">Card Expiry:</span>{" "}
                      {order.card_expire_month}/ ****
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-bold">Products:</h2>
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row gap-2 items-center align-middle"
                  >
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      style={{ maxWidth: "200px" }}
                    />
                    <div className="flex flex-col">
                      <p>
                        <span className="font-bold">Ürün İsmi:</span>{" "}
                        {product.name}
                      </p>
                      <p>
                        <span className="font-bold">Detay:</span>{" "}
                        {product.description}
                      </p>
                      <p>
                        <span className="font-bold">Price:</span>{" "}
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex align-middle items-center justify-center">
                  <button className="bg-primaryColor text-white px-4 py-2 rounded-xl">
                    Total: ${order.price.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
