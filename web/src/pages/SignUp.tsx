import { gql, useApolloClient, useMutation } from '@apollo/client';
import { ChangeEvent, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;
const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }
  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const SIGN_UP = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`;

function SignUp(props: RouteComponentProps) {
  useEffect(() => {
    document.title = 'Sign Up';
  });
  const [values, setValues] = useState({});
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp);
      props.history.push('/');
    },
  });
  return (
    <Wrapper>
      <h2>Sign up</h2>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          signUp({ variables: { ...values } });
          console.log(values);
        }}
      >
        <label htmlFor='username'>Username:</label>
        <input onChange={onChange} required type='text' id='username' name='username' placeholder='username' />
        <label htmlFor='email'>Email:</label>
        <input onChange={onChange} required type='text' id='email' name='email' placeholder='email' />
        <label htmlFor='password'>Password:</label>
        <input onChange={onChange} required type='password' id='password' name='password' placeholder='password' />
        <Button type='submit'>Submit</Button>
      </Form>
    </Wrapper>
  );
}

export default SignUp;
