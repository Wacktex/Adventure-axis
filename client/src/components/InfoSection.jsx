import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 3rem 1rem;
  background-color: #f5f5f5;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  text-align: center;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const InfoItem = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
`;

const Subtitle = styled.p`
  color: #555555;
`;

const InfoSection = () => {
  const infoItems = [
    {
      title: 'Complete Outdoor Shop',
      subtitle: 'Top Global Brands'
    },
    {
      title: '25+ Years of Innovation',
      subtitle: 'Trusted by Adventurers'
    },
    {
      title: 'Building a Community',
      subtitle: 'Join Our Adventure'
    }
  ];

  return (
    <Section>
      <Container>
        <Grid>
          {infoItems.map((item, index) => (
            <InfoItem key={index}>
              <Title>{item.title}</Title>
              <Subtitle>{item.subtitle}</Subtitle>
            </InfoItem>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default InfoSection;
