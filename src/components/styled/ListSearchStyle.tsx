import { motion } from "framer-motion";
import styled from "styled-components";

export const SliderContainer = styled.div`
    margin-bottom: 50px;
    position: relative;
    @media only screen and (min-width: 768px) {
        margin-bottom: 80px;
    }
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
        padding: 0 ${props => props.theme.screenPadding.pc}px;
    }
    svg {
        fill: ${props => props.theme.red};
        width: 20px;
        height: 20px;
        margin-right: 5px;
        margin-bottom: -3px;
    }
`;
export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    width: 100vw;
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
export const PersonRow = styled(Row)`
    @media only screen and (min-width: 768px) {
        gap: 20px;
    }    

`;
export const Box = styled(motion.div)`
    background-color: transparent;
    cursor: pointer;
`;
const ImgDefault = styled.div<{boxphoto: string}>`
    width: 100%;
    background-image: url(${(props) => props.boxphoto});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
`;
export const Img = styled(ImgDefault)`
    height: ${props => props.theme.sliderHeight.mobile}px;
    @media only screen and (min-width: 768px) {
        height: ${props => props.theme.sliderHeight.tablet}px;
    }
    @media only screen and (min-width: 1200px) {
        height: ${props => props.theme.sliderHeight.pc}px;
    }
`;
export const PersonImg = styled(ImgDefault)`
    height: calc(${props => props.theme.sliderHeight.mobile}px * 4 / 3);
    @media only screen and (min-width: 768px) {
        height: calc(${props => props.theme.sliderHeight.tablet}px * 4 / 3);
    }
    @media only screen and (min-width: 1200px) {
        height: calc(${props => props.theme.sliderHeight.pc}px * 5 / 3);
    }
`;
export const Info = styled.div`
    padding: 10px;
    background-color: transparent;
    width: 100%;
    h4 {
        text-align: center; 
        font-size: 15px;
    }
`;
export const Alert = styled.div`
    font-size: 16px;
    color: ${props => props.theme.white.lighter};
`;
