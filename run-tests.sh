#!/bin/bash

# E2E Test Runner Script for Summarizer App

echo "🚀 Starting E2E Tests for Summarizer App"
echo "========================================"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local file not found!"
    echo "Please create .env.local with your Supabase and Hugging Face credentials"
    echo ""
    echo "Required variables:"
    echo "- NEXT_PUBLIC_SUPABASE_URL"
    echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY" 
    echo "- TOKEN (Hugging Face)"
    exit 1
fi

# Check if test user exists (optional check)
echo "ℹ️  Make sure you have a test user in Supabase with:"
echo "   Email: test@example.com"
echo "   Password: testpassword123"
echo ""

# Function to run tests
run_tests() {
    local test_type=$1
    local description=$2
    
    echo "🧪 Running $description..."
    echo "----------------------------"
    
    if [ "$test_type" = "all" ]; then
        pnpm exec playwright test
    elif [ "$test_type" = "auth" ]; then
        pnpm exec playwright test tests/auth-flow.spec.ts
    elif [ "$test_type" = "summarizer" ]; then
        pnpm exec playwright test tests/summarizer.spec.ts
    elif [ "$test_type" = "ui" ]; then
        pnpm exec playwright test --ui
    elif [ "$test_type" = "headed" ]; then
        pnpm exec playwright test --headed
    else
        echo "❌ Unknown test type: $test_type"
        return 1
    fi
    
    local exit_code=$?
    
    if [ $exit_code -eq 0 ]; then
        echo "✅ $description completed successfully!"
    else
        echo "❌ $description failed!"
    fi
    
    echo ""
    return $exit_code
}

# Parse command line arguments
case "${1:-all}" in
    "auth")
        run_tests "auth" "Authentication Flow Tests"
        ;;
    "summarizer")
        run_tests "summarizer" "Summarizer Functionality Tests"
        ;;
    "ui")
        run_tests "ui" "Interactive UI Tests"
        ;;
    "headed")
        run_tests "headed" "Headed Browser Tests"
        ;;
    "all")
        run_tests "all" "All E2E Tests"
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [test_type]"
        echo ""
        echo "Test types:"
        echo "  all        - Run all tests (default)"
        echo "  auth       - Run authentication flow tests only"
        echo "  summarizer - Run summarizer functionality tests only"
        echo "  ui         - Run tests with interactive UI"
        echo "  headed     - Run tests in headed mode (see browser)"
        echo "  help       - Show this help message"
        ;;
    *)
        echo "❌ Unknown option: $1"
        echo "Use '$0 help' to see available options"
        exit 1
        ;;
esac

echo "🎉 Test run completed!"
echo ""
echo "💡 Tips:"
echo "- Use 'pnpm test:report' to view detailed test reports"
echo "- Use 'pnpm test:ui' for interactive test debugging"
echo "- Check tests/README.md for more information"
