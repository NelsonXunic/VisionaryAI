// frontend/src/app/page.tsx (or .jsx)
'use client'; // This file is a Client Component because it contains interactive elements
import React, { useState } from 'react';
import Button from '../../components/Button'; 
import ImageInput from '../../components/ImageInput'; 



export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(null);
  const [caption, setCaption] = useState<string | null>(null); // State for the generated caption
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error messages

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'; // CHECK!!!! this matches backend URL

  const handleImageSelect = (image: File | string | null) => { 
    setSelectedImage(image);
    setCaption(null); // Reset caption when a new image is selected
    setError(null); // Reset error state
  };

  const handleGenerateVision = async () => { // function to handle the button click
    if (!selectedImage) {
      alert('Please select an image first!');
      return;
    }

    setIsLoading(true);
    setError(null); // Reset error state
    setCaption(null); // Reset caption before generating a new one

    try {
      const formData = new FormData();
      const isFile = selectedImage instanceof File;
      if (isFile) {
        formData.append('image', selectedImage); // Append the file if it's a File object
      }
      else {
        alert('Image URL input is not supported yet. Please upload a file.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${BACKEND_URL}/caption_image`, {
        method: 'POST',
        body: formData,
      });

      if(!response.ok) {
        const errorData = await response.json();
        // Check if 'detail' exists, a common for FastAPI validation errors we want to avoid again
        if (errorData && Array.isArray(errorData.detail) && errorData.detail.length > 0) {
        const validationErrors = errorData.detail.map((err: any) => `${err.loc.join('.')} - ${err.msg}`);
        throw new Error(`Validation Error: ${validationErrors.join(', ')}`);
      } else if (errorData && errorData.detail) {
        throw new Error(errorData.detail);
      } else {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText || 'Unknown Error'}`);
      }
      }
      const data = await response.json();
      console.log('Caption task initiated:', data);

      // now we can poll for the result
      let taskStatusResponse;
      let taskResult;
      let status = 'PENDING';
      const taskId = data.task_id;

      while (status === 'PENDING' || status === 'RUNNING') {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Poll every 2 seconds
        taskStatusResponse = await fetch(`${BACKEND_URL}/task_status/${taskId}`);
        if (!taskStatusResponse.ok) {
          const errorData = await taskStatusResponse.json();
          throw new Error(errorData.detail || `Failed to fetch task status: ${taskStatusResponse.status}`);
        }
        taskResult = await taskStatusResponse.json();
        status = taskResult.status;
        console.log(`Task ${taskId} statusß: ${status}`);
      }
      if (status === 'SUCCESS') {
        setCaption(taskResult.result.caption);
      } else if (status === 'FAILURE') {
        setError(`Captioning failed: ${taskResult.result.exc_message || 'Unknown error'}`);
      }

    } catch (err: unknown) {
      let errorMessage = 'An unexpected error occurred.'; 
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      console.error('Error generating caption:', err);
      setError(errorMessage); // Set error state to display the error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {/* Hero Section */}
    <main className="flex flex-grow items-center justify-center p-8 md:p-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="text-center max-w-4xl px-4 py-12 bg-white rounded-lg shadow-xl border border-blue-200">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Unleash Your Vision with <span className="text-blue-600">VisionaryAI</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Leverage artificial intelligence tools to transform your ideas into shoking realities. From concept to creation, VisionaryAI is  our ultimate creative partner.
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => alert('Start your journey!')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg">
            Get Started Now
          </Button>
          <Button onClick={() => alert('Learn More about VisionaryAI!')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 text-lg rounded-full shadow-lg">
            Learn More
          </Button>
        </div>
      </section>
    </main>

    {/* Input Section for AI Interaction - Image Input */}
    <section className="w-full flex-grow flex items-center justify-center p-8 md:p-12 bg-gray-50 border-t border-gray-200 flex-col"> {/* Added flex-col */}
        <div className="text-center max-w-3xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            What&#39;s your vision?
          </h2>

          {/* Image Input Component */}
          <div className="mb-8"> {/* Added margin bottom */}
            <ImageInput onImageSelect={handleImageSelect} /> 
          </div>

          {/* Text area for additional text input (e.g., for VQA later) */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Add Text Prompt (Optional for VQA or TTS)
          </h3>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-6 text-lg"
            rows={4} // Reduced rows to make space
            placeholder="Describe your idea, concept, or question here (e.g., 'What is in this image?')..."
          ></textarea>

          <Button
            onClick={handleGenerateVision} // Call the new handler
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-md shadow-md"
            disabled = {isLoading} // Disable button while loading
          >
            {isLoading ? 'Generating...' : 'Generate Vision'}
          </Button>
        </div>
      </section>
      {/* Output Display Section */}
      <section className="w-full flex-grow flex items-center justify-center p-8 md:p-12 bg-gray-100 border-t border-gray-200">
        <div className="text-center max-w-3xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Your Vision Came to Life
          </h2>
          <div className="bg-white p-6 md:p-8 border border-gray-300 rounded-lg shadow-inner text-gray-700 min-h-[200px] flex items-center justify-center">
            {isLoading && <p className="text-xl text-blue-600">Processing your vision...</p>}
            {error && <p className="text-xl text-red-600">Error: {error}</p>}
            {caption && !isLoading && !error && (
              <div className="text-left w-full">
                <h3 className="font-semibold text-2xl mb-2 text-gray-900">Image Caption:</h3>
                <p className="text-xl text-gray-800">{caption}</p>
              </div>
            )}
            {!isLoading && !error && !caption && (
              <p className="text-xl italic text-gray-500">
                AI-generated output will appear here...
              </p>
            )}
          </div>
        </div>
      </section>
    </>  
  );
}