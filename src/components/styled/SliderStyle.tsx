import { motion } from "framer-motion";
import styled from "styled-components";

export const SliderContainer = styled.div`
    height: ${props => props.theme.sliderHeight.mobile}px;
    margin-bottom: 100px;
    @media only screen and (min-width: 768px) {
        margin-bottom: 120px;
        height: ${props => props.theme.sliderHeight.tablet}px;
    }
    @media only screen and (min-width: 1200px) {
        height: ${props => props.theme.sliderHeight.pc}px;
    }
`;
export const SliderBox = styled.div`
    position: relative;
    top: -100px;
`;
export const SliderTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 15px;
    color: ${props => props.theme.white.lighter};
    padding: 0 ${props => props.theme.screenPadding.mobile}px;
    @media only screen and (min-width: 768px) {
        padding: 0 ${props => props.theme.screenPadding.tablet}px;
    }
    @media only screen and (min-width: 1200px) {
        font-size: 23px;
        padding: 0 ${props => props.theme.screenPadding.pc}px;
    }
`;
export const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    position: absolute;
    width: 100%;
    padding: 0 ${props => props.theme.screenPadding.mobile}px;
    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
        padding: 0 ${props => props.theme.screenPadding.tablet}px;
    }
    @media only screen and (min-width: 1200px) {
        grid-template-columns: repeat(6, 1fr);
        padding: 0 ${props => props.theme.screenPadding.pc}px;
    }
`;
export const Box = styled(motion.div)`
    background-color: transparent;
    cursor: pointer;
    &:first-child {
        transform-origin: left center;
    }
    &:last-child {
        transform-origin: right center;
    }
    height: ${props => props.theme.sliderHeight.mobile}px;
    @media only screen and (min-width: 768px) {
        height: ${props => props.theme.sliderHeight.tablet}px;
    }
    @media only screen and (min-width: 1200px) {
        height: ${props => props.theme.sliderHeight.pc}px;
    }
`;
export const Img = styled.div<{boxphoto: string}>`
    width: 100%;
    background-image: url(${(props) => props.boxphoto});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    height: ${props => props.theme.sliderHeight.mobile}px;
    @media only screen and (min-width: 768px) {
        height: ${props => props.theme.sliderHeight.tablet}px;
    }
    @media only screen and (min-width: 1200px) {
        height: ${props => props.theme.sliderHeight.pc}px;
    }
`;
export const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    width: 100%;
    position: absolute;
    bottom: -10px;
    h4 {
        text-align: center; 
        font-size: 18px;
    }
`;
export const SliderControl = styled.div`
    position: relative;
    width: 100%;
`;
const SliderBtn = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    top: 0; 
    height: ${props => props.theme.sliderHeight.mobile}px;
    width: calc(${props => props.theme.screenPadding.mobile} * 2)px;
    @media only screen and (min-width: 768px) {
        height: ${props => props.theme.sliderHeight.tablet}px;
        width: ${props => props.theme.screenPadding.tablet}px;
    }
    @media only screen and (min-width: 1200px) {
        height: ${props => props.theme.sliderHeight.pc}px;
        width: ${props => props.theme.screenPadding.pc}px;
    }
`;
export const PrevBtn = styled(SliderBtn)`
    left: 0;
`;
export const NextBtn = styled(SliderBtn)`
    right: 0;
`;
export const AngleSvg = styled.svg`
    fill: ${(props) => props.theme.red};
    width: 20px;
`;