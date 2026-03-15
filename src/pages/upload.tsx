import { useState } from "react";

export default function Upload({ onLogout }: any) {

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow flex justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-blue-600">VisualIQ</h1>

        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </nav>

      {/* Upload Card */}
      <div className="flex justify-center mt-20">

        <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">

          <h2 className="text-xl font-bold mb-4">
            Upload MP4 Video
          </h2>

          <input
            type="file"
            accept="video/mp4"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-4"
          />

          {file && (
            <video
              className="rounded-lg mb-3"
              width="300"
              controls
              src={URL.createObjectURL(file)}
            />
          )}

          <button
            disabled={!file}
            onClick={handleUpload}
            className={`w-full py-2 rounded text-white ${
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

      </div>

    </div>
  );
}