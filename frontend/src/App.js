import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";
import "./App.css";
import CreateItem from "./screens/CreateItem/CreateItem";
import LandingPage from "./screens/LandingPage/LandingPage";

const App = () => (
  <>
    <Header />
    <main>
      <CreateItem />
      {/* <LandingPage /> */}
    </main>
    <Footer />
  </>
);

export default App;
