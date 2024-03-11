import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
});

const FormNoteDetail = (props) => {
  const { handleSubmit, values, errors, setValues } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Typography variant='h6'>{t("createNoteTitle")}</Typography>
      <TextField
        id='title'
        value={values.title}
        label={t("title")}
        color='primary'
        variant='outlined'
        error={errors.title}
        fullWidth
        required
        className={classes.field}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, title: e.target.value }))
        }
        helperText={errors.title && `${t("formError")}`}
      />
      <TextField
        id='description'
        value={values.decription}
        label={t("description")}
        color='primary'
        variant='outlined'
        error={errors.decription}
        multiline
        minRows={4}
        fullWidth
        required
        className={classes.field}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, decription: e.target.value }))
        }
        helperText={errors.decription && `${t("formError")}`}
      />
      <FormControl className={classes.field}>
        <FormLabel required error={errors.category}>
          {t("noteCategory")}
        </FormLabel>
        <RadioGroup
          value={values.category}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <FormControlLabel
            value='money'
            control={<Radio />}
            label={t("money")}
          />
          <FormControlLabel
            value='todo'
            control={<Radio />}
            label={t("todo")}
          />
          <FormControlLabel
            value='reminder'
            control={<Radio />}
            label={t("reminder")}
          />
          <FormControlLabel
            value='work'
            control={<Radio />}
            label={t("work")}
          />
        </RadioGroup>
      </FormControl>
      <Button
        type='submit'
        color='primary'
        variant='contained'
        onClick={handleSubmit}
      >
        {t("formNoteBtn")}
      </Button>
    </>
  );
};

FormNoteDetail.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  setValues: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default FormNoteDetail;
