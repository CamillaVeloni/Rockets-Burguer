import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as menuActions from '../../store/actions/menu';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderButton';

const TITLE = 'title';
const IMAGEURL = 'imageUrl';
const DESCRIPTION = 'description';
const PRICE = 'price';

const EditItemScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const itemId = route.params?.itemId ?? null; // pegando id passado pelo adminScreen
  const selectedItem = useSelector(({ menu }) =>
    menu.availableMenu.find((item) => item.id === itemId)
  );

  const [form, setForm] = useState({
    title: selectedItem?.title ?? '',
    imageUrl: selectedItem?.imageUrl ?? '',
    description: selectedItem?.description ?? '',
    price: '',
  });

  const ref_inputUrl = useRef();
  const ref_inputDescription = useRef();
  const ref_inputPrice = useRef();

  const submitHandler = useCallback(() => {
    if (selectedItem) {
      // Editar item do cardapio
      dispatch(
        menuActions.updateItem(
          itemId,
          form.title,
          form.imageUrl,
          form.description
        )
      );
    } else {
      dispatch(
        menuActions.createItem(
          form.title,
          form.imageUrl,
          form.description,
          +form.price
        )
      );
    }
    navigation.dispatch(CommonActions.goBack());
  }, [form, itemId, dispatch]);

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

  const inputHandler = (value, name) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título do produto:</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(newValue) => inputHandler(newValue, TITLE)}
          onSubmitEditing={() => ref_inputUrl.current.focus()}
          value={form.title}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Url do produto:</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(newValue) => inputHandler(newValue, IMAGEURL)}
          ref={ref_inputUrl}
          onSubmitEditing={() => ref_inputDescription.current.focus()}
          value={form.imageUrl}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição do produto:</Text>
        <TextInput
          style={styles.input}
          returnKeyType="next"
          onChangeText={(newValue) => inputHandler(newValue, DESCRIPTION)}
          ref={ref_inputDescription}
          onSubmitEditing={() => {
            if(selectedItem) return;
            ref_inputPrice.current.focus();
          }}
          value={form.description}
        />
      </View>
      {!selectedItem && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Preço do produto:</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            onChangeText={(newValue) => inputHandler(newValue, PRICE)}
            ref={ref_inputPrice}
            value={form.price}
          />
        </View>
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
