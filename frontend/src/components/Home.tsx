import Products from "./Products";
import RecipeMain from "./RecipeMain";
import Footer from "./ui/Footer";
import Navbar from "./ui/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <RecipeMain />
      <Products />
      <Footer />
    </>
  );
};

export default Home;
