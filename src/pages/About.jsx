export default function About() {
    return (
        <div className="mt-5 overflow-x-hidden">

            <div className="flex lg:flex-row flex-col  px-[10px] lg:pl-[250px] ">

                <div className="sm:text-left text-center  flex flex-col basis-1/3 gap-4">
                    <h5 className="font-bold text-base leading-6 text-[#252B42]">ABOUT COMPANY</h5>
                    <h1 className="font-bold text-6xl leading-[80px] text-[#252B42]">ABOUT US</h1>
                    <h4 className="text-xl text-secondaryColor leading-7">We know how large objects will act, but things on a small scale</h4>
                    <div><button className="bg-primaryColor px-4 py-2 rounded-md text-white w-[193px] h-[52px] ">Get Quote Now</button></div>
                </div>
                <div className="basis-2/3 mb-5 ">
                    <button className="rounded-full bg-[#977DF4] w-[9px] h-[9px] sm:absolute relative lg:top-[190px] top-[80px] sm:top-[450px] lg:left-[79%] left-[78%]  sm:left-[68%] transform translate-x-[-50%] lg:flex sm:hidden flex z-10"></button>
                    <button className="rounded-full bg-[#977DF4] w-[9px] h-[9px] sm:absolute relative lg:top-[350px] top-[260px] sm:top-[550px] lg:left-[55%] left-[5%] sm:left-[30%] transform translate-x-[-50%] lg:flex sm:hidden flex z-10"></button>
                    <button className="rounded-full bg-[#FFE9EA] w-[47px] h-[47px] sm:absolute relative top-[70px] sm:top-[420px] lg:top-[120px] left-[10%] sm:left-[30%]  lg:left-[55%] transform translate-x-[-50%] lg:flex sm:hidden flex z-10"></button>
                    <button className="rounded-full bg-[#FFE9EA] w-[18px] h-[18px] sm:absolute relative lg:top-[250px] top-[200px] sm:top-[530px] left-[71%] sm:left-[70%] lg:left-[8%] transform translate-x-[-50%] lg:flex sm:hidden flex z-10"></button>
                    <button className="rounded-full bg-[#FFE9EA] w-[295px] h-[295px] sm:absolute relative top-[30px] sm:top-[400px] lg:top-[120px] left-[45%] sm:left-[48%] lg:left-[65%] transform translate-x-[-50%] lg:flex sm:hidden flex z-10"></button>
                    <img src="about.png" className="absolute lg:top-[50px] sm:top-[320px] top-[500px]  lg:left-[65%] sm:left-[45%] left-[48%] transform translate-x-[-50%] z-10 max-w-[500px]  sm:max-h-[500px] max-h-[300px] sm:max-w-[700px] lg:flex sm:hidden flex " />
                </div>

            </div>

        </div>
    )
}