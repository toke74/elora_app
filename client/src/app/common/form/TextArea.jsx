import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textArea: {
    width: '450px',
    border: '1px solid #b3bbc3',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
  textArea1: {
    width: '250px',
    border: '1px solid #b3bbc3',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  err: {
    color: 'red',
  },
}));
const TextArea = ({
  input,
  rows,
  width,
  type,
  placeholder,
  left,
  meta: { touched, error },
}) => {
  const classes = useStyles();

  return (
    <div>
      <TextareaAutosize
        rows={rows}
        {...input}
        placeholder={placeholder}
        type={type}
        className={classes.textArea}
        style={{ width: width, marginLeft: left }}
      />
      {touched && error && <div className={classes.err}>{error}</div>}
    </div>
  );
};

export default TextArea;
// import React from 'react';

// const TextArea = ({
//   input,
//   rows,
//   width,
//   type,
//   placeholder,
//   meta: { touched, error },
// }) => {
//   return (
//     <div>
//       <textarea
//         rows={rows}
//         {...input}
//         placeholder={placeholder}
//         type={type}
//         width={width}
//         style={{ width: '450px', border: '1px solid #b3bbc3' }}
//       />
//       {touched && error && <div color="red">{error}</div>}
//     </div>
//   );
// };

// export default TextArea;
