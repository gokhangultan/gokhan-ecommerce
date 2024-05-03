import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosInstance } from "../store/actions/addressAction";
import { useDispatch } from "react-redux";
import { setPayment } from "../store/actions/paymentAction";

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    delete data.cvv;

    try {
      await axiosInstance.post("/user/card", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      // Redux store'a adresi set et
      dispatch(setPayment(data));
      toast.success("Kart Bilgileriniz Kaydedildi.", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Kart Bilgileriniz gönderilemedi veya işlenemedi.", error);

      toast.error("Kart Bilgileriniz gönderilemedi ", {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <form id="paymentForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-col flex bg-gray-200 p-5 gap-2 rounded-lg ">
          <label htmlFor="card_no" className="text-lg font-semibold">
            Kart Numarası (16 Haneli)
          </label>
          <input
            {...register("card_no", {
              required: true,
              minLength: 16,
              maxLength: 16,
              pattern: /^[0-9]{16}$/,
            })}
            type="text"
            id="card_no"
            className="p-3 bg-gray-100 rounded-lg border-5 border-l-red-500 "
            placeholder="Kart Numarası (16 Haneli)"
          />
          {errors.card_no && (
            <span className="text-red-500 text-sm leading-7">
              Lütfen geçerli bir 16 haneli kart numarası girin.
            </span>
          )}
          <div className="flex-row flex justify-between gap-5">
            <div className="flex flex-col">
              <label htmlFor="expire_month" className="text-lg font-semibold">
                Son Kullanma Tarihi
              </label>
              <div className="flex flex-row gap-3">
                <select
                  {...register("expire_month", { required: true })}
                  id="expire_month"
                  className="p-2 bg-gray-100 rounded-lg"
                >
                  <option value="">Ay</option>
                  {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                      {month + 1}
                    </option>
                  ))}
                </select>
                <select
                  {...register("expire_year", { required: true })}
                  id="expire_year"
                  className="p-2 bg-gray-100 rounded-lg"
                >
                  <option value="">Yıl</option>
                  {[...Array(20).keys()].map((year) => (
                    <option key={year + 2020} value={year + 2020}>
                      {year + 2020}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="cvv" className="text-lg font-semibold">
                CVV{" "}
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ color: "#8EC2F2" }}
                  size="lg"
                />
              </label>
              <input
                {...register("cvv", {
                  required: true,
                  minLength: 3,
                  maxLength: 3,
                  pattern: /^[0-9]{3}$/,
                })}
                type="text"
                id="cvv"
                className="p-2 bg-gray-100 rounded-lg "
                placeholder="CVV"
              />
              {errors.cvv && (
                <span className="text-red-500 text-sm leading-7">
                  Lütfen geçerli bir 3 haneli CVV girin.
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="expire_month" className="text-lg font-semibold">
              Kart Üzerindeki Ad
            </label>
            <input
              {...register("name_on_card", { required: true })}
              type="text"
              placeholder="Ad SoyAd "
              className="p-2 bg-gray-100 rounded-lg "
            />
            {errors.name_on_card && (
              <span className="text-red-500 text-sm leading-7 ">
                Kart Üzerindeki Ad Alanı Zorunludur
              </span>
            )}
          </div>
          <button
            type="submit"
            className="text-sm font-bold leading-6 bg-primaryColor rounded px-5 py-3 text-white hover:text-primaryColor hover:bg-gray-400 border-1 border-primaryColor"
          >
            Ödemeyi Yap
          </button>
        </div>
      </form>
    </div>
  );
}
