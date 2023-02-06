import { useNavigate } from "react-router-dom";
// use
import { IContent } from "../../api";
import { makeImagePath } from "../../util";
// style
import { BigBanner, Title, Overview, MoreInfoBtn } from "../styled/BannerStyle";
// incl
import { CircleInfoSvg } from "../../Svg";

interface IBanner {
    bannerData: IContent;
    keyName: string;
    content: string;
}

function Banner({ bannerData, keyName, content }:IBanner) {
    const navigate = useNavigate();

    const onBoxClicked = (contentId: number) => {
        navigate(`/${content}/${keyName}/${contentId}`);
    };

    return (
        <BigBanner bgPhoto={makeImagePath(bannerData.backdrop_path || "")} >
            {/* Title or Name */}
            <Title>{bannerData.name? bannerData.name : bannerData.title}</Title>
            {/* Overview */}
            <Overview>
                {bannerData.overview.length > 139 ? 
                    (`${bannerData.overview.slice(0, 139)}...`):
                    bannerData.overview
                }
            </Overview>
            <MoreInfoBtn 
                onClick={() => onBoxClicked(bannerData.id)}
                layoutId={bannerData.id + "_" + keyName} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <CircleInfoSvg />
                </svg>
                More Info
            </MoreInfoBtn>
        </BigBanner>
    );
}

export default Banner;