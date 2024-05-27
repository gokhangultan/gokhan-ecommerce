import {
  faEdit,
  faInfoCircle,
  faMinusCircle,
  faPhone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  axiosInstance,
  fetchAddress,
  setAddress,
} from "../store/actions/addressAction";
import { fetchPayment } from "../store/actions/paymentAction";
import PaymentForm from "../components/PaymentForm";
import AddressCreateForm from "../components/AddressCreateForm";
import AddressEditForm from "../components/AddressEditForm";
import { GlobalAction } from "../store/reducers/ShoppingCardReducer";

export default function ConfirmOrder({ paymentId }) {
  const [orderData, setOrderData] = useState(null);
  const [showAddressInfo, setShowAddressInfo] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [addressButtonClicked, setAddressButtonClicked] = useState(false);
  const [paymentButtonClicked, setPaymentButtonClicked] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const adressList = useSelector((state) => state.shoppingCard.address[0]);
  const paymentList = useSelector((state) => state.shoppingCard.payment);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ccv: "" });
  const [showSavedCardOptions, setShowSavedCardOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
    setFormData(payment);
  };

  const handleUpdatePayment = async () => {
    try {
      const paymentData = {
        id: selectedPayment.id,
        card_no: formData.card_no,
        expire_month: formData.expire_month,
        expire_year: formData.expire_year,
        name_on_card: formData.name_on_card,
      };
      const response = await axiosInstance.put(`/user/card`, paymentData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200 && response.status === 201) {
        toast.success("Ödeme Yönteminiz Güncellendi.");
      }
    } catch (error) {
      toast.error("Ödeme Yönteminiz Güncellenemedi. ");
    }
  };

  const handleCreateOrder = async () => {
    try {
      const payload = {
        address_id: 1, // Update with the selected address ID
        order_date: new Date().toISOString(), // Update with the current date and time
        card_no: formData.card_no,
        card_name: formData.name_on_card,
        card_expire_month: formData.expire_month,
        card_expire_year: formData.expire_year,
        card_ccv: 333, // Assuming you have a ccv field in your form
        price: orderData.totalPrice,
        products: orderData.items.map((item) => ({
          product_id: item.product_id,
          count: item.count,
          detail: item.detail,
        })),
      };

      const response = await axiosInstance.post("/order", payload, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200 && response.status === 201) {
        toast.success("Siparişiniz Başarı İle Kaydedildi.");
        dispatch({ type: GlobalAction.setRemoveAllCard });
      }
    } catch (error) {
      console.error("Sipariş Oluşturulamadı:", error);
      toast.error("Failed to create order. Please try again later.");
    }
  };

  const handleUseSavedCard = () => {
    setShowSavedCardOptions(true);
  };

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://turkiyeapi.dev/api/v1/provinces");
        if (response.ok) {
          const data = await response.json();
          const cityNames = data.data.map((city) => city.name);
          setCities(cityNames);
        } else {
          console.error("Error fetching cities:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (!adressList || adressList.length === 0) {
      dispatch(fetchAddress());
    }
    if (!paymentList || paymentList.length === 0) {
      dispatch(fetchPayment());
    }
  }, [dispatch, adressList, paymentList]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEdit = (selectedAddress) => {
    setFormData(selectedAddress);
    setIsEditing(true);
  };
  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  const showForm = () => {
    document.getElementById("contactForm").classList.remove("hidden");
  };
  const toggleAddressInfo = () => {
    setShowAddressInfo(true);
    setShowPaymentOptions(false);
    setAddressButtonClicked(true);
    setPaymentButtonClicked(false);
  };

  const togglePaymentOptions = () => {
    setShowAddressInfo(false);
    setShowPaymentOptions(true);
    setAddressButtonClicked(false);
    setPaymentButtonClicked(true);
  };

  const handleDelete = async (addressId) => {
    try {
      await axiosInstance.delete(`/user/address/${addressId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      dispatch(fetchAddress()); // Adres listesini yeniden al

      toast.success("Adres başarıyla silindi.");
    } catch (error) {
      console.error("Adres silinemedi:", error);
      toast.error("Adres silinirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("orderData"));
    if (data) {
      data.cardTotal = parseFloat(data.cardTotal);
      data.shippingPrice = parseFloat(data.shippingPrice);
      data.discountAmount = parseFloat(data.discountAmount);
      data.totalPrice = parseFloat(data.totalPrice);

      setOrderData(data);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row container">
      <div className={`flex flex-col gap-1 container basis-3/4`}>
        <div className="flex flex-col md:flex-row justify-between gap-1">
          <button
            className={`border-5 border-gray-300 flex flex-col basis-1/2 p-3 gap-2 items-start ${
              addressButtonClicked
                ? "border-[#23A6F0]"
                : "shadow-2xl opacity-70"
            }`}
            onClick={toggleAddressInfo}
          >
            <h1
              className={`text-2xl font-bold ${
                addressButtonClicked ? "text-[#23A6F0]" : ""
              }`}
            >
              Adres Bilgileri
            </h1>
            <p>343 sokak No8 daire4 Yigitler Mahallesi</p>
            <p>35140 İzmir Buca</p>
          </button>
          <button
            className={`border-5 border-gray-300 flex flex-col basis-1/2 p-3 gap-2 items-start  ${
              paymentButtonClicked
                ? "border-[#23A6F0]"
                : "shadow-2xl opacity-70"
            }`}
            onClick={togglePaymentOptions}
          >
            <h1
              className={`text-2xl font-bold ${
                paymentButtonClicked ? "text-[#23A6F0]" : ""
              }`}
            >
              Ödeme Seçenekleri
            </h1>
            <p>
              <span className="font-bold">Banka/Kredi Kartı</span> veya{" "}
              <span className="font-bold">Alışveriş Kredisi</span> ile ödemenizi
              güvenle yapabilirsiniz.
            </p>
          </button>
        </div>

        <div className={showAddressInfo ? "flex " : "hidden"}>
          <div className="flex flex-col w-full gap-3">
            <div className=" items-center flex gap-2">
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ color: "#8EC2F2" }}
                size="2x"
              />
              Kurumsal faturalı alışveriş yapmak için "Faturamı Aynı Adrese
              Gönder" tikini kaldırın ve Fatura adresi olarak kayıtlı Kurumsal
              Fatura adresinizi seçin.
            </div>

            <AddressCreateForm />

            <div className="flex flex-row justify-between">
              <h1>Teslimat Adresi</h1>
              <h1>Faturamı Aynı Adrese Gönder</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-5 ">
              <div className="flex-col flex gap-3 basis-1/2">
                <button
                  onClick={showForm}
                  className="flex flex-col items-center p-2 justify-center bg-gray-200 rounded-lg shadow-md border-2 border-primaryColor"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#23A6F0" }}
                    size="2x"
                  />
                  <h1>Yeni Adres Ekle</h1>
                </button>
                <div>
                  {adressList && adressList.length > 0 ? (
                    adressList.map((address, index) => (
                      <div key={index}>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row justify-between items-center">
                            <div>
                              <input
                                className="m-1"
                                type="checkbox"
                                onClick={handleClick}
                              />
                              {address.title}
                            </div>
                            <div className="flex gap-1">
                              <button
                                className="hover:text-white hover:bg-gray-300 rounded-full p-2 mx-1"
                                onClick={() => handleEdit(address)}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  size="2xl"
                                  style={{ color: "#007BFF" }}
                                />
                              </button>
                              <button
                                className="hover:text-white hover:bg-gray-300 rounded-full p-2 mx-1"
                                onClick={() => handleDelete(address.id)}
                              >
                                <FontAwesomeIcon
                                  icon={faMinusCircle}
                                  size="2xl"
                                  style={{ color: "#FF0000" }}
                                />
                              </button>
                            </div>
                          </div>
                          <div
                            className={`flex flex-col gap-3 bg-${
                              isButtonClicked ? "primaryColor" : "gray-200"
                            } ${isButtonClicked ? "" : "shadow-lg"} text-${
                              isButtonClicked ? "white" : "black"
                            } p-2 rounded-lg`}
                          >
                            <div className="flex flex-row justify-between items-center">
                              <h1 className="flex items-center gap-2">
                                <FontAwesomeIcon
                                  icon={faUser}
                                  style={{
                                    color: isButtonClicked
                                      ? "#FFFFFF"
                                      : "#23A6F0",
                                  }}
                                  size="lg"
                                />
                                {address.name}
                              </h1>
                              <h1 className="flex items-center gap-2">
                                <FontAwesomeIcon
                                  icon={faPhone}
                                  style={{
                                    color: isButtonClicked
                                      ? "#FFFFFF"
                                      : "#23A6F0",
                                  }}
                                  size="lg"
                                />
                                {address.phone}
                              </h1>
                            </div>
                            <div className="flex flex-col gap-2">
                              <h2>{address.city}</h2>
                              <p>{address.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Adresler Alınırken Bir Sorun Oluştu</p>
                  )}
                </div>
              </div>
              <div className="flex-col flex gap-3 basis-1/2">
                {isEditing && (
                  <div>
                    <h2>Adres Düzenleme Formu</h2>
                    <AddressEditForm />
                  </div>
                )}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className={showPaymentOptions ? "flex " : "hidden"}>
          <div>
            <div className="flex flex-row justify-between pb-2">
              <h1 className="text-2xl font-bold ">Kart Bilgileri</h1>
              <button
                onClick={handleUseSavedCard}
                className="text-sm font-bold leading-6 bg-primaryColor rounded px-5 py-3 text-white hover:text-primaryColor hover:bg-gray-400 border-1 border-primaryColor"
              >
                Kayıtlı Kartımla Ödeme Yap
              </button>
            </div>
            <div className="flex flex-row justify-between">
              <PaymentForm />
              <div className="pl-5 m-1 flex items-end">
                {selectedPayment && (
                  <div>
                    <h2>Seçili Kart Bilgileri</h2>
                    <div className="border-2 border-gray-200 p-2 rounded-lg">
                      <div className="flex flex-col gap-2">
                        <label>Kart Numarası</label>
                        <input
                          type="text"
                          value={formData.card_no}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              card_no: e.target.value,
                            })
                          }
                        />
                        <label>Son Kullanma Ayı</label>
                        <input
                          type="number"
                          value={formData.expire_month}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expire_month: e.target.value,
                            })
                          }
                        />
                        <label>Son Kullanma Yılı</label>
                        <input
                          type="number"
                          value={formData.expire_year}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expire_year: e.target.value,
                            })
                          }
                        />
                        <label>Kart Üzerindeki İsim</label>
                        <input
                          type="text"
                          value={formData.name_on_card}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              name_on_card: e.target.value,
                            })
                          }
                        />

                        <button
                          onClick={handleUpdatePayment}
                          className="text-sm font-bold leading-6 bg-primaryColor rounded px-5 py-3 text-white hover:text-primaryColor hover:bg-gray-400 border-1 border-primaryColor"
                        >
                          Kart Bilgilerini Güncelle
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {showSavedCardOptions && (
              <div className="flex flex-col gap-3 mt-3">
                {Array.isArray(paymentList) && paymentList.length > 0 ? (
                  paymentList.map((paymentArray, index1) =>
                    Array.isArray(paymentArray) && paymentArray.length > 0 ? (
                      paymentArray.map((payment, index2) => {
                        const cardNumber = payment.card_no;
                        const visibleDigits = 10;
                        const maskedCardNumber =
                          cardNumber
                            .substring(0, cardNumber.length - visibleDigits)
                            .replace(/\d/g, "*") +
                          cardNumber.substring(
                            cardNumber.length - visibleDigits
                          );

                        return (
                          <div
                            key={`${index1}-${index2}`}
                            className="border-5 border-primaryColor rounded-lg p-3"
                          >
                            <div>
                              <div className="flex justify-between">
                                <div className="flex flex-col justify-between">
                                  <div className="flex gap-2 items-center">
                                    <img
                                      src="https://www.gokhangultan.com/logo.gg.png"
                                      className="lg:max-w-[50px] max-w-[50px] object-contain pb-3"
                                      alt="Logo"
                                    />
                                    <p className="text-xl font-bold">BANK</p>
                                  </div>
                                  <button
                                    onClick={() => handleSelectPayment(payment)}
                                    className="text-sm font-bold leading-6 bg-primaryColor rounded px-5 py-3 text-white hover:text-primaryColor hover:bg-gray-400 border-1 border-primaryColor"
                                  >
                                    Select As Payment
                                  </button>
                                </div>

                                <div className="flex flex-row justify-between items-center">
                                  <div>
                                    <input
                                      className="m-1"
                                      type="checkbox"
                                      checked={selectedPayment === payment}
                                      onChange={() =>
                                        handleSelectPayment(payment)
                                      }
                                    />
                                    {payment.title}
                                  </div>
                                  <div className="flex gap-1">
                                    <button
                                      className="hover:text-white hover:bg-blue-600 rounded-lg w-8"
                                      onClick={() =>
                                        handleSelectPayment(payment)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 items-end text-xl font-bold">
                                <p>{maskedCardNumber}</p>
                                <p>
                                  {payment.expire_month}/{payment.expire_year}
                                </p>
                                <p>{payment.name_on_card}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No payment methods found in this array</p>
                    )
                  )
                ) : (
                  <p>No payment methods found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`bg-gray-100 flex-col basis-1/4 my-20 flex `}>
        <div
          className={`confirm-order flex flex-row justify-between items-start`}
        >
          <h3 className="text-primaryColor font-bold text-lg m-3">
            Sipariş Özeti
          </h3>
        </div>
        <div className="flex flex-col border-2 border-gray-200 m-4 gap-4 p-2">
          <div className="flex flex-row gap-2 items-center justify-around">
            <h5>Ürün Toplamı</h5>
            <h5 className="font-bold text-lg text-primaryColor">
              ${orderData && orderData.cardTotal.toFixed(2)}
            </h5>
          </div>
          <div>
            {orderData && orderData.cardTotal >= 150 ? (
              <div className="flex flex-row justify-around gap-2 items-center">
                <h5>$150 Üzeri Kargo Bedava</h5>
                <h5 className="text-red-700 font-bold line-through text-lg">
                  -${orderData.shippingPrice}
                </h5>
              </div>
            ) : (
              <div className="flex flex-row justify-around gap-2 items-center">
                <h5>Kargo Toplamı</h5>
                <h5 className="text-red-700 font-bold text-lg">$29.9</h5>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-around gap-2">
            <div>İndirim Miktarı</div>
            <div>
              {orderData && orderData.DiscountAmount ? (
                <span className="text-red-700 ">
                  ${orderData.DiscountAmount.toFixed(2)}
                </span>
              ) : (
                <span className="text-red-700 ">0.00</span>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-around gap-2 items-center">
            <h5 className="font-bold text-sm">Toplam Fiyat</h5>
            <h5 className="font-bold text-lg text-primaryColor">
              ${orderData && orderData.totalPrice.toFixed(2)}
            </h5>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-primaryColor p-3 rounded text-white"
              onClick={handleCreateOrder}
            >
              Kaydet Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
