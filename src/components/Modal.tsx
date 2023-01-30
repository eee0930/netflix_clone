import { AnimatePresence, useScroll } from "framer-motion";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
// use
import { rootState } from "../atoms";
// incl
import { TimesSvg } from "../Svg";
// style
import { Overlay, BigMovie, CloseButton, Svg} from "./styled/ModalStyle";

interface IModal {
    content: string;
    keyName: string;
}
function Modal({ content, keyName } : IModal) {
    const navigate = useNavigate();
    const bigContentMatch = useMatch(`/${content}/:keyName/:id`);
    const selectedId = bigContentMatch?.params.id;
    const selectedKeyName = bigContentMatch?.params.keyName;

    const getRoot = useRecoilValue(rootState);
    const onOverlayClicked = () => navigate(getRoot[content]);

    const { scrollY } = useScroll();

    return (<>
        {bigContentMatch && selectedKeyName === keyName ? (
            <AnimatePresence><>
                <Overlay 
                    onClick={onOverlayClicked} 
                    exit={{opacity: 0}} 
                    animate={{opacity: 1}}
                    key={content}/>
                <BigMovie 
                    layoutId={selectedId + "_" + selectedKeyName}
                    topheight={scrollY.get()}> 
                    {/* (Router) Content Detail */}
                    <Outlet context={{ 
                        id: selectedId, 
                        content, 
                        }} />
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

export default Modal;