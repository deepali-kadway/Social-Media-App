export interface Login {
    inputIdentifier: string,
    inputIdentifierType: 'emailInput' | 'phoneInput' | 'usernameInput',
    passwordInput: string
}
