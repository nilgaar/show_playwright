# Playwright Showcase

## Run the project

Be sure to start the cypress-realworld-app before running the tests:

```sh
git clone https://github.com/cypress-io/cypress-realworld-app.git
cd cypress-realworld-app
yarn
yarn start
```

In another terminal, run:

```sh
echo "baseUrl= "http://localhost:3000"" >> .env
npm install
npm run test
```

## The architecture

The Project is built around the Page Object Model design. Every view is represented by a Page which contains its main components.
Some components that may be shared but may be out of scope, like a Navigation Bar, are placed under /components, and may also be attributes for other pages, like NavBar is for Dashboard.

The project is portable to Firefox, Chrome, Safari, and Mobile viewports.

### Versatility and Reusability.

With these concepts in mind, and using the nullability of parameters allowed by JS, some methods, like the ones that fill forms (like `fillLoginForm`), can accept _null_ values to test the behavior of the form when the fields are left blank.

### Working with Fixtures

Fixtures are a key feature of Playwright, I had the chance to implement one in the **login** tests.

### Best Practices

I always stick to the framework best practices of the automation framework I'm working with.

In the case of Playwright:

1. **Test user-visible behavior**: I always verify that the user-facing behavior is correct, but I use to do it along with data-verification, like with the login: I checked that the user gets into the dashboard or receives an error, but also the response code of the backend, to be sure both are aligned.

2. **Make tests as isolated as possible**: Crucial in any testing framework. Check.

3. **Avoid testing third-party dependencies**: Nothing like this came across at the moment.

4. **Testing with a database**: This is part of the _Room for Improvement_.

5. **Use locators** & **Generate locators**: In all cases, I tried to use the most simple, yet robust locators, trying to avoid filters, XPaths, or complex CSS selectors.
   In some cases, using the _codegen locator generator_ was useful.

6. **Use web first assertions**: A great feature, that I've used in the _LoginPage_ for instance.

7. **Use Playwright's Tooling**: Using VSCode with Playwright works perfectly, the debugging experience is great. Other tools have been used, like TS and the UI Mode.

8. **Test across all browsers**: All browser engines have been used, with some small flakiness that I'd like to fix in the future.

9. **Run tests on CI**: The project also contains a GitHub action to run the tests (The one that the `playwright init` make to be honest). The action is failing atm because it does not start the server.

10. **Lint your tests**: I always work with lints. Adding the `no-floating-promises` is **key** when working with Playwright.

## Playwright Tooling

I do not like the replay function in the **Codegen** tool, but it is useful to help find some locators for components in a Playwright way.

## Room for improvement

There are a few things in this project that have room for improvement:

### More test cases

At this point in time, I didn't have much time to add coverage.

### Login with API

I've tried two different approaches that didn't work and ended up de-estimating for now. I'm not pretty sure why it didn't work as expected but didn't have much time to check it out now.

My first try was with the **setup** method. In this case, the session cookie was correctly loaded into the browser, but somehow it was not valid and the `goTo("/")` ended up into sign-in anyway:

```TS
const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ request }) => {
  await request.post("http://localhost:3001/login", {
    data: {
      ...correctCredentials,
      type: "LOGIN",
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  await request.storageState({ path: authFile });
});
```

My second attempt was to directly insert the cookie into the context. Nonetheless, the cookie was not correctly added either:

```TS
test("Check dashboard", async ({ page, context }) => {
    var cookieVals;

    await fetch("http://localhost:3001/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        ...correctCredentials,
        type: "LOGIN",
      }),
    }).then((res) => {
      const cookie = res.headers.getSetCookie()[0];
      const cookiePattern = /^(.*?)=(.*?);/;
      const match = cookie.match(cookiePattern);

      let cookieName = '';
      let cookieValue = '';

      if (match) {
        cookieName = match[1];
        cookieValue = match[2];
      }

      cookieVals = [
        {
          name: cookieName,
          value: cookieValue,
          httpOnly: true,
          path: "/",
          domain: "localhost",
          sameSite: "None",
          secure: false,
        },
      ];
    });
    await context.addCookies(cookieVals);
    await page.goto("/");
});
```

### One test, one user.

Ideally, for each test execution, a brand new user shall be created, either through an API call or a Database query. This shall be a `setup`.

### OOP improvements and overall.

It is likely that some improvements can be made in terms of OOP.
