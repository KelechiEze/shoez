export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div className="space-y-6">
            <svg
              className="h-8 w-auto text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.738-.273-1.99.635-3.756.47-.914 1.136-1.803 1.905-2.617a.6.6 0 011.05.351c-.135 1.132.182 1.83.952 2.094.46.157 1.057.067 1.79-.27L21 8.719z" />
            </svg>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Info</h3>
            <ul className="space-y-3 text-[11px] text-gray-400 uppercase tracking-widest">
              <li className="hover:text-white cursor-pointer transition-colors">Find a Store</li>
              <li className="hover:text-white cursor-pointer transition-colors">Discount</li>
              <li className="hover:text-white cursor-pointer transition-colors">Gift Cards</li>
              <li className="hover:text-white cursor-pointer transition-colors">Feedback</li>
              <li className="hover:text-white cursor-pointer transition-colors">Become a Member</li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Shop</h3>
            <ul className="space-y-3 text-[11px] text-gray-400 uppercase tracking-widest">
              <li className="hover:text-white cursor-pointer transition-colors">Man</li>
              <li className="hover:text-white cursor-pointer transition-colors">Woman</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kids</li>
              <li className="hover:text-white cursor-pointer transition-colors">Collections</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">About</h3>
            <ul className="space-y-3 text-[11px] text-gray-400 uppercase tracking-widest">
              <li className="hover:text-white cursor-pointer transition-colors">News</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Investors</li>
              <li className="hover:text-white cursor-pointer transition-colors">Sustainability</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
          <p>© 2026 NIKE. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy & Cookie Policy</span>
            <div className="flex space-x-4">
              {['FB', 'TW', 'IG', 'YT'].map((s) => (
                <span key={s} className="hover:text-white cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
