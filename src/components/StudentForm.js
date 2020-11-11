import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import useRemoteCollectionAdder from '../hooks/useRemoteCollectionAdder';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(1),
    height: 55,
  },
}));
export default function StudentForm() {
  const classes = useStyles();
  const firstNameRef = useRef();
  const { register, handleSubmit, errors, reset: resetForm } = useForm();
  const [save, { isLoading }] = useRemoteCollectionAdder(
    'students',
    {
      idAttributeName: 'githubUserName',
      updateLocalDataBefore: false,
      updateLocalDataAfter: true,
    },
    {
      onSuccess: () => {
        resetForm();
        firstNameRef.current.focus();
      },
    }
  );

  const onSubmit = (data) => save(data);
  console.log('err', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} disabled>
      <TextField
        disabled={isLoading}
        id="firstName"
        name="firstName"
        label="First Name"
        variant="filled"
        inputRef={(e) => {
          firstNameRef.current = e;
          register(e, { required: true, maxLength: 80 });
        }}
      />
      <TextField
        disabled={isLoading}
        id="lastName"
        name="lastName"
        label="Last Name"
        variant="filled"
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <TextField
        disabled={isLoading}
        id="githubUserName"
        name="githubUserName"
        label="GitHub user name"
        variant="filled"
        inputRef={register({ required: true })}
      />
      <Button
        disabled={isLoading}
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
    </form>
  );
}
