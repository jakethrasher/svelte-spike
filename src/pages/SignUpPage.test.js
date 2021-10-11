import SignUpPage from './SignUpPage.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('sign up page', () => {
  describe('Layout', () => {
    it('has sign up header', () => {
      render(SignUpPage);
      const header = screen.getByRole('heading', {name: 'Sign Up'})
      expect(header).toBeInTheDocument();
    })
    it('has username input', () => {
      const {container} = render(SignUpPage);
      const usernameInput = screen.getByLabelText('Username')
      expect(usernameInput).toBeInTheDocument();
    })
    it('has email input', () => {
      render(SignUpPage);
      const emailInput = screen.getByLabelText('Email')
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
  });
})
