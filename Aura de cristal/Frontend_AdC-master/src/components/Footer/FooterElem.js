import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const FooterContainer = styled.footer`
    background-color: #655e5e;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0px -1px;
    margin: 0px;
    @media (min-width: 600px) and (max-width: 1024px) {
    font-size: 12px;
    }
`;

export const Title = styled.footer`
    font-size: 18px;
    font-weight: bold;
`;

export const FooterWrap = styled.div`
    padding: 0px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
`;

export const FooterLinksContainer = styled.div`
    display: flex;
    justify-content: center;

    @media screen and (max-width: 820px) {
        padding-top: 25px;
    }
`;

export const FooterLinksWrapper = styled.div`
    display: flex;

    @media screen and (max-width: 820px) {
        flex-direction: column;
    }
`;

export const FooterLinkItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 16px;
    text-align: center;
    width: 160px;
    box-sizing: border-box;
    color: #fff;

    @media screen and (max-width: 420px) {
        margin: 0;
        padding: 5px;
        width: 100%;
    }
`;

 export const FooterLogoItems = styled.div`
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     margin: 16px;
     text-align: left;
     width: 160px;
     box-sizing: border-box;
     color: #fff;

     @media screen and (max-width: 420px) {
         margin: 0;
         padding: 9px;
         width: 100%;
     }
 `;

export const FooterLinkTitle = styled.h1`
    font-size: 14px;
    margin-bottom: 16px;
`;

export const FooterLink = styled(Link)`
    color: #eee7d7;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;

    &:hover {
        color: #eee7d7;
        transition: 0.3s ease-out
    }
`;