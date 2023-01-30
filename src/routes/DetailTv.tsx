import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Variants } from "framer-motion";
// use
import { getContentDetails, IGetTvDetail } from "../api";
import { makeImagePath } from "../util";
// style
import { Loader, BigCover, BigTitle, BigOverviewContainer, 
    DetailContainer, Vote, DetailSpan, Adult, 
    Overview, Genres, Genre, ContentCover, VideoCover, ProductionCompanies, Company,
    ListContainer, ListRow, ListName, DetailTitle, FilmoImage,
    LastEpiTitle, EpiInfo, LastEpiCover, PilotImage, PilotDetail, PilotTitle } from "../components/styled/DetailStyle";
// incl
import { StarSvg, UserSvg } from "../Svg";
// components
import ListSimilarContents from "../components/ListSimilarContents";
import ListCredits from "../components/ListCredits";
import Video from "../components/Video";

interface IDetail {
    id: number;
    content: string;
}

const BigCoverVariant:Variants = {
    initial: {
        opacity: 1,
        display: "block",
    },
    animate: {
        opacity: 0,
        display: "none",
    },
    exit: {
        opacity: 0,
        display: "none",
        transition: {
            duration: 0.5,
        }
    },
}

function DetailTv() {
    const { id, content } = useOutletContext<IDetail>();
    const { data, isLoading } = useQuery<IGetTvDetail>(
        ["tv", id], 
        () => getContentDetails(id, content)
    );

    const [showVideo, setShowVideo] = useState(false);
    
    return (<>
        {isLoading? (
            <Loader>
                <div>
                    <div></div><div></div>
                </div>
            </Loader>
        ) : <>
            <Helmet>
                <title>{data?.name} | Netflix</title>
            </Helmet>
            {/* ---------------------[1. Video & Poster]-------------------- */}
            <ContentCover 
                variants={BigCoverVariant}
                onMouseEnter={() => setShowVideo(true)}
                onMouseLeave={() => setShowVideo(false)}>
                {showVideo ? (
                    // 1.1 Video
                    <VideoCover
                        initial="initial"
                        whileHover="animate"
                        exit="exit"
                        transition={{duration: 0.5}}>
                        <Video id={id} content={content} />
                    </VideoCover>
                ) : (<>
                    {/* 1.2 Poster Image & Title */}
                    <BigCover 
                        initial="initial"
                        whileHover="animate"
                        exit="exit"
                        transition={{duration: 0.5}}
                        style={{backgroundImage: `linear-gradient(to top, #181818, transparent, transparent), 
                            url(${makeImagePath(data?.backdrop_path as string, "w500")})`}} />
                    <BigTitle>
                        {data?.name}
                        {data?.original_name && (data?.original_name !== data?.name) && 
                            <div>{data?.original_name}</div>
                        }
                    </BigTitle>
                </>)}
            </ContentCover>
            {/* ----------------------[2. Detail Info]---------------------- */}
            <BigOverviewContainer>
                {/* 2.1 Airing Info */}
                <DetailContainer>
                    <Vote>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <StarSvg />
                        </svg>
                        {data?.vote_average?.toFixed(2)}
                    </Vote>
                    <DetailSpan>
                        {data?.first_air_date} ~ {data?.last_air_date}
                    </DetailSpan>
                    <DetailSpan>
                        {data?.number_of_seasons} Season{data?.number_of_seasons as number > 1 ? "s":""}
                        &nbsp;({data?.number_of_episodes} Episodes)
                    </DetailSpan>
                    {data?.adult && (                    
                        <Adult>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <UserSvg />
                            </svg>
                        </Adult>
                    )}
                </DetailContainer>
                {/* 2.2 Genres */}
                <Genres>
                    {data?.genres?.map((genre) => (
                        <Genre key={genre.id}>{genre.name}</Genre>
                    ))}
                </Genres>
                {/* 2.3 Overview */}
                <Overview>{data?.overview}</Overview>
                {/* 2.4 Last Episode To Air */}
                {data?.last_episode_to_air !== null && (
                    <ListContainer>
                        {/* Title & Season Info */}
                        <LastEpiTitle>
                            <div>Last Episode</div>
                            <EpiInfo>
                                Season {data?.last_episode_to_air.season_number}
                                &nbsp;Episode {data?.last_episode_to_air.episode_number}
                            </EpiInfo>
                        </LastEpiTitle>
                        <LastEpiCover>
                            {/* Epi Still Cut */}
                            {data?.last_episode_to_air.still_path !== null &&
                            <PilotImage style={{
                                backgroundImage: 
                                `url(${makeImagePath(data?.last_episode_to_air.still_path as string, "w300")})`
                            }} />}
                            {/* Last Epi Info */}
                            <PilotDetail>
                                <PilotTitle>
                                    {data?.last_episode_to_air.name}
                                </PilotTitle>
                                <DetailContainer>
                                    <Vote>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <StarSvg />
                                        </svg>
                                        {data?.last_episode_to_air.vote_average.toFixed(2)}
                                    </Vote>
                                    <DetailSpan>
                                        {data?.last_episode_to_air.air_date}
                                    </DetailSpan>
                                    {data?.last_episode_to_air.runtime &&
                                        <DetailSpan>
                                            {data?.last_episode_to_air.runtime}분
                                        </DetailSpan>
                                    }
                                </DetailContainer>
                                <div>
                                    {data?.last_episode_to_air.overview}
                                </div>
                            </PilotDetail>
                        </LastEpiCover>
                    </ListContainer>
                )}
                {/* 2.5 [Component] Cast Members */}
                <ListCredits id={id} content={content} />
                {/* 2.6 Created By */}
                {data?.created_by?.length as number > 0 && (
                    <ListContainer>
                        <DetailTitle>Created By</DetailTitle>
                        <ListRow>
                            {data?.created_by.map((create) => (
                                <div key={create.id}>
                                    {create.profile_path ? (
                                        <FilmoImage style={{
                                            backgroundImage: `url(${makeImagePath(create.profile_path, "w300")})`
                                        }} />):(
                                        <FilmoImage> No Image </FilmoImage>
                                    )}
                                    <ListName>{create.name}</ListName>
                                </div>
                            ))}
                        </ListRow>
                    </ListContainer>
                )}
                {/* 2.7 [Component] Similar Tv Shows */}
                <ListSimilarContents id={id} content={content} />
            </BigOverviewContainer>
            {/* 2.8 Production Companies */}
            {data?.production_companies?.length as number > 0 && (
                <ProductionCompanies>
                    {data?.production_companies?.map((company) => (
                        <Company 
                            style={{backgroundImage: `url(${company.logo_path !== null && 
                                makeImagePath(company.logo_path as string, "w300")})`}} 
                            title={company.name}
                            key={company.id}>
                            {company.logo_path === null && "N"}
                        </Company>
                    ))}
                </ProductionCompanies>
            )}
        </>}
    </>);
}

export default DetailTv;