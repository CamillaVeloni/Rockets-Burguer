import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Hook para dispachar ações de fetch para redux
// Possui state para erro, refresh e error
const useAction = () => {
  const dispatch = useDispatch();

  // state para loading data, erro
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Função para dispachar actions
  const dispatchActionHandler = async (action) => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(action);
    } catch (e) {
      setError(e.message);
    }

    setIsLoading(false);
  };

  return { isLoading, error, dispatchActionHandler };
};

export default useAction;
