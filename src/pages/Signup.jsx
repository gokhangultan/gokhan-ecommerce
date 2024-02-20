import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

export default function Signup(props) {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState([]);


    //Rolleri fetchle al
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axiosInstance.get("/roles"); //GET Request T5
                setRoles(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Rolleri Alamıyorum.", error);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        const role = watch("role_id");
        if (role === "store") {
            setValue("store.name", "");
            setValue("store.phone", "");
            setValue("store.tax_no", "");
            setValue("store.bank_account", "");
        }
    }, [watch]);

    const onSubmit = async (data) => {
        // Confirm password alanını backend kabul etmiyor..
        delete data.confirmPassword;

        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/signup", data);
            if (response.status === 201 || response.status === 204) {
                toast.success("Form başarıyla gönderildi. Hesabınızı Aktifleştirmek İçin Email Adresinizi Kontrol Ediniz. Önceki Sayfaya yönlendiriliyorsunuz.", {
                    position: "top-right"
                });
                //önceki sayfaya yönlendir.
                setTimeout(() => {
                    window.history.back();
                }, 3000); // 3 saniye beklet sonra önceki sayfaya gönder
            }
        } catch (error) {
            toast.error("Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.", {
                position: "top-right"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="my-20 px-[10px] lg:px-[250px]">
            <div className="flex flex-col items-center gap-4 ">
                <form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-col flex bg-[#F9F9F9] md:px-[250px] px-[50px] py-[50px] gap-3">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-textColor text-lg leading-6">Name *</h3>
                            <input {...register("name", { required: true, minLength: 3 })} type="text" placeholder="Adınız *" className="form-input" />
                            {errors.name && <span className="text-secondaryColor text-sm leading-7">Adınız En Az 3 Karakter Olmalı.</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-textColor text-lg leading-6">Email *</h3>
                            <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="Email *" className="form-input" />
                            {errors.email && <span className="text-secondaryColor text-sm leading-7">Lütfen Geçerli Bir Email Giriniz.</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-textColor text-lg leading-6">Password *</h3>
                            <input {...register("password", {
                                required: true,
                                minLength: 8,
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/
                            })} type="password" placeholder="Password *" className="form-input" />
                            {errors.password && <span className="text-secondaryColor text-sm leading-7">Sifreniz En Az 8 Karakter Olmalı, İçerisinde Büyük-Küçük Harf veya Özel Karakter İçermelidir.</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-textColor text-lg leading-6">Confirm Password *</h3>
                            {/*Dataya ekleniyor sonra siliyorum confirmpswd*/}
                            <input {...register("confirmPassword", {
                                validate: value => value === watch('password')
                            })} type="password" placeholder="Confirm Password *" className="form-input" />
                            {errors.confirmPassword && <span className="text-secondaryColor text-sm leading-7">Şifreleriniz Eşleşmiyor.</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-textColor text-lg leading-6">Rol *</h3>
                            <select {...register("role_id")} className="form-input">
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        {watch("role_id") === "2" && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-textColor text-lg leading-6">Store Name *</h3>
                                    <input {...register("store.name", { required: true, minLength: 3 })} type="text" placeholder="Store Adı *" className="form-input" />
                                    {errors.store?.name && <span className="text-secondaryColor text-sm leading-7">Store Adınız En Az 3 Karakter Olmalı.</span>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-textColor text-lg leading-6">Store Telefon *</h3>
                                    <input {...register("store.phone", {
                                        required: true,
                                        pattern: /^(\+90|0)?\d{10}$/
                                    })} type="text" placeholder="Store Telefon *" className="form-input" />
                                    {errors.store?.phone && <span className="text-secondaryColor text-sm leading-7">Lütfen Geçerli Bir telefon numarası giriniz. "+90- XXX XXX XX XX"</span>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-textColor text-lg leading-6">Store Vergi Numarası *</h3>
                                    <input {...register("store.tax_no", {
                                        required: true,
                                        pattern: /^T\d{4}V\d{6}$/
                                    })} type="text" placeholder="Store Vergi Numarası *" className="form-input" />
                                    {errors.store?.tax_no && <span className="text-secondaryColor text-sm leading-7">Vergi Numaranızı Kontrol Ediniz: "TXXXXVXXXXXX".</span>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-textColor text-lg leading-6">Store Banka Bilgileri *</h3>
                                    <input {...register("store.bank_account", {
                                        required: true,
                                        pattern: /^TR\d{2}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{2}$/
                                    })} type="text" placeholder="Store IBAN Adresiniz *" className="form-input" />
                                    {errors.store?.bank_account && <span className="text-secondaryColor text-sm leading-7">IBAN Adresinizi Kontrol Ediniz: "TRXX XXXX XXXX XXXX XXXX XXXX XX".</span>}
                                </div>
                            </>
                        )}
                        <button type="submit" className="text-sm font-bold leading-6 bg-primaryColor rounded px-5 py-3 text-white hover:text-primaryColor hover:bg-gray-400 border-1 border-primaryColor" disabled={isLoading}>
                            {isLoading ? "Formunuz Gönderiliyor..." : "Signup"}
                        </button>
                        <ToastContainer position="top-right" autoClose={5000} />
                    </div>
                </form>
            </div>
        </div>
    );
}
