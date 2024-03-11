import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { KeyboardArrowDown, Language, MenuOpen } from "@material-ui/icons";
import { theme } from "createTheme";
import { format } from "date-fns";
import languages from "models/languages";
import menuNavItems from "models/menuSidebar";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appbar: {
    width: (props) =>
      props.mobileScreen ? "100%" : `calc(100% - ${props.drawerWidth}px)`,
    height: (props) => props.appBarHeight,
    background: "#fff",
    color: "#000",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.complex
    })
  },
  toolbarText: {
    flexGrow: 1
  },
  pageDetail: {
    width: "100%",
    minHeight: "100vh",
    padding: theme.spacing(3),
    paddingTop: (props) => props.appBarHeight + theme.spacing(3)
  },
  drawerMenu: {
    width: (props) => props.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.complex
    }),
    overflow: "hidden auto"
  },
  drawerTitle: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    opacity: (props) => (props.isOpenDrawer ? 1 : 0),
    width: (props) => (props.isOpenDrawer ? "100%" : 0)
  },
  languageButton: {
    borderRadius: 20,
    backgroundColor: "#f4f4f4",
    color: "#333",
    textTransform: "capitalize",
    marginRight: theme.spacing(2),
    padding: theme.spacing(0.5, 1.2),
    "&:hover": {
      backgroundColor: "#f4f4f4"
    }
  },
  smallAvatar: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5)
  },
  listItem: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    justifyContent: (props) => !props.isOpenDrawer && "center",
    height: 48,
    gap: (props) => (props.isOpenDrawer ? 8 : 0)
  },
  listItemIcon: {
    minWidth: 25
  },
  listItemText: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    opacity: (props) => (props.isOpenDrawer ? 1 : 0)
  }
}));

function getVietnameseDayOfWeek(date) {
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy"
  ];
  return daysOfWeek[date.getDay()];
}

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState("en");
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const drawerWidth = isOpenDrawer ? 250 : 50;
  const appBarHeight = 64;
  const classes = useStyles({
    drawerWidth,
    appBarHeight,
    isOpenDrawer,
    mobileScreen
  });

  // redirect to "/management" in the first render
  useEffect(() => {
    const { pathname } = location;

    if (pathname === "/") {
      navigate("/management");
    } else {
      navigate(pathname);
    }
  }, []);

  // check if the screen is mobile
  useEffect(() => {
    if (mobileScreen) {
      setOpenDrawer(false);
    } else {
      setOpenDrawer(true);
    }
  }, [mobileScreen]);

  /**
   * A function that handles moving to a new page.
   *
   * @param {string} path - the path of the new page
   * @return {void}
   */
  const handleListItemClick = (path) => {
    navigate(path);

    if (mobileScreen) {
      setOpenDrawer(false);
    }
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectedLanguage = (language) => {
    setLanguage(language);
    setAnchorEl(null);
    i18n.changeLanguage(language);
  };

  const dayOfWeek =
    language !== "vi"
      ? format(new Date(), "EEEE")
      : getVietnameseDayOfWeek(new Date());

  const getTranslatedText = (text) => {
    return t(
      text
        .replace(/\s(\w)/g, ($0, $1) => $1.toUpperCase())
        .replace(/^\w/, ($0) => $0.toLowerCase())
        .replace(/\s+/g, "")
    );
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={2}>
        <Toolbar component={Box} display='flex' justifyContent='space-between'>
          {mobileScreen && (
            <IconButton
              onClick={() => setOpenDrawer(!isOpenDrawer)}
              size='small'
            >
              <MenuOpen style={{ transform: "rotate(180deg)" }} />
            </IconButton>
          )}
          {!mobileScreen && (
            <Typography
              variant='body1'
              color='textPrimary'
              className={classes.toolbarText}
            >
              {t("todayIs", {
                date:
                  language === "en"
                    ? format(new Date(), "do MMMM Y")
                    : format(new Date(), "dd/MM/yyyy"),
                dayOfWeek: dayOfWeek
              })}
            </Typography>
          )}
          <Box display='flex' alignItems='center'>
            {/* Languages menu */}
            <Button
              aria-controls='language-menu'
              onClick={handleOpenMenu}
              variant='contained'
              disableElevation
              className={classes.languageButton}
            >
              <Language fontSize='small' style={{ marginRight: 5 }} />
              {t("language")}
              <KeyboardArrowDown fontSize='small' />
            </Button>
            {/* Account */}
            <Box display='flex' alignItems='center' gridGap={10}>
              <Typography variant='body1' color='textPrimary'>
                Luffy
              </Typography>
              <Avatar
                variant='circular'
                src='https://aux.iconspalace.com/uploads/13079831461297786048.png'
                alt='Avatar'
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        id='language-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        getContentAnchorEl={null}
      >
        {languages.map((item) => (
          <MenuItem
            key={item.value}
            selected={language === item.value}
            onClick={() => handleSelectedLanguage(item.value)}
            className='gap-8'
          >
            <Avatar src={item.image} className={classes.smallAvatar} />
            {item.name}
          </MenuItem>
        ))}
      </Menu>

      <Drawer
        className={classes.drawerMenu}
        variant={mobileScreen ? "temporary" : "permanent"}
        anchor='left'
        open={isOpenDrawer}
        classes={{ paper: classes.drawerMenu }}
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent={isOpenDrawer ? "space-between" : "center"}
          height={appBarHeight}
          p={2}
        >
          <Typography variant='h5' className={classes.drawerTitle}>
            {t("drawerTitle")}
          </Typography>
          <IconButton size='small' onClick={() => setOpenDrawer(!isOpenDrawer)}>
            <MenuOpen
              style={{ transform: !isOpenDrawer && "rotate(180deg)" }}
            />
          </IconButton>
        </Box>
        <Divider />
        <List disablePadding>
          {menuNavItems.map((menuItem) => (
            <Tooltip
              key={menuItem.text}
              title={!isOpenDrawer ? getTranslatedText(menuItem.text) : ""}
              placement='right'
              arrow
            >
              <ListItem
                button
                onClick={() => handleListItemClick(menuItem.path)}
                className={classes.listItem}
                selected={location.pathname === menuItem.path}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ className: "text-overflow" }}
                  primary={getTranslatedText(menuItem.text)}
                  className={classes.listItemText}
                />
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      {/* Content */}
      <div className={classes.pageDetail}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
