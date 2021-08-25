import React, { useCallback, useEffect, useRef, useReducer } from 'react';
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
  const inputHandler = (input, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    formDispatch({ type: FORM_UPDATE, value: text, isValid, input });
  };

  // Referencias do input (usado no onSubmitEditing)
  const ref_inputUrl = useRef();
  const ref_inputDescription = useRef();
  const ref_inputPrice = useRef();

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
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título do produto:</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={inputHandler.bind(this, TITLE)}
          onSubmitEditing={() => ref_inputUrl.current.focus()}
          value={formState.inputValues.title}
        />
        {!formState.inputValidities.title && (
          <Text>Por favor, digite um titulo válido!</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Url do produto:</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={inputHandler.bind(this, IMAGEURL)}
          ref={ref_inputUrl}
          onSubmitEditing={() => ref_inputDescription.current.focus()}
          value={formState.inputValues.imageUrl}
        />
        {!formState.inputValidities.imageUrl && (
          <Text>Por favor, digite uma url válida!</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição do produto:</Text>
        <TextInput
          style={styles.input}
          returnKeyType="next"
          onChangeText={inputHandler.bind(this, DESCRIPTION)}
          blurOnSubmit={false}
          ref={ref_inputDescription}
          onSubmitEditing={() => {
            if (selectedItem) return;
            ref_inputPrice.current.focus();
          }}
          value={formState.inputValues.description}
        />
        {!formState.inputValidities.description && (
          <Text>Por favor, digite uma descrição válida!</Text>
        )}
      </View>
      {!selectedItem && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Preço do produto:</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            onChangeText={inputHandler.bind(this, PRICE)}
            ref={ref_inputPrice}
            value={formState.inputValues.price}
          />
          {!formState.inputValidities.price && (
            <Text>Por favor, digite um preço válido!</Text>
          )}
        </View>
      )}
      <Input
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        //onSubmitEditing={() => ref_inputUrl.current.focus()}
        label="Digite o titulo do item:"
        errorText="Por favor, digite um titulo válido!"
      />
      <Input
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        ref={ref_inputUrl}
        autoCorrect={false}
        //onSubmitEditing={() => ref_inputDescription.current.focus()}
        label="Digite o url do item:"
        errorText="Por favor, digite um url válido!"
      />
      <Input
        returnKeyType="next"
        ref={ref_inputDescription}
        blurOnSubmit={false}
        /* onSubmitEditing={() => {
          if (selectedItem) return;
          ref_inputPrice.current.focus();
        }} */
        multiline
        numberOfLines={3}
        label="Digite a descrição do item:"
        errorText="Por favor, digite uma descrição válida!"
      />
      <Input
        keyboardType="decimal-pad"
        ref={ref_inputPrice}
        label="Digite o preço do item:"
        errorText="Por favor, digite um preço válido!"
      />
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
});

export default EditItemScreen;
