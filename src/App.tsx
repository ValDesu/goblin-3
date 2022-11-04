import React, { useEffect } from 'react';
import { client } from './pocket/config';

import './App.css';


function App() {

  const [user, setUser] = React.useState<any>(null);

  //fetch user from local storage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className="App">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="inline-flex">
          <a href={"/login"} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
            Connexion
          </a>

          { user ? <a href={"/lobby"} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
            Lancer une partie
          </a> : null
          
          }
          
          <a href={"/register"} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
            Inscription
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
