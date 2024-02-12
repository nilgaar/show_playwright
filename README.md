# Playwright Showcase

## Run the project

be sure to start the cypress-realworld-app before running the tests:

```sh
git clone https://github.com/cypress-io/cypress-realworld-app.git
cd cypress-realworld-app
yarn
yarn start
```

then run:

```sh
npm install
npm run test
```

## The architecture

The Project is build arround the Page Object Model design. Every view is represented by a Page which contains its main components.
Some components that may be shared but may be out of scope, like a Navigation Bar, are placed under /components, and may also be atributes for other pages, like NavBar is for Dashboard.

The projects is portable to Firefox, Chrome, Safari and Mobile viewports.

### Versatility and Reusability.

With this concepts in mind, anb using the nullability of parameters allowed by JS, some methods, like the ones that fill forms (like `fillLoginForm`), can accept _null_ values to test the behaviour of form when the fields are left blank.

### Working with Fixtures

Fixtures are a key feature of Playwright, I had the chance to implement one in the **login** tests.

### Best Practices

I always stick to the framework best practices of the automation framwork I'm working with.

In the case of PLaywright:

1. **Test user-visible behavior** : I always verify that the user-facing behaviour is correct, but I use to do it along with data-verification, like with the login: I checked that the user gets into the dashboard or receives an error, but also the response code of the backend, to be sure both are aligned.

2. **Make tests as isolated as possible**: Crucial in any testing framwwork. Check.

3. **Avoid testing third-party dependencies** : Nothing like this camse accross at the moment.

4. **Testing with a database**: This is part of the _Room for Improvement_

5. **Use locators** & **Generate locators**: In all cases I tried to use the most simple, yet robust locators, trying to avoid filters, XPATHs or complex CSS selectors.
   In some cases, using the _codegen locator generator_ was useful.

6. **Use web first assertions**: A great feature, that I've used in the _LoginPage_ for instance.

7. **Use Playwright's Tooling**: Using VSCode with Playwright works perfect, the debugging experience is great. Other tools has been used, like TS and the UI Mode.

8. **Test across all browsers**: All broswer engines have been used, with some small flakiness that I'll like to fix in the future.

9. **Run tests on CI**: The project also contains a github action to run the tests (The one that the `playwright init` make to be honest). The action is failing atm because it does not start the server.

10. **Lint your tests**: I always work with lints. Adding the `no-floating-promises` is **key** when working with Playwright.

## Playwright Tooling

I do not like the replay function in the **Codegen** tool, but it is useful to help find some locators for component in a Playwright way.

## Room for improvement

There are a few things in this projects that have room for improvement:

### Login with API

I've tried two different approaches that didn't worked and ended up desestimating for now. I'm not pretty sure why it didn't worked as expected but didn't had much time to check it out now.

My first try was with the **setup** method. In this case, the session cookie was correctly loaded into the browser, but somehow it was not valid and the `goTo("/")`ended up into signin anyway:

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

My second attempt was to directly insert the cookie in the context. Nonetheless, the cookie was not correctly added either:

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
      const cookieName = cookie.substring(0, cookie.indexOf("="));
      const cookieValue = cookie.substring(
        cookie.indexOf("=") + 1,
        cookie.indexOf(";")
      );

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

Ideally, for each test execution, a brand new user shall be created, either through a API call or a Database query. This shall be a `setup`.
