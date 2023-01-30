import { motion } from "framer-motion";
import styled from "styled-components";

export const Loader = styled.div`
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    height: 100%;
    div {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
        margin: 30% auto;
        div {
            position: absolute;
            border: 4px solid #fff;
            opacity: 1;
            border-radius: 50%;
            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        div:nth-child(2) {
            animation-delay: -0.5s;
        }
    }
    @keyframes lds-ripple {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 0;
        }
        4.9% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 0;
        }
        5% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    }
`;

export const ContentCover = styled(motion.div)`
    width: 100%;
    aspect-ratio: 16 / 9;
`;
export const VideoCover = styled(motion.div)`
    width: 100%;
    height: 100%;
`;

export const BigCover = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
export const BigTitle = styled.h3`
    color: ${props => props.theme.white.lighter};
    font-size: 25px;
    padding: 20px;
    @media (min-width: 768px) {
        position: absolute;
    }
    @media only screen and (min-width: 768px) and (orientation: landscape) {
        top: calc(55vw * 9 / 16 - 80px);
    }
    @media (min-width: 768px) and (orientation: portrait) {
        top: calc(70vw * 9 / 16 - 80px);
    }
    @media only screen and (min-width: 1200px) {
        font-size: 30px;
        top: calc(50vw * 9 / 16 - 80px);
    }
    div {
        margin-top: 5px;
        font-size: 15px;
    }
`;
export const BigOverviewContainer = styled.div`
    padding: 20px;
    font-size: 16px;
    font-weight: 400;
    color: ${props => props.theme.white.lighter};
    // overflow-y: auto;
    // height: calc(100vh - ${props => props.theme.screenPadding.mobile}px - ${props => props.theme.screenPadding.mobile}px - 400px);
    @media only screen and (min-width: 768px) and (orientation: landscape) {
        font-size: 17px;
        // height: calc(100vh - ${props => props.theme.screenPadding.tablet}px - ${props => props.theme.screenPadding.tablet}px - (55vw * 9 / 16));
    }
    @media (min-width: 768px) and (orientation: portrait) {
        font-size: 17px;
        // height: calc(100vw - (70vw * 9 / 16));
    }
    @media only screen and (min-width: 1200px) {
        font-size: 16px;
        // height: calc(100vh - ${props => props.theme.screenPadding.pc}px - (40vw * 9 / 16));
    }
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        background-clip: padding-box;
    }
    &::-webkit-scrollbar-track {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
    }
`;
export const DetailContainer = styled.div`
    margin-bottom: 20px;
`;
export const DetailSpan = styled.span`
    margin-right: 20px;
    &:last-child {
        margin-right: 0;
    }
`;
export const Vote = styled(DetailSpan)`
    color: #ffd954;
    svg {
        fill: #ffd954;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        margin-bottom: -3px;
    }
`;
export const Adult = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 3px;
    border: none;
    padding: 2px;
    background-color: #e53810;
    cursor: default;
    svg {
        fill: ${props => props.theme.black.darker};
        width: 16px;
        height: 16px;
    }
`;
export const Genres = styled.div`
    margin-bottom: 20px;
`;
export const Genre = styled.button`
    cursor: default;
    padding: 2px 5px;
    background-color: #ab3e48;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    color: #fff;
    margin-right: 10px;
    &:last-child {
        margin-right: 0;
    }
`;
export const Overview = styled.div`
    line-height: 1.4;
    font-size: 16px;
    @media only screen and (min-width: 768px) {
        font-size: 15px;
    }
    @media only screen and (min-width: 1200px) {
        font-size: 16px;
    }
`;

export const ProductionCompanies = styled.div`
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.white.veryDark};
`;
export const Company = styled.div`
    width: 30px;
    heigth: 30px;
    aspect-ratio: 1 / 1;
    padding: 10px;
    margin-right: 10px;
    display: inline-block;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    top: 8px;
    &:last-child {
        margin-right: 0;
    }
    @media only screen and (min-width: 768px) {
        width: 40px;
        heigth: 40px;
    }
`;


export const PersonDetailContainer = styled.div`
    padding: 10px;
`;
export const PersonContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    @media only screen and (min-width: 1200px) {
        padding: 20px 20px 10px;
    }
`;
const PersonDetailHeight = styled.div`
    height: 400px;
    @media only screen and (min-width: 768px) and (orientation: landscape) {
        height: calc(55vw * 9 / 20);
    }
    @media (min-width: 768px) and (orientation: portrait) {
        height: calc(70vw * 9 / 20);
    }
    @media only screen and (min-width: 1200px) {
        height: calc(40vw * 9 / 20);
    }
`;
export const PersonImg = styled(PersonDetailHeight)`
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    @media (min-width: 768px) {
        width: 40%;
    }
`;
export const Detail = styled.div`
    width: 100%;
    padding: 20px 0;
    @media only screen and (min-width: 768px) {
        width: 60%;
        padding: 0;
        padding-left: 20px;
    }
    @media only screen and (min-width: 1200px) {
        padding-left: 30px;
        padding-top: 20px;
    }
`;
export const Name = styled.div`
    font-size: 25px;
    margin-bottom: 5px;
    @media only screen and (min-width: 1200px) {
        font-size: 26px;
    }
    span {
        font-size: 14px;
    }
    span:first-child {
        margin-right: 5px;
    }
    span:last-child {
        margin-left: 5px;
    }
`;
export const PersonOverviewContainer = styled.div`
    padding: 10px;
    @media only screen and (min-width: 1200px) {
        padding: 20px;
    }
`;
export const DetailTitle = styled.h3`
    font-size: 18px;
    color: ${props => props.theme.title};
    margin: 10px 0;
`;
export const Biography = styled.div`
    margin-bottom: 30px;
    min-height: 100px;
    overflow-y: auto;
    max-height: 250px;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        background-clip: padding-box;
    }
    &::-webkit-scrollbar-track {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
    }
`;
export const FilmoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    @media only screen and (min-width: 1200px) {
        gap: 15px;
    }
`;
export const FilmoCover = styled.div``;
export const FilmoImage = styled.div`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${props => props.theme.black.lighter};
    color: #fff;
    display: flex;
    aspect-ratio: 99 / 140;
    align-items: center;
    justify-content: center;
`;
export const ContentTitle = styled.h5`
    font-size: 17px;
    color: ${props => props.theme.white.darker};
    margin: 10px 0;
    span {
        margin-left: 5px;
        font-size: 14px;
    }
`;


export const ListContainer = styled.div`
    margin: 20px 0;
    @media only screen and (min-width: 1200px) {
        margin: 30px 0;
    }
`;
export const ListRow = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media only screen and (min-width: 1200px) {
        grid-template-columns: repeat(6, 1fr);
    }
`;
export const ListBox = styled.div`
    font-size: 12px;
    margin-bottom: 10px;
`;
export const ListName = styled.div`
    font-size: 14px;
    color: ${props=> props.theme.white.darker};
    margin: 5px 0;
`;

export const LastEpiTitle = styled(DetailTitle)`
    display: flex;
    justify-content: space-between;
`;
export const EpiInfo = styled.div`
    color: ${props => props.theme.white.lighter};
    font-size: 13px;
    padding: 5px 7px;
    border-radius: 3px;
    border: solid 1px ${props => props.theme.black.lighter};
    background-color: ${props => props.theme.black.lighter};
`;
export const LastEpiCover = styled.div`
    padding: 10px;
    border-radius: 5px;
    background-color: ${props => props.theme.black.lighter};
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    @media only screen and (min-width: 768px) {
        padding: 10px;
    }
    @media only screen and (min-width: 1200px) {
        padding: 20px;
    }
`;
export const PilotImage = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    background-postition: center;
    aspect-ratio: 16 / 9;
    width: 100%;
    @media only screen and (min-width: 768px) {
        width: 50%;
    }
    @media only screen and (min-width: 1200px) {
        width: 40%;
    }
`;
export const PilotDetail = styled.div`
    font-size: 15px;
    padding-top: 10px;    
    width: 100%;
    @media only screen and (min-width: 768px) {
        padding-top: 0;
        padding-left: 10px;
        width: 50%;
    }
    @media only screen and (min-width: 1200px) {
        padding-left: 20px;
        width: 60%;
    }
    &:first-child {
        padding-left: 0;
    }
`;
export const PilotTitle = styled.h5`
    font-size: 17px;
    margin-bottom: 10px;
    color: ${props => props.theme.white.darker};
`;