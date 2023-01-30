import { motion } from "framer-motion";
import styled from "styled-components";

export const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    opacity: 0;
    z-index: 80;
`;
export const BigMovie = styled(motion.div)<{topheight: number}>`
    background-color: ${props => props.theme.black.darker};
    z-index: 100;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    min-height: 80vh;
    top: ${props => props.topheight}px;
    width: 100vw;
    @media only screen and (min-width: 768px) {
        border-radius: 10px;
        overflow: hidden;
    }
    @media only screen and (min-width: 768px) and (orientation: landscape) {
        width: 55vw;
        top: calc(${props => props.topheight}px + ${props => props.theme.screenPadding.tablet}px);
    }
    @media only screen and (min-width: 768px) and (orientation: portrait) {
        width: 70vw;
        top: calc(${props => props.topheight}px + ${props => props.theme.screenPadding.tablet}px);
    }
    @media only screen and (min-width: 1200px) {
        width: 50vw;
        top: calc(${props => props.topheight}px + (${props => props.theme.screenPadding.pc}px / 2));
        
    }
`;
export const CloseButton = styled.button`
    width: 45px;
    height: 45px;
    padding: 5px;
    border: none;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    position: absolute;
    top: 10px;
    right: 10px;
    @media only screen and (min-width: 768px) {
        width: 30px;
        height: 30px;
    }
    @media only screen and (min-width: 1200px) {
        width: 35px;
        height: 35px;
    }
`;
export const Svg = styled.svg`
    width: 30px;
    height: 30px;
    fill: #fff;
    @media only screen and (min-width: 768px) {
        width: 20px;
        height: 20px;
    }
    @media only screen and (min-width: 1200px) {
        width: 25px;
        height: 25px;
    }
`;