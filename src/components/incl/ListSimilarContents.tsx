import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
// use
import { getSimilarContents, IGetContentsResult } from "../../api";
import { offsetState } from "../../atoms";
import { makeImagePath } from "../../util";
// styled
import { ListContainer, ListRow, ListName, DetailTitle, FilmoImage, Loader } from "../styled/DetailStyle";


interface IListSimilar {
    id: number;
    content: string;
}

function ListSimilarContents({ id, content }: IListSimilar) {
    const {data, isLoading} = useQuery<IGetContentsResult>(
        ["similar", id], 
        () => getSimilarContents(id, content)
    );

    const offsetInfo = useRecoilValue(offsetState);
    const windowWidth = window.innerWidth;
    let OFFSET = offsetInfo.pc[1];
    if(windowWidth < offsetInfo.pc[0]) {
        OFFSET = offsetInfo.tablet[1];
        if(windowWidth < offsetInfo.tablet[0]) {
            OFFSET = offsetInfo.mobile[1];
        }
    }

    return <>
        {isLoading? (
            <Loader>
                <div>
                    <div></div><div></div>
                </div>
            </Loader>
        ) : (
            <ListContainer>
                {data?.results.length as number > 0 && (
                    <DetailTitle>
                        Similar {content.slice(0, 1).toUpperCase() + content.slice(1)}s
                    </DetailTitle>
                )}
                <ListRow>
                    {data?.results
                        .filter((similar) => similar.id !== id)
                        .slice(0, OFFSET)
                        .map((similar) => (
                        <div key={similar.id}>
                            {similar.poster_path || similar.backdrop_path ? (
                                <FilmoImage style={{
                                    backgroundImage: `url(${makeImagePath(similar.poster_path? 
                                    similar.poster_path : similar.backdrop_path, "w300")})`
                                }} /> ) : (
                                <FilmoImage> No Image </FilmoImage>
                            )}
                            <ListName>
                                {similar.name? similar.name : similar.title}
                            </ListName>
                        </div>
                    ))}
                </ListRow>
            </ListContainer>
        )}
    </>;
}

export default ListSimilarContents;
