const languageStyles = {
  menuList: (styles) => ({
    ...styles,
    width: "100%",
    color: "#000",
    padding: 20,
    backgroundColor: "#f8f8fc;",
    border: "0 !important",
    borderRadius: "2rem",
  }),
  menu: (styles, state) => ({
    ...styles,

    color: state.selectProps.menuColor,
    padding: "rem",
    backgroundColor: "#f8f8fc;",
    border: "0 !important",
    borderRadius: "2rem",
    width: "100%",
    boxShadow: "4px 4px 16px #e1e1e1, -2px -2px 16px #fff",
  }),
  control: (styles) => ({
    ...styles,
    border: "0 !important",
    borderRadius: "2rem",
    backgroundColor: "#f8f8fc;",
    boxShadow: "4px 4px 16px #e1e1e1, -2px -2px 16px #fff",
    height: "60px",
    paddingLeft: "5px",
    paddingRight: "20px",
  }),
  singleValue: (styles) => ({
    ...styles,
    paddingBottom: "15px",
  }),
  placeholder: (styles) => ({
    ...styles,
    paddingBottom: "15px",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    paddingBottom: "20px",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: isSelected ? "black" : "grey",
      fontWeight: isSelected ? "bold" : "normal",
      height: "60px",
      width: "100%",
      fontSize: "0.8rem",
      padding: "22px 15px",
      marginBottom: "0.5rem",
      backgroundColor: "#f8f8fc",
      textAlign: "center",
      border: "0px solid #ddd",
      borderRadius: "2rem",
      boxShadow: "4px 4px 16px #e1e1e1, -2px -2px 16px #fff",
    };
  },
};

export default languageStyles;
