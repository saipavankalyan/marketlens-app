import classes from "./layout.module.scss";
import Panel from "../panel/Panel";
import {Route, Routes} from "react-router";
import GrowthPage from "../page/GrowthPage";
import {StaticDataContext, StaticDataProvider} from "../context/StaticDataContext";
import Contribution from "../page/contribution/Contribution";
import NewsInfluencePage from "../page/news/NewsInfluencePage";

const PANEL_BODY  = {
    Growth: GrowthPage,
    Contribution: '/contribution',
    "News Influence": '/news-influence',
    Economy: '/economy',
    Distribution: '/distribution'
}

const MainLayout = ({children}) => (
    <div className={classes.layout}>
        <div className={classes.panel}>
            <Panel/>
        </div>
        <div className={classes.displayPage}>
            <StaticDataProvider>
                <Routes>
                    <Route path={"/growth"} element={<GrowthPage/>} />
                    <Route path={"/contribution"} element={<Contribution />} />
                    <Route path={"/news-influence"} element={<NewsInfluencePage />} />
                    {/*<Route path={"/roi"}>*/}
                    {/*    <ROIPage />*/}
                    {/*</Route>*/}
                </Routes>
            </StaticDataProvider>
        </div>
    </div>
);

export default MainLayout;