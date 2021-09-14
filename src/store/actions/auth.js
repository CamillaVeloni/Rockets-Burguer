import { firebaseConfig } from '../../config';

export const STORING_USER = 'storingUser';

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

    dispatch({
      type: STORING_USER,
      token: realResponse.idToken,
      userId: realResponse.localId,
    });
  };
};

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

    dispatch({
      type: STORING_USER,
      token: realResponse.idToken,
      userId: realResponse.localId,
    });
  };
};
