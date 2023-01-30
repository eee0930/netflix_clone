import { useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
// use
import { getSearchResults, IGetContentSearchResults, IContentSearch } from "../api";
import { makeImagePath } from "../util";
// style
import { SliderContainer, SliderTitle, 
    PersonRow, Box, PersonImg, Info, Alert } from "./styled/ListSearchStyle";
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

function ListSearchPeople({ title, content, keyword }: ISearchResultList) {
    const {data, isLoading} = useQuery<IGetContentSearchResults>(
        [keyword, content], 
        () => getSearchResults(keyword, content)
    );

    /**
     * 사진으로만 이루어진 결과를 보여주기위해 backdrop_path나 poster_path가 없는 contents들을 제외함
     */
    const searchContents = data?.results.filter(
        (view) => view.profile_path !== null
    ) as IContentSearch[];

    const navigate = useNavigate();
    const onBoxClicked = (contentId: number) => {
        navigate(`/search/${content}/${contentId}?keyword=${keyword}`);
    };

    /**
     * 검색 결과에서 인물의 상세정보를 모두 가져올 수 있으니 data에서 선택한 인물의 정보를 찾아냄
     */
    const bigPersonMatch = useMatch(`/search/${content}/:id`);
    const clickedData = bigPersonMatch?.params.id &&
    data?.results.find((person) => 
        String(person.id) === bigPersonMatch?.params.id
    );

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
                <PersonRow>
                    {searchContents.length > 0? searchContents.map((search) => 
                        <Box 
                            layoutId={search.id + ""}
                            key={search.id}
                            onClick={() => onBoxClicked(search.id)} >
                            <PersonImg boxphoto={makeImagePath(search.profile_path as string, "w300")} />
                            <Info>
                                <h4>{search.name} ({search.known_for_department})</h4>
                            </Info>
                        </Box>
                    ): <Alert>검색결과를 찾을 수 없습니다.</Alert>}
                </PersonRow>
            )}
        </SliderContainer>
        {/* ---------------[(conponent) Content Detail Modal]--------------- */}
        <ModalForSearch 
            content={content} 
            keyword={keyword} 
            clickedData={clickedData as IContentSearch} />
    </>);
}

export default ListSearchPeople;