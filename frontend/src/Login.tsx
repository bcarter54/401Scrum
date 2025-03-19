import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
        <form className="flex flex-col">
          <label className="text-left text-gray-700 mb-1">Username</label>
          <br />
          <input
            type="text"
            className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <br />
          <label className="text-left text-gray-700 mb-1">Password</label>
          <br />
          <input
            type="password"
            className="w-full px-3 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <br />
          <button
            type="button"
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
          >
            Next
          </button>
        </form>
        <div className="mt-4 text-sm">
          <a href="#" className="text-blue-600 hover:underline block mb-2">
            I forgot my username or password
          </a>
          <br />
          <a href="#" className="text-blue-600 hover:underline">
            Create a new Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
