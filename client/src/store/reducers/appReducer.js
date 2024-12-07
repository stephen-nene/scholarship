// appReducer.js
const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true",
  paginatedUsers: {}, // { pageNumber: { users: [], meta: {} } }
  paginatedScholarships: {},
  paginatedMeetings: {}, 
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DARK_MODE":
      localStorage.setItem("darkMode", !state.darkMode);
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case "SET_USER_PAGE_DATA":
      return {
        ...state,
        paginatedUsers: {
          ...state.paginatedUsers,
          [action.payload.page]: action.payload.data,
        },
      };
    case "SET_SCHOLARSHIP_PAGE_DATA":
      return {
        ...state,
        paginatedScholarships: {
          ...state.paginatedScholarships,
          [action.payload.page]: action.payload.data,
        },
      };
      case "SET_MEETINGS_PAGE_DATA":
        return {
          ...state,
          paginatedMeetings: {
            ...state.paginatedMeetings,
            [action.payload.page]: action.payload.data,
          },
        };

    default:
      return state;
  }
};

export default appReducer;
