import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BrandsBar from './BrandsBar';
import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaBars } from 'react-icons/fa';

const NavContainer = styled.nav`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 50;
`;

// New trending products bar at the top
const TrendingBar = styled.div`
  background-color: #ff5500;
  color: white;
  padding: 0.4rem 1rem;
`;

const TrendingBarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewsTickerWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  margin: 0 1.5rem;
  position: relative;
`;

const NewsTicker = styled.div`
  display: inline-block;
  white-space: nowrap;
  padding-left: 100%;
  animation: ticker 30s linear infinite;

  @keyframes ticker {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const NewsItem = styled.span`
  margin-right: 3rem;
  position: relative;
  
  &:after {
    content: '•';
    margin-left: 1.5rem;
  }
`;

const TrendingButton = styled.a`
  background-color: black;
  color: white;
  font-size: 0.875rem;
  padding: 0.4rem 1.2rem;
  border-radius: 0.25rem;
  white-space: nowrap;
  transition: background-color 0.2s;
  font-weight: 600;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
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
  max-width: 100%;
  
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
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    
    & > * + * {
      margin-top: 0.75rem;
    }
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.a`
  font-size: 1.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
`;

const LogoImage = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff5500;
  font-size: 1.5rem;
  border: 2px solid #ff5500;
  border-radius: 8px;
  margin-right: 10px;
`;

const LogoText = styled.span`
  margin-left: 0.5rem;
`;

const NavIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const NavIcon = styled.a`
  color: white;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  position: relative;
  
  &:hover {
    color: #ff5500;
  }
`;

const IconBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff5500;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2px;
`;

const MobileMenuButton = styled.button`
  display: none;
  color: white;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  margin-right: 0.75rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  background-color: #333;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  padding-left: 2.5rem;
  color: white;
  width: 200px;
  font-size: 0.875rem;
  
  &::placeholder {
    color: #aaa;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 85, 0, 0.5);
  }
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  left: 0.75rem;
  color: #aaa;
  font-size: 1rem;
  display: flex;
  align-items: center;
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

  // News ticker content
  const news = [
    "25% Off on All Hiking Gear This Weekend!",
    "New Waterproof Collection Available Now",
    "Free Shipping on Orders Over $100",
    "Join Our Adventure Club for Exclusive Deals",
    "Limited Edition Mountain Gear Just Arrived"
  ];

  return (
    <NavContainer>
      {/* Trending Products bar */}
      <TrendingBar>
        <TrendingBarContent>
          <div>Hot Deals</div>
          <NewsTickerWrapper>
            <NewsTicker>
              {news.map((item, index) => (
                <NewsItem key={index}>{item}</NewsItem>
              ))}
            </NewsTicker>
          </NewsTickerWrapper>
          <TrendingButton href="#">Trending Products</TrendingButton>
        </TrendingBarContent>
      </TrendingBar>
      
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
        </NewsBarContent>
      </NewsBar>
      
      {/* Main navigation */}
      <MainNav>
        <MainNavContent>
          {isMobile && <MobileMenuButton><FaBars /></MobileMenuButton>}
          
          <LogoWrapper>
            <Logo href="#">
              {/* Replace with your own logo */}
              <LogoImage>AS</LogoImage>
              <LogoText>Adventure Shop</LogoText>
            </Logo>
          </LogoWrapper>
          
          <NavIconsContainer>
            <SearchContainer>
              <SearchIconWrapper>
                <FaSearch />
              </SearchIconWrapper>
              <SearchInput placeholder="Search products..." />
            </SearchContainer>
            
            <NavIcon href="#">
              <FaUser />
            </NavIcon>
            
            <NavIcon href="#">
              <FaHeart />
              <IconBadge>2</IconBadge>
            </NavIcon>
            
            <NavIcon href="#">
              <FaShoppingCart />
              <IconBadge>3</IconBadge>
            </NavIcon>
          </NavIconsContainer>
        </MainNavContent>
      </MainNav>
      
      {/* Brand bar */}
      <BrandsBar />
    </NavContainer>
  );
};

export default Navbar;
