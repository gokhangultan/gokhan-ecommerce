import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions/loginAction';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/login", data);
            if (response.status === 200 || response.status === 204) {
                const userData = response.data;
                dispatch(setUser(userData)); // Kullanıcı bilgilerini redux store'a kaydet
                localStorage.setItem('token', userData.token); // tokenini localStorage'a kaydet
                toast.success("Başarı İle Login Oldunuz. Ana Sayfaya yönlendiriliyorsunuz.", {
                    position: "top-right"
                });
                setTimeout(() => {
                    history.push('/');
                }, 3000); // 3 saniye beklet sonra önceki sayfaya gönder

            }
        } catch (error) {
            toast.error("Giriş Yapılırken, bir hata oluştu. Email Adresinizi ve Sifrenizi Kontrol Ediniz.", {
                position: "top-right"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="my-20 px-[10px] lg:px-[250px]">
            <div className="breadcrumb flex md:justify-between justify-center md:flex-row flex-col gap-3 ">
                <div className="flex gap-2">
                    <Link to="/" className="font-bold text-sm leading-6 text-[#252B42] ">Home</Link>
                    <Link><FontAwesomeIcon icon={faChevronRight} size="md" style={{ color: "#BDBDBD", }} /> </Link>
                    <Link to="" className="font-bold text-sm leading-6 text-[#BDBDBD]">Login</Link>
                </div>
            </div>
            <div className="flex flex-col items-center gap-4 ">
                <form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-col flex bg-[#F9F9F9] md:px-[250px] px-[50px] py-[50px] gap-3">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-textColor text-lg leading-6">Email *</h3>
                            <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="Email *" className="form-input" />
                            {errors.email && <span className="text-secondaryColor text-sm leading-7">Email Adresiniz Kayıtlı Değil. </span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-textColor text-lg leading-6">Password *</h3>
                            <input {...register("password", {
                                required: true,
                                minLength: 6,
                            })} type="password" placeholder="Password *" className="form-input" />
                            {errors.password && <span className="text-secondaryColor text-sm leading-7">Yanlış Şifre!</span>}
                        </div>

                        <button type="submit" className="text-sm font-bold leading-6 bg-primaryColor rounded px-5 py-3 text-white hover:text-primaryColor hover:bg-gray-400 border-1 border-primaryColor" disabled={isLoading}>
                            {isLoading ? "Kayıt Olunuyor..." : "Login"}
                        </button>
                        <div>Do not you have an account ? <Link to="/signup"><button className='text-primaryColor'>Signup</button></Link> </div>
                        <ToastContainer position="top-right" autoClose={5000} />
                    </div>
                </form>
            </div>
        </div>
    );
}
