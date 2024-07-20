import React, { useState, useEffect } from "react";

const Settings: React.FC = () => {
  const [themeColor, setThemeColor] = useState<string>("#00ff00");

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", themeColor);
  }, [themeColor]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <label>Theme Color: </label>
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
};

export default Settings;
