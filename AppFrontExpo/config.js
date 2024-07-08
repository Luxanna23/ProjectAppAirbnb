const config = {
    development: {
      apiUrl: 'http://localhost:3000'
    },
  };
  
  const getEnvVars = (env = 'development') => {
    return config[env];
  };
  
  export default getEnvVars;