import data from "@/data/indiaLocations.json";

interface State {
  state_id: number;
  state_name: string;
  state_code: string;
}

interface District {
  district_id: number;
  district_name: string;
}

const rawStates = data.states as { name: string; code: string }[];
const citiesByState = data.citiesByState as Record<string, string[]>;

const states: State[] = rawStates.map((s, i) => ({
  state_id: i + 1,
  state_name: s.name,
  state_code: s.code,
}));

export const fetchStates = async (): Promise<State[]> => states;

export const fetchDistricts = async (stateId: number): Promise<District[]> => {
  const state = states.find((s) => s.state_id === stateId);
  if (!state) return [];
  const cities = citiesByState[state.state_code] || [];
  return cities.map((name, index) => ({
    district_id: stateId * 1000 + index,
    district_name: name,
  }));
};

export const clearLocationCache = () => {};

export type { State, District };
