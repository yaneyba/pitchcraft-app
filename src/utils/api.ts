/**
 * Calls the Gemini API with the provided system prompt and user query
 * @param systemPrompt The system instruction for the AI
 * @param userQuery The user's query/request
 * @returns Promise<string> The generated response from Gemini
 * @throws Error if the API call fails
 */
export const callGeminiApi = async (systemPrompt: string, userQuery: string, tools?: any[]): Promise<string> => {
  let apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  
  // Strict cleaning: Remove anything that isn't a valid API key character (alphanumeric, -, _)
  // This handles invisible spaces, newlines, and copy-paste artifacts like :1
  apiKey = apiKey.replace(/[^a-zA-Z0-9_\-]/g, '');

  if (apiKey.length < 30) {
    console.warn("Warning: API Key seems too short. Please check VITE_GEMINI_API_KEY in .env");
  }

  console.log(`Using Gemini API Key: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)} (Length: ${apiKey.length})`);
  let baseUrl = import.meta.env.VITE_GEMINI_API_URL || "";
  baseUrl = baseUrl.trim();
  
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.");
  }
  
  if (!baseUrl) {
    throw new Error("Gemini API URL is not configured. Please set VITE_GEMINI_API_URL in your environment variables.");
  }
  
  const apiUrl = `${baseUrl}?key=${apiKey}`;

  const payload: any = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
  };

  if (tools) {
    payload.tools = tools;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Full Gemini API Error Response:', JSON.stringify(errorData, null, 2));
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Failed to extract text from Gemini API response.");
    }
    return text;

  } catch (err: any) {
    console.error('Gemini API Error:', err);
    throw new Error(err.message || 'Failed to generate response from AI');
  }
};

/**
 * Generates a pitch using the Gemini API
 */
export const generatePitch = async (input: string, style: string): Promise<string> => {
  const systemPrompt = "You are PitchCraft AI, a professional startup copywriter and marketing expert. Your goal is to generate a compelling, concise, and persuasive pitch based on the user's input. Adapt your tone and structure perfectly to the requested pitch style. If the user provides a URL, use the Google Search tool to visit the page and extract relevant context to inform your pitch.";
  const userQuery = `Generate a "${style}" pitch for the following app: [${input}]. Focus on its unique value proposition, core features, and target audience.`;
  
  // Check if input contains a URL
  const hasUrl = /https?:\/\/[^\s]+/.test(input);
  const tools = hasUrl ? [{ google_search: {} }] : undefined;

  return callGeminiApi(systemPrompt, userQuery, tools);
};

/**
 * Analyzes a pitch using the Gemini API
 */
export const analyzePitch = async (pitch: string): Promise<string> => {
  const systemPrompt = "You are a sharp, insightful venture capitalist with years of experience listening to startup pitches. Your feedback is constructive, direct, and incredibly valuable. Analyze the provided pitch and give feedback formatted with markdown.";
  const userQuery = `Please analyze the following startup pitch. Identify its strengths and weaknesses, and provide specific, actionable suggestions for improvement. Structure your response with the following markdown headers: **Strengths**, **Weaknesses**, and **Suggestions**.\n\n---\nPITCH:\n"${pitch}"`;
  
  return callGeminiApi(systemPrompt, userQuery);
};

/**
 * Generates marketing suggestions using the Gemini API
 */
export const generateMarketingSuggestions = async (originalInput: string): Promise<string> => {
  const systemPrompt = "You are a creative and strategic marketing expert specializing in tech startups. Your goal is to provide catchy slogans and innovative marketing angles based on the user's app idea.";
  const userQuery = `For the app described as '${originalInput}', generate the following:\n\n**Catchy Slogans:**\n* A list of 3-5 catchy and memorable slogans.\n\n**Marketing Angles:**\n* A list of 2-3 unique marketing angles, including the target platform (e.g., TikTok, LinkedIn, Content Marketing) and a brief strategy for each.`;
  
  return callGeminiApi(systemPrompt, userQuery);
};