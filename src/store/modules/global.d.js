export const STATE = {
  isLoading: 'isLoading',
  dataSample: 'dataSample',
};

export const GETTERS = {
};

export const MUTATIONS = {
  setIsLoading: 'setIsLoading',
  setDataSample: 'setDataSample',
};

export const ACTIONS = {
  ...MUTATIONS,
  fetchSample: 'fetchSample',
};
