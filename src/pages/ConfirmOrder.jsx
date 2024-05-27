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

export default function ConfirmOrder({ paymentId }) {
  const [orderData, setOrderData] = useState(null);
  const [showAddressInfo, setShowAddressInfo] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [addressButtonClicked, setAddressButtonClicked] = useState(false);
  const [paymentButtonClicked, setPaymentButtonClicked] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();
  const adressList = useSelector((state) => state.shoppingCard.address[0]);
  const paymentList = useSelector((state) => state.shoppingCard.payment);
  const adressListSelected = useSelector((state) => state.shoppingCard);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showSavedCardOptions, setShowSavedCardOptions] = useState(false);

  const handleUseSavedCard = () => {
    setShowSavedCardOptions(true);
  };

  useEffect(() => {
    if (!adressList || adressList.length === 0) {
      dispatch(fetchAddress());
    }
    if (!paymentList || paymentList.length === 0) {
      dispatch(fetchPayment());
    }
  }, [dispatch, adressList, paymentList]);

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

  const handleSelectChange = (event) => {
    const selectedId = parseInt(event.target.value); // selectedId'yi integer'a dönüştür
    const selected = adressListSelected.address[0].find(
      (address) => address.id === selectedId
    );
    setSelectedAddress(selected);
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


  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/user/address", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      // Redux store'a adresi set et
      dispatch(setAddress(data));
      toast.success("Adresiniz Kaydedildi.", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Adres gönderilemedi veya işlenemedi.", error);

      toast.error("Adres gönderilemedi ", {
        position: "top-right",
      });
    }
  };


  const handleDelete = async (addressId) => {
    try {
      await axiosInstance.delete(`/user/address/${addressId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      // Redux store'u güncelleme işlemi
      dispatch(fetchAddress()); // Adres listesini yeniden al

      toast.success("Adres başarıyla silindi.");
    } catch (error) {
      console.error("Adres silinemedi:", error);
      toast.error("Adres silinirken bir hata oluştu.");
    }
  };
  const onEdit = async (formData) => {
    try {
      await axiosInstance.put("/user/address/", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      // Redux store'u güncelleme işlemi
      dispatch(setAddress(formData)); // Güncellenmiş adresi Redux store'a set et

      toast.success("Adres başarıyla güncellendi.");
    } catch (error) {
      console.error("Adres güncellenemedi:", error);
      toast.error("Adres güncellenirken bir hata oluştu.");
    }
  };

  const handleEditPayment = async (paymentId) => {
    try {
      // PUT request to update the payment method with the given ID
      const response = await axiosInstance.put(`/payments/${paymentId}`, {
        // Update the payment data as needed
      });
  
      if (response.status === 200) {
        // If the request is successful, show a success message to the user
        alert("Payment method updated successfully!");
      } else {
        // Handle other status codes or errors if necessary
        console.error("Error updating payment method:", response.statusText);
        alert("Error updating payment method. Please try again later.");
      }
    } catch (error) {
      // Handle any network errors or exceptions
      console.error("Error updating payment method:", error);
      alert("Error updating payment method. Please try again later.");
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
            <form
              id="contactForm"
              className="hidden"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-col flex bg-gray-200 p-5 gap-2 rounded-lg ">
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Adres Başığı"
                  className="p-2 bg-gray-100 rounded-lg "
                />
                {errors.title && (
                  <span className="text-red-500 text-sm leading-7 ">
                    Adres Başlığı Zorunludur
                  </span>
                )}
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Adı "
                  className="p-2 bg-gray-100 rounded-lg "
                />
                {errors.name && (
                  <span className="text-red-500 text-sm leading-7 ">
                    Ad Alanı Zorunludur
                  </span>
                )}
                <input
                  {...register("surname", { required: true })}
                  type="text"
                  placeholder="Soyadı"
                  className="p-2 bg-gray-100 rounded-lg "
                />
                {errors.surname && (
                  <span className="text-red-500 text-sm leading-7 ">
                    SoyAd Alanı Zorunludur
                  </span>
                )}
                <input
                  {...register("phone", {
                    required: true,
                    pattern: /^(\+90|0)?\d{10}$/,
                  })}
                  type="text"
                  placeholder="Telefon * (___)_______"
                  className="p-2  bg-gray-100 rounded-lg "
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm leading-7 ">
                    Lütfen Geçerli Bir telefon numarası giriniz. "+90- XXX XXX
                    XX XX"
                  </span>
                )}
                <select
                  {...register("city", { required: true })}
                  className="p-2 bg-gray-100 rounded-lg"
                >
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <span className="text-red-500 text-sm leading-7">
                    Lütfen Şehir Seçiniz
                  </span>
                )}
                <input
                  {...register("district", { required: true })}
                  type="text"
                  placeholder="district"
                  className="p-2 bg-gray-100 rounded-lg "
                />
                {errors.district && (
                  <span className="text-red-500 text-sm leading-7 ">
                    District Alanı Zorunludur
                  </span>
                )}
                <input
                  {...register("neighborhood", { required: true })}
                  type="text"
                  placeholder="Neighborhood"
                  className="p-2 bg-gray-100 rounded-lg "
                />
                {errors.neighborhood && (
                  <span className="text-red-500 text-sm leading-7 ">
                    Neighborhood Alanı Zorunludur
                  </span>
                )}
                <textarea
                  {...register("address", { required: true })}
                  type="text"
                  placeholder="Açık Adresiniz"
                  className="p-2  bg-gray-100 rounded-lg "
                />
                {errors.address && (
                  <span className="text-red-500 text-sm leading-7 ">
                    Açık Adres Alanı Doldurunuz
                  </span>
                )}
                <button
                  type="submit"
                  className="text-sm font-bold leading-6 bg-primaryColor rounded px-5 py-3 text-white hover:text-primaryColor hover:bg-gray-400 border-1 border-primaryColor"
                >
                  Adresi Kaydet
                </button>
              </div>
            </form>
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
                            <button className="hover:text-white hover:bg-gray-300 rounded-full p-2 mx-1"  onClick={() => handleEdit(address)}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="2xl"
                        style={{ color: "#007BFF" }}
                      />
                    </button>
                    <button className="hover:text-white hover:bg-gray-300 rounded-full p-2 mx-1" onClick={() => handleDelete(address.id)}>
                      <FontAwesomeIcon
                        icon={faMinusCircle}
                        size="2xl"
                        style={{ color: "#FF0000" }}
                      />
                    </button></div>
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
                    <form id="contactForm" onSubmit={handleSubmit(onEdit)}>
                      <div className="flex-col flex bg-gray-200 p-5 gap-2 rounded-lg ">
                        <select
                          {...register("id", {
                            required: true,
                          })}
                          className="p-2 bg-gray-100 rounded-lg"
                          onChange={handleSelectChange}
                        >
                          <option value="">Değişiklik Adresi Seçiniz</option>
                          {adressList.map((address, index) => (
                            <option key={index} value={address.id}>
                              {address.title} - {address.name} - {address.id}
                            </option>
                          ))}
                        </select>
                        {errors.selectedAddressId && (
                          <span className="text-red-500 text-sm leading-7 ">
                            Lütfen bir adres seçin
                          </span>
                        )}
                        <input
                          {...register("title", { required: true })}
                          type="text"
                          className="p-2 bg-gray-100 rounded-lg "
                          placeholder={
                            selectedAddress
                              ? selectedAddress.title
                              : "Adres Başlığı"
                          }
                          defaultValue={
                            selectedAddress ? selectedAddress.title : ""
                          }
                        />
                        {errors.title && (
                          <span className="text-red-500 text-sm leading-7 ">
                            Adres Başlığı Zorunludur
                          </span>
                        )}
                        <input
                          {...register("name", { required: true })}
                          type="text"
                          placeholder={
                            selectedAddress ? selectedAddress.name : "Adı"
                          }
                          className="p-2 bg-gray-100 rounded-lg "
                          defaultValue={
                            selectedAddress ? selectedAddress.name : ""
                          }
                        />
                        {errors.name && (
                          <span className="text-red-500 text-sm leading-7 ">
                            Ad Alanı Zorunludur
                          </span>
                        )}
                        <input
                          {...register("surname", { required: true })}
                          type="text"
                          className="p-2 bg-gray-100 rounded-lg "
                          placeholder={
                            selectedAddress ? selectedAddress.surname : "SoyAdı"
                          }
                          defaultValue={
                            selectedAddress ? selectedAddress.surname : ""
                          }
                        />
                        {errors.surname && (
                          <span className="text-red-500 text-sm leading-7 ">
                            SoyAd Alanı Zorunludur
                          </span>
                        )}
                        <input
                          {...register("phone", {
                            required: true,
                            pattern: /^(\+90|0)?\d{10}$/,
                          })}
                          type="text"
                          placeholder={
                            selectedAddress ? selectedAddress.phone : "Phone"
                          }
                          defaultValue={
                            selectedAddress ? selectedAddress.phone : ""
                          }
                          className="p-2  bg-gray-100 rounded-lg "
                        />
                        {errors.phone && (
                          <span className="text-red-500 text-sm leading-7 ">
                            Lütfen Geçerli Bir telefon numarası giriniz. "+90-
                            XXX XXX XX XX"
                          </span>
                        )}
                        <select
                          {...register("city", { required: true })}
                          className="p-2 bg-gray-100 rounded-lg"
                          placeholder={
                            selectedAddress ? selectedAddress.city : "Sehir"
                          }
                          defaultValue={
                            selectedAddress ? selectedAddress.city : ""
                          }
                        >
                          {cities.map((city, index) => (
                            <option key={index} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                        {errors.city && (
                          <span className="text-red-500 text-sm leading-7">
                            Lütfen Şehir Seçiniz
                          </span>
                        )}
                        <input
                          {...register("district", { required: true })}
                          type="text"
                          placeholder={
                            selectedAddress
                              ? selectedAddress.district
                              : "district"
                          }
                          defaultValue={
                            selectedAddress ? selectedAddress.district : ""
                          }
                          className="p-2 bg-gray-100 rounded-lg "
                        />
                        {errors.district && (
                          <span className="text-red-500 text-sm leading-7 ">
                            District Alanı Zorunludur
                          </span>
                        )}
                        <input
                          {...register("neighborhood", { required: true })}
                          type="text"
                          placeholder={
                            selectedAddress
                              ? selectedAddress.neighborhood
                              : "neighborhood"
                          }
                          defaultValue={
                            selectedAddress ? selectedAddress.neighborhood : ""
                          }
                          className="p-2 bg-gray-100 rounded-lg "
                        />
                        {errors.neighborhood && (
                          <span className="text-red-500 text-sm leading-7 ">
                            Neighborhood Alanı Zorunludur
                          </span>
                        )}
                        <textarea
                          {...register("address", { required: true })}
                          type="text"
                          placeholder={
                            selectedAddress
                              ? selectedAddress.address
                              : "address"
                          }
                          defaultValue={
                            selectedAddress ? selectedAddress.address : ""
                          }
                          className="p-2  bg-gray-100 rounded-lg "
                        />
                        {errors.address && (
                          <span className="text-red-500 text-sm leading-7 ">
                            Açık Adres Alanı Doldurunuz
                          </span>
                        )}
                        <button
                          type="submit"
                          className="text-sm font-bold leading-6 bg-primaryColor rounded px-5 py-3 text-white hover:text-primaryColor hover:bg-gray-400 border-1 border-primaryColor"
                        >
                          Adresi Güncelle
                        </button>
                      </div>
                    </form>
                  </div>
                )}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className={showPaymentOptions ? "flex " : "hidden"}>
          <div>
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-bold ">Kart Bilgileri</h1>
              <button
                className="underline text-base font-bold text-primaryColor"
                onClick={() => handleUseSavedCard()}
              >
                Kayıtlı Kartımla Ödeme Yap
              </button>
            </div>
            <PaymentForm />
            {showSavedCardOptions && (
  <div className="flex flex-col gap-3 mt-3">
   {paymentList.map((paymentArray, index1) => (
  paymentArray.map((payment, index2) => {
    const cardNumber = payment.card_no;
    const visibleDigits = 10; 
    const maskedCardNumber =
      cardNumber.substring(0, cardNumber.length - visibleDigits).replace(/\d/g, '*') + cardNumber.substring(cardNumber.length - visibleDigits);

    return (
      <div
        key={`${index1}-${index2}`}
        className="border-5 border-primaryColor rounded-lg p-3"
      >
        <div>
          <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img
              src="https://www.gokhangultan.com/logo.gg.png"
              className="lg:max-w-[50px] max-w-[50px] object-contain pb-3"
              alt="Logo"
            />
            <p className="text-xl font-bold">BANK</p>
           
          </div>
          <div className="">
          <button className="hover:text-white hover:bg-gray-300 rounded-full p-2 mx-1"  onClick={() => handleEditPayment(paymentId)}>
                <FontAwesomeIcon
                  icon={faEdit}
                  size="2xl"
                  style={{ color: "#007BFF" }}
                />
              </button>
              </div></div>
          <div className="flex flex-col gap-2 items-end text-xl font-bold">
            <p> {maskedCardNumber}</p>
            <p>
               {payment.expire_month}/
              {payment.expire_year}
            </p>
            <p>{payment.name_on_card}</p>
          </div>
        </div>
      </div>
    );
  })
))}

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
            <button className="bg-primaryColor p-3 rounded text-white">
              Kaydet Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}