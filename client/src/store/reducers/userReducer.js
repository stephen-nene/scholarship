const initialState = {
    loggedIn: false,
    userData: '',
    // userData: loadUserData(),
  };
  
  function loadUserData() {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      if (storedData.expires > Date.now()) {
        return storedData.data;
      } else {
        clearUserData();
      }
    }
    return null;
  }
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
      case 'SIGNUP':
        // const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        // saveUserData(action.payload, expirationTime);
        return {
          loggedIn: true,
          userData: action.payload,
        };
  
      case 'LOGOUT':
        // clearUserData();
        return {
          loggedIn: false,
          userData: null,
        };
  
      default:
        return state;
    }
  };
  
  function saveUserData(data, expirationTime) {
    const userData = {
      data: data,
      expires: expirationTime,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  
  function clearUserData() {
    localStorage.removeItem('userData');
  }
  
  export default userReducer;
  