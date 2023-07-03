import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/initFirebase";
import Link from "next/link";
import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import UserContext from "@/contexts/UserContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const user = useContext(UserContext);

  useEffect(() => {
    //redirect if logged in
    if(user){
        router.push("/dashboard")
    }
    setLoading(false);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Create a new user document in the "users" collection
      await setDoc(doc(db, "users", userId), {
        uid: userId,
        email: email,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-100 container d-flex align-items-center justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="text-center mb-4">
            <h1>Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-secondary text-white">
                Sign Up
              </button>
            </div>
          </form>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <div className="text-center mt-3">
            <Link href="/login">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;