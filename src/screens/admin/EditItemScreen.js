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
import { useDispatch } from 'react-redux';

import * as menuActions from '../../store/actions/menu';
import DefaultHeaderBtn from '../../components/commons/DefaultHeaderButton';

const TITLE = 'title';
const IMAGEURL = 'imageUrl';
const DESCRIPTION = 'description';
const PRICE = 'price';

const EditItemScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    description: '',
    price: '',
  });

  /* const savingHandler = useCallback(() => {
    dispatch(
      menuActions.addItem(
        form.title,
        form.imageUrl,
        form.description,
        form.price
      )
    );
  }, [dispatch, form]);

  useEffect(() => {
    navigation.setParams({ save: savingHandler });
  }, [savingHandler]); */

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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Preço do produto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newValue) => inputHandler(newValue, PRICE)}
          value={form.price}
        />
      </View>
    </ScrollView>
  );
};

export const screenOptions = ({ route }) => {
  //  const title = route.params.itemId ? 'Editar' : 'Criar'; // Verificando existe o id para mostrar titulo dinamico
  console.log(route)

  return {
    headerTitle: `Produto`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={DefaultHeaderBtn}>
        <Item
          title="Save"
          iconSize={23}
          iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
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
