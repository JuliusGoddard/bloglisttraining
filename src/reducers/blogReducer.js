const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG": {
      return state.concat(action.data);
    }
    default:
      return state;
  }
};

const store = createStore(blogReducer);
