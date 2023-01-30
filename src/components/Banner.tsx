import { useNavigate } from "react-router-dom";
// use
import { IGetContentsResult, IContent } from "../api";
import { makeImagePath } from "../util";
// style
import { BigBanner, Title, Overview, MoreInfoBtn } from "./styled/BannerStyle";
// incl
import { CircleInfoSvg } from "../Svg";

interface IBanner {
    data: IGetContentsResult;
    keyName: string;
    content: string;
}

function Banner({ data, keyName, content }:IBanner) {
    const navigate = useNavigate();

    /**
     * 배너에는 이미지와 설명을 항상 보여줘야하므로 두 가지가 null아닌 가장 앞의 컨텐츠를 배너로 선택한다.
     * @returns backdrop_path, overview가 있는 content
     */
    const getBannerContent = () => {
        for(let i = 0; i < data?.results.length; i++) {
            const fintContent = data?.results[i];
            if(fintContent.backdrop_path !== null && fintContent.overview.length > 0) {
                return fintContent;
            }
        }
    };
    const bannerContent = getBannerContent() as IContent;

    const onBoxClicked = (contentId: number) => {
        navigate(`/${content}/${keyName}/${contentId}`);
    };

    return (
        <BigBanner bgPhoto={makeImagePath(bannerContent.backdrop_path || "")} >
            {/* Title or Name */}
            <Title>{bannerContent.name? bannerContent.name : bannerContent.title}</Title>
            {/* Overview */}
            <Overview>
                {bannerContent.overview.length > 139 ? 
                    (`${bannerContent.overview.slice(0, 139)}...`):
                    bannerContent.overview
                }
            </Overview>
            <MoreInfoBtn 
                onClick={() => onBoxClicked(bannerContent.id)}
                layoutId={bannerContent.id + "_" + keyName} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <CircleInfoSvg />
                </svg>
                More Info
            </MoreInfoBtn>
        </BigBanner>
    );
}

export default Banner;