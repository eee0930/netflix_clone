import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
// use
import { tvState } from "../atoms";
// component
import SliderForContents from "../components/SliderForContents";

const Wrapper = styled.div`
    background-color: #000;
    overflow-x: hidden;
    min-height: 150vh;
`;

function Tv() {
    const CONTENT = "tv";
    const getTvs = useRecoilValue(tvState);
    useEffect(() => window.scrollTo(0, 0), []);
    
    return <Wrapper>
        <Helmet>
            <title>{CONTENT.slice(0, 1).toUpperCase() + CONTENT.slice(1)} | Netflix</title>
        </Helmet>
        {/* ---------------------[(component) Sliders]---------------------- */}
        {getTvs.map((tv, index) => (
            <SliderForContents 
                key={tv.keyName} 
                keyName={tv.keyName} 
                content={CONTENT} 
                title={tv.title} 
                hasBanner={index === 0 ? true : false}
            />
        ))}
    </Wrapper>;
}

export default Tv;