import Button from '@mui/material/Button';

const BasicBtn = ({text, icon, functions}) => {
  return (
      <Button onClick={functions} variant="contained">{icon}{text}</Button>
  );
}

export default BasicBtn;