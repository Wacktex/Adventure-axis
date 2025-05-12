import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #222222;
  color: white;
  padding-top: 3rem;
  padding-bottom: 1.5rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #ff5500;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.25rem;
  transition: color 0.2s;
  
  &:hover {
    color: #ff5500;
  }
`;

const NewsletterTitle = styled.h5`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const NewsletterForm = styled.div`
  display: flex;
`;

const NewsletterInput = styled.input`
  background-color: #444;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem 0 0 0.25rem;
  flex-grow: 1;
  border: none;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ff5500;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const SubscribeButton = styled.button`
  background-color: #ff5500;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0 0.25rem 0.25rem 0;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 85, 0, 0.9);
  }
`;

const Copyright = styled.div`
  text-align: center;
  font-size: 0.875rem;
  border-top: 1px solid #444;
  padding-top: 1.5rem;
`;

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <FooterContainer>
      <Container>
        <FooterGrid>
          {/* About Us Column */}
          <FooterColumn>
            <FooterTitle>About Us</FooterTitle>
            <FooterLinks>
              <li><FooterLink href="#">Our Story</FooterLink></li>
              <li><FooterLink href="#">Careers</FooterLink></li>
              <li><FooterLink href="#">Press</FooterLink></li>
            </FooterLinks>
          </FooterColumn>
          
          {/* Customer Service Column */}
          <FooterColumn>
            <FooterTitle>Customer Service</FooterTitle>
            <FooterLinks>
              <li><FooterLink href="#">Contact</FooterLink></li>
              <li><FooterLink href="#">FAQ</FooterLink></li>
              <li><FooterLink href="#">Returns</FooterLink></li>
            </FooterLinks>
          </FooterColumn>
          
          {/* Legal Column */}
          <FooterColumn>
            <FooterTitle>Legal</FooterTitle>
            <FooterLinks>
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Terms & Conditions</FooterLink></li>
            </FooterLinks>
          </FooterColumn>
          
          {/* Connect Column */}
          <FooterColumn>
            <FooterTitle>Connect</FooterTitle>
            <SocialLinks>
              <SocialLink href="#"><FaFacebookF /></SocialLink>
              <SocialLink href="#"><FaTwitter /></SocialLink>
              <SocialLink href="#"><FaInstagram /></SocialLink>
            </SocialLinks>
            <NewsletterTitle>Newsletter</NewsletterTitle>
            <NewsletterForm>
              <NewsletterInput 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SubscribeButton onClick={handleSubscribe}>
                Subscribe
              </SubscribeButton>
            </NewsletterForm>
          </FooterColumn>
        </FooterGrid>
        
        {/* Copyright */}
        <Copyright>
          © 2025 Adventure Shop. All rights reserved.
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
