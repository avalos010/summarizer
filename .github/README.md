# CI/CD Pipeline Setup

This directory contains GitHub Actions workflows for automated deployment and testing.

## Workflows

### 1. `deploy-and-test.yml` (Vercel)

- **Triggers**: Push to main, Pull requests
- **Purpose**: Deploy to Vercel and run E2E tests against deployed environment
- **Requirements**: Vercel secrets in GitHub repository

### 2. `deploy-and-test-simple.yml` (Generic)

- **Triggers**: Push to main, Manual trigger
- **Purpose**: Deploy to any platform and run E2E tests
- **Requirements**: Customize deployment step for your platform

### 3. `e2e-tests.yml` (Development)

- **Triggers**: Push to main/develop, Pull requests
- **Purpose**: Run E2E tests against local development server
- **Requirements**: No deployment needed

## Required Secrets

Add these secrets to your GitHub repository settings:

### Core Application Secrets

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
TOKEN=your_huggingface_token
TEST_USER_EMAIL=your_test_user_email
TEST_USER_PASSWORD=your_test_user_password
```

### Vercel Secrets (for Vercel deployment)

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

### Optional

```
VERCEL_URL=your_production_url
```

## How It Works

1. **Deploy**: Application is built and deployed to your platform
2. **Wait**: Pipeline waits for deployment to be ready
3. **Test**: E2E tests run against the deployed environment
4. **Health Check**: Basic health checks verify the deployment
5. **Report**: Test results are uploaded as artifacts

## Local Testing

### Test against deployed environment:

```bash
# Set your deployed URL
export BASE_URL=https://your-app.com
pnpm test:deployed
```

### Health check:

```bash
pnpm health-check
```

## Customization

### For different deployment platforms:

1. **Netlify**: Replace Vercel step with Netlify CLI
2. **Railway**: Use Railway CLI commands
3. **Custom Server**: Use rsync, scp, or custom deployment scripts
4. **Docker**: Add Docker build and push steps

### Example for Netlify:

```yaml
- name: Deploy to Netlify
  run: |
    npx netlify deploy --prod --dir=out
    echo "NETLIFY_URL=${{ github.event.deployment.payload.web_url }}" >> $GITHUB_ENV
```

## Benefits

✅ **Confidence**: Know your deployment works before users see it  
✅ **Automation**: No manual testing needed  
✅ **Fast Feedback**: Catch issues immediately  
✅ **Quality Assurance**: Every deployment is verified  
✅ **Rollback Safety**: Failed tests prevent bad deployments

## Troubleshooting

### Tests failing on deployed environment:

- Check if BASE_URL is correct
- Verify all environment variables are set
- Ensure deployment is fully ready before tests run
- Check network connectivity and CORS settings

### Deployment failing:

- Verify all required secrets are set
- Check deployment platform credentials
- Ensure build process works locally
- Review deployment platform logs
