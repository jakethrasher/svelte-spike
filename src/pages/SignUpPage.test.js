import SignUpPage from './SignUpPage.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';

describe('sign up page', () => {
  describe('Layout', () => {
    it('has sign up header', () => {
      render(SignUpPage);
      const header = screen.getByRole('heading', {name: 'Sign Up'})
      expect(header).toBeInTheDocument();
    })
    it('has username input', () => {
      const {container} = render(SignUpPage);
      const usernameInput = screen.getByLabelText('Username');
      expect(usernameInput).toBeInTheDocument();
    })
    it('has email input', () => {
      render(SignUpPage);
      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toBeInTheDocument();
    })
    it('has password input', () => {
      render(SignUpPage);
      const passwordInput = screen.getByLabelText('Password')
      expect(passwordInput).toBeInTheDocument();
    })
    it('has password type for password input', () => {
      render(SignUpPage);
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput.type).toBe('password'); 
    })
    it('has password repeat input', () => {
      render(SignUpPage);
      const passwordInput = screen.getByLabelText('Password Repeat')
      expect(passwordInput).toBeInTheDocument();
    })
    it('has password type for password input', () => {
      render(SignUpPage);
      const passwordRepeatInput = screen.getByLabelText('Password Repeat');
      expect(passwordRepeatInput.type).toBe('password'); 
    })
    it('has a button for signup', () => {
      render(SignUpPage);
      const signUpButton = screen.getByRole('button', {name: 'Sign Up'});
      expect(signUpButton).toBeInTheDocument(); 
    })
    it('disables button initially', () => {
      render(SignUpPage);
      const signUpButton = screen.getByRole('button', {name: 'Sign Up'});
      expect(signUpButton).toBeDisabled(); 
    });
  });

  describe('Interactions', () => {
    it('enables the button when password and password repeat have same value', async () => {
      render(SignUpPage);
      const passwordInput = screen.getByLabelText('Password');
      const passwordRepeatInput = screen.getByLabelText('Password Repeat');
      const signUpButton = screen.getByRole('button', {name: 'Sign Up'});

      await userEvent.type(passwordInput, 'P4ssword');
      await userEvent.type(passwordRepeatInput, 'P4ssword');

      expect(signUpButton).toBeEnabled();
    });
    it('sends username, email, and password to backend after clicking button', async () => {
      render(SignUpPage);
      const username = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const passwordRepeatInput = screen.getByLabelText('Password Repeat');
      const signUpButton = screen.getByRole('button', {name: 'Sign Up'});
      
      await userEvent.type(username, 'spiderman');
      await userEvent.type(emailInput, 'spidey@gmail.com');
      await userEvent.type(passwordInput, 'P4ssword');
      await userEvent.type(passwordRepeatInput, 'P4ssword');

      const mockFn = jest.fn();
      axios.post = mockFn;

      await userEvent.click(signUpButton);
      
      const firstCall = mockFn.mock.calls[0];
      const body = firstCall[1];
      expect(body).toEqual({
        username: 'spiderman',
        email: 'spidey@gmail.com',
        password: 'P4ssword',
      })
    });
  });
})
