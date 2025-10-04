import { motion } from "framer-motion";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-6"
        >
          About Us
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-center mb-12 text-gray-600"
        >
          Welcome to{" "}
          <span className="font-semibold text-green-600">Our Recipe App</span> –
          your ultimate companion for discovering, saving, and enjoying
          delicious recipes.
        </motion.p>

        {/* Sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-xl p-6 text-center"
          >
            <h2 className="text-xl font-semibold mb-3 text-green-600">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To make cooking fun, simple, and accessible for everyone – from
              beginners to pro chefs.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-xl p-6 text-center"
          >
            <h2 className="text-xl font-semibold mb-3 text-green-600">
              Our Values
            </h2>
            <p className="text-gray-600">
              We believe in healthy living, sharing food love, and building a
              global cooking community.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-xl p-6 text-center"
          >
            <h2 className="text-xl font-semibold mb-3 text-green-600">
              Our Vision
            </h2>
            <p className="text-gray-600">
              To inspire millions worldwide to explore new flavors and make
              cooking part of everyday joy.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-700 mb-4">
            Want to join our journey? Discover thousands of recipes today!
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
          >
            Explore Recipes
          </a>
        </motion.div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default AboutUs;
