import React, { useState } from "react";

const Login=()=> {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="my-4" htmlFor="username">Github Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button className="btn btn-primary mx-2" type="submit">Search</button>
      </form>
      
      {user && (
        <>
        <h4>User Details</h4>
        <div className="github-card">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
          />
          <h2 className="user">{user.login}</h2>
          <p>{user.name}</p>
          <p>Public Repos: {user.public_repos}</p>
          <p>Public Gists: {user.public_gists}</p>
          <p>Profile Created At: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
        </>
      )}
    </div>
  );
}

export default Login;
