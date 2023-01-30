import { AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
// use
import { getContentResults, IContent, IGetContentsResult } from "../api";
import { makeImagePath } from "../util";
import { offsetState } from "../atoms";
// component
import Banner from "./Banner";
import Modal from "./Modal";
// style
import { SliderContainer, SliderBox, SliderTitle, 
    Row, Box, Img, Info, 
    SliderControl, PrevBtn, NextBtn, AngleSvg } from "./styled/SliderStyle";
import { Loader } from "./styled/DetailStyle";
// incl
import { AngleLeftSvg, AngleRightSvg } from "../Svg";

interface ISlider {
    title: string;
    content: string;
    keyName: string;
    hasBanner: boolean;
}

const rowVariants:Variants = {
    hidden: (isNext:boolean) => {
        return {
            x: isNext? window.outerWidth + 5 : -window.outerWidth - 5,
        }
    },
    visible: {
        x: 0,
    },
    exit: (isNext:boolean) => {
        return {
            x: isNext? -window.outerWidth - 5 : window.outerWidth + 5,
        }
    },
};

const boxVariants:Variants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            type: 'tween',
            delay: 0.5,
            duration: 0.3,
        }
    },
};

const infoVariants:Variants = {
    hover: {
        opacity: 1,
        transition: {
            type: 'tween',
            delay: 0.5,
            duration: 0.3,
        },
    },
};


function ContentsSlider({title, content, keyName, hasBanner}: ISlider) {
    const {data, isLoading} = useQuery<IGetContentsResult>(
        [content, keyName], 
        () => getContentResults(keyName, content)
    );

    /**
     * 사진으로만 이루어진 슬라이더를 보여주기위해 backdrop path가 없는 contents들을 제외함
     * 국적이 IN인 결과도 제외함 (for Tv)
     */
    const contentFilter = (view : IContent) => {
        if(view.backdrop_path !== null) {
            if(view.origin_country && view.origin_country?.indexOf("IN") > -1) {
                return false;
            }
            return view;
        }
    };

    /**
     * 배너를 보여주는 slider는 배너에 맨 앞의 컨텐츠를 보여주므로 슬라이더 컨텐츠에서 하나를 제외한다.
     */
    let sliderContents = data?.results.filter(contentFilter) as IContent[];
    if(hasBanner) {
        sliderContents = data?.results.filter(contentFilter).slice(1) as IContent[];
    }

    // slide control button을 slider 애니메이션 duration 속도보다 연속으로 빨리 클릭하면
    // index가 빨리 바뀌어서 빈 공간이 생기는 문제때문에
    // slider가 넘어가고 나서 도착 여부를 확인한다
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving((prev) => !prev);

    /**
     * slider page setting & sliding
     */
    const offsetInfo = useRecoilValue(offsetState);
    const windowWidth = window.innerWidth;
    let OFFSET = offsetInfo.pc[1];
    if(windowWidth < offsetInfo.pc[0]) {
        OFFSET = offsetInfo.tablet[1];
        if(windowWidth < offsetInfo.tablet[0]) {
            OFFSET = offsetInfo.mobile[1];
        }
    }
    const [index, setIndex] = useState(0);
    const [isNext, setIsNext] = useState(true);
    const setPagination = (nextBtn:boolean) => {
        if(nextBtn) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
        if(data) {
            if(leaving) return;
            toggleLeaving();
            let totalContents = sliderContents.length;
            if(hasBanner) {
                totalContents = sliderContents.length - 1;
            }
            const maxIndex = Math.floor(totalContents / OFFSET) - 1;
            return maxIndex;
        }
    };
    const increaseIndex = () => {
        const maxIndex = setPagination(true) as number;
        setIndex((prev) => prev === maxIndex? 0 : prev + 1);
    };
    const decreaseIndex = () => {
        const maxIndex = setPagination(false) as number;
        setIndex((prev) => prev === 0? maxIndex : prev - 1);
    };


    const navigate = useNavigate();
    const onBoxClicked = (contentId: number) => {
        navigate(`/${content}/${keyName}/${contentId}`);
    };

    return (<>
        {isLoading ? (
            <Loader>
                <div>
                    <div></div><div></div>
                </div>
            </Loader>
            ) : (<>
            {/* -------------------------[1. Banner]------------------------ */}
            {hasBanner && <Banner data={data as IGetContentsResult} keyName={keyName} content={content} />}
            {/* --------------------[2. Contents Slider]-------------------- */}
            <SliderContainer>
                <SliderBox>
                    <SliderTitle>{title}</SliderTitle>
                    <AnimatePresence 
                        initial={false} 
                        onExitComplete={toggleLeaving}
                        custom={isNext} >
                        {/* 2.1 contents */}
                        <Row 
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{type: "tween", duration: 1}}
                            key={keyName + index}
                            custom={isNext} >
                            {sliderContents
                                .slice(OFFSET * index, OFFSET * index + OFFSET)
                                .map((content) => 
                                <Box 
                                    layoutId={content.id + "_" + keyName}
                                    variants={boxVariants}
                                    initial="normal"
                                    whileHover="hover"
                                    transition={{type: "tween"}}
                                    key={content.id}
                                    onClick={() => onBoxClicked(content.id)} >
                                    <Img boxphoto={makeImagePath(content.backdrop_path, "w300")} />
                                    <Info variants={infoVariants}>
                                        <h4>{content.name? content.name : content.title}</h4>
                                    </Info>
                                </Box>
                            )}
                        </Row>
                        {/* 2.2 slide control buttons */}
                        <SliderControl>
                            <PrevBtn onClick={decreaseIndex} onMouseEnter={() => setIsNext(false)}>
                                <AngleSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <AngleLeftSvg />
                                </AngleSvg>
                            </PrevBtn>
                            <NextBtn onClick={increaseIndex} onMouseEnter={() => setIsNext(true)}>
                                <AngleSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <AngleRightSvg />
                                </AngleSvg>
                            </NextBtn>
                        </SliderControl>
                    </AnimatePresence>
                </SliderBox>
            </SliderContainer>
        </>)}  
        {/* ------------------[3.(component) Detail Modal]------------------ */} 
        <Modal content={content} keyName={keyName} />   
    </>);
}

export default ContentsSlider;