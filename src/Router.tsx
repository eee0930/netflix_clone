import { createHashRouter } from "react-router-dom";
import App from "./App";
import DetailMovie from "./routes/DetailMovie";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Tv from "./routes/Tv";
import DetailTv from "./routes/DetailTv";
import DetailPerson from "./routes/DetailPerson";

/**
 * ghpage에 올리기 위해 react-router-dom의 createHashRouter 사용
 * createHashRouter를 사용하면 root url에 #이 붙으므로
 * 원래는 createBrowserRouter 사용할 것
 */
const router = createHashRouter([
    {
        path: `/`,
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
                children: [
                    {
                        path: "movie/:keyName/:id",
                        element: <DetailMovie />,
                    },
                ],
            },{
                path: "tv",
                element: <Tv />,
                children: [
                    {
                        path: ":keyName/:id",
                        element: <DetailTv />,
                    },
                ],
            },{
                path: "search",
                element: <Search />,
                children: [
                    {
                        path: "movie/:id",
                        element: <DetailMovie />,
                    },{
                        path: "tv/:id",
                        element: <DetailTv />,
                    },{
                        path: "person/:id",
                        element: <DetailPerson />
                    },
                ],
            },
        ],
    }
]);


export default router;