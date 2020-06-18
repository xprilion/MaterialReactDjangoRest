import React from "react";
import axios from "axios";

import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";
import { Helmet } from "react-helmet";

import AppBar from "@material-ui/core/AppBar";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import CardActionArea from "@material-ui/core/CardActionArea";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

class HomeClass extends React.Component {
  state = {
    settingsLoading: true,
    settings: [],
    mainContent: "",
  };

  componentDidMount() {
    const self = this;
    axios.get("http://127.0.0.1:8000/settings/fetch/").then((res) => {
      self.setState({ settings: res.data });
      self.setState({ settingsLoading: false });

      const contentState = convertFromRaw(JSON.parse(res.data.mainText));

      const markup = stateToHTML(contentState);

      self.setState({ mainContent: markup });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <meta
            name="description"
            content={this.state.settings.metaDesc}
          ></meta>
          <meta
            name="description"
            content={this.state.settings.metaTags}
          ></meta>
        </Helmet>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Sample
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        {this.state.settingsLoading ? (
          <div>Loading...</div>
        ) : (
          <main>
            <div className={classes.heroContent}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    className={classes.media}
                    src={this.state.settings.bannerImageUrl}
                    title="Hero image"
                    style={{
                      maxHeight: "300px",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {this.state.settings.contactMail}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
                <div> {ReactHtmlParser(this.state.mainContent)} </div>
            </div>
          </main>
        )}
        {ReactHtmlParser(this.state.settings.tracker)}
      </React.Fragment>
    );
  }
}

const HomeComponent = withStyles(styles)(HomeClass);

export default HomeComponent;
