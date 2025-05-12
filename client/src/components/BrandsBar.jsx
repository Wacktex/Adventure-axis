import React from 'react';
import styled from 'styled-components';
import { 
  SiThenorthface, 
  SiNike, 
  SiPuma, 
  SiAdidas, 
  SiBandcamp, 
  SiSmart, 
  SiFreecodecamp,
  SiBasecamp,
  SiNewbalance,
  SiUnderarmour
} from 'react-icons/si';

const BrandBarContainer = styled.div`
  background-color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const BrandBarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BrandList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  white-space: nowrap;
  gap: 1.5rem;
  padding: 0.25rem 0;
  
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
  const brands = [
    { name: 'WILEY X', icon: SiThenorthface },
    { name: 'SHRED', icon: SiNike },
    { name: 'LAFUMA', icon: SiPuma },
    { name: 'MILLET', icon: SiAdidas },
    { name: 'ALPS MTN', icon: SiBandcamp },
    { name: 'PALM', icon: SiSmart },
    { name: 'PRINCETON', icon: SiFreecodecamp },
    { name: 'CAMP', icon: SiBasecamp },
    { name: 'ROTHCO', icon: SiNewbalance },
    { name: 'HQ Tech', icon: SiUnderarmour }
  ];

  return (
    <BrandBarContainer>
      <BrandBarContent>
        <BrandList>
          {brands.map((brand, index) => (
            <BrandLink key={index} href="#">
              <BrandIcon>
                <brand.icon />
              </BrandIcon>
              <BrandName>{brand.name}</BrandName>
            </BrandLink>
          ))}
        </BrandList>
      </BrandBarContent>
    </BrandBarContainer>
  );
};

export default BrandsBar;
