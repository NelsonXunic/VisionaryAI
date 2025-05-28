// frontend/src/app/page.tsx
'use client'; // This directive is necessary for client-side components in Next.js App Router

import { useState, useEffect } from 'react';
import axios from 'axios'; // We installed this earlier!

export default function Home() {
  const [backendMessage, setBackendMessage] = useState('Connecting to backend...');
  const [error, setError] = useState<string | null>(null);

  // Get backend URL from environment variable
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!backendUrl) {
      setError("Backend URL is not configured. Check NEXT_PUBLIC_BACKEND_URL in .env.local");
      return;
    }

    const fetchBackendData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/ping`); // Make a GET request to your FastAPI /ping endpoint
        setBackendMessage(response.data.message); // Set the message from the backend response
      } catch (err) {
        console.error("Error connecting to backend:", err);
        setError("Failed to connect to backend or receive valid response. Check backend server and CORS.");
        if (axios.isAxiosError(err) && err.response) {
          setError(`Backend error: ${err.response.status} - ${err.response.data.detail || err.response.data.message || JSON.stringify(err.response.data)}`);
        } else if (err instanceof Error) {
          setError(`Network error: ${err.message}. Is backend running on ${backendUrl}?`);
        }
      }
    };

    fetchBackendData();
  }, [backendUrl]); // Re-run if backendUrl changes (e.g., during hot reload)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <h1 className="text-4xl font-bold mb-6">VisionaryAI Frontend</h1>
      <p className="text-lg mb-8">This is your Next.js application.</p>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Backend Connection Status:</h2>
        {error ? (
          <p className="text-red-600 font-medium">{error}</p>
        ) : (
          <p className="text-green-600 font-medium">{backendMessage}</p>
        )}
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>Frontend is running on <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">http://localhost:3000</a></p>
        <p>Backend is running on <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">http://localhost:8000</a></p>
      </div>
    </div>
  );
}