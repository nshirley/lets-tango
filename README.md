# lets-tango
This is the take home project for Tango.us QE role. Tests are written in `playwright` with the default typescript selected.

## Requirements
- Node, v `10.20.4>`

## Getting Started
1. Install dependencies `npm install`
2. Install playwright if you haven't yet, `npx playwright install` (need to double check this command with a new install)
3. Setup your `.env` file with a copy of `example.env`, populate values for test account!
4. Run the tests! `npm run test:all`


## Known Issues
There are a few issues I ran into I couldn't prioritize to solve, noted below with my _assumed_ reasons.

- In VSCode, I cannot get debugging working. There's an error of missing module `jest.js`. I'm guessing I have a weird environmental configuration and would need to take a bit of time to dig deeper. Since standard running works I've ignored for now.
- I tried to add POM but ran into issues with the test hanging, and since I couldn't debug I had to abandon - no DRY code today! My assumption is I did something weird with the values passed in, it kept timing out on the password field.

## Future Updates
A few things I would like to also do but don't have time for:

- Add a few more npm scripts for running in headed mode, with specific browsers etc.
- Clean up references to `process.env` - There's a need to coalesce values which isn't great. There are a few other packages like [config](https://www.npmjs.com/package/config) that would be good to swap out but require more time to setup.
- Consolidation with parameterized tests. This would be helpful for things like "bad password/email" tests and more. A single test would be reusable for multiple tests.
- Use setup to handle authentication and bypass it for necessary tests. This would save a lot of time in tests and allow us to focus on functionality under tests, not necessarily the full _end-to-end_ for stability.

### Tests
These are the tests/scenarios I found with a few minutes of digging through the site and how I would start to prioritize tests. This was originally a comment so, sorry to just drop it in a code block like this!

```
Tango.us tests outline, these are general tests that would be valuable
to initially cover. Not all will be touched in this project, but
these are the tests I can spot that I would _want_ to test given enough
time.

I'm focusing on Auth and Settings to start. General account management is
where I like to start as it's basic functionality that shouldn't change often
but is critical to operations. 

Business functionality like the Team Library, popping the Upgrade Modal,
"Get the extension" Button would be next priority with groundwork laid in prior tests.

**Tests**

- Auth/login, user can login with username & password ✅
- Auth/login, user login is rejected for bad email ✅
- Auth/login, user login is rejected for bad password ✅
- Auth/login, user can logout ✅

- Settings, search for member
- Settings, Guests list loads (empty currently)
- Settings, Invites & requests (empty currently)
   - Send invite to @mailinator email, shows up in list (this could be flaky, and would require careful management of test data)

- Settings, Profile edit name
- Settings, Edit password (similar to above, careful management of test data, or would require creating a new account for each test run)

- Settings, Branding requires Pro
- Settings, Billing shows different tiers
- Settings, Billing has appropriate tiers (should be parameterized)

- Settings, update workspace name
- Settings, Leave workspace as only admin (should stop or send to member screen)

--- If time allows

- Team Library, loads no tangos initially
- Team Library, create folder
- Team Library, limit access to folder
- Team Library, access to Pro on click opens Upgrade screen
```