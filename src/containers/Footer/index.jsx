import { Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",
    whiteSpace: "nowrap",
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    opacity: (isOpenDrawer) => (isOpenDrawer ? 1 : 0),
    visibility: (isOpenDrawer) => (isOpenDrawer ? "visible" : "hidden")
  }
}));

const Footer = ({ isOpenDrawer }) => {
  const classes = useStyles(isOpenDrawer);
  const { t } = useTranslation();

  return (
    <div className={classes.footer}>
      <Typography variant='body2' color='textPrimary' align='center'>
        © 2023{" "}
        <Typography
          color='primary'
          variant='body2'
          component={"span"}
          style={{ fontWeight: "bold" }}
        >
          Phuc Luu
        </Typography>
        <br />
        {t("allRightsReserved")}
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  isOpenDrawer: PropTypes.bool
};

export default Footer;
