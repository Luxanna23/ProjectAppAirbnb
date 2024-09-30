import Constants from 'expo-constants';

export const getBackendUrl = () => {
    const debuggerHost = Constants.expoConfig.hostUri;
    const ip = debuggerHost.split(':')[0];
    return `http://${ip}:3000`;
  };
