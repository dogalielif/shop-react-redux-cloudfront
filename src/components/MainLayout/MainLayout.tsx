import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Container from "@material-ui/core/Container";
import Header from "components/MainLayout/components/Header";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        My Store
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  minorChange: {
    color: "red",
    display: "flex",
    justifyContent: "center"
  }
}));

const MainLayout: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <>
      <Header/>
      <h1 className={classes.minorChange}>Welcome to My Store!</h1>
      <main>
        <Container className={classes.container} maxWidth="md">
          {children!}
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Thank you for visiting!
        </Typography>
        <Copyright/>
      </footer>
    </>
  );
};

export default MainLayout;