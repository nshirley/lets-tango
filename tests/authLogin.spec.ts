import { test, expect } from '@playwright/test';



/**
 * Tango.us tests outline, these are general tests that would be valuable
 * to initially cover. Not all will be touched in this project, but
 * these are the tests I can spot that I would _want_ to test given enough
 * time.
 * 
 * I'm focusing on Auth and Settings to start. General account management is
 * where I like to start as it's basic functionality that shouldn't change often
 * but is critical to operations. 
 * 
 * Business functionality like the Team Library, popping the Upgrade Modal,
 * "Get the extension" Button would be next priority with groundwork laid in prior tests.
 * 
 * **Tests**
 * 
 * - Auth/login, user can login with username & password
 * - Auth/login, user login is rejected for bad email
 * - Auth/login, user login is rejected for bad password
 * 
 * - Settings, search for member
 * - Settings, Guests list loads (empty currently)
 * - Settings, Invites & requests (empty currently)
 *    - Send invite to @mailinator email, shows up in list (this could be flaky, and would require careful management of test data)
 * 
 * - Settings, Profile edit name
 * - Settings, Edit password (similar to above, careful management of test data, or would require creating a new account for each test run)
 * 
 * - Settings, Branding requires Pro
 * - Settings, Billing shows different tiers
 * - Settings, Billing has appropriate tiers (should be parameterized)
 * 
 * - Settings, update workspace name
 * - Settings, Leave workspace as only admin (should stop or send to member screen)
 * 
 * --- If time allows
 * 
 * - Team Library, loads no tangos initially
 * - Team Library, create folder
 * - Team Library, limit access to folder
 * - Team Library, access to Pro on click opens Upgrade screen
 * */


test('Auth page allows login', async ({ page }) => {
  await page.goto('https://app.tango.us/sign-in');

  // input email into email field - `fill` waits for element to be actionable
  // TODO: 
  await page.getByTestId("auth.signIn.emailInput").fill(process.env.DEFAULT_EMAIL ?? "")
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
