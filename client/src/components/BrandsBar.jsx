import React, { useRef } from 'react';
import styled from 'styled-components';
import { 
  FaMountain, 
  FaHiking, 
  FaWater, 
  FaShoppingBag, 
  FaCampground, 
  FaSnowboarding, 
  FaFish,
  FaCompass,
  FaTools,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const BrandBarContainer = styled.div`
  background-color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const BrandBarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.left {
    left: 5px;
  }
  
  &.right {
    right: 5px;
  }
  
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    font-size: 0.75rem;
  }
`;

const BrandList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
  white-space: nowrap;
  gap: 2.5rem;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }
`;

const BrandLink = styled.a`
  color: #555555;
  font-weight: 600;
  transition: color 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  
  &:hover {
    color: #ff5500;
  }
`;

const BrandIcon = styled.div`
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
`;

const BrandName = styled.span`
  font-size: 0.7rem;
`;

const BrandsBar = () => {
  const scrollContainerRef = useRef(null);
  
  const brands = [
    { name: 'WILEY X', icon: FaMountain },
    { name: 'SHRED', icon: FaHiking },
    { name: 'LAFUMA', icon: FaWater },
    { name: 'MILLET', icon: FaShoppingBag },
    { name: 'ALPS MTN', icon: FaCampground },
    { name: 'PALM', icon: FaSnowboarding },
    { name: 'PRINCETON', icon: FaFish },
    { name: 'CAMP', icon: FaCompass },
    { name: 'ROTHCO', icon: FaTools },
    { name: 'HQ Tech', icon: FaShoppingCart }
  ];
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <BrandBarContainer>
      <BrandBarContent>
        <ScrollButton className="left" onClick={scrollLeft}>
          <FaChevronLeft />
        </ScrollButton>
        
        <BrandList ref={scrollContainerRef}>
          {brands.map((brand, index) => {
            const IconComponent = brand.icon;
            return (
              <BrandLink key={index} href="#">
                <BrandIcon>
                  <IconComponent />
                </BrandIcon>
                <BrandName>{brand.name}</BrandName>
              </BrandLink>
            );
          })}
        </BrandList>
        
        <ScrollButton className="right" onClick={scrollRight}>
          <FaChevronRight />
        </ScrollButton>
      </BrandBarContent>
    </BrandBarContainer>
  );
};

export default BrandsBar;
