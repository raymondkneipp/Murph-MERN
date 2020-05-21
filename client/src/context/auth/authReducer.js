export default (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        errors: action.payload
          ? [...state.errors, action.payload]
          : [...state.errors],
      };
    case "USER_LOADED":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: [],
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    case "DELETE_ERROR":
      return {
        ...state,
        errors: state.errors.filter((error, index) => index !== action.payload),
      };
    default:
      return state;
  }
};
