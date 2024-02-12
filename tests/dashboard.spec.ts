import { test } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard";
import { correctCredentials } from "../data/credentials";
import { compileFunction } from "vm";

test.describe("Dashboard Page", () => {
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
          domain: "localhost:3000",
          sameSite: "None",
          secure: false,
        },
      ];
      console.log(cookieVals);
    });
    await context.addCookies(cookieVals);
    console.log(await context.cookies());

    await page.goto("/");
    console.log(await context.cookies());

    const dashboardPage = new DashboardPage(page);
  });
});
