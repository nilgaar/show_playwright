import { test as setup } from "@playwright/test";
import { correctCredentials } from "../data/credentials";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ request }) => {
  // Send authentication request. Replace with your own.
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
