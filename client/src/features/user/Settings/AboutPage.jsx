import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';

//MUI staff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Local stuff
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import RadioInput from '../../../app/common/form/RadioInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  status: { marginBottom: theme.spacing(2) },
  field: {
    marginBottom: theme.spacing(2),
  },
  textArea: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  gender: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(4),
  },
  birthDate: {
    marginBottom: theme.spacing(2),
  },
  updateProfileBtn: {
    textAlign: 'center',
  },
}));

const AboutPage = ({ pristine, submitting, handleSubmit, createProfile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmitHandle = (values) => {
    dispatch(createProfile(values));
  };
  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmitHandle)}
        className={classes.paper}
        autoComplete="off"
      >
        <h3
          style={{
            textAlign: 'center',
            marginTop: 0,
            marginBottom: 5,
            color: '#2bbbff',
          }}
        >
          About Me
        </h3>

        <div className={classes.status}>
          <label>Tell us your status: </label>
          <div className={classes.gender}>
            <Field
              name="relationshipStatus"
              component={RadioInput}
              type="radio"
              value="Single"
              label="Single"
            />
            <Field
              name="relationshipStatus"
              component={RadioInput}
              type="radio"
              value="InRelationship"
              label="In Relationship"
            />
            <Field
              name="relationshipStatus"
              component={RadioInput}
              type="radio"
              value="Married"
              label="Married"
            />
          </div>
        </div>

        <div className={classes.textArea}>
          <Field
            name="about"
            component={TextArea}
            placeholder="Tell us about yourself"
            fullWidth
            rows={4}
          />
        </div>

        <div className={classes.field}>
          <Field
            name="interests"
            component={TextInput}
            value="interests"
            id="interests"
            label="Tell us your interests comma separeted"
            fullWidth
          />
        </div>

        <div className={classes.field}>
          <Field
            name="occupation"
            type="text"
            component={TextInput}
            label="Work at"
            fullWidth
          />
        </div>
        <div className={classes.field}>
          <Field
            name="currentCity"
            component={TextInput}
            label="Current City"
            fullWidth
          />
        </div>
        <div className={classes.field}>
          <Field name="school" component={TextInput} label="School" fullWidth />
        </div>

        <div className={classes.field}>
          <Field
            name="website"
            component={TextInput}
            label="Your website"
            fullWidth
          />
        </div>

        <div className={classes.updateProfileBtn}>
          <Button
            style={{ textTransform: 'capitalize' }}
            variant="contained"
            color="primary"
            type="submit"
            disabled={pristine || submitting}
          >
            Update Profile
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(AboutPage);
