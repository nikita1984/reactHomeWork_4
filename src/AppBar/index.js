import { AppBar as MaterialUiAppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    marginRight: "15px",
    color: theme.palette.background.default,
    textDecoration: "none",
  },

  activeLink: {
    color: "red",
  },

  appBar: {
    marginBottom: "15px",
  },
}));

const routes = [
  {
    pathTitle: "Home",
    path: "/home",
  },
  { pathTitle: "Chat", path: "/chat" },
  { pathTitle: "Playground", path: "/playground" },
];

const AppBar = () => {
  const classes = useStyles();
  const location = useLocation();
  console.log("/chat" === location.pathname && classes.activeLink);

  return (
    <MaterialUiAppBar className={classes.appBar} position="static">
      <Toolbar>
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`${classes.link} ${
              route.path === location.pathname ? classes.activeLink : ""
            }`}
          >
            <Typography variant="h6">{route.pathTitle}</Typography>
          </Link>
        ))}
      </Toolbar>
    </MaterialUiAppBar>
  );
};

export default AppBar;
