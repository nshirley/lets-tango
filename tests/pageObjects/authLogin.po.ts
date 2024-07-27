import {type Page} from "@playwright/test"

export class AuthLoginPage{
    readonly page: Page;
    constructor(page: Page){
        this.page = page
    }

    /**
     * Logs into the application using the provided credentials.
     * @param username 
     * @param password 
     */
    async logInWithCredentials(username: string, password: string) {
        await this.page.getByTestId("auth.signIn.emailInput").fill(username)
        await this.page.getByTestId("auth.signIn.passwordInput").fill(password)
    }
}