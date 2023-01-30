import { AnimatePresence, useScroll } from "framer-motion";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
// use
import { IContentSearch, IKnownFor } from "../api";
// incl
import { TimesSvg } from "../Svg";
// style
import { Overlay, BigMovie, CloseButton, Svg} from "./styled/ModalStyle";

interface IModal {
    content: string;
    keyword: string;
    clickedData?: IContentSearch;
}
function ModalForSearch({ content, keyword, clickedData } : IModal) {
    const bigContentMatch = useMatch(`/search/:content/:id`);
    const keywordContent = bigContentMatch?.params.content;
    const paramId = bigContentMatch?.params.id;

    const navigate = useNavigate();
    const onOverlayClicked = () => navigate(`/search?keyword=${keyword}`);

    const { scrollY } = useScroll();
    
    return (<>
        {bigContentMatch && keywordContent === content ? (
            <AnimatePresence><>
                <Overlay 
                    onClick={onOverlayClicked} 
                    exit={{opacity: 0}} 
                    animate={{opacity: 1}}
                    key={content}/>
                <BigMovie 
                    layoutId={paramId} 
                    topheight={scrollY.get()}> 
                    {/* (Router) Content Detail */}
                    {keywordContent === 'person' ? (
                        <Outlet context={{ 
                            id: paramId, 
                            content: keywordContent, 
                            knownFor: clickedData?.known_for as IKnownFor[], 
                            }} />
                    ) : (
                        <Outlet context={{ 
                            id: paramId, 
                            content: keywordContent, 
                            }} />
                    )}
                    <CloseButton onClick={onOverlayClicked}>
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <TimesSvg />
                        </Svg>
                    </CloseButton>
                </BigMovie>
            </></AnimatePresence>
        ) : null}
    </>)
}

export default ModalForSearch;