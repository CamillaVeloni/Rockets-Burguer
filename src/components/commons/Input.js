import React, { useEffect, useReducer, forwardRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

// types para reducer
const INPUT_CHANGE = 'inputChange';
const INPUT_BLUR = 'inputBlur';

// Reducer do input
const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};
const Input = (props, ref) => {
  const { id, onInputChange } = props;

  // State do input ~~ usando reducer
  const [input, dispatch] = useReducer(inputReducer, {
    value: props?.initialValue ?? '',
    isValid: props.initiallyValid,
    touched: false,
  });

  // Handler do input
  const inputChangeHandler = (text) => {
    // Validação antes de usar dispatch
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid });
  };

  // UseEffect para passar info do input para o parent component
  useEffect(() => {
    if (input.touched || input.value.length != 0) {
      onInputChange(id, input.value, input.isValid);
    }
  }, [id, input, onInputChange]);

  // Handler para quando o input perder focu ~~ update touched state
  const lostFocusHandler = () => {
    dispatch({
      type: INPUT_BLUR,
    });
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        ref={ref}
        style={styles.input}
        onBlur={lostFocusHandler}
        onChangeText={inputChangeHandler}
        value={input.value}
      />
      {!input.isValid && input.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Mont-regular',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});

export default forwardRef(Input);
