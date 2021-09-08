import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as menuActions from '../../store/actions/menu';
import Input from '../../components/commons/Input';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderButton';

const FORM_UPDATE = 'update';

const TITLE = 'title';
const IMAGEURL = 'imageUrl';
const DESCRIPTION = 'description';
const PRICE = 'price';

// Reducer do formulário
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedForm = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let isFormValidUpdate = true;
      for (const key in updatedValidities) {
        isFormValidUpdate = isFormValidUpdate && updatedValidities[key];
      }
      return {
        isFormValid: isFormValidUpdate,
        inputValues: updatedForm,
        inputValidities: updatedValidities,
      };
    default:
      return state;
  }
};

const EditItemScreen = ({ route, navigation }) => {
  const dispatch = useDispatch(); // dispatch redux

  // Modo Editar Item ~~ passado do dashboard (AdminScreen)
  const itemId = route.params?.itemId ?? null;
  const selectedItem = useSelector(({ menu }) =>
    menu.availableMenu.find((item) => item.id === itemId)
  );

  // Formulário State ~~ usando reducer
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: selectedItem?.title ?? '',
      imageUrl: selectedItem?.imageUrl ?? '',
      description: selectedItem?.description ?? '',
      price: '',
    },
    inputValidities: {
      title: selectedItem ? true : false,
      imageUrl: selectedItem ? true : false,
      description: selectedItem ? true : false,
      price: selectedItem ? true : false,
    },
    isFormValid: selectedItem ? true : false,
  });

  // Handler para os inputs
  const inputHandler = useCallback(
    (inputIdentifier, inputValue, isInputValid) => {
      formDispatch({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: isInputValid,
        input: inputIdentifier,
      });
    },
    [formDispatch]
  );

  // Referencias do input (usado no onSubmitEditing)
  const ref_inputUrl = useRef();
  const ref_inputDescription = useRef();

  // Handler usado no useEffect para dispachar criar ou editar item
  const submitHandler = useCallback(() => {
    if (!formState.isFormValid) {
      Alert.alert(
        'Erro no formulário!',
        'Você não preencheu o formulário corretamente.',
        [{ text: 'Ok' }]
      );
      return;
    }

    if (selectedItem) {
      // Editar item do cardapio
      dispatch(
        menuActions.updateItem(
          itemId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );
    } else {
      dispatch(
        menuActions.createItem(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description,
          +formState.inputValues.price
        )
      );
    }
    navigation.dispatch(CommonActions.goBack());
  }, [formState, itemId, dispatch]);

  useEffect(() => {
    // criando options dinamicamente
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={DefaultHeaderBtn}>
          <Item
            title="Save"
            iconSize={23}
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Input
        id={TITLE}
        autoCorrect={false}
        returnKeyType="next"
        label="Digite o titulo do item:"
        errorText="Por favor, digite um titulo válido!"
        onInputChange={inputHandler}
        onSubmitEditing={() => ref_inputUrl.current.focus()}
        blurOnSubmit={false}
        initialValue={selectedItem?.title ?? ''}
        initiallyValid={!!selectedItem}
        required
      />
      <Input
        id={IMAGEURL}
        ref={ref_inputUrl}
        autoCorrect={false}
        returnKeyType="next"
        label="Digite o url do item:"
        errorText="Por favor, digite um url válido!"
        onInputChange={inputHandler}
        onSubmitEditing={() => ref_inputDescription.current.focus()}
        blurOnSubmit={false}
        initialValue={selectedItem?.imageUrl ?? ''}
        initiallyValid={!!selectedItem}
        required
      />
      <Input
        id={DESCRIPTION}
        ref={ref_inputDescription}
        multiline
        numberOfLines={3}
        label="Digite a descrição do item:"
        errorText="Por favor, digite uma descrição válida!"
        onInputChange={inputHandler}
        initialValue={selectedItem?.description ?? ''}
        initiallyValid={!!selectedItem}
        required
        minLength={5}
      />
      {!selectedItem && (
        <Input
          id={PRICE}
          keyboardType="decimal-pad"
          label="Digite o preço do item:"
          errorText="Por favor, digite um preço válido!"
          onInputChange={inputHandler}
          required
          min={0.1}
        />
      )}
    </ScrollView>
  );
};

export const screenOptions = ({ route }) => {
  const title = route.params?.itemId ? 'Editar' : 'Criar'; // Verificando existe o id para mostrar titulo dinamico

  return {
    headerTitle: `${title} Item`,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});

export default EditItemScreen;
