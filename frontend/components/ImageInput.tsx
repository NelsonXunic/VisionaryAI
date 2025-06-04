// frontend/components/ImageInput.tsx         We will make this interactive component to allow users to upload images or provide image URLs
'use client';
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';

interface ImageInputProps {
  onImageSelect: (file: File | string | null) => void; // Callback for when an image (file or URL) is selected
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'file' | 'url'>('file');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageUrl(''); // Clear URL if file is selected
      setPreviewUrl(URL.createObjectURL(file)); // Create a local URL for preview
      onImageSelect(file); // Pass the File object to the parent
    } else {
      setPreviewUrl(null);
      onImageSelect(null);
    }
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreviewUrl(url); // Use the URL directly for preview (assuming it's a valid image URL)
    onImageSelect(url); // Pass the URL string to the parent
  };

  const clearSelection = () => {
    setImageUrl('');
    setPreviewUrl(null);
    onImageSelect(null); // Clear the selection in the parent
    // Reset file input value
    const fileInput = document.getElementById('image-file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Select an Image</h3>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setInputMode('file')}
          className={`px-4 py-2 rounded-md transition-colors ${
            inputMode === 'file' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Upload File
        </button>
        <button
          onClick={() => setInputMode('url')}
          className={`px-4 py-2 rounded-md transition-colors ${
            inputMode === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Use Image URL
        </button>
      </div>

      {inputMode === 'file' && (
        <div className="mb-4">
          <label htmlFor="image-file-input" className="block text-gray-700 text-sm font-bold mb-2">
            Upload an Image:
          </label>
          <input
            id="image-file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-gray-700 border border-gray-300 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {inputMode === 'url' && (
        <div className="mb-4">
          <label htmlFor="image-url-input" className="block text-gray-700 text-sm font-bold mb-2">
            Enter Image URL:
          </label>
          <input
            id="image-url-input"
            type="text"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="e.g., https://example.com/image.jpg"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {previewUrl && (
        <div className="mt-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Image Preview:</h4>
          <Image
            src={previewUrl}
            alt="Image Preview"
            width={400}
            height={300}
            // If we want the image to fill its parent and maintain aspect ratio,
            // we will can use `fill` prop and adjust parent container styling:
            // fill={true}
            // className="object-contain" // Or object-cover
            // Add styles for the image itself
            className="max-w-full h-auto max-h-64 rounded-md mx-auto shadow-md"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/150?text=Invalid+Image';
              e.currentTarget.onerror = null; // Prevent infinite loop
            }}
          />
          <button
            onClick={clearSelection}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            Clear Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;