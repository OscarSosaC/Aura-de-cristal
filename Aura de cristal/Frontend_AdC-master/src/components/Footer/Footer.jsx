import React from 'react';
import { FooterContainer, FooterLinksContainer, FooterWrap, FooterLogoItems, FooterLinksWrapper, FooterLinkItems } from './FooterElem';
import { Typography } from '@mui/material';
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import logo from '../../../public/images/Logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <React.Fragment>
      <div className='container'>
        <FooterContainer>
          <FooterLogoItems>
            <Link to="/">
              <img src={logo} width={90} height={80} alt="Logo-icon" />
            </Link>
          </FooterLogoItems>
          <FooterWrap>
            <FooterLinksContainer>
              <FooterLinksWrapper>
                <FooterLinkItems>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                    <FaFacebook size={30} />
                  </a>
                </FooterLinkItems>
              </FooterLinksWrapper>
              <FooterLinksWrapper>
                <FooterLinkItems>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                    <RiInstagramFill size={30} />
                  </a>
                </FooterLinkItems>
              </FooterLinksWrapper>
              <FooterLinksWrapper>
                <FooterLinkItems>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                    <FaSquareXTwitter size={30} />
                  </a>
                </FooterLinkItems>
              </FooterLinksWrapper>
              <FooterLinksWrapper>
                <FooterLinkItems>
                  <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                    <FaSquareWhatsapp size={30} />
                  </a>
                </FooterLinkItems>
              </FooterLinksWrapper>
            </FooterLinksContainer>
            <Typography sx={{ fontSize: "0.9rem", paddingLeft: "1%", color: 'white', paddingBottom: '1%', paddingTop: '1%' }}>
              © 2024 Aurora de Cristal. Todos los derechos reservados.
            </Typography>
          </FooterWrap>
        </FooterContainer>
      </div>
    </React.Fragment>
  )
}

export default Footer