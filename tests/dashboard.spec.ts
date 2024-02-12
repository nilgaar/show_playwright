import { test } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard";
import { correctCredentials } from "../data/credentials";
import { compileFunction } from "vm";

test.describe("Dashboard Page", () => {
  test("Check dashboard", async ({ page, context }) => {
    context.addCookies([
      {
        name: "connect.sid",
        value: "cookieValue",
        httpOnly: true,
        path: "/",
        domain: "localhost",
        sameSite: "None",
        secure: false,
      },
    ]);
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

      context.addCookies([
        {
          name: "connect.sid",
          value: cookieValue,
          httpOnly: true,
          path: "/",
          domain: "localhost",
          sameSite: "None",
          secure: false,
        },
      ]);
      console.log(await context.cookies());
    });
    console.log(await context.cookies());
    var dashPage: DashboardPage = new DashboardPage(page);
    await dashPage.goTo();
    await dashPage.expectDashboardTitle();
    console.log(await context.cookies());
  });
});
