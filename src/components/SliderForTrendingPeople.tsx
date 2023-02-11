import { AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
// use
import { getTrendingContents, IGetContentSearchResults, IContentSearch } from "../api";
import { makeImagePath } from "../util";
import { offsetState } from "../atoms";
// component
import ModalForTrending from "./ModalForTrending";
// style
import { SliderContainer, SliderBox, SliderTitle, 
    Row, Box, 
    SliderControl, PrevBtn, NextBtn, AngleSvg } from "./styled/SliderStyle";
import { Loader } from "./styled/DetailStyle";
import { PersonImg, Info } from "./styled/ListSearchStyle";
// incl
import { AngleLeftSvg, AngleRightSvg } from "../Svg";

interface ISlider {
    title: string;
    content: string;
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


function SliderForTrendingPeople({title, content}: ISlider) {
    const {data, isLoading} = useQuery<IGetContentSearchResults>(
        ["trending", content], 
        () => getTrendingContents(content)
    );

    /**
     * 사진으로만 이루어진 슬라이더를 보여주기위해 backdrop path가 없는 contents들을 제외함
     * 국적이 IN인 결과도 제외함 (for Tv)
     */
    const contentFilter = (view : IContentSearch) => {
        if(view.profile_path !== null) {
            return view;
        }
    };


    let sliderContents = data?.results as IContentSearch[];
    if(!isLoading) {
        sliderContents = data?.results?.filter(contentFilter) as IContentSearch[];
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
            const totalContents = sliderContents.length;
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
        navigate(`/trending/${content}/${contentId}`);
    };

     /**
     * 결과에서 인물의 상세정보를 모두 가져올 수 있으니 data에서 선택한 인물의 정보를 찾아냄
     */
    const bigPersonMatch = useMatch(`/trending/${content}/:id`);
    const clickedData = bigPersonMatch?.params.id &&
    data?.results.find((person) => 
        String(person.id) === bigPersonMatch?.params.id
    );

    return (<>
        {isLoading ? (
            <Loader>
                <div>
                    <div></div><div></div>
                </div>
            </Loader>
        ) : (<>
            {/* --------------------[1. Contents Slider]-------------------- */}
            <SliderContainer>
                <SliderBox>
                    <SliderTitle>{title}</SliderTitle>
                    <AnimatePresence 
                        initial={false} 
                        onExitComplete={toggleLeaving}
                        custom={isNext} >
                        {/* 1.1 contents */}
                        <Row 
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{type: "tween", duration: 1}}
                            key={"trending" + index}
                            custom={isNext} >
                            {sliderContents
                                .slice(OFFSET * index, OFFSET * index + OFFSET)
                                .map((content) => 
                                <Box 
                                    layoutId={content.id + "_trending"}
                                    variants={boxVariants}
                                    initial="normal"
                                    whileHover="hover"
                                    transition={{type: "tween"}}
                                    key={content.id}
                                    onClick={() => onBoxClicked(content.id)} >
                                    <PersonImg boxphoto={makeImagePath(content.profile_path as string, "w300")} />
                                    <Info>
                                        <h4>{content.name} ({content.known_for_department})</h4>
                                    </Info>
                                </Box>
                            )}
                        </Row>
                        {/* 1.2 slide control buttons */}
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
        {/* ------------------[2.(component) Detail Modal]------------------ */} 
        <ModalForTrending content={content} clickedData={clickedData as IContentSearch} /> 
    </>);
}

export default SliderForTrendingPeople;