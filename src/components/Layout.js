import React from "react";
import { Container, Row, Col, Navbar, NavbarBrand, Dropdown } from "react-bootstrap";
import styles from "@/styles/Layout.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/initFirebase";
import UserContext from "@/contexts/UserContext";
import LoadingSpinner from "./LoadingSpinner";
import Menu from "./Menu";
import Image from 'next/image';
import PublicMenu from "./PublicMenu";

function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [topBarHeight, setTopBarHeight] = useState(59.063);
  const [isMarketing, setIsMarketing] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  useEffect(() => {
    if(router.pathname == '/' || router.pathname == '/signup' || router.pathname == '/login' || router.pathname == '/demo' ){
        setIsMarketing(true);
    }else{
        setIsMarketing(false);
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <LoadingSpinner />;
  }

//   if(router.pathname == '/' || router.pathname == '/signup' || router.pathname == '/login' || router.pathname == '/demo' ){
//     return (
//       <Container className={`${styles.container}`} fluid>
//         <div className={`${styles.background} ${styles.container1} position-absolute`}>
//           <svg viewBox="-40 130 200 200" xmlns="http://www.w3.org/2000/svg">
//               <path fill="#f5f5f8" d="M25.6,-33C36.3,-27.4,50.5,-24.2,62,-14.1C73.6,-4.1,82.6,12.8,80.6,28.4C78.6,44,65.7,58.3,50.4,60.5C35.2,62.6,17.6,52.6,0.3,52.2C-17,51.8,-33.9,60.9,-44.3,57.2C-54.8,53.5,-58.7,36.9,-57.7,22.8C-56.8,8.7,-51,-3,-44.9,-12.4C-38.8,-21.8,-32.5,-28.9,-25,-35.6C-17.4,-42.2,-8.7,-48.5,-0.7,-47.6C7.4,-46.7,14.8,-38.6,25.6,-33Z" transform="translate(100 100)" />
//               <path fill="#F5F5F8" d="M46.6,-60.8C62.4,-52.6,78.8,-41.7,86.6,-26.1C94.4,-10.5,93.7,9.9,82.6,21.5C71.5,33.2,49.9,36.1,34.4,40.9C18.9,45.7,9.4,52.4,-2.3,55.6C-14.1,58.8,-28.1,58.4,-43.8,53.7C-59.4,48.9,-76.5,39.7,-76.2,27.8C-75.9,15.9,-58.2,1.4,-52.3,-17.1C-46.4,-35.5,-52.4,-57.9,-45.6,-69.1C-38.9,-80.2,-19.4,-80.2,-2,-77.3C15.4,-74.5,30.7,-69,46.6,-60.8Z" transform="translate(-70 280)" />
//           </svg>
//         </div>
//         <PublicMenu />
//         <UserContext.Provider value={user}>{children}</UserContext.Provider>
//       </Container>
//     )
//   }

return (
    <Container className="vh-100 overflow-hidden" fluid>
      <Navbar fixed="top" bg="dark" expand="" className="border-bottom border-info">
        {/* Logo at top left */}
        <Navbar.Brand>
          <Link href="/">
            <Image src="/summit_logo_colored.png.webp" alt="Summit Web Solutions Logo" width={120} height={topBarHeight} className="ms-4"/>
          </Link>
        </Navbar.Brand>
        <div className="d-flex align-items-center">
            {isMarketing && <PublicMenu user={user} />}
            {user && (
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-custom-components" className={`${isMarketing && 'd-none d-md-flex'} d-flex align-items-center bg-transparent border-0`}>
                    <p className="text-info m-0 d-none d-md-block">{user.email}</p><i className={`bg-white p-2 bi bi-person ms-2 rounded-5 text-dark ${styles.profilePic}`} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                    <Dropdown.Item eventKey="1" onClick={handleSignOut}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </div>



      </Navbar>
        <Row style={{paddingTop: topBarHeight + 26 + 'px'}} className="h-100">
            {user && !isMarketing ? (
                <>
                    <Col sm={12} md={1} style={{marginTop: '-' + topBarHeight - 26 + 'px', paddingTop: topBarHeight + 26 + 'px'}} className={`${styles.panel} ${styles.leftColMaxWidth} vh-100-md px-0 bg-dark`}>
                        <Menu handleSignOut={handleSignOut} styles={styles} />
                    </Col>
                    <Col sm={12} md={10} className={`ml-sm-auto p-3 py-5 p-md-5 flex-grow-1 overflow-auto h-100 ${styles.chunk}`}>
                        <UserContext.Provider value={user}>{children}</UserContext.Provider>
                    </Col>
                </>
            ) : (
                <Col sm={12} className={`h-100 ml-sm-auto p-3 py-5 p-md-5 flex-grow-1 overflow-auto ${styles.chunk}`}>
                    <UserContext.Provider value={user}>{children}</UserContext.Provider>
                </Col>
            )}
        </Row>
    </Container>
  );
}

export default Layout;