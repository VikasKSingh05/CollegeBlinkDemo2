import Header from "./components/Header";
import CollegePage from "./components/CollegePage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <CollegePage />
      <Footer />
    </div>
  );
}

export default App;
