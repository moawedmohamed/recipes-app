const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-white font-semibold mb-4">About</h3>
          <p className="text-sm leading-6">
            Cras at ultrices erat, sed vulputate eros. Nunc at augue gravida est
            fermentum vulputate. Pellentesque et ipsum in dui malesuada tempus.
          </p>
        </div>

        {/* Archives */}
        <div>
          <h3 className="text-white font-semibold mb-4">Archives</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                June 2014
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                July 2014
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                August 2014
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                September 2014
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                November 2014
              </a>
            </li>
          </ul>
        </div>

        {/* Recipes */}
        <div>
          <h3 className="text-white font-semibold mb-4">Recipes</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Browse Recipes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Recipe Page
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Submit Recipe
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">
            Sign up to receive email updates on new product announcements, gift
            ideas, sales and more.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="mail@example.com"
              className="w-full px-3 py-2 rounded-l-md focus:outline-none text-gray-900"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 text-center py-4 text-sm text-gray-400">
        © Copyright 2014 by{" "}
        <span className="text-white font-semibold">Chow</span>. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
