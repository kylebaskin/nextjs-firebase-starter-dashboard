import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/initFirebase";
import LoadingSpinner from "./LoadingSpinner";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
          router.push("/login");
        } else {
          setUser(currentUser);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    // Render a loading state while checking authentication
    if (loading) {
      return <LoadingSpinner />;
    }

    // Render the protected component when authenticated
    return <Component {...props} user={user} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;