export default (state, action) => {
  switch (action.type) {
    case "START_TIME":
      return {
        ...state,
        startTime: action.payload,
      };
    case "FIRST_MILE_FINISH_TIME":
      return {
        ...state,
        firstMileFinishTime: action.payload,
      };
    case "CALISTHENICS_FINISH_TIME":
      return {
        ...state,
        calisthenicsFinishTime: action.payload,
      };
    case "SECOND_MILE_FINISH_TIME":
      return {
        ...state,
        secondMileFinishTime: action.payload,
      };
    case "CLEAR_WORKOUT":
      return {
        ...state,
        startTime: null,
        firstMileFinishTime: null,
        calisthenicsFinishTime: null,
        secondMileFinishTime: null,
        exercises: state.exercises.map((exercise) => ({
          ...exercise,
          reps: 0,
        })),
      };
    default:
      return state;
  }
};
