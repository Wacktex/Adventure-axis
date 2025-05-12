import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  position: relative;
  height: 500px;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1464278533981-50106e6176b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080');
  background-size: cover;
  background-position: center;
`;

const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  color: white;
  font-size: 1.125rem;
  margin-bottom: 2rem;
  font-family: 'Montserrat', sans-serif;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ShopButton = styled.a`
  background-color: #ff5500;
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: rgba(255, 85, 0, 0.9);
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroBackground>
        <DarkOverlay />
      </HeroBackground>
      <HeroContent>
        <HeroTitle>The Joys of the Journey</HeroTitle>
        <HeroSubtitle>Complete Outdoor Gear – 25+ Years of Innovation</HeroSubtitle>
        <ShopButton href="#">Shop Now</ShopButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
