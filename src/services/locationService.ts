// Location service using country-state-city package
import { State as CscState, City as CscCity } from 'country-state-city';

interface State {
  state_id: number;
  state_name: string;
  state_code: string;
}

interface District {
  district_id: number;
  district_name: string;
}

// Cache for data to improve performance
let statesCache: State[] | null = null;
const districtsCache = new Map<string, District[]>();

/**
 * Fetch all Indian states and union territories
 */
export const fetchStates = async (): Promise<State[]> => {
  // Return cached data if available
  if (statesCache) {
    console.log('✅ Using cached states data');
    return statesCache;
  }

  try {
    // Fetch all states of India (country code: IN)
    const indianStates = CscState.getStatesOfCountry('IN');
    
    // Transform to our format
    const states: State[] = indianStates.map((state, index) => ({
      state_id: index + 1,
      state_name: state.name,
      state_code: state.isoCode,
    }));
    
    // Sort alphabetically by name
    const sortedStates = states.sort((a, b) => 
      a.state_name.localeCompare(b.state_name)
    );

    // Cache the results
    statesCache = sortedStates;
    
    console.log('✅ States loaded from country-state-city:', sortedStates.length);
    return sortedStates;
  } catch (error) {
    console.error('❌ Error fetching states:', error);
    // Return empty array if there's an error
    return [];
  }
};

/**
 * Fetch districts/cities for a specific state
 */
export const fetchDistricts = async (stateId: number): Promise<District[]> => {
  try {
    // Get state information
    const states = await fetchStates();
    const state = states.find(s => s.state_id === stateId);
    
    if (!state) {
      console.warn('⚠️ State not found for ID:', stateId);
      return [];
    }

    // Check cache first
    const cacheKey = state.state_code;
    if (districtsCache.has(cacheKey)) {
      console.log(`✅ Using cached districts for ${state.state_name}`);
      return districtsCache.get(cacheKey)!;
    }

    // Fetch cities/districts for the state
    const cities = CscCity.getCitiesOfState('IN', state.state_code);
    
    if (!cities || cities.length === 0) {
      console.warn(`⚠️ No districts found for ${state.state_name}`);
      return [];
    }

    // Transform to our format
    const districts: District[] = cities.map((city, index) => ({
      district_id: stateId * 1000 + index,
      district_name: city.name,
    }));
    
    // Sort alphabetically
    const sortedDistricts = districts.sort((a, b) => 
      a.district_name.localeCompare(b.district_name)
    );

    // Cache the results
    districtsCache.set(cacheKey, sortedDistricts);
    
    console.log(`✅ Districts loaded for ${state.state_name}:`, sortedDistricts.length);
    return sortedDistricts;
  } catch (error) {
    console.error('❌ Error fetching districts:', error);
    return [];
  }
};

/**
 * Clear location cache (useful for refresh)
 */
export const clearLocationCache = () => {
  statesCache = null;
  districtsCache.clear();
  console.log('🗑️ Location cache cleared');
};

// Export types for use in components
export type { State, District };

