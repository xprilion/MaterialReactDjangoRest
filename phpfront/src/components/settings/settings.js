import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import axios from "axios";


import { userActions } from "../../actions";
import axiosInstance from "../../axios";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";

import { convertFromRaw, convertToRaw } from "draft-js";

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

class SettingsClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      banner: "",
      contactmail: "",
      noindex: false,
      metatags: "",
      metadesc: "",
      tracker: "",
      settingsLoading: true,
      submitted: false,
      editorState: EditorState.createEmpty(),
    };

    this.onEditorChange = (editorState) => this.setState({ editorState });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const self = this;
    axios.get("http://127.0.0.1:8000/api/settings").then((res) => {
      console.log(res);
      self.setState({ banner: res.data.banner });
      self.setState({ contactmail: res.data.contactmail });
      self.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(res.data.maintext))
        ),
      });
      self.setState({ noindex: res.data.noindex === 1 });
      self.setState({ metatags: res.data.metatags });
      self.setState({ metadesc: res.data.metadesc });
      self.setState({ tracker: res.data.tracker });
      self.setState({ settingsLoading: false });
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleToggle(e) {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  }

  handleSubmit() {
    this.setState({ submitted: true });
    const {
      banner,
      contactmail,
      editorState,
      noindex,
      metatags,
      metadesc,
      tracker,
    } = this.state;
    const self = this;

    var noindexu = 0;
    if(noindex){
      noindexu = 1;
    }

    if (banner && contactmail) {
      const requestOptions = {
        headers: { "Content-Type": "application/json" },
        body: {
          data: {
            noindex: noindexu,
            banner: banner,
            contactmail: contactmail,
            metatags: metatags,
            metadesc: metadesc,
            tracker: tracker,
            maintext: JSON.stringify(
              convertToRaw(editorState.getCurrentContent())
            ),
          },
        },
      };

      axiosInstance
        .post(`/api/settings`, requestOptions.body, requestOptions.headers)
        .then((res) => {
          console.log(res);
          self.setState({ submitted: false });
        });
    } else {
      console.log(this.state);
    }
  }

  render() {
    const { user, users } = this.props;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Sample Settings
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        {this.state.settingsLoading ? (
          <div>Loading...</div>
        ) : (
          <main>
            <Container maxWidth="sm">
              <br></br>
              <br></br>
              <div>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={(e) => {
                    this.handleSubmit();
                    e.preventDefault();
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="banner"
                    label="banner"
                    name="banner"
                    autoComplete="banner"
                    autoFocus
                    value={this.state.banner}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="contactmail"
                    label="contactmail"
                    name="contactmail"
                    autoComplete="contactmail"
                    value={this.state.contactmail}
                    onChange={this.handleChange}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.noindex}
                        onChange={(e) => {
                          this.handleToggle(e);
                          e.preventDefault();
                        }}
                        name="noindex"
                      />
                    }
                    label="No Index"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="metatags"
                    label="metatags"
                    name="metatags"
                    autoComplete="metatags"
                    value={this.state.metatags}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="metadesc"
                    label="metadesc"
                    name="metadesc"
                    autoComplete="metadesc"
                    value={this.state.metadesc}
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="tracker"
                    label="tracker"
                    name="tracker"
                    autoComplete="tracker"
                    value={this.state.tracker}
                    onChange={this.handleChange}
                  />
                  &nbsp; Main Content:
                  <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorChange}
                  />
                  <br></br>
                  <br></br>
                  <hr></hr>
                  {this.state.submitted ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Save
                    </Button>
                  )}
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </form>
              </div>
            </Container>
          </main>
        )}
      </React.Fragment>
    );
  }
}

SettingsClass.propTypes = {
  user: PropTypes.shape({}),
  users: PropTypes.shape({}),
  logoutUser: PropTypes.func,
};

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(userActions.logout()),
  };
};

const SettingsComponent = withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(SettingsClass)
);

export default SettingsComponent;
