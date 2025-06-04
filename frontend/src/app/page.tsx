// frontend/src/app/page.tsx (or .jsx)
'use client'; // This file is a Client Component because it contains interactive elements
import Button from '../../components/Button'; 

export default function Home() {
  return (
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
  );
}