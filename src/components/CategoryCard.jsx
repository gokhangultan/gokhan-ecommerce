import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useState } from 'react';

export default function CategoryCard() {
    const category = useSelector(state => state.global.categories);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const topCategories = category.slice().sort((a, b) => b.rating - a.rating).slice(0, 5);

    return (
        <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="flex justify-end px-[50px] sm:px-[205px] mb-3">
                <DropdownToggle caret className="bg-primaryColor ">
                    All Categories
                </DropdownToggle>
                <DropdownMenu>
                    {category.map(category => (
                        <DropdownItem key={category.id} tag={Link} to={`/shopping/${category.gender}/${category.code}`}>
                            {category.title}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <div className="flex md:flex-row flex-col gap-3 px-[50px] sm:px-[205px] justify-between">
                {topCategories.map(category => (
                    <div key={category.id} className="relative">
                        <Link to={`/shopping/${category.gender}/${category.code}`} className="flex flex-col">
                            <img src={category.img} alt={category.title} className="md:w-[305px] md:h-[223px] w-[305px] h-[323px]" />
                            <div className=" absolute inset-0 flex flex-col justify-center items-center text-center bg-opacity-40 ">
                                <h5 className="z-10 text-white font-bold text-base leading-6 bg-gray-400 rounded-sm px-1">{category.title}</h5>
                                <p className="z-10 leading-5 text-sm text-white bg-gray-400 rounded-sm px-1">{category.rating} Items</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
