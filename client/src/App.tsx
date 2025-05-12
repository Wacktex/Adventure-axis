import React from 'react';
import { Route, Switch } from 'wouter';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/not-found';

// Home page component
const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <InfoSection />
    </>
  );
};

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/category/:id" component={CategoryPage} />
        <Route path="/category/:categoryId/:subcategoryId" component={CategoryPage} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
