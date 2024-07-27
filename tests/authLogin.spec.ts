import { test, expect } from '@playwright/test';


test('Auth page allows login', async ({ page }) => {
  await page.goto('/');

  // input email into email field - `fill` waits for element to be actionable
  await page.getByTestId("auth.signIn.emailInput").fill(process.env.DEFAULT_EMAIL ?? "")
  await page.getByTestId("auth.signIn.passwordInput").fill(process.env.DEFAULT_PASSWORD ?? "")

  // submit!
  await page.getByTestId("auth.signIn.submitButton").click()

  // assertion we're successfully logged in (it would be better to look for an element, but this works for now)
  await expect(page).toHaveTitle("Team Library")
});

test('Auth page rejects with bad password', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId("auth.signIn.emailInput").fill(process.env.DEFAULT_EMAIL ?? "")
  await page.getByTestId("auth.signIn.passwordInput").fill("BAD_PASSWORD_YO")

  // submit!
  await page.getByTestId("auth.signIn.submitButton").click()

  // Check that the alert message is present and button is enabled after failure.
  // I don't like doing more than one assertion typically, but given familiarity 
  // of the tool, I want to be extra sure! Another solution could be found later.
  await expect(page.getByText("We couldn't find that account.")).toBeVisible()
  await expect(page.getByTestId("auth.signIn.submitButton")).toBeEnabled()
});


test('Auth page rejects with bad username', async ({ page }) => {
  await page.goto('/');
  
  // use a random email to avoid risk of a "real" email
  const randInt = Math.floor(Math.random() * 10000)
  const randEmail = `testEmail${randInt}@mailinator.com`

  // fill with bad email and a known good password
  await page.getByTestId("auth.signIn.emailInput").fill(randEmail)
  await page.getByTestId("auth.signIn.passwordInput").fill(process.env.DEFAULT_PASSWORD ?? "")

  // submit!
  await page.getByTestId("auth.signIn.submitButton").click()

  // assert!
  await expect(page.getByText("We couldn't find that account.")).toBeVisible()
  await expect(page.getByTestId("auth.signIn.submitButton")).toBeEnabled()
});

test('User can log out', async({ page }) => {
  await page.goto('/');

  // input credentials
  await page.getByTestId("auth.signIn.emailInput").fill(process.env.DEFAULT_EMAIL ?? "")
  await page.getByTestId("auth.signIn.passwordInput").fill(process.env.DEFAULT_PASSWORD ?? "")

  // submit!
  await page.getByTestId("auth.signIn.submitButton").click()

  // wait for the user menu so we can open it
  await page.getByTestId("shared.workspaceSwitcher.dropdownTrigger").click()
  
  // click logout
  await page.getByText("Log out").click()

  // assert!
  await expect(page).toHaveTitle("Tango - Supercharge your team")
})