import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { 
  FaStar, 
  FaRegStar, 
  FaStarHalfAlt, 
  FaHeart, 
  FaShoppingCart, 
  FaPlus, 
  FaMinus, 
  FaCheck, 
  FaChevronLeft, 
  FaChevronRight 
} from 'react-icons/fa';

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BreadcrumbNav = styled.nav`
  margin-bottom: 1.5rem;
`;

const Breadcrumb = styled.ol`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  
  &:after {
    content: '/';
    margin: 0 0.5rem;
    color: #ccc;
  }
  
  &:last-child {
    font-weight: 600;
    &:after {
      content: '';
      margin: 0;
    }
  }
`;

const BreadcrumbLink = styled.a`
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #ff5500;
  }
`;

const ProductSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const GalleryContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    width: 50%;
    margin-bottom: 0;
  }
`;

const MainImage = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  height: 400px;
  margin-bottom: 1rem;
  
  @media (min-width: 992px) {
    height: 500px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
`;

const GalleryNav = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

const NavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
  
  &:hover {
    background-color: white;
    color: #ff5500;
  }
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
  opacity: ${props => props.$active ? 1 : 0.6};
  border: ${props => props.$active ? '2px solid #ff5500' : '2px solid transparent'};
  transition: all 0.2s;
  flex-shrink: 0;
  
  &:hover {
    opacity: 1;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const ProductTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Stars = styled.div`
  display: flex;
  color: #ff9800;
  margin-right: 0.5rem;
`;

const ReviewCount = styled.span`
  color: #666;
`;

const LinkButton = styled.a`
  color: #ff5500;
  margin-left: 1rem;
  font-size: 0.875rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff5500;
`;

const OriginalPrice = styled.span`
  font-size: 1.1rem;
  color: #999;
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  background-color: #ff5500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const StockStatus = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.$inStock ? '#4caf50' : '#f44336'};
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
`;

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: 0;
  border-top: 1px solid #e0e0e0;
`;

const VariantSection = styled.div`
  margin-bottom: 1.5rem;
`;

const VariantLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SizeVariants = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SizeVariant = styled.div`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.$selected ? '#ff5500' : '#e0e0e0'};
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: ${props => props.$selected ? '#fff5f0' : 'white'};
  color: ${props => props.$selected ? '#ff5500' : '#333'};
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    border-color: #ff5500;
  }
  
  ${props => props.$outOfStock && `
    color: #999;
    cursor: not-allowed;
    border-color: #e0e0e0 !important;
    background-color: #f9f9f9;
    
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: #999;
      transform: rotate(-10deg);
    }
  `}
`;

const ColorVariants = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ColorVariant = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.$selected ? '#333' : 'transparent'};
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    transform: scale(1.1);
  }
  
  ${props => props.$selected && `
    &:after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${props.color === '#ffffff' || props.color === '#ffff00' ? 'black' : 'white'};
      font-size: 1rem;
    }
  `}
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const QuantityLabel = styled.div`
  font-weight: 600;
  margin-right: 1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 36px;
  border: none;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  text-align: center;
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
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
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const WishlistButton = styled.button`
  padding: 0.75rem;
  background-color: white;
  color: ${props => props.$inWishlist ? '#ff5500' : '#333'};
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: #ff5500;
    color: #ff5500;
  }
`;

const ProductMeta = styled.div`
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const MetaLabel = styled.span`
  font-weight: 600;
  width: 120px;
`;

const MetaValue = styled.span`
  color: #666;
`;

const TabsContainer = styled.div`
  margin-bottom: 3rem;
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  border: none;
  font-weight: ${props => props.$active ? '600' : '400'};
  color: ${props => props.$active ? '#ff5500' : '#333'};
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background-color: #ff5500;
    opacity: ${props => props.$active ? 1 : 0};
    transition: opacity 0.2s;
  }
  
  &:hover {
    color: #ff5500;
  }
`;

const TabContent = styled.div`
  display: ${props => props.$active ? 'block' : 'none'};
`;

const DescriptionText = styled.div`
  line-height: 1.6;
  color: #444;
`;

const SpecificationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const SpecRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

const SpecLabel = styled.td`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  font-weight: 600;
  width: 40%;
`;

const SpecValue = styled.td`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
`;

const ReviewContainer = styled.div``;

const ReviewItem = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ReviewerName = styled.div`
  font-weight: 600;
`;

const ReviewDate = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const ReviewRating = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
`;

const ReviewTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ReviewText = styled.div`
  margin-bottom: 1rem;
  color: #444;
`;

const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4caf50;
`;

const RelatedProductsSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const ProductSlider = styled.div`
  position: relative;
`;

const ProductSliderContent = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductSliderTrack = styled.div`
  display: flex;
  gap: 1.5rem;
  transition: transform 0.3s ease;
`;

const SliderNavigation = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  padding: 0 0.5rem;
`;

const SliderButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  
  &:hover {
    color: #ff5500;
    border-color: #ff5500;
  }
`;

const ProductCard = styled.div`
  width: 240px;
  flex-shrink: 0;
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

const ProductCardImage = styled.div`
  height: 200px;
  overflow: hidden;
`;

const ProductCardInfo = styled.div`
  padding: 1rem;
`;

const ProductCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3rem;
`;

const ProductCardPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff5500;
`;

// Component for rendering star ratings
const StarRating = ({ rating, size = 'sm' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const starSize = size === 'sm' ? "1rem" : "1.25rem";
  
  return (
    <Stars style={{ fontSize: starSize }}>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {hasHalfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </Stars>
  );
};

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Premium Outdoor Adventure Water Sports Life Jacket',
  images: [
    'https://picsum.photos/seed/product1/800/800',
    'https://picsum.photos/seed/product2/800/800',
    'https://picsum.photos/seed/product3/800/800',
    'https://picsum.photos/seed/product4/800/800',
    'https://picsum.photos/seed/product5/800/800'
  ],
  price: 79.99,
  originalPrice: 119.99,
  rating: 4.7,
  reviewCount: 124,
  inStock: true,
  sku: 'WS-LJ-001',
  category: 'Water Sports',
  subcategory: 'Life Jackets',
  variants: {
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: false },
      { name: 'XXL', available: true }
    ],
    colors: [
      { name: 'Red', code: '#ff0000', available: true },
      { name: 'Blue', code: '#0000ff', available: true },
      { name: 'Yellow', code: '#ffff00', available: true },
      { name: 'Black', code: '#000000', available: false }
    ]
  },
  description: 
    "<p>Our Premium Outdoor Adventure Life Jacket is designed for maximum safety and comfort during all your water adventures. Constructed with durable materials and featuring adjustable straps, this life jacket provides a secure fit for various activities.</p><p>Key features include:</p><ul><li>Coast Guard Approved Type III PFD</li><li>Durable nylon outer shell with PE foam interior</li><li>Multiple adjustment points for a custom fit</li><li>Lightweight design for all-day comfort</li><li>Bright color options for high visibility</li></ul><p>Whether you're kayaking, paddle boarding, or enjoying a day on the boat, this life jacket provides the safety and comfort you need for your water sport adventures.</p>",
  specifications: [
    { label: 'Material', value: 'Nylon outer shell, PE foam interior' },
    { label: 'Buoyancy', value: '15.5 lbs (7 kg)' },
    { label: 'Certification', value: 'US Coast Guard Approved Type III' },
    { label: 'Weight Capacity', value: '90-200 lbs (40-90 kg)' },
    { label: 'Closure', value: 'Front zipper with adjustable straps' },
    { label: 'Care Instructions', value: 'Hand wash with mild soap, air dry' },
    { label: 'Features', value: 'Adjustable straps, Whistle attachment' },
    { label: 'Warranty', value: '2 years limited warranty' }
  ],
  reviews: [
    {
      id: 1,
      name: 'Michael W.',
      date: '2025-01-15',
      rating: 5,
      title: 'Perfect fit and very comfortable',
      text: 'I used this life jacket during my recent kayaking trip and was very impressed with the comfort and fit. It stayed secure even in choppy waters.',
      verified: true
    },
    {
      id: 2,
      name: 'Sarah T.',
      date: '2024-12-28',
      rating: 4,
      title: 'Good quality but runs a bit small',
      text: "The quality of this life jacket is excellent, but I would recommend sizing up if you're between sizes. Otherwise, great purchase!",
      verified: true
    },
    {
      id: 3,
      name: 'David L.',
      date: '2024-11-12',
      rating: 5,
      title: 'Very durable and lightweight',
      text: "After using this for several paddle boarding sessions, I can say this life jacket is both durable and lightweight. It's comfortable enough that I forget I'm wearing it.",
      verified: false
    }
  ]
};

// Mock related products
const mockRelatedProducts = Array(8).fill().map((_, index) => ({
  id: index + 2,
  title: `Related Adventure Gear Item ${index + 1}`,
  image: `https://picsum.photos/seed/related${index}/500/500`,
  price: Math.floor(Math.random() * 10000) / 100 + 29.99
}));

// Main component
const ProductDetail = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [inWishlist, setInWishlist] = useState(false);
  
  const sliderRef = useRef(null);
  
  // Navigate image gallery
  const navigateGallery = (direction) => {
    if (direction === 'next') {
      setActiveImageIndex((prev) => 
        prev === mockProduct.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setActiveImageIndex((prev) => 
        prev === 0 ? mockProduct.images.length - 1 : prev - 1
      );
    }
  };
  
  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  // Handle increment/decrement quantity
  const adjustQuantity = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  // Scroll related products
  const scrollProducts = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'right' ? 500 : -500;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  
  // Calculate discount percentage
  const discountPercentage = mockProduct.originalPrice 
    ? Math.round((1 - mockProduct.price / mockProduct.originalPrice) * 100) 
    : 0;
  
  return (
    <PageContainer>
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/category/water-sports">Water Sports</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/category/water-sports/life-jackets">Life Jackets</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {mockProduct.title}
          </BreadcrumbItem>
        </Breadcrumb>
      </BreadcrumbNav>
      
      {/* Product Main Section */}
      <ProductSection>
        {/* Image Gallery */}
        <GalleryContainer>
          <MainImage>
            <Image 
              src={mockProduct.images[activeImageIndex]} 
              alt={mockProduct.title} 
            />
            <GalleryNav>
              <NavButton onClick={() => navigateGallery('prev')}>
                <FaChevronLeft />
              </NavButton>
              <NavButton onClick={() => navigateGallery('next')}>
                <FaChevronRight />
              </NavButton>
            </GalleryNav>
          </MainImage>
          <Thumbnails>
            {mockProduct.images.map((img, index) => (
              <Thumbnail 
                key={index} 
                $active={index === activeImageIndex} 
                onClick={() => setActiveImageIndex(index)}
              >
                <ThumbnailImage src={img} alt={`Thumbnail ${index + 1}`} />
              </Thumbnail>
            ))}
          </Thumbnails>
        </GalleryContainer>
        
        {/* Product Information */}
        <ProductInfo>
          <ProductTitle>{mockProduct.title}</ProductTitle>
          
          <ProductRating>
            <StarRating rating={mockProduct.rating} />
            <ReviewCount>{mockProduct.reviewCount} reviews</ReviewCount>
            <LinkButton href="#reviews" onClick={() => setActiveTab('reviews')}>
              Read Reviews
            </LinkButton>
          </ProductRating>
          
          <PriceContainer>
            <CurrentPrice>${mockProduct.price.toFixed(2)}</CurrentPrice>
            {mockProduct.originalPrice && (
              <>
                <OriginalPrice>${mockProduct.originalPrice.toFixed(2)}</OriginalPrice>
                <Discount>{discountPercentage}% OFF</Discount>
              </>
            )}
          </PriceContainer>
          
          <StockStatus $inStock={mockProduct.inStock}>
            {mockProduct.inStock ? 'In Stock' : 'Out of Stock'}
          </StockStatus>
          
          <Divider />
          
          {/* Size Variants */}
          <VariantSection>
            <VariantLabel>Size</VariantLabel>
            <SizeVariants>
              {mockProduct.variants.sizes.map(size => (
                <SizeVariant 
                  key={size.name} 
                  $selected={selectedSize === size.name}
                  $outOfStock={!size.available} 
                  onClick={() => {
                    if (size.available) {
                      setSelectedSize(selectedSize === size.name ? '' : size.name);
                    }
                  }}
                >
                  {size.name}
                </SizeVariant>
              ))}
            </SizeVariants>
          </VariantSection>
          
          {/* Color Variants */}
          <VariantSection>
            <VariantLabel>Color</VariantLabel>
            <ColorVariants>
              {mockProduct.variants.colors.map(color => (
                <ColorVariant 
                  key={color.name} 
                  color={color.code} 
                  $selected={selectedColor === color.code}
                  title={color.name}
                  onClick={() => {
                    if (color.available) {
                      setSelectedColor(selectedColor === color.code ? '' : color.code);
                    }
                  }}
                  style={{ cursor: color.available ? 'pointer' : 'not-allowed', opacity: color.available ? 1 : 0.5 }}
                />
              ))}
            </ColorVariants>
          </VariantSection>
          
          {/* Quantity Selector */}
          <QuantityContainer>
            <QuantityLabel>Quantity</QuantityLabel>
            <QuantityControl>
              <QuantityButton 
                onClick={() => adjustQuantity(-1)} 
                disabled={quantity <= 1}
              >
                <FaMinus />
              </QuantityButton>
              <QuantityInput 
                type="number" 
                value={quantity} 
                onChange={handleQuantityChange} 
                min="1" 
              />
              <QuantityButton onClick={() => adjustQuantity(1)}>
                <FaPlus />
              </QuantityButton>
            </QuantityControl>
          </QuantityContainer>
          
          {/* Action Buttons */}
          <ActionButtons>
            <AddToCartButton 
              disabled={!mockProduct.inStock || !selectedSize || !selectedColor}
            >
              <FaShoppingCart /> Add to Cart
            </AddToCartButton>
            <WishlistButton 
              $inWishlist={inWishlist}
              onClick={() => setInWishlist(!inWishlist)}
            >
              <FaHeart />
            </WishlistButton>
          </ActionButtons>
          
          {/* Product Meta */}
          <ProductMeta>
            <MetaItem>
              <MetaLabel>SKU:</MetaLabel>
              <MetaValue>{mockProduct.sku}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Category:</MetaLabel>
              <MetaValue>{mockProduct.category} / {mockProduct.subcategory}</MetaValue>
            </MetaItem>
          </ProductMeta>
        </ProductInfo>
      </ProductSection>
      
      {/* Product Tabs */}
      <TabsContainer>
        <TabsHeader>
          <TabButton 
            $active={activeTab === 'description'} 
            onClick={() => setActiveTab('description')}
          >
            Description
          </TabButton>
          <TabButton 
            $active={activeTab === 'specifications'} 
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </TabButton>
          <TabButton 
            $active={activeTab === 'reviews'} 
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({mockProduct.reviewCount})
          </TabButton>
        </TabsHeader>
        
        <TabContent $active={activeTab === 'description'}>
          <DescriptionText dangerouslySetInnerHTML={{ __html: mockProduct.description }} />
        </TabContent>
        
        <TabContent $active={activeTab === 'specifications'}>
          <SpecificationsTable>
            <tbody>
              {mockProduct.specifications.map((spec, index) => (
                <SpecRow key={index}>
                  <SpecLabel>{spec.label}</SpecLabel>
                  <SpecValue>{spec.value}</SpecValue>
                </SpecRow>
              ))}
            </tbody>
          </SpecificationsTable>
        </TabContent>
        
        <TabContent $active={activeTab === 'reviews'} id="reviews">
          <ReviewContainer>
            {mockProduct.reviews.map(review => (
              <ReviewItem key={review.id}>
                <ReviewHeader>
                  <ReviewerName>{review.name}</ReviewerName>
                  <ReviewDate>{review.date}</ReviewDate>
                </ReviewHeader>
                <ReviewRating>
                  <StarRating rating={review.rating} />
                </ReviewRating>
                <ReviewTitle>{review.title}</ReviewTitle>
                <ReviewText>{review.text}</ReviewText>
                {review.verified && (
                  <VerifiedBadge>
                    <FaCheck /> Verified Purchase
                  </VerifiedBadge>
                )}
              </ReviewItem>
            ))}
          </ReviewContainer>
        </TabContent>
      </TabsContainer>
      
      {/* Related Products */}
      <RelatedProductsSection>
        <SectionTitle>You May Also Like</SectionTitle>
        <ProductSlider>
          <ProductSliderContent ref={sliderRef}>
            <ProductSliderTrack>
              {mockRelatedProducts.map(product => (
                <ProductCard key={product.id}>
                  <ProductCardImage>
                    <Image src={product.image} alt={product.title} />
                  </ProductCardImage>
                  <ProductCardInfo>
                    <ProductCardTitle>{product.title}</ProductCardTitle>
                    <ProductCardPrice>${product.price.toFixed(2)}</ProductCardPrice>
                  </ProductCardInfo>
                </ProductCard>
              ))}
            </ProductSliderTrack>
          </ProductSliderContent>
          <SliderNavigation>
            <SliderButton onClick={() => scrollProducts('left')}>
              <FaChevronLeft />
            </SliderButton>
            <SliderButton onClick={() => scrollProducts('right')}>
              <FaChevronRight />
            </SliderButton>
          </SliderNavigation>
        </ProductSlider>
      </RelatedProductsSection>
    </PageContainer>
  );
};

export default ProductDetail;