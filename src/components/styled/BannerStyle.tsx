import { motion } from "framer-motion";
import styled from "styled-components";

export const BigBanner = styled.div<{bgPhoto: string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${props => props.theme.screenPadding.mobile}px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), 
                    url(${(props) => props.bgPhoto});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    @media only screen and (min-width: 768px) {
        padding: ${props => props.theme.screenPadding.tablet}px;
    }
    @media only screen and (min-width: 1200px) {
        padding: ${props => props.theme.screenPadding.pc}px;
    }
`;
export const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 25px;
    font-weight: 800;
    @media only screen and (min-width: 768px) {
        font-size: 40px;
    }
    @media only screen and (min-width: 1200px) {
        font-size: 60px;
    }
`;
export const Overview = styled.p`
    font-size: 14px;
    @media only screen and (min-width: 768px) {
        font-size: 20px;
        width: 50%;
    }
    @media only screen and (min-width: 1200px) {
        font-size: 25px;
    }
`;
export const MoreInfoBtn = styled(motion.button)`
    color: #fff;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 8px 10px;
    border: none;
    border-radius: 5px;
    width: 120px;
    margin-top: 15px;
    font-size: 15px;
    svg {
        fill: #fff;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        margin-bottom: -2px;
    }
    @media only screen and (min-width: 1200px) {
        transition: background-color 0.3s ease-in-out;
        &:hover {
            background-color: rgba(255, 255, 255, 0.5);
        }
    }
`;