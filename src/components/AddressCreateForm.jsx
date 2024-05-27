import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance, setAddress } from "../store/actions/addressAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function AddressCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

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

  return (
    <form id="contactForm" className="hidden" onSubmit={handleSubmit(onSubmit)}>
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
            Lütfen Geçerli Bir telefon numarası giriniz. "+90- XXX XXX XX XX"
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
  );
}
