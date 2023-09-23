const componentStyles = {
  menuList: (styles) => ({
    ...styles,
    width: "100%",
    color: "#000",
    paddingTop: "1.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    backgroundColor: "#f8f8fc;",
    border: "0 !important",
    borderRadius: "2rem",
    minHeight: "245px",
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
    padding: "0 20px",
    marginBottom: "1.3rem",
    textAlign: "left",
    boxShadow: "4px 4px 16px #e1e1e1, -2px -2px 16px #fff",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: isSelected ? "black" : "grey",
      fontWeight: isSelected ? "bold" : "normal",
      height: "60px",
      width: "100%",
      fontSize: "17px",
      padding: "10px 15px",
      marginBottom: "0.5rem",
      backgroundColor: "#f8f8fc",
      textAlign: "center",
      border: "0px solid #ddd",
      borderRadius: "2rem",
      boxShadow: "4px 4px 16px #e1e1e1, -2px -2px 16px #fff",
    };
  },
};

export default componentStyles;
