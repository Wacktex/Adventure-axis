import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaShoppingCart } from 'react-icons/fa';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FilterSidebar = styled.aside`
  width: 100%;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    width: 250px;
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const FilterToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  cursor: pointer;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileFilterWrapper = styled.div`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    display: block;
  }
`;

const RangeSlider = styled.div`
  padding: 0 0.5rem;
`;

const SliderContainer = styled.div`
  position: relative;
  height: 2rem;
  display: flex;
  align-items: center;
`;

const SliderTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 4px;
`;

const SliderRange = styled.div`
  position: absolute;
  height: 4px;
  background-color: #ff5500;
  border-radius: 4px;
`;

const SliderThumb = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #ff5500;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transform: translateX(-50%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const PriceInputs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const PriceInput = styled.input`
  width: 45%;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;
  text-align: center;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;
`;

const BrandLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  object-fit: contain;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: ${props => props.$active ? '#ff9500' : '#e0e0e0'};
  font-size: 1.25rem;
  cursor: pointer;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #ff5500;
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ColorVariants = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ColorVariant = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.$selected ? '#333' : 'transparent'};
`;

const SizeVariants = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SizeVariant = styled.div`
  padding: 0.25rem 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  cursor: pointer;
  background-color: ${props => props.$selected ? '#ff5500' : 'white'};
  color: ${props => props.$selected ? 'white' : '#333'};
`;

const ClearFilters = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProductsContainer = styled.div`
  flex: 1;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResultCount = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const SortDropdown = styled.select`
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;
  background-color: white;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: white;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: ${props => props.$inWishlist ? '#ff5500' : '#666'};
  
  &:hover {
    color: #ff5500;
  }
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.25rem;
  background-color: ${props => {
    switch(props.$type) {
      case 'new': return '#4CAF50';
      case 'sale': return '#ff5500';
      case 'hot': return '#FF9800';
      default: return '#333';
    }
  }};
  color: white;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const RatingStars = styled.div`
  display: flex;
  color: #FF9800;
  margin-right: 0.5rem;
`;

const ReviewCount = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff5500;
`;

const OriginalPrice = styled.span`
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  background-color: #ff5500;
  padding: 0.1rem 0.25rem;
  border-radius: 0.25rem;
`;

const VariantBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const VariantBadge = styled.span`
  padding: 0.2rem 0.5rem;
  background-color: #f0f0f0;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #666;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #ff5500;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: rgba(255, 85, 0, 0.9);
  }
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const LoadMoreButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: transparent;
  border: 2px solid #ff5500;
  color: #ff5500;
  font-weight: 600;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #ff5500;
    color: white;
  }
`;

// Sample mock data
const mockBrands = [
  { id: 1, name: 'WILEY X', logo: 'https://via.placeholder.com/50' },
  { id: 2, name: 'SHRED', logo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'LAFUMA', logo: 'https://via.placeholder.com/50' },
  { id: 4, name: 'MILLET', logo: 'https://via.placeholder.com/50' },
  { id: 5, name: 'ALPS MOUNTAINEERING', logo: 'https://via.placeholder.com/50' }
];

const mockProducts = Array(20).fill().map((_, index) => ({
  id: index + 1,
  title: `Premium Outdoor Adventure Gear Item ${index + 1}`,
  image: `https://picsum.photos/seed/${index + 1}/500/500`,
  currentPrice: Math.floor(Math.random() * 20000) / 100 + 19.99,
  originalPrice: Math.random() > 0.3 ? (Math.floor(Math.random() * 30000) / 100 + 39.99) : null,
  rating: Math.floor(Math.random() * 50) / 10 + 2.5,
  reviewCount: Math.floor(Math.random() * 500) + 10,
  badges: Math.random() > 0.7 ? [Math.random() > 0.5 ? 'new' : 'sale'] : [],
  variants: {
    colors: ['#ff0000', '#0000ff', '#00ff00', '#ffff00'].slice(0, Math.floor(Math.random() * 4) + 1),
    sizes: ['S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 4) + 1)
  },
  inStock: Math.random() > 0.2
}));

// Component for rendering star ratings
const StarRatingDisplay = ({ rating, size = 'sm' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const starSize = size === 'sm' ? "1rem" : "1.25rem";
  
  return (
    <RatingStars style={{ fontSize: starSize }}>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {hasHalfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </RatingStars>
  );
};

// Main component
const CategoryPage = () => {
  // Filter state
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  
  // Products state
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortMethod, setSortMethod] = useState('popularity');
  const [visibleProducts, setVisibleProducts] = useState(8);
  
  // UI state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  
  // Fetch products on component mount
  useEffect(() => {
    setIsLoading(true);
    // Normally you would fetch from an API here
    // Simulating API call with setTimeout
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  }, []);
  
  // Apply filters when any filter changes
  useEffect(() => {
    const filtered = products.filter(product => {
      // Apply price filter
      if (product.currentPrice < priceRange[0] || product.currentPrice > priceRange[1]) {
        return false;
      }
      
      // Apply brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.id % mockBrands.length + 1)) {
        return false;
      }
      
      // Apply rating filter
      if (selectedRating > 0 && product.rating < selectedRating) {
        return false;
      }
      
      // Apply in-stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      
      // Apply color filter
      if (selectedColors.length > 0 && !product.variants.colors.some(color => selectedColors.includes(color))) {
        return false;
      }
      
      // Apply size filter
      if (selectedSizes.length > 0 && !product.variants.sizes.some(size => selectedSizes.includes(size))) {
        return false;
      }
      
      return true;
    });
    
    // Apply sorting
    let sorted = [...filtered];
    switch (sortMethod) {
      case 'price-asc':
        sorted.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      default: // 'popularity'
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    
    setFilteredProducts(sorted);
  }, [products, priceRange, selectedBrands, selectedRating, inStockOnly, selectedColors, selectedSizes, sortMethod]);
  
  // Toggle wishlist
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  }, []);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSelectedRating(0);
    setInStockOnly(false);
    setSelectedColors([]);
    setSelectedSizes([]);
  }, []);
  
  // Load more products
  const loadMore = useCallback(() => {
    setVisibleProducts(prev => prev + 8);
  }, []);
  
  return (
    <PageContainer>
      {/* Filter Sidebar */}
      <FilterSidebar>
        <FilterToggle onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
          Filters {isMobileFilterOpen ? '▲' : '▼'}
        </FilterToggle>
        
        <MobileFilterWrapper $isOpen={isMobileFilterOpen}>
          {/* Price Range Filter */}
          <FilterSection>
            <FilterTitle>Price Range</FilterTitle>
            <RangeSlider>
              <SliderContainer>
                <SliderTrack />
                <SliderRange 
                  style={{ 
                    left: `${(priceRange[0] / 1000) * 100}%`, 
                    width: `${((priceRange[1] - priceRange[0]) / 1000) * 100}%` 
                  }} 
                />
                <SliderThumb style={{ left: `${(priceRange[0] / 1000) * 100}%` }} />
                <SliderThumb style={{ left: `${(priceRange[1] / 1000) * 100}%` }} />
              </SliderContainer>
              <PriceInputs>
                <PriceInput 
                  type="number" 
                  value={priceRange[0]} 
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} 
                  min="0" 
                  max={priceRange[1]} 
                />
                <PriceInput 
                  type="number" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} 
                  min={priceRange[0]} 
                  max="1000" 
                />
              </PriceInputs>
            </RangeSlider>
          </FilterSection>
          
          {/* Brand Filter */}
          <FilterSection>
            <FilterTitle>Brands</FilterTitle>
            <CheckboxGroup>
              {mockBrands.map(brand => (
                <CheckboxItem key={brand.id}>
                  <CheckboxInput 
                    type="checkbox" 
                    id={`brand-${brand.id}`} 
                    checked={selectedBrands.includes(brand.id)} 
                    onChange={() => {
                      setSelectedBrands(prev => 
                        prev.includes(brand.id) 
                          ? prev.filter(id => id !== brand.id) 
                          : [...prev, brand.id]
                      );
                    }} 
                  />
                  <CheckboxLabel htmlFor={`brand-${brand.id}`}>
                    <BrandLogo src={brand.logo} alt={brand.name} />
                    {brand.name}
                  </CheckboxLabel>
                </CheckboxItem>
              ))}
            </CheckboxGroup>
          </FilterSection>
          
          {/* Rating Filter */}
          <FilterSection>
            <FilterTitle>Rating</FilterTitle>
            <StarRating>
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  $active={star <= selectedRating} 
                  onClick={() => setSelectedRating(star === selectedRating ? 0 : star)}
                >
                  <FaStar />
                </Star>
              ))}
            </StarRating>
          </FilterSection>
          
          {/* Availability Filter */}
          <FilterSection>
            <FilterTitle>Availability</FilterTitle>
            <CheckboxItem>
              <CheckboxInput 
                type="checkbox" 
                id="in-stock" 
                checked={inStockOnly} 
                onChange={() => setInStockOnly(!inStockOnly)} 
              />
              <CheckboxLabel htmlFor="in-stock">
                In Stock Only
              </CheckboxLabel>
            </CheckboxItem>
          </FilterSection>
          
          {/* Color Variants */}
          <FilterSection>
            <FilterTitle>Colors</FilterTitle>
            <ColorVariants>
              {['#ff0000', '#0000ff', '#00ff00', '#ffff00', '#000000', '#ffffff'].map(color => (
                <ColorVariant 
                  key={color} 
                  color={color} 
                  $selected={selectedColors.includes(color)} 
                  onClick={() => {
                    setSelectedColors(prev => 
                      prev.includes(color) 
                        ? prev.filter(c => c !== color) 
                        : [...prev, color]
                    );
                  }} 
                />
              ))}
            </ColorVariants>
          </FilterSection>
          
          {/* Size Variants */}
          <FilterSection>
            <FilterTitle>Sizes</FilterTitle>
            <SizeVariants>
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <SizeVariant 
                  key={size} 
                  $selected={selectedSizes.includes(size)} 
                  onClick={() => {
                    setSelectedSizes(prev => 
                      prev.includes(size) 
                        ? prev.filter(s => s !== size) 
                        : [...prev, size]
                    );
                  }} 
                >
                  {size}
                </SizeVariant>
              ))}
            </SizeVariants>
          </FilterSection>
          
          {/* Clear Filters */}
          <ClearFilters onClick={clearFilters}>
            Clear All Filters
          </ClearFilters>
        </MobileFilterWrapper>
      </FilterSidebar>
      
      {/* Products Container */}
      <ProductsContainer>
        <ProductsHeader>
          <ResultCount>
            {filteredProducts.length} products found
          </ResultCount>
          <SortDropdown 
            value={sortMethod} 
            onChange={(e) => setSortMethod(e.target.value)}
          >
            <option value="popularity">Sort by: Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </SortDropdown>
        </ProductsHeader>
        
        {isLoading ? (
          <div>Loading products...</div>
        ) : (
          <>
            <ProductsGrid>
              {filteredProducts.slice(0, visibleProducts).map(product => (
                <ProductCard key={product.id}>
                  <ProductImageContainer>
                    <ProductImage src={product.image} alt={product.title} />
                    <WishlistButton 
                      $inWishlist={wishlist.includes(product.id)} 
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <FaHeart />
                    </WishlistButton>
                    <BadgeContainer>
                      {product.badges.map(badge => (
                        <Badge key={badge} $type={badge}>
                          {badge === 'new' ? 'NEW' : badge === 'sale' ? 'SALE' : 'HOT'}
                        </Badge>
                      ))}
                      {!product.inStock && (
                        <Badge $type="outOfStock">OUT OF STOCK</Badge>
                      )}
                    </BadgeContainer>
                  </ProductImageContainer>
                  <ProductInfo>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductRating>
                      <StarRatingDisplay rating={product.rating} />
                      <ReviewCount>({product.reviewCount})</ReviewCount>
                    </ProductRating>
                    <PriceContainer>
                      <CurrentPrice>${product.currentPrice.toFixed(2)}</CurrentPrice>
                      {product.originalPrice && (
                        <>
                          <OriginalPrice>${product.originalPrice.toFixed(2)}</OriginalPrice>
                          <Discount>
                            {Math.floor((1 - product.currentPrice / product.originalPrice) * 100)}% OFF
                          </Discount>
                        </>
                      )}
                    </PriceContainer>
                    <VariantBadges>
                      {product.variants.colors.length > 0 && (
                        <VariantBadge>{product.variants.colors.length} colors</VariantBadge>
                      )}
                      {product.variants.sizes.length > 0 && (
                        <VariantBadge>{product.variants.sizes.join(', ')}</VariantBadge>
                      )}
                    </VariantBadges>
                    <AddToCartButton disabled={!product.inStock}>
                      <FaShoppingCart /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </AddToCartButton>
                  </ProductInfo>
                </ProductCard>
              ))}
            </ProductsGrid>
            
            {visibleProducts < filteredProducts.length && (
              <LoadMoreContainer>
                <LoadMoreButton onClick={loadMore}>
                  Load More Products
                </LoadMoreButton>
              </LoadMoreContainer>
            )}
          </>
        )}
      </ProductsContainer>
    </PageContainer>
  );
};

export default CategoryPage;