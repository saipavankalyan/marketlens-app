import classes from "./layout.module.scss";
import Panel from "../panel/Panel";
import {Route, Routes} from "react-router";
import GrowthPage from "../page/GrowthPage";
import {StaticDataContext, StaticDataProvider} from "../context/StaticDataContext";

const MainLayout = ({children}) => (
    <div className={classes.layout}>
        <div className={classes.panel}>
            <Panel/>
        </div>
        <div className={classes.displayPage}>
            <StaticDataProvider>
                <Routes>
                    <Route path={"/growth"} element={<GrowthPage/>}>

                    </Route>
                    {/*<Route path={"/roi"}>*/}
                    {/*    <ROIPage />*/}
                    {/*</Route>*/}
                </Routes>
            </StaticDataProvider>
        </div>
    </div>
);

export default MainLayout;