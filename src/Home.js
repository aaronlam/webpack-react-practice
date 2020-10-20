import React, { useState, useEffect } from "react";
import "./Home.scss";

const useGithub = (username) => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then(setUser);
  }, [username]);

  return user;
};

function Home() {
  const [username, setUsername] = useState("aaronlam");

  const user = useGithub(username);
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  return (
    <div>
      Hello <b>{user.login}</b>
      <p>{user.bio}</p>
      <div>
        <input type="text" value={username} onChange={handleChange}></input>
      </div>
    </div>
  );
}

export default Home;
