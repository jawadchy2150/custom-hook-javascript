import { useEffect, useState } from "react";
import "./App.css";
import useApi from "./hooks/useApi";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, error, isLoading, apiCall } = useApi({
    method: "GET",
    url: "https://api.restful-api.dev/objects",
  });
  const { data: postData, apiCall: postRequest } = useApi({
    method: "POST",
    url: "https://api.restful-api.dev/objects",
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); //By default, submitting a form would cause the page to reload.
    const requestBody = {
      email: email,
      password: password,
    };
    await postRequest(requestBody);
  };

  return (
    <>
      <h2>This is Custom Hook Practice</h2>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            <ul>
              {data.map((post) => (
                <li key={post.id}>{post.name}</li>
              ))}
            </ul>
            <button onClick={apiCall}>Reload Data</button>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
