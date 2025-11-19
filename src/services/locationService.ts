// Location service using Gemini AI REST API to generate Indian states and districts

interface State {
  state_id: number;
  state_name: string;
}

interface District {
  district_id: number;
  district_name: string;
}

// Cache for API responses to reduce network calls
let statesCache: State[] | null = null;
const districtsCache = new Map<number, District[]>();

// Gemini API configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const MODEL_NAME = "gemini-2.0-flash"; // Fast and reliable
// Alternative: "gemini-1.5-pro" for more capable but slower

/**
 * Call Gemini AI API directly using REST
 */
const callGeminiAPI = async (prompt: string): Promise<string> => {
  // Use v1 endpoint and pass key as query parameter only
  const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.1, // Low temperature for consistent results
      maxOutputTokens: 2048,
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract text from response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return text.trim();
  } catch (error) {
    console.error('Gemini API call failed:', error);
    throw error;
  }
};

/**
 * Fetch all Indian states using Gemini AI
 */
export const fetchStates = async (): Promise<State[]> => {
  // Return cached data if available
  if (statesCache) {
    return statesCache;
  }

  // Check if API key is configured
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "") {
    console.warn('⚠️ Gemini API key not configured. Using fallback states.');
    return getFallbackStates();
  }

  try {
    const prompt = `List all 28 states and 8 union territories of India. Return ONLY a JSON array with no additional text, in this exact format:
["State1", "State2", "State3", ...]

Do not include any markdown, explanations, or additional formatting. Just the raw JSON array.`;

    const text = await callGeminiAPI(prompt);
    
    // Remove markdown code blocks if present
    const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse the JSON array
    const stateNames: string[] = JSON.parse(cleanText);
    
    // Transform to our format
    const states: State[] = stateNames.map((name, index) => ({
      state_id: index + 1,
      state_name: name
    }));
    
    // Sort alphabetically
    const sortedStates = states.sort((a, b) => 
      a.state_name.localeCompare(b.state_name)
    );

    // Cache the results
    statesCache = sortedStates;
    
    console.log('✅ States loaded from Gemini AI:', sortedStates.length);
    return sortedStates;
  } catch (error) {
    console.error('❌ Error fetching states from Gemini:', error);
    console.warn('⚠️ Using fallback states list');
    // Fallback to hardcoded list
    return getFallbackStates();
  }
};

/**
 * Fetch districts for a specific state using Gemini AI
 */
export const fetchDistricts = async (stateId: number): Promise<District[]> => {
  // Return cached data if available
  if (districtsCache.has(stateId)) {
    return districtsCache.get(stateId)!;
  }

  // Check if API key is configured
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "") {
    console.warn('⚠️ Gemini API key not configured. Please select "Other" to enter district manually.');
    return [];
  }

  try {
    // Get state name first
    const states = await fetchStates();
    const state = states.find(s => s.state_id === stateId);
    
    if (!state) {
      return [];
    }

    const prompt = `List all major districts and cities in ${state.state_name}, India. Return ONLY a JSON array with no additional text, in this exact format:
["District1", "District2", "District3", ...]

Include all administrative districts. Do not include any markdown, explanations, or additional formatting. Just the raw JSON array.`;

    const text = await callGeminiAPI(prompt);
    
    // Remove markdown code blocks if present
    const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse the JSON array
    const districtNames: string[] = JSON.parse(cleanText);
    
    // Transform to our format
    const districts: District[] = districtNames.map((name, index) => ({
      district_id: stateId * 1000 + index,
      district_name: name
    }));
    
    // Sort alphabetically
    const sortedDistricts = districts.sort((a, b) => 
      a.district_name.localeCompare(b.district_name)
    );

    // Cache the results
    districtsCache.set(stateId, sortedDistricts);
    
    console.log(`✅ Districts loaded for ${state.state_name}:`, sortedDistricts.length);
    return sortedDistricts;
  } catch (error) {
    console.error('❌ Error fetching districts from Gemini:', error);
    console.warn('⚠️ Please use "Other" option to enter district manually');
    // Return empty array, user can use "Other" option
    return [];
  }
};

/**
 * Clear location cache (useful for refresh)
 */
export const clearLocationCache = () => {
  statesCache = null;
  districtsCache.clear();
};

/**
 * Fallback states list in case API fails
 */
const getFallbackStates = (): State[] => {
  return [
    { state_id: 1, state_name: 'Andaman and Nicobar Islands' },
    { state_id: 2, state_name: 'Andhra Pradesh' },
    { state_id: 3, state_name: 'Arunachal Pradesh' },
    { state_id: 4, state_name: 'Assam' },
    { state_id: 5, state_name: 'Bihar' },
    { state_id: 6, state_name: 'Chandigarh' },
    { state_id: 7, state_name: 'Chhattisgarh' },
    { state_id: 8, state_name: 'Dadra and Nagar Haveli' },
    { state_id: 9, state_name: 'Daman and Diu' },
    { state_id: 10, state_name: 'Delhi' },
    { state_id: 11, state_name: 'Goa' },
    { state_id: 12, state_name: 'Gujarat' },
    { state_id: 13, state_name: 'Haryana' },
    { state_id: 14, state_name: 'Himachal Pradesh' },
    { state_id: 15, state_name: 'Jammu and Kashmir' },
    { state_id: 16, state_name: 'Jharkhand' },
    { state_id: 17, state_name: 'Karnataka' },
    { state_id: 18, state_name: 'Kerala' },
    { state_id: 19, state_name: 'Ladakh' },
    { state_id: 20, state_name: 'Lakshadweep' },
    { state_id: 21, state_name: 'Madhya Pradesh' },
    { state_id: 22, state_name: 'Maharashtra' },
    { state_id: 23, state_name: 'Manipur' },
    { state_id: 24, state_name: 'Meghalaya' },
    { state_id: 25, state_name: 'Mizoram' },
    { state_id: 26, state_name: 'Nagaland' },
    { state_id: 27, state_name: 'Odisha' },
    { state_id: 28, state_name: 'Puducherry' },
    { state_id: 29, state_name: 'Punjab' },
    { state_id: 30, state_name: 'Rajasthan' },
    { state_id: 31, state_name: 'Sikkim' },
    { state_id: 32, state_name: 'Tamil Nadu' },
    { state_id: 33, state_name: 'Telangana' },
    { state_id: 34, state_name: 'Tripura' },
    { state_id: 35, state_name: 'Uttar Pradesh' },
    { state_id: 36, state_name: 'Uttarakhand' },
    { state_id: 37, state_name: 'West Bengal' },
  ];
};

// Export types for use in components
export type { State, District };

