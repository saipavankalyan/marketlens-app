import classes from "./layout.module.scss";
import Panel from "../panel/Panel";

const MainLayout = ({children}) => (
    <div className={classes.layout}>
        <div className={classes.panel}>
            <Panel />
        </div>
        <div className={classes.displayPage} />
    </div>
);

export default MainLayout;