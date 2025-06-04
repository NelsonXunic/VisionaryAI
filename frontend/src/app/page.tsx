// frontend/src/app/page.tsx
'use client'; // <--- IMPORTANT: Mark as Client Component
import Button from '../../components/Button'; // Adjust path if needed

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">VisionaryAI Frontend</h1>
      <Button onClick={() => alert('Button Clicked!')}>
        Click Me
      </Button>
    </main>
  );
}