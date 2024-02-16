export default function CategoryCard() {
    return (
        <div className="relative">
            <img src="editor2.jpeg" className="md:w-[205px] md:h-[223px] w-[305px] h-[323px]" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                <h5 className="z-10 text-white font-bold text-base leading-6">CLOTHS</h5>
                <p className="z-10 leading-5 text-sm text-white">5 Items</p>
            </div>
        </div>
    );
}
