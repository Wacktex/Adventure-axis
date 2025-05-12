import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BrandsBar from './BrandsBar';

const NavContainer = styled.nav`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 50;
`;

const NewsBar = styled.div`
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
`;

const NewsBarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewsLinks = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 0.25rem;
  padding-right: 1rem;
  max-width: 80%;
  
  @media (min-width: 768px) {
    max-width: none;
  }
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }
`;

const NewsLink = styled.a`
  color: white;
  font-size: 0.875rem;
  transition: color 0.2s;
  margin-right: 1.25rem;
  
  &:hover {
    color: #ff5500;
  }
`;

const TrendingButton = styled.a`
  background-color: #ff5500;
  color: white;
  font-size: 0.875rem;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  white-space: nowrap;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 85, 0, 0.9);
  }
`;

const MainNav = styled.div`
  background-color: black;
  color: white;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const MainNavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.a`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
`;

const LogoIcon = styled.span`
  color: #ff5500;
`;

const LogoText = styled.span`
  margin-left: 0.5rem;
`;

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <NavContainer>
      {/* News bar */}
      <NewsBar>
        <NewsBarContent>
          <NewsLinks>
            <NewsLink href="#">Water Sport Gear</NewsLink>
            <NewsLink href="#">Safety Rescue</NewsLink>
            <NewsLink href="#">Tactical Eye Wear</NewsLink>
            <NewsLink href="#">Footwear</NewsLink>
            <NewsLink href="#">Clothing</NewsLink>
            <NewsLink href="#">Camping & Outdoor</NewsLink>
            <NewsLink href="#">HeadQuish Technologies</NewsLink>
            <NewsLink href="#">Deals & Combos</NewsLink>
          </NewsLinks>
          <TrendingButton href="#">Trending Products</TrendingButton>
        </NewsBarContent>
      </NewsBar>
      
      {/* Main navigation */}
      <MainNav>
        <MainNavContent>
          <Logo href="#">
            <LogoIcon>▲</LogoIcon>
            <LogoText>Adventure Shop</LogoText>
          </Logo>
        </MainNavContent>
      </MainNav>
      
      {/* Brand bar */}
      <BrandsBar />
    </NavContainer>
  );
};

export default Navbar;
