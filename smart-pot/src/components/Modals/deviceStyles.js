const deviceStyles = {
  menuList: (styles) => ({
    ...styles,
    width: "100%",
    color: "#000",
    paddingBottom: 5,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#f8f8fc;",
    border: "0 !important",
    borderRadius: "2rem",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    paddingBottom: "20px",
  }),
  valueContainer: (styles) => ({
    ...styles,
    paddingBottom: "2px",
    bottom: "3px",
  }),
  menu: (styles, state) => ({
    ...styles,
    color: state.selectProps.menuColor,
    padding: "rem",
    border: "0 !important",
    borderRadius: "2rem",
    width: "100%",
    boxShadow: "4px 4px 16px #e1e1e1, -2px -2px 16px #fff",
  }),
  singleValue: (styles) => ({
    ...styles,
    paddingBottom: "15px",
  }),
  placeholder: (styles) => ({
    ...styles,
    paddingBottom: "15px",
  }),
  control: (styles) => ({
    ...styles,
    border: "0 !important",
    height: "60px",
    minHeight: "60px",
    borderRadius: "2rem",
    backgroundColor: "#f8f8fc;",
    fontSize: "17px",
    paddingLeft: "5px",
    paddingRight: "20px",
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
      marginBottom: "15px",
      backgroundColor: "#f8f8fc",
      textAlign: "center",
      border: "0px solid #ddd",
      borderRadius: "2rem",
      boxShadow: "4px 4px 16px #e1e1e1, -2px -2px 16px #fff",
    };
  },
};

export default deviceStyles;
