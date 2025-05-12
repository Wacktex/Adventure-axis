import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: 4rem 1rem;
  background-color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const CardImageContainer = styled.div`
  height: 16rem;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
`;

const FeaturesGrid = () => {
  const features = [
    {
      title: 'Life Jackets',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    },
    {
      title: 'Rucksacks',
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    },
    {
      title: 'Tents',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    },
    {
      title: 'Sleeping Bags',
      image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    },
    {
      title: 'Helmets',
      image: 'https://pixabay.com/get/gd530ed3a6272e3957640ba17cb0f522ec1e3525264abfc06f1d7d4493411fc0804878837de480fb045c3cf2eb5d614892bd2fe2bb6567e66bcc4b78ca6e0e205_1280.jpg'
    },
    {
      title: 'Climbing Shoes',
      image: 'https://pixabay.com/get/gc404f8667d66d9be8e605b095395e4f6d703a7a66393fbb950f8ee5133a09672af8345025f6a77a1ce93aa3603523a7b4729d677eb48cd935419f9a0b62a2a43_1280.jpg'
    }
  ];

  return (
    <FeaturesSection>
      <Container>
        <Grid>
          {features.map((feature, index) => (
            <Card key={index}>
              <CardImageContainer>
                <CardImage src={feature.image} alt={feature.title} />
              </CardImageContainer>
              <CardContent>
                <CardTitle>{feature.title}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </FeaturesSection>
  );
};

export default FeaturesGrid;
