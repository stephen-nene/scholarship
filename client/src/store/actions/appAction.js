// appActions.js

export const setDarkMode = () => {
  return {
    type: "SET_DARK_MODE",
  };
};

export const setUserPageData = (page, data) => {
  return {
    type: "SET_USER_PAGE_DATA",
    payload: { page, data },
  };
};

export const setScholarshipPageData = (page,data) =>{
  return {
    type: "SET_SCHOLARSHIP_PAGE_DATA",
    payload: { page, data  }, 
  };
}

export const setMeetingsPageData = (page, data) => {
  return {
    type: "SET_MEETINGS_PAGE_DATA",
    payload: { page, data },
  };
}