# E2E Testing Setup

This directory contains end-to-end tests for the Summarizer application using Playwright.

## Setup

1. **Install dependencies** (already done):

   ```bash
   pnpm install
   ```

2. **Create a test user** in your Supabase instance:

   - Go to your Supabase dashboard
   - Navigate to Authentication > Users
   - Create a new user with test credentials
   - Add the credentials to your `.env.local` file as `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`

3. **Set up environment variables**:
   Make sure your `.env.local` file contains:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   TOKEN=your_huggingface_token
   TEST_USER_EMAIL=your_test_user_email
   TEST_USER_PASSWORD=your_test_user_password
   ```

## Running Tests

### Run all tests

```bash
pnpm test
```

### Run specific test suites

```bash
# Authentication flow tests only
pnpm test:auth

# Summarizer functionality tests only
pnpm test:summarizer
```

### Run tests with UI

```bash
pnpm test:ui
```

### Run tests in headed mode (see browser)

```bash
pnpm test:headed
```

### View test report

```bash
pnpm test:report
```

## Test Files

- `auth-flow.spec.ts` - Tests the complete authentication flow including:

  - Anonymous user redirects
  - Login/signup forms
  - Protected routes
  - Session management
  - Sign out flow

- `summarizer.spec.ts` - Tests the summarizer functionality including:

  - Text input and submission
  - Loading states
  - Summary generation
  - Error handling

- `test-config.ts` - Test configuration and utilities

## Test Scenarios Covered

### Authentication Flow

1. ✅ Anonymous user redirected to free version
2. ✅ Login form validation and submission
3. ✅ Signup form validation and submission
4. ✅ Successful login redirects to pro version
5. ✅ Protected routes redirect unauthenticated users
6. ✅ Authenticated users redirected from login/signup pages
7. ✅ Sign out flow works correctly
8. ✅ Navigation between free and pro versions

### Summarizer Functionality

1. ✅ Free version interface loads correctly
2. ✅ Pro version interface loads correctly
3. ✅ Text summarization process works
4. ✅ Empty text handling
5. ✅ Multiple summarization attempts
6. ✅ Loading states (when implemented)

## CI/CD Integration

Tests are configured to run in GitHub Actions on:

- Push to main/develop branches
- Pull requests to main branch

The workflow file is located at `.github/workflows/e2e-tests.yml`.

## Notes

- Tests require a running development server (handled automatically)
- Some tests may fail if the Hugging Face API is down or rate-limited
- Tests assume the test user exists in your Supabase instance
- Test credentials are loaded from environment variables for security

## Troubleshooting

### Tests failing with authentication errors

- Verify your Supabase credentials are correct
- Ensure the test user exists in your Supabase instance
- Check that the test user email/password match the config

### Tests timing out

- Check if your Hugging Face token is valid
- Verify the summarization API is working
- Increase timeout values in test-config.ts if needed

### Browser issues

- Run `pnpm exec playwright install` to reinstall browsers
- Check that your system supports the required browsers
