import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const controlledLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.warning("bosh maydon");
      return;
    }

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      console.log("Controlled:", data);

      toast.success("successful ");
    } catch {
      toast.error("error");
    }
  };

  const userRef = useRef();
  const passRef = useRef();

  const uncontrolledLogin = async (e) => {
    e.preventDefault();
    
    const user = userRef.current.value;
    const pass = passRef.current.value;

    if (!user || !pass) {
      toast.warning("bosh maydon");
      return;
    }

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          password: pass,
          expiresInMins: 30,
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      console.log("uncontrolled:", data);

      toast.success("successful");
    } catch {
      toast.error("error ");
    }
  };

  return (
    <div className="container">
      <h1>User Login</h1>

      
      <div className="card">
        <h2>Controlled Login</h2>
        <form onSubmit={controlledLogin}>
          <input
            type="text" placeholder="emilys" value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password" placeholder="emilyspass" value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;