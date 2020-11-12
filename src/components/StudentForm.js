import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryCache } from 'react-query';
import { makeEntityAdder } from '../services/API';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(1),
    height: 55,
  },
}));
export default function StudentForm() {
  const { handleSubmit, register, errors, reset: resetForm } = useForm();
  const queryCache = useQueryCache();
  const classes = useStyles();
  const firstNameRef = useRef();

  const [save, { isLoading, error: submitError }] = useMutation(
    makeEntityAdder('students'),
    {
      onMutate: (variables) => {
        queryCache.setQueryData('students', (oldList) => [
          ...oldList,
          variables,
        ]);
      },
      onSuccess: () => {
        resetForm();
        firstNameRef.current.focus();
        // queryCache.setQueryData('students', (oldList) => [...oldList, data]);
      },
    }
  );

  const onSubmit = (data) => save(data);
  console.log('err', errors);
  console.log(submitError);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        disabled={isLoading}
        id="firstName"
        name="firstName"
        label="Prénom"
        variant="filled"
        inputRef={(e) => {
          register(e, {
            required: true,
          });
          firstNameRef.current = e;
        }}
      />
      <TextField
        disabled={isLoading}
        id="lastName"
        name="lastName"
        label="Nom"
        variant="filled"
        inputRef={register({
          required: true,
        })}
      />
      <TextField
        disabled={isLoading}
        id="githubUserName"
        name="githubUserName"
        label="identifiant GitHub"
        variant="filled"
        inputRef={register({
          required: true,
        })}
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
