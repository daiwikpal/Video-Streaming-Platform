import styles from "./navbar.module.css"; 
import Link from 'next/link';

export default function Navbar(){

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