// appReducer.js
const initialState = {
    darkMode: localStorage.getItem('darkMode') === 'true',
  
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case 'SET_DARK_MODE':
        localStorage.setItem('darkMode', !state.darkMode);
        return {
          ...state,
          darkMode: !state.darkMode,
        };
  
  
      default:
        return state;
    }
  };
  
  export default productReducer;