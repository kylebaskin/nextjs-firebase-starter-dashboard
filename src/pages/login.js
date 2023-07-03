import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/initFirebase";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserContext from "@/contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
      setLoading(false)
    } catch (err) {
      setError(err.message);
      setLoading(false)
    }
  };

  if(loading){
    return <LoadingSpinner />
  }

  return (
    <div className="container h-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="text-center mb-4">
            <h1>Login</h1>
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
                Login
              </button>
            </div>
          </form>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <div className="text-center mt-3">
            <Link href="/signup">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;