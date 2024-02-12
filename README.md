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

### 