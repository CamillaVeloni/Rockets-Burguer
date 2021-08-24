import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
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
          onChangeText={(newValue) => inputHandler(newValue, TITLE)}
          value={form.title}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Url do produto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newValue) => inputHandler(newValue, IMAGEURL)}
          value={form.imageUrl}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição do produto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newValue) => inputHandler(newValue, DESCRIPTION)}
          value={form.description}
        />
      </View>
      {!selectedItem && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Preço do produto:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(newValue) => inputHandler(newValue, PRICE)}
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
