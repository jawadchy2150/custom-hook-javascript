import { useEffect, useState } from 'react';
import './App.css';
import useApi from './hooks/useApi';
import useApiNew from './hooks/useApiNew';
import useToggle from './hooks/useToggle';
import useDebounce from './hooks/useDebounce';

function App() {
  // const { data, error, isLoading, apiCall} =  useApi({
  //   url: 'https://api.restful-api.dev/objects',
  // })
  const { data, error, isLoading, apiCall} =  useApi({
    method: 'GET',
    url: 'https://api.restful-api.dev/objects',
  })
  // const {data, error, isLoading, apiCall} = useApi({ 
  //   method: "POST", 
  //   url: "https://api.restful-api.dev/objects" })

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // useEffect(() => {
  //   if(debouncedSearchTerm) {
  //     console.log("Searching value for:", debouncedSearchTerm)
  //   }
  // }, [debouncedSearchTerm]);

  const filteredPosts = data ? data.filter(post=> post.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())):[];

  const {value, toggle} = useToggle(false);


  return (
    <>
      <h2>This is Custom Hook Practice</h2>
      <div>
            <input
                type="text"
                value ={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            <ul>
              {filteredPosts.map(post => (
                <li key={post.id}>{post.name}</li>
               ))}
            </ul>
            <button onClick={apiCall}>Reload Data</button>
          </div>
        )}
      </div>
      <div>
        <p>Current State: {value? 'ON' : 'OFF'}</p>
        <button onClick={toggle}>{value? 'Turn Off' : 'Turn ON'}</button>
      </div>
    </>
  )
}

export default App
