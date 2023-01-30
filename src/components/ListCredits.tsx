import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
// use
import { getCredits, ICredits } from "../api";
import { offsetState } from "../atoms";
import { makeImagePath } from "../util";
// styled
import { ListContainer, ListRow, ListBox, ListName, 
    DetailTitle, FilmoImage, Loader } from "./styled/DetailStyle";

interface IListCredits {
    id: number;
    content: string;
}

function ListCredits({ id, content }:IListCredits) {
    const {data, isLoading} = useQuery<ICredits>(
        ["credits", id], 
        () => getCredits(id, content)
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
                {data?.cast.length as number > 0 && <DetailTitle>Cast Members</DetailTitle>}
                <ListRow>
                    {data?.cast
                        .slice(0, OFFSET * 2)
                        .map((actor) => (
                        <ListBox key={actor.id}>
                            {actor.profile_path ? (
                                <FilmoImage style={{
                                    backgroundImage: `url(${makeImagePath(actor.profile_path, "w300")})`
                                }} />):(
                                <FilmoImage> No Image </FilmoImage>
                            )}
                            <ListName>{actor.name}</ListName>
                            {actor.character && <div>({actor.character})</div>}
                        </ListBox>
                    ))}
                </ListRow>
            </ListContainer>
        )}
    </>;
}

export default ListCredits;