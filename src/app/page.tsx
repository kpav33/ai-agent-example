import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-gray-100 
    flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Hello AI!
        </h1>
        <Chat />
      </div>
    </main>
  );
}
