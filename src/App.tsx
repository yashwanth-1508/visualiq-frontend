import { useState } from "react";
import TranscriptTimeline from "./components/TranscriptTimeline";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    if (email === "admin@test.com" && password === "1234") {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setSuccess(false);
      setProgress(0);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    let value = 0;

    const interval = setInterval(() => {
      value += 10;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setSuccess(true);
      }
    }, 300);
  };

  // LOGIN PAGE
  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-80 text-center">

          <h2 className="text-2xl font-bold mb-6 text-blue-600">
            VisualIQ Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>

          <p className="text-sm text-gray-500 mt-3">
            Demo: admin@test.com / 1234
          </p>

        </div>
      </div>
    );
  }

  // UPLOAD PAGE
  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-white shadow flex justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-blue-600">VisualIQ</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Upload Section */}
      <div className="flex flex-col items-center mt-20">

        <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">

          <h1 className="text-2xl font-bold mb-4">Upload MP4 Video</h1>

          <label className="border-2 border-dashed border-gray-400 p-6 block rounded-lg cursor-pointer hover:bg-blue-50">
            <input
              type="file"
              accept="video/mp4"
              className="hidden"
              onChange={handleFileChange}
            />
            Drag & Drop MP4 or Click to Upload
          </label>

          {file && (
            <>
              <p className="mt-3 text-sm text-gray-600">
                Selected: {file.name}
              </p>

              <video
                className="mt-3 rounded-lg"
                width="300"
                controls
                src={URL.createObjectURL(file)}
              />
            </>
          )}

          <button
            disabled={!file}
            onClick={handleUpload}
            className={`mt-4 px-4 py-2 rounded text-white ${
              file
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Upload
          </button>

          {progress > 0 && (
            <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {success && (
            <p className="text-green-600 mt-3 font-semibold">
              Upload Successful 🎉
            </p>
          )}

        </div>

        {/* Transcript Timeline appears after upload */}
        {success && (
          <div className="mt-10">
            <TranscriptTimeline />
          </div>
        )}

      </div>

    </div>
  );
}

export default App;