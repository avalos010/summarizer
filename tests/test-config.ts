// Test configuration and utilities

export const TEST_CONFIG = {
  // Test user credentials loaded from environment variables
  TEST_USER: {
    email: process.env.TEST_USER_EMAIL || "",
    password: process.env.TEST_USER_PASSWORD || "",
  },

  // Test data
  SAMPLE_TEXTS: {
    SHORT: "This is a short test text for summarization.",
    MEDIUM: `
    Artificial intelligence (AI) is intelligence demonstrated by machines, 
    in contrast to the natural intelligence displayed by humans and animals. 
    Leading AI textbooks define the field as the study of "intelligent agents": 
    any device that perceives its environment and takes actions that maximize 
    its chance of successfully achieving its goals.
    `,
    LONG: `
    Artificial intelligence (AI) is intelligence demonstrated by machines, 
    in contrast to the natural intelligence displayed by humans and animals. 
    Leading AI textbooks define the field as the study of "intelligent agents": 
    any device that perceives its environment and takes actions that maximize 
    its chance of successfully achieving its goals. The term "artificial intelligence" 
    is often used to describe machines that mimic "cognitive" functions that humans 
    associate with the human mind, such as "learning" and "problem solving".
    
    As machines become increasingly capable, tasks considered to require "intelligence" 
    are often removed from the definition of AI, a phenomenon known as the AI effect. 
    A quip in Tesler's Theorem says "AI is whatever hasn't been done yet." For instance, 
    optical character recognition is frequently excluded from things considered to be AI, 
    having become a routine technology.
    `,
  },

  // Test timeouts
  TIMEOUTS: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
  },
};

// Helper function to create a test user (if needed)
export async function createTestUser() {
  // This would typically make an API call to create a test user
  // For now, we assume the test user exists in the database
  // SECURITY NOTE: Never commit real test user credentials to version control
  console.log("Test user creation not implemented - using existing test user");
}

// Helper function to cleanup test user (if needed)
export async function cleanupTestUser() {
  // This would typically make an API call to delete the test user
  console.log("Test user cleanup not implemented");
}
