import { test, expect } from "@playwright/test";

// Test user credentials loaded from environment variables
const TEST_USER = {
  email: process.env.TEST_USER_EMAIL || "test@example.com",
  password: process.env.TEST_USER_PASSWORD || "testpassword123",
};

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing session
    await page.context().clearCookies();
  });

  test("anonymous user should be redirected to free version", async ({
    page,
  }) => {
    await page.goto("/");

    // Should be redirected to the free version
    await expect(page).toHaveURL("/summarizer-free");

    // Should see the free version title
    await expect(page.locator("h2")).toContainText("Free Summarizer");

    // Should see login button in navbar
    await expect(page.locator("text=Login")).toBeVisible();

    // Should see free version link in navbar
    await expect(page.locator("text=Free Version")).toBeVisible();
  });

  test("should navigate to login page and show login form", async ({
    page,
  }) => {
    await page.goto("/login");

    // Should see login form elements
    await expect(page.locator("h1")).toContainText("Sign In");
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText(
      "Sign in"
    );

    // Should see signup link
    await expect(
      page.locator("text=Don't have an account yet? Sign up.")
    ).toBeVisible();
  });

  test("should navigate to signup page and show signup form", async ({
    page,
  }) => {
    await page.goto("/signup");

    // Should see signup form elements
    await expect(page.locator("h1")).toContainText("Sign Up");
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="password2"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText(
      "Sign Up"
    );
  });

  test("should handle invalid login credentials", async ({ page }) => {
    await page.goto("/login");

    // Fill in invalid credentials
    await page.fill('input[name="email"]', "invalid@example.com");
    await page.fill('input[name="password"]', "wrongpassword");

    // Submit the form
    await page.click('button[type="submit"]');

    // Should stay on login page with error message
    await expect(page).toHaveURL(/.*login.*/);

    // Should show error message (if implemented)
    // Note: This test assumes error handling is implemented
  });

  test("should handle successful login and redirect to pro version", async ({
    page,
  }) => {
    // Note: This test requires a real user account in Supabase
    // You may need to create a test user or use environment variables

    await page.goto("/login");

    // Fill in valid credentials
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);

    // Submit the form
    await page.click('button[type="submit"]');

    // Should be redirected to pro version
    await expect(page).toHaveURL("/summarizer-pro");

    // Should see pro version title
    await expect(page.locator("h2")).toContainText("Pro Summarizer");

    // Should see sign out button in navbar
    await expect(page.locator("text=Sign Out")).toBeVisible();

    // Should see pro dashboard link in navbar
    await expect(page.locator("text=Pro Dashboard")).toBeVisible();
  });

  test("authenticated user should be redirected from login page", async ({
    page,
  }) => {
    // First login
    await page.goto("/login");
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    // Wait for redirect to pro version
    await expect(page).toHaveURL("/summarizer-pro");

    // Now try to visit login page again
    await page.goto("/login");

    // Should be redirected back to pro version
    await expect(page).toHaveURL("/summarizer-pro");
  });

  test("authenticated user should be redirected from signup page", async ({
    page,
  }) => {
    // First login
    await page.goto("/login");
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    // Wait for redirect to pro version
    await expect(page).toHaveURL("/summarizer-pro");

    // Now try to visit signup page
    await page.goto("/signup");

    // Should be redirected back to pro version
    await expect(page).toHaveURL("/summarizer-pro");
  });

  test("should handle sign out flow", async ({ page }) => {
    // First login
    await page.goto("/login");
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    // Wait for redirect to pro version
    await expect(page).toHaveURL("/summarizer-pro");

    // Click sign out
    await page.click("text=Sign Out");

    // Should be redirected to home page (which redirects to free version)
    await expect(page).toHaveURL("/summarizer-free");

    // Should see login button again
    await expect(page.locator("text=Login")).toBeVisible();
  });

  test("should protect pro routes for unauthenticated users", async ({
    page,
  }) => {
    // Try to access pro version directly without authentication
    await page.goto("/summarizer-pro");

    // Should be redirected to login page
    await expect(page).toHaveURL(/.*login.*/);
  });

  test("should handle navigation between free and pro versions", async ({
    page,
  }) => {
    // Start at free version
    await page.goto("/summarizer-free");
    await expect(page).toHaveURL("/summarizer-free");

    // Click login
    await page.click("text=Login");
    await expect(page).toHaveURL(/.*login.*/);

    // Login
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    // Should be redirected to pro version
    await expect(page).toHaveURL("/summarizer-pro");

    // Click pro dashboard link
    await page.click("text=Pro Dashboard");
    await expect(page).toHaveURL("/summarizer-pro");
  });
});
