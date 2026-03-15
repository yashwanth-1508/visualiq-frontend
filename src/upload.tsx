import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">

        <h1 className="text-2xl font-bold mb-4">Upload Video</h1>

        <label className="border-2 border-dashed border-gray-400 p-6 block rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="file"
            accept="video/mp4"
            className="hidden"
            onChange={handleFileChange}
          />
          Drag & Drop MP4 or Click to Upload
        </label>

        {file && (
          <p className="mt-3 text-sm text-gray-600">
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
  );
}