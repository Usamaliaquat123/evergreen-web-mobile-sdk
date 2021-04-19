/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View, Text, Button, TextInput, StyleSheet,
} from 'react-native';
import { useFormik, Formik } from 'formik';
import * as yup from 'yup';
import firebase from '../config';
// import userService from '../services/user.service';
/**
 * Yup Validation Schema
 *
 */
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  mobile: yup
    .string()
    .min(8, ({ min }) => `Mobile must be at least ${min} characters`)
    .required('Mobile is required'),
  username: yup
    .string()
    .min(8, ({ min }) => `Username must be at least ${min} characters`)
    .required('Username is required'),
});

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 55,
    backgroundColor: '#fff',
    margin: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#4e4e4e',
    // color: '#000',
    color: 'red',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function SignUp() {
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
  });

  return (
    <Formik
      validationSchema={loginValidationSchema}
      // initialValues={{
      //   username: '', mobile: '', email: '', password: '',
      // }}
      initialValues={{
        username: 'maliksblr92',
        mobile: '03441500542',
        email: 'asd@gmail.com',
        password: '66068957',
      }}
      onSubmit={(values, { resetForm }) => {
        console.log('====================================');
        console.log('onSubmit', values);
        console.log('====================================');
        //   try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
        //     console.log('====================================');
        //     console.log('onSubmit', values);
        //     console.log('====================================');
        //     const {
        //       username, password, email, mobile,
        // 	  } = values;
        // 	  setUser({
        //       username, password, mobile, email,
        // 	  });

        //     // Get a database reference to our blog
        //     const db = firebase.database();
        //     const ref = db.ref('db');
        //     // const usersRef = ref.child(`users/${email}`);
        //     db.ref('users/').push({
        //    		username,
        //         email,
        //         password,
        //         mobile,

        //     });

        // 	  resetForm({ values: '' });
        //   } catch (e) {
        //     console.log('====================================');
        //     console.log('Exception in Submit Function ', e);
        //     console.log('====================================');
        //   }
      }}
    >
      {({
        handleChange, handleBlur, handleSubmit, values, errors, isValid,
      }) => (
        <View style={styles.container}>
          <TextInput
            name="username"
            placeholder="username"
            style={styles.input}
            // onChangeText={(val) => { setUser({ username: val }); }}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {errors.username && (
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
          )}
          <TextInput
            name="email"
            placeholder="email"
            style={styles.input}
            // onChangeText={(val) => { setUser({ email: val }); }}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && (
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
          )}

          <TextInput
            name="password"
            placeholder="Password"
            style={styles.input}
            // onChangeText={(val) => { setUser({ password: val }); }}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {errors.password && (
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
          )}

          <TextInput
            name="mobile"
            placeholder="mobile"
            style={styles.input}
            // onChangeText={(val) => { setUser({ mobile: val }); }}
            onChangeText={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            value={values.mobile}
          />
          {errors.mobile && (
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.mobile}</Text>
          )}
          <Button
            color="#3740FE"
            title="Sign Up"
            // disabled={!isValid}
            onPress={handleSubmit}
          ></Button>
        </View>
      )}
    </Formik>
  );
}
