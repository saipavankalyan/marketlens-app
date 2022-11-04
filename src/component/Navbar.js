import classes from "./navbar.module.scss";

const Navbar = ({}) => (
    <div className={classes.navbar}>
        <div className={classes.brand}>
            <img src={''} className={classes.logo}/>
            <p className={classes.logotext}>Marketlens</p>
        </div>
        {/*<div className={classes.rightContainer}>*/}
        {/*    <div className={classes.rightItem}>*/}
        {/*        <img src={''}  className={classes.icon} />*/}
        {/*        <p className={classes.iconText}></p>*/}
        {/*    </div>*/}
        {/*    <div className={classes.rightItem}>*/}
        {/*        <img src={''}  className={classes.icon} />*/}
        {/*        <p className={classes.iconText}></p>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>
)

export default Navbar;