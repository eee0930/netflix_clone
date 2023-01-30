import { motion } from "framer-motion";
import styled from "styled-components";

export const Nav = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    font-size: 14px;
    padding: 20px ${props => props.theme.screenPadding.mobile}px;
    color: #fff;
    z-index: 70;
    @media only screen and (min-width: 768px) {
        padding: 20px ${props => props.theme.screenPadding.tablet}px;
    }
    @media only screen and (min-width: 1200px) {
        padding: 20px ${props => props.theme.screenPadding.pc}px;
    }
`;
export const Col = styled.div`
    display: flex;
    align-items: center;
`;
export const Logo = styled(motion.svg)`
    margin-right: 50px;
    width: 95px;
    height: 25px;
    fill ${(props) => props.theme.red};
    path {
        stroke-width: 6px;
        stroke: #fff;
    }
`;
export const Items = styled.ul`
    display: flex;
    align-items: center;
`;
export const Item = styled.li`
    margin-right: 20px;
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-transform: uppercase;
    font-weight: 600;
    &:hover {
        color: ${(props) => props.theme.white.lighter};
    }
`;
export const Search = styled.form`
    color: #fff;
    display: flex;
    align-items: center;
    position: relative;
    svg {
        height: 25px;
    }
`;
export const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    bottom: -7px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${(props) => props.theme.red};
`;
export const Input = styled(motion.input)`
    transform-origin: right center;
    width: 250px;
    position: absolute;
    right: 0px;
    padding: 5px 10px;
    padding-left: 30px;
    z-index: -1;
    color: #fff;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.white.lighter};
    &::placeholder {
        color: #fff;
    }
`;