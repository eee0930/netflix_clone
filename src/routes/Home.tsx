import { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
// use
import { moviesState } from "../atoms";
// component
import SliderForContents from "../components/SliderForContents";

const Wrapper = styled.div`
    background-color: #000;
    overflow-x: hidden;
    min-height: 150vh;
`;

function Home() {
    const CONTENT = "movie";
    const getMovies = useRecoilValue(moviesState);
    useEffect(() => window.scrollTo(0, 0), []);
   
    return <Wrapper>
        <Helmet>
            <title>{CONTENT.slice(0, 1).toUpperCase() + CONTENT.slice(1)} | Netflix</title>
        </Helmet>
        {/* ---------------------[(component) Sliders]---------------------- */}
        {getMovies.map((movie, index) => (
            <SliderForContents 
                key={movie.keyName} 
                keyName={movie.keyName} 
                content={CONTENT} 
                title={movie.title} 
                hasBanner={index === 0 ? true : false}
            />
        ))}
    </Wrapper>;
}

export default Home;


