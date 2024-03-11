import { Box, Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { imagePath } from "configs/pathImage";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

/**
 * Renders a component for a "Try Again" feature.
 *
 * @param {object} props - The component props.
 * @param {function} props.onTryAgain - The callback function to be executed when the "Try Again" button is clicked.
 * @return {JSX.Element} The rendered component for the "Try Again" feature.
 */
const TryAgain = ({ onTryAgain }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box display='flex' height={"100%"}>
      <Paper
        elevation={3}
        component={Box}
        padding={3}
        width={500}
        margin='auto'
        display='flex'
        flexDirection='column'
        alignItems='center'
        gridGap={24}
        borderRadius={8}
      >
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          gridGap={16}
          width='100%'
        >
          <img
            src={imagePath.errorPage}
            alt='IMG...'
            height={200}
            width={"100%"}
            style={{ objectFit: "cover" }}
          />
          <div className='gap-8 text-center'>
            <Typography
              variant='h5'
              color='inherit'
              style={{ fontWeight: 600 }}
            >
              {t("errorTitle")}
            </Typography>
            <Typography variant='subtitle2' color='textSecondary'>
              {t("errorMessage")}
            </Typography>
          </div>
        </Box>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          onClick={onTryAgain}
        >
          {t("tryAgain")}
        </Button>
      </Paper>
    </Box>
  );
};

TryAgain.propTypes = {
  onTryAgain: PropTypes.func
};

export default TryAgain;
