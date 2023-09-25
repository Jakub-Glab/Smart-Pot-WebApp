import React, { useState, useMemo, useEffect } from "react";
import DeleteAccountModal from "../Modals/DeleteAccountModal";
import ChangeThresholdsModal from "../Modals/ChangeThresholdsModal";
import spacetime from "spacetime";
import TimezoneSelectComponent from "./TimeZoneSelectComponent";
import LanguageSelectComponent from "./LanguageSelectComponent";
import TimezoneContext from "../Context/TimezoneContext";
import { setTimezone, setLanguage, getCurrentUser } from "../hooks/api";
import db from "../hooks/db";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

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
  const [language, setLanguage] = useState(null);
  const [defaultLanguageOption, setDefaultLanguageOption] = useState(null);
  const { t, i18n } = useTranslation();

  useMemo(() => {
    console.log("Timezone changed: ", tz);
    if (!tz) return;
    const tzValue = tz.value;
    setDatetime(datetime.goto(tzValue));
  }, [tz]);

  useEffect(() => {
    console.log("Current tz: ", tz);
  }, [tz]);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user.data.timezone || !user.data.language) return;
      setTz(user.data.timezone);
      setLanguage(user.data.language);
      setDefaultLanguageOption(
        languageOptions.find((option) => option.value === user.data.language)
      );
    });
  }, []);

  useEffect(() => {
    db.settings
      .orderBy("id") // Assumes 'id' is an auto-incrementing field
      .reverse() // Sorts the results in descending order
      .first() // Fetches the first (latest) item
      .then((userSettings) => {
        console.log("User settings: ", userSettings);
        if (userSettings) {
          setTz(userSettings.timezone);
          const matchingLanguageOption = languageOptions.find(
            (option) => option.value === userSettings.language
          );
          setDefaultLanguageOption(matchingLanguageOption);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user settings: ", error);
      });
  }, []);

  const languageOptions = [
    {
      value: "PL",
      label: t("Settings.polish"),
      flagPath: "../assets/img/pol_flag.png",
    },
    {
      value: "ENG",
      label: t("Settings.english"),
      flagPath: "../assets/img/eng_flag.png",
    },
  ];

  const onTimezoneChange = async (e) => {
    setTz(e.value);
    console.log("Timezone changed: ", e.value);
    const newSettings = { timezone: e.value, language: language };
    db.settings.put(newSettings);

    //API call to update timezone
    const response = await setTimezone(e.value);
    if (response.status === 200) {
      console.log("Timezone updated");
    } else {
      console.log("Timezone update failed");
    }
  };

  const onLanguageChange = async (e) => {
    setLanguage(e.value);
    const newSettings = { timezone: tz, language: e.value };
    db.settings.put(newSettings);
    if (e.value === "ENG") {
      i18n.changeLanguage("en");
    }
    if (e.value === "PL") {
      i18n.changeLanguage("pl");
    }

    //API call to update language
    const response = await setLanguage(e.value);
    if (response.status === 200) {
      console.log("Language updated");
    } else {
      console.log("Language update failed");
    }
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
            <header>{t("Settings.settings")}</header>
            <h2>{t("Settings.account")}</h2>
            <br />
            <input
              type="button"
              value={t("Settings.setThresholds")}
              onClick={() => setShowChangeThresholdsModal(true)}
            />
            <input
              type="button"
              value={t("Settings.deleteAccount")}
              onClick={() => setShowDeleteAccountModal(true)} // Toggle the modal on
            />
            <h2>{t("Settings.selectTimezone")}</h2>
            <TimezoneSelectComponent
              value={tz}
              isSearchable={false}
              defaultLanguageOption={defaultLanguageOption}
              onChange={onTimezoneChange}
              onMenuOpen={onMenuOpen}
              onMenuClose={onMenuClose}
              placeholder={t("Settings.selectPlaceholder")}
            />
            <br />
            <h2>{t("Settings.selectLanguage")}</h2>
            <LanguageSelectComponent
              options={languageOptions}
              defaultValue={defaultLanguageOption}
              placeholder={t("Settings.selectPlaceholder")}
              onChange={onLanguageChange}
              onMenuOpen={onMenuOpen}
              onMenuClose={onMenuClose}
              isSearchable={false}
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
