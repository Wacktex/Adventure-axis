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

  /* Hide vertical scrollbar */
  overflow-y: hidden;
`;

const NewsLinkItem = styled.div`
  position: relative;
  margin-right: 1.25rem;
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
  display: ${props => props.$isOpen ? 'block' : 'none'};
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
  min-width: ${props => props.$isExpanded ? '200px' : '24px'};
`;

const SearchInput = styled.input`
  background-color: #333;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  padding-left: 2.5rem;
  padding-right: ${props => props.$isExpanded ? '2.5rem' : '0.5rem'};
  color: white;
  width: ${props => props.$isExpanded ? '200px' : '0'};
  opacity: ${props => props.$isExpanded ? '1' : '0'};
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
  left: ${props => props.$isExpanded ? '0.75rem' : 'auto'};
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
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Add a click event listener to close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-toggle') && !event.target.closest('.dropdown-menu')) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded);
  };
  
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
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
              <NewsLink 
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(0);
                }} 
                href="/category/water-sports" 
                $hasDropdown 
                className="dropdown-toggle"
              >
                Water Sport Gear
              </NewsLink>
              <DropdownMenu $isOpen={activeDropdown === 0} className="dropdown-menu">
                <DropdownLink href="/category/water-sports/life-jackets">Life Jackets</DropdownLink>
                <DropdownLink href="/category/water-sports/wetsuits">Wetsuits</DropdownLink>
                <DropdownLink href="/category/water-sports/paddle-boards">Paddle Boards</DropdownLink>
                <DropdownLink href="/category/water-sports/kayaks">Kayaks</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="/category/water-sports">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink 
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(1);
                }}
                href="/category/safety-rescue" 
                $hasDropdown 
                className="dropdown-toggle"
              >
                Safety Rescue
              </NewsLink>
              <DropdownMenu $isOpen={activeDropdown === 1} className="dropdown-menu">
                <DropdownLink href="/category/safety-rescue/first-aid">First Aid Kits</DropdownLink>
                <DropdownLink href="/category/safety-rescue/shelters">Emergency Shelters</DropdownLink>
                <DropdownLink href="/category/safety-rescue/tools">Survival Tools</DropdownLink>
                <DropdownLink href="/category/safety-rescue/equipment">Rescue Equipment</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="/category/safety-rescue">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink 
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(2);
                }}
                href="/category/eyewear" 
                $hasDropdown 
                className="dropdown-toggle"
              >
                Tactical Eye Wear
              </NewsLink>
              <DropdownMenu $isOpen={activeDropdown === 2} className="dropdown-menu">
                <DropdownLink href="/category/eyewear/sunglasses">Sport Sunglasses</DropdownLink>
                <DropdownLink href="/category/eyewear/protective">Protective Eyewear</DropdownLink>
                <DropdownLink href="/category/eyewear/prescription">Prescription Compatible</DropdownLink>
                <DropdownLink href="/category/eyewear/night-vision">Night Vision</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="/category/eyewear">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink 
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(3);
                }}
                href="/category/footwear" 
                $hasDropdown 
                className="dropdown-toggle"
              >
                Footwear
              </NewsLink>
              <DropdownMenu $isOpen={activeDropdown === 3} className="dropdown-menu">
                <DropdownLink href="/category/footwear/hiking-boots">Hiking Boots</DropdownLink>
                <DropdownLink href="/category/footwear/running-shoes">Trail Running Shoes</DropdownLink>
                <DropdownLink href="/category/footwear/water-shoes">Water Shoes</DropdownLink>
                <DropdownLink href="/category/footwear/climbing-shoes">Climbing Shoes</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="/category/footwear">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink 
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(4);
                }}
                href="/category/clothing" 
                $hasDropdown 
                className="dropdown-toggle"
              >
                Clothing
              </NewsLink>
              <DropdownMenu $isOpen={activeDropdown === 4} className="dropdown-menu">
                <DropdownLink href="/category/clothing/mens">Men's Apparel</DropdownLink>
                <DropdownLink href="/category/clothing/womens">Women's Apparel</DropdownLink>
                <DropdownLink href="/category/clothing/kids">Kids' Clothing</DropdownLink>
                <DropdownLink href="/category/clothing/accessories">Outdoor Accessories</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="/category/clothing">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink 
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(5);
                }}
                href="/category/camping" 
                $hasDropdown 
                className="dropdown-toggle"
              >
                Camping & Outdoor
              </NewsLink>
              <DropdownMenu $isOpen={activeDropdown === 5} className="dropdown-menu">
                <DropdownLink href="/category/camping/tents">Tents</DropdownLink>
                <DropdownLink href="/category/camping/sleeping-bags">Sleeping Bags</DropdownLink>
                <DropdownLink href="/category/camping/backpacks">Backpacks</DropdownLink>
                <DropdownLink href="/category/camping/cooking">Cooking Equipment</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="/category/camping">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink 
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(6);
                }}
                href="/category/tech" 
                $hasDropdown 
                className="dropdown-toggle"
              >
                HeadQuish Technologies
              </NewsLink>
              <DropdownMenu $isOpen={activeDropdown === 6} className="dropdown-menu">
                <DropdownLink href="/category/tech/gps">GPS Devices</DropdownLink>
                <DropdownLink href="/category/tech/cameras">Action Cameras</DropdownLink>
                <DropdownLink href="/category/tech/chargers">Solar Chargers</DropdownLink>
                <DropdownLink href="/category/tech/watches">Adventure Watches</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="/category/tech">View All</DropdownLink>
              </DropdownMenu>
            </NewsLinkItem>
            
            <NewsLinkItem>
              <NewsLink 
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(7);
                }}
                href="/category/deals" 
                $hasDropdown 
                className="dropdown-toggle"
              >
                Deals & Combos
              </NewsLink>
              <DropdownMenu $isOpen={activeDropdown === 7} className="dropdown-menu">
                <DropdownLink href="/category/deals/clearance">Clearance</DropdownLink>
                <DropdownLink href="/category/deals/bundles">Bundle Deals</DropdownLink>
                <DropdownLink href="/category/deals/seasonal">Seasonal Sales</DropdownLink>
                <DropdownLink href="/category/deals/gift-sets">Gift Sets</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="/category/deals">View All</DropdownLink>
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
            <SearchContainer $isExpanded={searchExpanded}>
              {searchExpanded && (
                <>
                  <SearchIconWrapper $isExpanded={searchExpanded}>
                    <FaSearch />
                  </SearchIconWrapper>
                  <SearchInput 
                    $isExpanded={searchExpanded} 
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
