import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

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
  const [isLoading, setIsLoading] = useState(false);
  const save = (data) => {
    console.log(data);
    setIsLoading(true);
    // post data on server and then
    setIsLoading(false);
    resetForm();
  };

  const onSubmit = (data) => save(data);
  console.log('err', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} disabled>
      <TextField
        disabled={isLoading}
        id="firstName"
        name="firstName"
        label="Prénom"
        variant="filled"
        inputRef={(e) => {
          firstNameRef.current = e;
          register(e, { required: true });
        }}
      />
      <TextField
        disabled={isLoading}
        id="lastName"
        name="lastName"
        label="Nom"
        variant="filled"
        inputRef={register({ required: true })}
      />
      <TextField
        disabled={isLoading}
        id="githubUserName"
        name="githubUserName"
        label="identifiant GitHub"
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
        Ajouter
      </Button>
    </form>
  );
}
