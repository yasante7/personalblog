"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const handleLogin = () => {
    if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("admin", "true");
      router.push("/admin");
    } else {
      alert(`Wrong username ${username} or password ${password}
        against ${process.env.NEXT_PUBLIC_ADMIN_USERNAME} and ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD}`);
    }
  };
  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <input
          type="text"
          placeholder="Enter admin username"
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2"
        />
      <input
        type="password"
        placeholder="Enter admin password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleLogin} className="ml-2 bg-blue-500 text-white p-2">
        Login
      </button>
    </div>
  );
}
