// frontend/src/app/page.tsx (or .jsx)
'use client'; // This file is a Client Component because it contains interactive elements
import Button from '../../components/Button'; 

export default function Home() {
  return (
    <>
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
    <section className="w-full flex-grow flex items-center justify-center p-8 md:p-12 bg-gray-50 border-t border-gray-200">
        <div className="text-center max-w-3xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            What&#39;s your vision?
          </h2>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-6 text-lg"
            rows={6}
            placeholder="Describe your idea, concept, or prompt here..."
          ></textarea>
          <Button onClick={() => alert('Processing your vision!')} className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-md shadow-md">
            Generate Vision
          </Button>
        </div>
      </section>
    </>  
  );
}