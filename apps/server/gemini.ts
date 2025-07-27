import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Helper function to wait/delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getGeminiSummary(text: string): Promise<string> {
  // Use the fastest, most efficient model
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      maxOutputTokens: 500, // Limit output to reduce quota usage
      temperature: 0.3,     // Lower temperature for consistent summaries
    }
  });

  const prompt = `Provide a concise summary of this content in 2-3 sentences:\n\n${text.substring(0, 8000)}`;

  // Retry logic with exponential backoff
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const summary = response.text();

      return summary;

    } catch (error: any) {
      console.error(`Gemini API error (attempt ${attempt}):`, error?.message || error);

      // Handle specific error types
      if (error?.status === 429) {
        if (attempt < 3) {
          const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s
          console.log(`Rate limited. Waiting ${waitTime/1000}s before retry...`);
          await delay(waitTime);
          continue;
        }
        return 'Error: API rate limit exceeded. Please try again later.';
      }

      if (error?.message?.includes('API key')) {
        return 'Error: Invalid or missing API key.';
      }

      if (error?.message?.includes('blocked')) {
        return 'Error: Content was blocked by safety filters.';
      }

      // If it's the last attempt, return error
      if (attempt === 3) {
        return `Failed to summarize content: ${error?.message || 'Unknown error'}`;
      }

      // Wait before retrying other errors
      await delay(1000);
    }
  }

  return 'Failed to summarize content after multiple attempts.';
}