import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { trendingState } from "../atoms";
import SliderForTrending from "../components/SliderForTrending";
import SliderForTrendingPeople from "../components/SliderForTrendingPeople";

const Wrapper = styled.div`
    background-color: #000;
    overflow-x: hidden;
    min-height: 150vh;
`;

function Trending() {
    const getTrendings = useRecoilValue(trendingState);
    useEffect(() => window.scrollTo(0, 0), []);

    return <Wrapper>
        <Helmet>
            <title>Weekly Trending | Netflix</title>
        </Helmet>
        {/* ---------------------[(component) Sliders]---------------------- */}
        {getTrendings.map((trending, index) => (
            trending.content === 'person' ? (
                <SliderForTrendingPeople 
                    key={index} 
                    content={trending.content} 
                    title={trending.title} 
                />
            ) : (
                <SliderForTrending 
                    key={index} 
                    content={trending.content} 
                    title={trending.title} 
                    hasBanner={index === 0 ? true : false}
                />
            )
        ))}
    </Wrapper>;
}

export default Trending;