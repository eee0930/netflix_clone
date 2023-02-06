import { useQuery } from "react-query";
import styled from "styled-components";
// use
import { getContentVideos, IGetVideos, IVideos } from "../../api";
// style
import { Loader } from "../styled/DetailStyle";

const Iframe = styled.iframe`
    width: 100%;
    aspect-ratio: 16 / 9;
`;
const Message = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface IVideo {
    id: number;
    content: string;
}

function Video({ id, content }: IVideo) {
    const {data, isLoading} = useQuery<IGetVideos>(
        ["video", id],
        () => getContentVideos(id, content)
    ); 

    /**
     * Teaser or Trailer 영상만 보여주기 위해
     */
    const videoContent = data?.results
        .filter(
            (video) => (video.type === "Teaser" || video.type === "Trailer") 
            && video.official === true
        ) as IVideos[];

    return (<>
        {isLoading ? (
            <Loader>
                <div>
                    <div></div><div></div>
                </div>
            </Loader>
        ) : (<>
            {videoContent.length > 0 ? (
                videoContent.slice(0, 1)
                .map((video) => (
                    <div key={video.id}>
                        {video.key && (
                            <Iframe
                                title="youtube video player"
                                width="100%"
                                src={`https://www.youtube-nocookie.com/embed/${video.key}?autoplay=1&mute=1`}
                                frameBorder="0"
                                allowFullScreen
                                allow='autoplay; encrypted-media' />
                        )}
                    </div>
                ))
            ) : (
                <Message>There is no video :(</Message>
            )}
        </>)}
    </>);
}

export default Video;