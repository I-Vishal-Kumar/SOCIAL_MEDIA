import { FaSearch } from "react-icons/fa"
import { IoColorFilterSharp, IoHomeOutline } from "react-icons/io5"
import { LuBell } from "react-icons/lu"
import { MdMenu, MdMailOutline, MdPersonOutline } from "react-icons/md"

const Header = () => {
    return (
        <header className="h-[10%] w-full overflow-hidden px-4 flex items-center md:justify-between md:space-x-8">
            <div className="flex flex-[1] space-x-6 items-center">
                <h3 className=" font-mono font-bold text-2xl ">
                    Socialize
                </h3>
                <IoHomeOutline className="text-xl" />
                <IoColorFilterSharp className="text-xl" />
                <MdMenu className="text-xl" />
            </div>
            {/* searching */}
            <div className="flex md:flex-[4] md:size-auto size-8 relative">
                <div className="absolute h-full size-8 flex justify-center items-center">
                    <FaSearch />
                </div>
                <input
                    aria-label="search"
                    placeholder="Search"
                    className="pl-8 bg-transparent w-2/3 border-[1px] shadow-md py-1.5 border-slate-400 outline-none rounded-md"
                    type="text"
                    name=""
                    id="search"
                />
            </div>
            <div className=" hidden md:flex flex-[1] flex-row-reverse gap-6 items-center">
                <span className="size-10 rounded-full bg-blue-400"></span>
                <LuBell className="text-xl" />
                <MdMailOutline className="text-xl" />
                <MdPersonOutline className="text-xl" />
            </div>
        </header>
    )
}

export default Header;