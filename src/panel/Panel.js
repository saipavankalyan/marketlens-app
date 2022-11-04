import classes from "./panel.module.scss";
import {NavLink} from "react-router-dom";
import clsx from "clsx";

const URL_DISPLAY_MAPPING = {
    Growth: '/growth',
    Correlation: '/correlation',
    ROI: '/ROI',
    Economy: '/Economy',
    Distribution: '/Distribution'
}

const Panel = () => (
    <div className={classes.panel}>
        {Object.entries(URL_DISPLAY_MAPPING).map(
            ([key, value]) => (
                <NavLink className={(navData) => clsx(classes.panelItem, {[classes.activePanelItem]: navData.isActive})}  to={value}>
                    {key}
                </NavLink>
            )
        )}

        {/*<NavLink as={"div"} className={classes.panelItem} activeClassName={classes.activePanelItem} to={"/correlation"}>*/}
        {/*    Correlation*/}
        {/*</NavLink>*/}
        {/*<NavLink as={"div"} className={classes.panelItem} activeClassName={classes.activePanelItem} to={"/roi"}>*/}
        {/*    ROI*/}
        {/*</NavLink>*/}
        {/*<NavLink as={"div"} className={classes.panelItem} activeClassName={classes.activePanelItem} to={"/economy"}>*/}
        {/*    Economy*/}
        {/*</NavLink>*/}
        {/*<NavLink as={"div"} className={classes.panelItem} activeClassName={classes.activePanelItem} to={"/distribution"}>*/}
        {/*    Distribution*/}
        {/*</NavLink>*/}
    </div>
)

export default Panel;