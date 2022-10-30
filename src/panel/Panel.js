import classes from "./panel.module.scss";
import {NavLink} from "react-router-dom";

const Panel = () => (
    <div className={classes.panel}>
        <NavLink className={classes.panelItem} activeClassName={classes.activePanelItem} to={"/growth"}>
            Growth
        </NavLink>
        <NavLink className={classes.panelItem} activeClassName={classes.activePanelItem} to={"/correlation"}>
            Correlation
        </NavLink>
        <NavLink className={classes.panelItem} activeClassName={classes.activePanelItem} to={"/roi"}>
            ROI
        </NavLink>
        <NavLink className={classes.panelItem} activeClassName={classes.activePanelItem} to={"/economy"}>
            Economy
        </NavLink>
        <NavLink className={classes.panelItem} activeClassName={classes.activePanelItem} to={"/distribution"}>
            Distribution
        </NavLink>
    </div>
)

export default Panel;