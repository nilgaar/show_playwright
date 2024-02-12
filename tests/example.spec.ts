import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { correctCredentials, wrongCredentials } from "../data/credentials";

test("Empty Form field", async ({ page }) => {
  await page.goto("/");

  const loginPage: LoginPage = new LoginPage(page);
  (await loginPage.fillLoginForm()).expectButtonDisabled();
});

test("Try wrong user", async ({ page }) => {
  await page.goto("/");

  const loginPage: LoginPage = new LoginPage(page);
  await loginPage.fillLoginForm(
    wrongCredentials.username,
    wrongCredentials.password
  );
  await loginPage.expectUnauthorizedReponse();
  await loginPage.submitLoginForm();
  loginPage.expectInvalidCredentialsAlert();
});

test("Try correct user", async ({ page }) => {
  await page.goto("/");

  const loginPage: LoginPage = new LoginPage(page);
  await loginPage.fillLoginForm(
    correctCredentials.username,
    correctCredentials.password
  );
  loginPage.expectOkResponse();
  await loginPage.submitLoginForm();
  loginPage.expectNoLoginFormFieldsVisible();
});
