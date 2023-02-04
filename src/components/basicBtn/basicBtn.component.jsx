import Button from '@mui/material/Button';

const BasicBtn = ({text, icon}) => {
  return (
        <Button variant="contained">{icon}{text}</Button>
    );
}

export default BasicBtn;