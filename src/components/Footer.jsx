import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">MovieMaster Pro</h2>
          <p className="text-gray-400 text-sm">
            Discover, rate, and review your favorite movies. Stay updated with the latest releases and trending titles across all genres.
            Stay updated with the latest releases and trending titles across all genres.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms of Use</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Explore Genres */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Genres</h3>
          <ul className="space-y-2 text-sm">
            {["Action", "Comedy", "Horror", "Sci-Fi", ].map((genre, index) => (
              <li key={index}>
                <a href="#" className="hover:text-yellow-400 transition-colors">{genre}</a>
              </li>
            ))}
          </ul>
        </div>

        
      {/* Social & Newsletter */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
  <div className="flex gap-4">
    {/* Twitter */}
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.204-4.92 4.917 0 .39.045.765.127 1.124-4.087-.205-7.713-2.165-10.141-5.144-.423.724-.666 1.562-.666 2.457 0 1.69.861 3.179 2.17 4.054-.799-.025-1.552-.245-2.21-.612v.061c0 2.364 1.68 4.337 3.907 4.782-.409.111-.839.171-1.282.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.376 4.6 3.414-1.68 1.316-3.808 2.101-6.115 2.101-.397 0-.789-.023-1.17-.068 2.179 1.396 4.768 2.21 7.548 2.21 9.142 0 14.307-7.721 13.995-14.646.961-.694 1.796-1.561 2.457-2.548l-.047-.02z"/>
      </svg>
    </a>

    {/* YouTube */}
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a2.997 2.997 0 0 0-2.112-2.118C19.515 3.5 12 3.5 12 3.5s-7.515 0-9.386.568a2.997 2.997 0 0 0-2.112 2.118C0 8.057 0 12 0 12s0 3.943.502 5.814a2.997 2.997 0 0 0 2.112 2.118C4.485 20.5 12 20.5 12 20.5s7.515 0 9.386-.568a2.997 2.997 0 0 0 2.112-2.118C24 15.943 24 12 24 12s0-3.943-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    </a>

    {/* Facebook */}
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.675 0h-21.35C.594 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.765v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z"/>
      </svg>
    </a>
  </div>

  {/* Newsletter */}
  {/* <div className="mt-6">
    <h3 className="text-lg font-semibold text-white mb-2">Newsletter</h3>
    <form className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        placeholder="Your email"
        className="p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 flex-1"
      />
      <button
        type="submit"
        className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
      >
        Subscribe
      </button>
    </form>
  </div> */}
</div>

      </div>

      <hr className="border-gray-700 my-8" />

      <p className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MovieMaster Pro. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

