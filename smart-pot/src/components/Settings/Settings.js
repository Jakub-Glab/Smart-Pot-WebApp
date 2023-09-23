import React, { useState, useMemo, useEffect } from "react";
import DeleteAccountModal from "../Modals/DeleteAccountModal";
import ChangeThresholdsModal from "../Modals/ChangeThresholdsModal";
import spacetime from "spacetime";
import TimezoneSelectComponent from "./TimeZoneSelectComponent";
import LanguageSelectComponent from "./LanguageSelectComponent";
import TimezoneContext from "../Context/TimezoneContext";

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showChangeThresholdsModal, setShowChangeThresholdsModal] = useState(
    false
  );
  const [datetime, setDatetime] = useState(spacetime.now());
  const { tz, setTz } = React.useContext(TimezoneContext);
  const [isSelectExpanded, setIsSelectExpanded] = useState(false);

  useMemo(() => {
    const tzValue = tz.value ?? tz;
    setDatetime(datetime.goto(tzValue));
  }, [tz]);

  useEffect(() => {
    console.log("Current tz: ", tz);
  }, [tz]);
  const languageOptions = [
    {
      value: "PL",
      label: "Polish",
      flagPath: "../assets/img/pol_flag.png",
    },
    {
      value: "ENG",
      label: "English",
      flagPath: "../assets/img/eng_flag.png",
    },
  ];

  const onChange = (e) => {
    setTz(e);
    localStorage.setItem("timezone", e.value);
    console.log(
      "Selected timezone from localStorage",
      localStorage.getItem("timezone")
    );
  };

  const defaultLanguageOption = {
    value: "pl",
    label: "Polish",
    flagPath: "../assets/img/pol_flag.png",
  };

  const onMenuOpen = () => {
    console.log("Menu opened");
    setIsSelectExpanded(true);
  };
  const onMenuClose = () => {
    console.log("Menu closed");
    setIsSelectExpanded(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        className={isSelectExpanded ? "settingsContainer" : "manageContainer"}
      >
        {" "}
        {/* Updated line */}
        {!showDeleteAccountModal && !showChangeThresholdsModal && (
          <div className="form">
            <header>Settings</header>
            <h2>Account</h2>
            <br />
            <input
              type="button"
              value="Set custom thresholds"
              onClick={() => setShowChangeThresholdsModal(true)}
            />
            <input
              type="button"
              value="Delete Account"
              onClick={() => setShowDeleteAccountModal(true)} // Toggle the modal on
            />
            <h2>Select timezone</h2>
            <TimezoneSelectComponent
              value={tz}
              onChange={onChange}
              onMenuOpen={onMenuOpen}
              onMenuClose={onMenuClose}
            />
            <br />
            <h2>Select language</h2>
            <LanguageSelectComponent
              options={languageOptions}
              defaultValue={defaultLanguageOption}
              onMenuOpen={onMenuOpen}
              onMenuClose={onMenuClose}
            />
          </div>
        )}
        {showDeleteAccountModal && (
          <DeleteAccountModal
            show={showDeleteAccountModal}
            onClose={() => setShowDeleteAccountModal(false)} // Toggle the modal off
          />
        )}
        {showChangeThresholdsModal && (
          <ChangeThresholdsModal
            show={showChangeThresholdsModal}
            onClose={() => setShowChangeThresholdsModal(false)} // Toggle the modal off
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
