import Alert from '@mui/material/Alert';

const Alerts = ({type, text}) => {
    return (
      <Alert severity={type}>{text}</Alert>
    );
}

export default Alerts;