import { userConstants } from '../constants';
import { userService } from '../services';
// import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  register
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push('/settings');
      },
      error => {
        dispatch(failure(error));
        // dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  return async (dispatch, getState) => {
    const { user, loggingOut } = getState().authentication;

    if (!loggingOut) {
      if (user && user.refreshToken) {
        try {
          dispatch({ type: userConstants.LOGOUT_REQUEST });
          await userService.logout(user.refreshToken);
          history.push('/login');

          return { type: userConstants.LOGOUT };
        } catch (error) {
          return { type: userConstants.LOGOUT_FAILURE };
        }
      } else {
        history.push('/login');
        return { type: userConstants.LOGOUT };
      }
    }
  };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      () => {
        dispatch(success());
        history.push('/settings');
        // dispatch(alertActions.success('Registration successful'));
        
      },
      error => {
        dispatch(failure(error));
        // dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}
