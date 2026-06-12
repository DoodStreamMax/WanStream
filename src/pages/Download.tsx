import { FaDownload } from 'react-icons/fa';

export function Download() {
  const videoUrl = sessionStorage.getItem('videoUrl');

  const randomUrls = [
    'https://crn77.com/4/10251220',
  ];
  
  const handleDownload = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');

      setTimeout(() => {
        const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
        window.location.href = randomUrl;
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">
          Secure Video Download
        </h1>
        {videoUrl ? (
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-center mx-auto hover:bg-blue-500 transition-colors shadow-lg"
          >
            <FaDownload className="mr-3" />
            Download Now
          </button>
        ) : (
          <p className="text-gray-400">No video URL is available for download.</p>
        )}
      </div>
    </div>
  );
}
