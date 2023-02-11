import { AnimatePresence, useScroll } from "framer-motion";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IContentSearch, IKnownFor } from "../api";
// use
import { rootState } from "../atoms";
// incl
import { TimesSvg } from "../Svg";
// style
import { Overlay, BigMovie, CloseButton, Svg} from "./styled/ModalStyle";

interface IModal {
    content: string;
    clickedData?: IContentSearch;
}
function ModalForTrending({ content, clickedData } : IModal) {
    const navigate = useNavigate();
    const bigContentMatch = useMatch(`/trending/:content/:id`);
    const selectedId = bigContentMatch?.params.id;
    const selectedContent = bigContentMatch?.params.content;

    const getRoot = useRecoilValue(rootState);
    const onOverlayClicked = () => navigate(getRoot["trending"]);

    const { scrollY } = useScroll();

    return (<>
        {bigContentMatch && selectedContent === content ? (
            <AnimatePresence><>
                <Overlay 
                    onClick={onOverlayClicked} 
                    exit={{opacity: 0}} 
                    animate={{opacity: 1}}
                    key={content}/>
                <BigMovie 
                    layoutId={selectedId + "_" + selectedContent}
                    topheight={scrollY.get()}> 
                    {/* (Router) Content Detail */}
                    {content === 'person' ? (
                        <Outlet context={{ 
                            id: selectedId, 
                            content, 
                            knownFor: clickedData?.known_for as IKnownFor[], 
                            }} />
                    ) : (
                        <Outlet context={{ 
                            id: selectedId, 
                            content, 
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

export default ModalForTrending;