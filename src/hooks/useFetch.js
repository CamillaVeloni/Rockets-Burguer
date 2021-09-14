import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Hook para dispachar ações de 'fetch' com ações, erro e refresh
const useFetch = (action) => {
  const dispatch = useDispatch();

  // state para loading data, erro e refresh
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [serverError, setServerError] = useState();

  // Função para dispachar actions
  const dispatchHandler = useCallback(async () => {
    setServerError(null);
    setRefresh(true);
    try {
      await dispatch(action);
    } catch (e) {
      setServerError(e.message);
    }
    setRefresh(false);
  }, [setServerError, setLoading, dispatch]);

  // Loading do Menu inicial (quando o app launch)
  useEffect(() => {
    setLoading(true);
    dispatchHandler().then(() => setLoading(false));
  }, [dispatch, dispatchHandler]);

  return { loading, serverError, refresh, dispatchHandler };
};

export default useFetch;
