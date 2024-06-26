
import {Bell, Menu, Mic, Search, Upload, User} from "lucide-react"
import {Button} from "../components/Button"
import styles from "../navbar.module.css"; 
import Link from 'next/link';
import { useSidebarContext } from "../contexts/SidebarContext";

export function PageHeader(){

    const {toggle} = useSidebarContext()

    const handleMenuClick = () => {
        toggle(); // Call toggle function to toggle sidebar
      };

    return (
     <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
        <div className="flex gap-4 items-center flex-shrink-0">
            <Button variant="ghost" size="icon">
                <Menu />
            </Button>
            <a href="/">
                <img src="/src/LogoWD.png" className="h-12"/>
            </a>
        </div>
        {/* <form className="md:flex hidden gap-4 flex-grow justify-center">
            <div className="flex flex-grow max-w-[600px]">
                <input type="search" placeholder="Search"
                className="rounded-1-full border border-secondary-border
                shadow-inner shadow-secondary py-1 px-4 text-lg w-full 
                focus: border-blue-500 outline-none"/>
                <Button className="py-2 px-4 rounded-r-full
                border-secondary-border border border-1-0 flex-shrink-0">
                    <Search />
                </Button>
            </div>
            <Button type="button" size="icon" className="flex-shrink-0">
                <Mic/>
            </Button>
    </form> */}
        <div className="flex flex-shrink-0 md:gap-2">
            <Button size="icon" variant="ghost" className="md:hidden">
                <Search />
            </Button>
            <Button size="icon" variant="ghost" className="md:hidden">
                <Mic />
            </Button>

            
            <Link href="/upload">
                <Button size="icon" variant="ghost">
                <Upload />
                </Button>
            </Link>
            
            <Button size="icon" variant="ghost">
                <Bell />
            </Button>

            <Link href="/signin">
                <Button size="icon" variant="ghost">
                <User />
                </Button>
            </Link>

        </div>
    </div>
    )
}