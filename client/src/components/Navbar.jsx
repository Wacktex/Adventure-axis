import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BrandsBar from './BrandsBar';
import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaBars, FaShippingFast, FaTimes } from 'react-icons/fa';

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

const NewsLinkItem = styled.div`
  position: relative;
  margin-right: 1.25rem;
  
  &:hover > div {
    display: block;
  }
`;

const NewsLink = styled.a`
  color: white;
  font-size: 0.875rem;
  transition: color 0.2s;
  display: inline-block;
  padding: 0.25rem 0;
  position: relative;
  
  &:hover {
    color: #ff5500;
  }
  
  &::after {
    content: '▼';
    font-size: 0.625rem;
    margin-left: 0.375rem;
    vertical-align: middle;
    display: ${props => props.$hasDropdown ? 'inline' : 'none'};
    opacity: 0.8;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  display: none;
  z-index: 100;
  padding: 0.5rem 0;
  animation: fadeIn 0.2s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const DropdownLink = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  font-size: 0.875rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f7f7f7;
    color: #ff5500;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background-color: #eaeaea;
  margin: 0.5rem 0;
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

const LeftIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Logo = styled.a`
  font-size: 1.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
`;

const LogoImage = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff5500;
  font-size: 1.5rem;
  border: 2px solid #ff5500;
  border-radius: 8px;
`;

const RightIconsContainer = styled.div`
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
  transition: all 0.3s ease;
`;

const SearchInput = styled.input`
  background-color: #333;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  padding-left: 2.5rem;
  padding-right: ${props => props.isExpanded ? '2.5rem' : '0.5rem'};
  color: white;
  width: ${props => props.isExpanded ? '200px' : '0'};
  opacity: ${props => props.isExpanded ? '1' : '0'};
  font-size: 0.875rem;
  transition: all 0.3s ease;
  position: absolute;
  right: 0;
  top: 0;
  
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
  left: ${props => props.isExpanded ? '0.75rem' : 'auto'};
  color: #aaa;
  font-size: 1rem;
  display: flex;
  align-items: center;
  z-index: 2;
`;

const SearchToggle = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  
  &:hover {
    color: #ff5500;
  }
`;

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

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

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded);
  };

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
      
      {/* News bar with category dropdowns */}
      <NewsBar>
        <NewsBarContent>
          <NewsLinks>
            <NewsLinkItem>
              <NewsLink href="/category/water-sports" $hasDropdown>Water Sport Gear</NewsLink>
              <DropdownMenu>
                <DropdownLink href="/category/water-sports/life-jackets">Life Jackets</DropdownLink>
                <DropdownLink href="/category/water-sports/wetsuits">Wetsuits</DropdownLink>
                <DropdownLink href="/category/water-sports/paddle-boards">Paddle Boards</DropdownLink>
                <DropdownLink href="/category/water-sports/kayaks">Kayaks</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="/category/water-sports">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink href="#" $hasDropdown>Safety Rescue</NewsLink>
              <DropdownMenu>
                <DropdownLink href="#">First Aid Kits</DropdownLink>
                <DropdownLink href="#">Emergency Shelters</DropdownLink>
                <DropdownLink href="#">Survival Tools</DropdownLink>
                <DropdownLink href="#">Rescue Equipment</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="#">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink href="#" $hasDropdown>Tactical Eye Wear</NewsLink>
              <DropdownMenu>
                <DropdownLink href="#">Sport Sunglasses</DropdownLink>
                <DropdownLink href="#">Protective Eyewear</DropdownLink>
                <DropdownLink href="#">Prescription Compatible</DropdownLink>
                <DropdownLink href="#">Night Vision</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="#">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink href="#" $hasDropdown>Footwear</NewsLink>
              <DropdownMenu>
                <DropdownLink href="#">Hiking Boots</DropdownLink>
                <DropdownLink href="#">Trail Running Shoes</DropdownLink>
                <DropdownLink href="#">Water Shoes</DropdownLink>
                <DropdownLink href="#">Climbing Shoes</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="#">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink href="#" $hasDropdown>Clothing</NewsLink>
              <DropdownMenu>
                <DropdownLink href="#">Men's Apparel</DropdownLink>
                <DropdownLink href="#">Women's Apparel</DropdownLink>
                <DropdownLink href="#">Kids' Clothing</DropdownLink>
                <DropdownLink href="#">Outdoor Accessories</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="#">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink href="#" $hasDropdown>Camping & Outdoor</NewsLink>
              <DropdownMenu>
                <DropdownLink href="#">Tents</DropdownLink>
                <DropdownLink href="#">Sleeping Bags</DropdownLink>
                <DropdownLink href="#">Backpacks</DropdownLink>
                <DropdownLink href="#">Cooking Equipment</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="#">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink href="#" $hasDropdown>HeadQuish Technologies</NewsLink>
              <DropdownMenu>
                <DropdownLink href="#">GPS Devices</DropdownLink>
                <DropdownLink href="#">Action Cameras</DropdownLink>
                <DropdownLink href="#">Solar Chargers</DropdownLink>
                <DropdownLink href="#">Adventure Watches</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="#">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink href="#" $hasDropdown>Deals & Combos</NewsLink>
              <DropdownMenu>
                <DropdownLink href="#">Clearance</DropdownLink>
                <DropdownLink href="#">Bundle Deals</DropdownLink>
                <DropdownLink href="#">Seasonal Sales</DropdownLink>
                <DropdownLink href="#">Gift Sets</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="#">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
          </NewsLinks>
        </NewsBarContent>
      </NewsBar>
      
      {/* Main navigation */}
      <MainNav>
        <MainNavContent>
          {isMobile && <MobileMenuButton><FaBars /></MobileMenuButton>}
          
          <LeftIconsContainer>
            <NavIcon href="#" title="Order Tracking">
              <FaShippingFast />
            </NavIcon>
            
            <NavIcon href="#" title="Wishlist">
              <FaHeart />
              <IconBadge>2</IconBadge>
            </NavIcon>
          </LeftIconsContainer>
          
          <LogoWrapper>
            <Logo href="#">
              {/* Replace with your own logo */}
              <LogoImage>AS</LogoImage>
            </Logo>
          </LogoWrapper>
          
          <RightIconsContainer>
            <SearchContainer>
              {searchExpanded && (
                <>
                  <SearchIconWrapper isExpanded={searchExpanded}>
                    <FaSearch />
                  </SearchIconWrapper>
                  <SearchInput 
                    isExpanded={searchExpanded} 
                    placeholder="Search products..." 
                    autoFocus
                  />
                </>
              )}
              <SearchToggle onClick={toggleSearch}>
                {searchExpanded ? <FaTimes /> : <FaSearch />}
              </SearchToggle>
            </SearchContainer>
            
            <NavIcon href="#" title="My Account">
              <FaUser />
            </NavIcon>
            
            <NavIcon href="#" title="Cart">
              <FaShoppingCart />
              <IconBadge>3</IconBadge>
            </NavIcon>
          </RightIconsContainer>
        </MainNavContent>
      </MainNav>
      
      {/* Brand bar */}
      <BrandsBar />
    </NavContainer>
  );
};

export default Navbar;
