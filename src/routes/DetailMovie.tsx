import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Variants } from "framer-motion";
// use
import { getContentDetails, IGetMovieDetail } from "../api";
import { makeImagePath } from "../util";
// style
import { Loader, ContentCover, VideoCover, BigCover, BigTitle, BigOverviewContainer, 
    Overview, Genres, Genre, ProductionCompanies, Company, 
    DetailContainer, Vote, DetailSpan, Adult } from "../components/styled/DetailStyle";
// incl
import { StarSvg, UserSvg } from "../Svg";
// components
import ListCredits from "../components/incl/ListCredits";
import ListSimilarContents from "../components/incl/ListSimilarContents";
import Video from "../components/incl/Video";

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
        transition: {
            duration: 0.5,
        }
    },
    exit: {
        opacity: 0,
        display: "none",
        transition: {
            duration: 0.5,
        }
    },
}

function DetailMovie() {
    const { id, content } = useOutletContext<IDetail>();
    const { data, isLoading } = useQuery<IGetMovieDetail>(
        ["movie", id], 
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
                <title>{data?.title} | Netflix</title>
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
                        {data?.title}
                        {data?.original_title && (data?.original_title !== data?.title) && 
                            <div>{data?.original_title}</div>
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
                    <DetailSpan>{data?.release_date}</DetailSpan>
                    <DetailSpan>{data?.runtime}분</DetailSpan>
                    {data?.adult &&
                    <Adult>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <UserSvg />
                        </svg>
                    </Adult>}
                </DetailContainer>
                {/* 2.2 Genres */}
                <Genres>
                    {data?.genres?.map((genre) => (
                        <Genre key={genre.id}>{genre.name}</Genre>
                    ))}
                </Genres>
                {/* 2.3 Overview */}
                <Overview>{data?.overview}</Overview>
                {/* 2.4 [Component] Cast Members */}
                <ListCredits id={id} content={content} />
                {/* 2.5 [Component] Similar Tv Shows */}
                <ListSimilarContents id={id} content={content} />
            </BigOverviewContainer>
            {/* 2.6 Production Companies */}
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

export default DetailMovie;