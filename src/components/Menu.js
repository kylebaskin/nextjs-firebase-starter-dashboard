import React from "react";
import Link from "next/link";
import Image from 'next/image'
import styles from '@/styles/Layout.module.css';

const Menu = () => {
  return (
    <>
      <div className={`${styles.footerNav} bg-dark`}>
        <Link className={`${styles.sideNavButton} ${styles.footerNavItem} d-flex justify-content-center`} href="/dashboard">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <i className={`bi bi-columns-gap ${styles.footerNavIcon}`}></i>
            <div className={`${styles.name} text-info`}>Dashboard</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Menu;
