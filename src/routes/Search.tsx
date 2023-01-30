import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useEffect } from "react";
// use
import { searchState } from "../atoms";
// components
import ListSearchContent from "../components/ListSearchContent";
import ListSearchPeople from "../components/ListSearchPeople";

const Wrapper = styled.div`
    background-color: #000;
    padding-top: 100px;
    overflow-x: hidden;
`;
const Title = styled.h2`
    font-size: 20px;
    margin-bottom: 50px;
    text-align: center;
    color: ${props => props.theme.white.lighter};
    padding: 0 ${props => props.theme.screenPadding.mobile}px;
    @media only screen and (min-width: 768px) {
        padding: 0 ${props => props.theme.screenPadding.tablet}px;
    }
    @media only screen and (min-width: 1200px) {
        padding: 0 ${props => props.theme.screenPadding.pc}px;
    }
    span {
        color: ${props => props.theme.red};
        font-size: 30px;
    }
`;

function Search() {
    const getSearchs = useRecoilValue(searchState);
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");

    useEffect(() => window.scrollTo(0, 0), [keyword]);

    return <Wrapper>
        <Helmet>
            <title>{keyword} | Netflix</title>
        </Helmet>
        <Title><span>"{keyword}"</span> Search Results</Title>
        {/* ------------------[(component) Search Results]------------------ */}
        {getSearchs.map((search, index) => (
            search.content === 'person'? (
                <ListSearchPeople 
                    title={search.title} 
                    content={search.content} 
                    keyword={keyword as string}
                    key={index} />
            ) : (
                <ListSearchContent 
                    title={search.title} 
                    content={search.content} 
                    keyword={keyword as string}
                    key={index} />
            )
        ))}
    </Wrapper>;
}

export default Search;