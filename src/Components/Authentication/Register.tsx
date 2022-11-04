//register component

import React, { useRef, useState } from 'react';
import { client } from '../../pocket/config';

export default function Register() {
    
      const username = useRef<HTMLInputElement>(null);
      const password = useRef<HTMLInputElement>(null);
      const password_confirm = useRef<HTMLInputElement>(null);
      const email = useRef<HTMLInputElement>(null);
    
      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const user = await client.users.create({
          email: email.current?.value,
          password: password.current?.value,
          passwordConfirm: password_confirm.current?.value,
        });

        if(!user.profile){return;}
        // set user profile data
        const updatedProfile = await client.records.update('profiles', user.profile.id, {
          name: 'test',
        });
        
      }

    
      return (
     <div className="App">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-96 bg-white rounded-lg shadow-xl p-6">
             <h2 className="text-3xl font-semibold text-gray-700 text-center">Register</h2>
             <form className="mt-10" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input ref={username} type="text" className="w-full px-4 py-3 mt-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none" placeholder="Enter your username" />
                  <label className="block mt-2 text-gray-700">Email</label>
                  <input ref={email} type="email" className="w-full px-4 py-3 mt-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none" placeholder="Enter your email" />
                  <label className="block mt-2 text-gray-700">Password</label>
                  <input ref={password} type="password" className="w-full px-4 py-3 mt-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none" placeholder="Enter your password" />
                  <label className="block mt-2 text-gray-700">Confirm Password</label>
                  <input ref={password_confirm} type="password" className="w-full px-4 py-3 mt-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none" placeholder="Enter your password" />
    
                  <button className="w-full block px-4 py-3 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">Register</button>
                </div>
                </form>
            </div>
        </div>
    </div>
        );

}