import React, { useState, useMemo, useEffect } from "react";
import DeleteAccountModal from "../Modals/DeleteAccountModal";
import ChangeThresholdsModal from "../Modals/ChangeThresholdsModal";
import spacetime from "spacetime";
import TimezoneSelectComponent from "./TimeZoneSelectComponent";
import LanguageSelectComponent from "./LanguageSelectComponent";
import TimezoneContext from "../Context/TimezoneContext";
import {
  setTimezone,
  setUserLanguage,
  getCurrentUser,
  getPlants,
} from "../hooks/api";
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
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const plantsResponse = await getPlants();
      setPlants(plantsResponse.data);
    };

    fetchData();
  }, []);

  useMemo(() => {
    if (!tz) return;
    const tzValue = tz.value;
    setDatetime(datetime.goto(tzValue));
  }, [tz]);

  useEffect(() => {
    getCurrentUser().then((user) => {
      console.log("User: ", user);
      if (!user.data.timezone || !user.data.language) {
        setIsLoading(false);
        return;
      }
      setTz(user.data.timezone);
      setLanguage(user.data.language);
      setDefaultLanguageOption(
        languageOptions.find((option) => option.value === user.data.language)
      );
      if (user.data.language === "ENG") i18n.changeLanguage("en");
      if (user.data.language === "PL") i18n.changeLanguage("pl");
      setIsLoading(false);
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
    const response = await setTimezone(e.value);
    if (response.status === 200) {
      setTz(e.value);
    }
  };

  const onLanguageChange = async (e) => {
    const response = await setUserLanguage(e.value);
    if (response.status === 200) {
      setLanguage(e.value);
      if (e.value === "ENG") i18n.changeLanguage("en");
      if (e.value === "PL") i18n.changeLanguage("pl");
    }
  };

  const onMenuOpen = () => {
    setIsSelectExpanded(true);
  };
  const onMenuClose = () => {
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
      {isLoading ? (
        <div>Loading...</div> // Show a loading indicator while data is being loaded
      ) : (
        <div
          className={isSelectExpanded ? "settingsContainer" : "manageContainer"}
        >
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
              plants={plants}
              onClose={() => setShowChangeThresholdsModal(false)} // Toggle the modal off
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Settings;
