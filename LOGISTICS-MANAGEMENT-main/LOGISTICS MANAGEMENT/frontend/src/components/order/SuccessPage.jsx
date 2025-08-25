import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; // Import Button component
import checkmarkImage from "../../assets/animat-checkmark.gif"; // Adjust path as needed
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  img: {
    width: "150px",
    marginBottom: "20px",
  },
  title: {
    marginBottom: "10px",
    fontWeight: "bold",
  },
  message: {
    margin: "10px 0",
    fontSize: "1.2rem",
    color: "#333",
  },
  summary: {
    marginTop: "10px",
    fontSize: "1rem",
    color: "#666",
    fontStyle: "italic",
  },
  button: {
    marginTop: "20px",
  },
});

const SuccessPage = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <img src={checkmarkImage} alt="Success Checkmark" className={classes.img} />
        <Typography variant="h5" component="h2" className={classes.title}>
          Order Confirmed
        </Typography>
        <Typography variant="body1" className={classes.message}>
          Thank you for ordering with us!
        </Typography>
        <Typography variant="body2" className={classes.summary}>
          Your order is being processed and will be delivered soon.
        </Typography>
        <Typography variant="body2" className={classes.summary}>
          You can track your order status in your account.
        </Typography>
        <Button
          component={Link}
          to='/'
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Back to Home
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuccessPage;
