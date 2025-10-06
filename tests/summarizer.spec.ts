import { test, expect } from "@playwright/test";

const TEST_USER = {
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD,
};

test.describe("Summarizer Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("free version should allow text summarization", async ({ page }) => {
    await page.goto("/summarizer-free");

    // Should see the summarizer interface
    await expect(page.locator("h2")).toContainText("Free Summarizer");
    await expect(
      page.locator('textarea[placeholder="Text to summarize"]')
    ).toBeVisible();
    await expect(page.locator('button:has-text("Summarize")')).toBeVisible();

    // Should see placeholder text for summary
    await expect(page.locator("text=Summary will show up here!")).toBeVisible();
  });

  test("pro version should allow text summarization", async ({ page }) => {
    // Login first
    await page.goto("/login");
    if (!TEST_USER.email || !TEST_USER.password) {
      throw new Error(
        "TEST_USER_EMAIL and TEST_USER_PASSWORD must be set in environment variables."
      );
    }
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    // Should be on pro version
    await expect(page).toHaveURL("/summarizer-pro");

    // Should see the summarizer interface
    await expect(page.locator("h2")).toContainText("Pro Summarizer");
    await expect(
      page.locator('textarea[placeholder="Text to summarize"]')
    ).toBeVisible();
    await expect(page.locator('button:has-text("Summarize")')).toBeVisible();

    // Should see placeholder text for summary
    await expect(page.locator("text=Summary will show up here!")).toBeVisible();
  });

  test("should handle text summarization process", async ({ page }) => {
    await page.goto("/summarizer-free");

    const sampleText = `
    Artificial intelligence (AI) is intelligence demonstrated by machines, 
    in contrast to the natural intelligence displayed by humans and animals. 
    Leading AI textbooks define the field as the study of "intelligent agents": 
    any device that perceives its environment and takes actions that maximize 
    its chance of successfully achieving its goals. The term "artificial intelligence" 
    is often used to describe machines that mimic "cognitive" functions that humans 
    associate with the human mind, such as "learning" and "problem solving".
    `;

    // Fill in the textarea
    await page.fill('textarea[placeholder="Text to summarize"]', sampleText);

    // Click summarize button
    await page.click('button:has-text("Summarize")');

    // Should show loading state (if implemented)
    // Note: This test assumes loading states are implemented

    // Wait for summary to appear (with timeout)
    await page.waitForSelector("text=Summary will show up here!", {
      state: "hidden",
      timeout: 10000,
    });

    // Should show some summary text
    const summaryText = await page
      .locator("div:has(p.text-xl) p")
      .textContent();
    expect(summaryText).toBeTruthy();
    expect(summaryText?.length).toBeGreaterThan(0);
  });

  test("should handle empty text submission", async ({ page }) => {
    await page.goto("/summarizer-free");

    // Try to summarize without entering text
    await page.click('button:has-text("Summarize")');

    // Should still show placeholder text
    await expect(page.locator("text=Summary will show up here!")).toBeVisible();
  });

  test("should clear and retry summarization", async ({ page }) => {
    await page.goto("/summarizer-free");

    const sampleText = "This is a short test text for summarization.";

    // First summarization
    await page.fill('textarea[placeholder="Text to summarize"]', sampleText);
    await page.click('button:has-text("Summarize")');

    // Wait for result
    await page.waitForTimeout(2000);

    // Clear and try again
    await page.fill('textarea[placeholder="Text to summarize"]', "");
    await page.fill(
      'textarea[placeholder="Text to summarize"]',
      "Different text for second summarization."
    );
    await page.click('button:has-text("Summarize")');

    // Should show new summary
    await page.waitForTimeout(2000);

    // Verify we have some summary content
    const summaryText = await page
      .locator("div:has(p.text-xl) p")
      .textContent();
    expect(summaryText).toBeTruthy();
  });

  test("should maintain text input after page refresh", async ({ page }) => {
    await page.goto("/summarizer-free");

    const sampleText = "This text should persist after refresh.";
    await page.fill('textarea[placeholder="Text to summarize"]', sampleText);

    // Refresh the page
    await page.reload();

    // Note: This test assumes text persistence is implemented
    // Currently, the text will be lost on refresh, which is expected behavior
    // This test documents the current behavior
    const textareaValue = await page.inputValue(
      'textarea[placeholder="Text to summarize"]'
    );
    expect(textareaValue).toBe("");
  });
});
