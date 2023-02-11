import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
// use
import { getContentDetails, IKnownFor, IGetPersonDetail } from "../api";
import { makeImagePath } from "../util";
// style
import { Loader, PersonDetailContainer, PersonContainer, PersonImg, Detail, Name,
    PersonOverviewContainer, DetailTitle, Biography, 
    FilmoContainer, FilmoCover, FilmoImage, ContentTitle } from "../components/styled/DetailStyle";

interface IDetail {
    id: number;
    content: string;
    knownFor: IKnownFor[];
}

function DetailPerson() {
    const { id, content, knownFor } = useOutletContext<IDetail>();
    const {data, isLoading} = useQuery<IGetPersonDetail>(
        ["person", id], 
        () => getContentDetails(id, content)
    );
    
    return (<>
       {isLoading? (
            <Loader>
                <div>
                    <div></div><div></div>
                </div>
            </Loader>
        ) : (<>
            <Helmet>
                <title>{data?.name} | Netflix</title>
            </Helmet>
            <PersonDetailContainer>
                {/* -----------------[1. Image & person Info]--------------- */}
                <PersonContainer>
                    <PersonImg style={{
                        backgroundImage: `url(${makeImagePath(data?.profile_path as string, "w500")})`
                        }} />
                    <Detail>
                        <Name>
                            {data?.deathday && <span>故</span>}
                            {data?.name}
                            <span>({data?.known_for_department})</span>
                        </Name>
                        <div>
                            {data?.birthday}{data?.deathday && " ~ "+data?.deathday}
                        </div>
                    </Detail>
                </PersonContainer>
                {/* --------------------[2. Detail Info]-------------------- */}
                <PersonOverviewContainer>
                    {/* 2.1 Biography */}
                    {data?.biography && <>
                        <DetailTitle>biography</DetailTitle>
                        <Biography>{data?.biography}</Biography>
                    </>}
                    {/* 2.2 Signature Works */}
                    {knownFor.length > 0 && <>
                    <DetailTitle>signature works</DetailTitle>
                    <FilmoContainer>
                        {knownFor.map((content) => (
                            <FilmoCover key={content.id}>
                                {(content.poster_path || content.backdrop_path) ? (
                                    <FilmoImage style={{
                                        backgroundImage: `url(${makeImagePath(content.poster_path? 
                                        content.poster_path : content.backdrop_path as string, "w300")})`
                                        }} />
                                ) : (
                                    <FilmoImage> No Image </FilmoImage>
                                )}
                                <ContentTitle>
                                    {content.name? content.name : content.title}
                                    <span>({content.media_type})</span>
                                </ContentTitle>
                                <div>
                                    {content.first_air_date? content.first_air_date : content.release_date}
                                </div>
                            </FilmoCover>
                        ))}
                    </FilmoContainer></>}
                </PersonOverviewContainer>
            </PersonDetailContainer>
        </>)}
    </>);
}

export default DetailPerson;