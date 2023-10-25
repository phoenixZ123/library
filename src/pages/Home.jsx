import HeroSection from "../components/HeroSection";
import { BookList } from "../components/BookList";

const  Home=()=> {
  return (
    <div className="h-screen">
      <HeroSection />
      <BookList/>
    </div>
  );
}

export default Home;
