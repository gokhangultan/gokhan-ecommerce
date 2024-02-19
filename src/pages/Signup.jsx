import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

export default function Signup(props) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            matchPassword: "",
        },
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = async (data) => {
        try {
            if (data.password !== data.matchPassword) {
                toast("Şifreleriniz uyuşmuyor.");
                return;
            }
            setIsSubmitted(true);
            await axiosInstance.post("/signup", data);
            toast.success("Tebrikler! Form bilgileriniz başarıyla gönderildi.");
        } catch (error) {
            toast("Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsSubmitted(false);
        }
    };

    return (
        <div className="my-20 px-[10px] lg:px-[250px]">
            <div className="flex flex-col items-center gap-4 ">
                <form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-col flex bg-[#F9F9F9] p-20 gap-3">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-textColor text-lg leading-6">Adınız *</h3>
                                <input {...register("firstName", { required: "Adınız zorunludur.", minLength: { value: 3, message: "İsim en az 3 karakter olmalıdır." } })} type="text" placeholder="Adınız *" className="form-input" />
                                {errors.firstName && <span className="text-secondaryColor text-sm leading-7">{errors.firstName.message}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-textColor text-lg leading-6">SoyAdınız *</h3>
                                <input {...register("lastName", { required: "Soyadınız zorunludur.", minLength: { value: 3, message: "Soyisim en az 3 karakter olmalıdır." } })} type="text" placeholder="SoyAdınız *" className="form-input" />
                                {errors.lastName && <span className="text-secondaryColor text-sm leading-7">{errors.lastName.message}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-textColor text-lg leading-6">Şifre *</h3>
                                <input {...register("password", {
                                    required: "Şifre zorunludur.",
                                    minLength: { value: 8, message: "Şifre en az 8 karakter olmalıdır." },
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/,
                                        message: "Şifre en az 8 karakter olmalıdır ve en az bir rakam, bir küçük harf, bir büyük harf ve bir özel karakter içermelidir."
                                    }
                                })} type="password" placeholder="Password" className="form-input" />
                                {errors.password && <span className="text-secondaryColor text-sm leading-7">{errors.password.message}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-textColor text-lg leading-6">Şifrenizi Tekrar Giriniz *</h3>
                                <input {...register("matchPassword", { required: "Şifreyi tekrar giriniz." })} type="password" placeholder="Password" className="form-input" />
                                {errors.matchPassword && <span className="text-secondaryColor text-sm leading-7">{errors.matchPassword.message}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <h3 className="text-textColor text-lg leading-6">Email *</h3>
                            <input {...register("email", { required: "Email zorunludur.", pattern: { value: /^\S+@\S+$/i, message: "Geçerli bir email adresi giriniz." } })} type="email" placeholder="Email" className="form-input" />
                            {errors.email && <span className="text-secondaryColor text-sm leading-7">{errors.email.message}</span>}
                        </div>
                        <button type="submit" className="text-sm font-bold leading-6 bg-primaryColor rounded px-5 py-3 text-white hover:text-primaryColor hover:bg-gray-400 border-1 border-primaryColor">Signup</button>
                        <ToastContainer />
                    </div>
                </form>
            </div>
        </div>
    )
}
