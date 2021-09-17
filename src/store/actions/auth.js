import * as SecureStore from 'expo-secure-store';

import { firebaseConfig } from '../../config';

export const LOGOUT = 'logout';
export const STORING_USER = 'storingUser';

let timer;

export const authenticate = (token, userId, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: STORING_USER,
      token,
      userId,
    });
  };
};

// Cadastrando usuário no firebase
export const signupUser = (email, password) => {
  return async (dispatch) => {
    const resp = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!resp.ok) {
      const realResponseError = await resp.json();
      const errorId = realResponseError.error.message;

      let message =
        'Algo deu errado na requisição. Tente novamente mais tarde.';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'O endereço de e-mail já está sendo usado.';
      }

      throw new Error(message);
    }

    const realResponse = await resp.json();
    // expiresIn === 'string' - The number of SECONDS in which the ID token expires
    const expiresNumber = parseInt(realResponse.expiresIn) * 1000;

    const expirationDate = new Date(new Date().getTime() + expiresNumber);
    // expirationDate === timestamp object
    savingUserInStorage(
      realResponse.idToken,
      realResponse.localId,
      expirationDate
    );

    dispatch(
      authenticate(realResponse.idToken, realResponse.localId, expiresNumber)
    );
  };
};

// Login do usuário no firebase
export const signinUser = (email, password) => {
  return async (dispatch) => {
    const resp = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!resp.ok) {
      const realResponseError = await resp.json();
      const errorId = realResponseError.error.message;
      //console.log(realResponseError);
      let message =
        'Algo deu errado na requisição. Tente novamente mais tarde.';
      if (errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD') {
        message = 'Este e-mail não está cadastrado ou a senha está incorreta.';
      }

      throw new Error(message);
    }

    const realResponse = await resp.json();
    // expiresIn === 'string' - The number of SECONDS in which the ID token expires
    const expiresNumber = parseInt(realResponse.expiresIn) * 1000;
    const expirationDate = new Date(
      new Date().getTime() + expiresNumber
    );
    // expirationDate === timestamp object
    savingUserInStorage(
      realResponse.idToken,
      realResponse.localId,
      expirationDate
    );

    dispatch(
      authenticate(realResponse.idToken, realResponse.localId, expiresNumber)
    );
  };
};

// Deslogando o usuário
export const logoutUser = () => {
  return async (dispatch) => {
    clearLogoutTimer();
    await SecureStore.deleteItemAsync('userData');
    dispatch({ type: LOGOUT });
  };
};

// Para quando deslogar manualmente ou automaticamente
const clearLogoutTimer = () => {
  clearTimeout(timer);
};

// Criando timer para quando o token expirar sair automaticamente do app
const setLogoutTimer = (expirationTime) => {
  return async (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logoutUser());
    }, expirationTime);
  };
};

// salvando usuário no secure storage
const savingUserInStorage = async (idToken, localId, expirationDate) => {
  const userData = 'userData'; // por enquanto??

  await SecureStore.setItemAsync(
    userData,
    JSON.stringify({
      token: idToken,
      userId: localId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
