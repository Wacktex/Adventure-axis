import React from 'react';
import styled from 'styled-components';

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
  
  &:hover {
    color: #ff5500;
  }
`;

const BrandsBar = () => {
  const brands = [
    'WILEY X',
    'SHRED',
    'LAFUMA',
    'MILLET',
    'ALPS MOUNTAINEERING',
    'PALM',
    'PRINCETON TEC',
    'CAMP',
    'ROTHCO',
    'HeadQuish Technologies'
  ];

  return (
    <BrandBarContainer>
      <BrandBarContent>
        <BrandList>
          {brands.map((brand, index) => (
            <BrandLink key={index} href="#">{brand}</BrandLink>
          ))}
        </BrandList>
      </BrandBarContent>
    </BrandBarContainer>
  );
};

export default BrandsBar;
