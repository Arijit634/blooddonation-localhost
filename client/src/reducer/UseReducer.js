export const initialState = {
    user: null,
    adminLoggedIn: false,
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case "USER":
        return {
          ...state,
          user: action.payload,
        };
      case "ADMIN_LOGIN":
        return {
          ...state,
          adminLoggedIn: action.payload,
        };
      case "USER_LOGOUT":
        return {
          ...state,
          user: null,
          adminLoggedIn: false,
        };
      default:
        return state;
    }
  };
  