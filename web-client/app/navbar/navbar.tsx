import styles from "./navbar.module.css"; 
import Link from 'next/link';
import { PageHeader} from "./layouts/PageHeader"
import { Sidebar} from "./layouts/Sidebar"
import { SidebarProvider } from "./contexts/SidebarContext";

export default function Navbar({children}: {children: React.ReactNode}){

    return (
        <SidebarProvider>
        <div className="max-h-screen flex flex-col">
            <PageHeader />
            <div className={styles.gridContainer}>
                <Sidebar />
                {children} 
                {/* Render children here */}
            </div>
        </div>
        </SidebarProvider>
    )

    return(
        <nav className={styles.navBar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/">
                        <p>Home</p>
                    </Link>
                </li>
                <li className={styles.navItem}>
                <Link href="/watch">
                        <p>Watch Page</p>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/upload">
                        <p>Upload Page</p>
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/signin">
                        <p>Signin/Login</p>
                    </Link>
                </li>
            </ul>
        </nav>
    ); 
}

