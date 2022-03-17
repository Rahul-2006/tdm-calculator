import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  projectInfoDetailsSubContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    maxHeight: "20px",
    width: "50%",
    paddingBottom: "1.1em"
  },
  projectInfoCategory: {
    fontFamily: "Oswald",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    color: "rgba(15, 41, 64, .5)",
    marginRight: "17px"
  },
  projectInfoDetails: {
    color: "#0F2940",
    fontFamily: "Calibri Bold",
    fontSize: "16px"
  },
  dropDownContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  dropDownValue: {
    minWidth: "100px"
  }
});

const ProjectInfo = props => {
  const classes = useStyles();
  const { name, rule } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const values = rule?.value.split(",");
  console.log(values);

  return (
    <div className={classes.projectInfoDetailsSubContainer}>
      <span className={classes.projectInfoCategory}>{name}</span>
      {rule && rule.value ? (
        <span className={classes.projectInfoDetails}>
          <span className={classes.dropDownContainer}>
            {values.map(value => {
              // TODO flexbox space between
              return (
                <span key={value} className={classes.dropDownValue}>
                  {value}
                </span>
              );
            })}
          </span>
        </span>
      ) : null}
      {values && values.length >= 3 ? (
        dropdownOpen ? (
          <FontAwesomeIcon
            icon={faChevronUp}
            color="#0F2940"
            onClick={() => {
              setDropdownOpen(false);
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronDown}
            color="#0F2940"
            onClick={() => {
              setDropdownOpen(true);
            }}
          />
        )
      ) : null}
    </div>
  );
};
ProjectInfo.propTypes = {
  name: PropTypes.string.isRequired,
  rule: PropTypes.object
};

export default ProjectInfo;
