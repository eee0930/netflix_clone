import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
// use
import { getSearchResults, IGetContentSearchResults, IContentSearch } from "../api";
import { makeImagePath } from "../util";
// style
import { SliderContainer, SliderTitle, 
    Row, Box, Img, Info, Alert } from "./styled/ListSearchStyle";
import { Loader } from "./styled/DetailStyle";
// incl
import { CaretSvg } from "../Svg";
// component
import ModalForSearch from "./ModalForSearch";

interface ISearchResultList {
    title: string;
    content: string;
    keyword: string;
}

function ListSearchContent({ title, content, keyword }: ISearchResultList) {
    const {data, isLoading} = useQuery<IGetContentSearchResults>(
        [keyword, content], 
        () => getSearchResults(keyword, content)
    );

    /**
     * 사진으로만 이루어진 결과를 보여주기위해 backdrop_path나 poster_path가 없는 contents들을 제외함
     */
    const searchContents = data?.results.filter(
        (view) => view.backdrop_path !== null
        && view.poster_path !== null
    ) as IContentSearch[];
    const navigate = useNavigate();
    
    const onBoxClicked = (contentId: number) => {
        navigate(`/search/${content}/${contentId}?keyword=${keyword}`);
    };

    return (<>
        <SliderContainer>
            <SliderTitle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                    <CaretSvg />
                </svg>
                {title}
            </SliderTitle>
            {isLoading ? (
                <Loader>
                    <div>
                        <div></div><div></div>
                    </div>
                </Loader>
            ) : (
                <Row>
                    {searchContents.length > 0? searchContents.map((search) => 
                        <Box 
                            layoutId={search.id + ""}
                            key={search.id}
                            onClick={() => onBoxClicked(search.id)} >
                            <Img boxphoto={makeImagePath(search.backdrop_path? 
                                search.backdrop_path : search.poster_path, "w300")} />
                            <Info>
                                {search.title && <h4>{search.title}</h4>}
                                {search.name && <h4>{search.name}</h4>}
                            </Info>
                        </Box>
                    ) : (
                        <Alert>검색결과를 찾을 수 없습니다.</Alert>
                    )}
                </Row>
            )}
        </SliderContainer>
        {/* ---------------[(conponent) Content Detail Modal]--------------- */}
        <ModalForSearch content={content} keyword={keyword as string} />
    </>);
}

export default ListSearchContent;