import React, { useState, useEffect } from "react";

interface Habit {
  id: number;
  name: string;
}

interface NotificationSettingsProps {
  habits: Habit[];
  saveNotificationPreferences: (preferences: NotificationPreference[]) => void;
}

interface NotificationPreference {
  habitId: number;
  frequency: number;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  habits,
  saveNotificationPreferences,
}) => {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([]);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("notificationPreferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleFrequencyChange = (habitId: number, frequency: number) => {
    setPreferences((prevPreferences) => {
      const updatedPreferences = prevPreferences.filter(
        (p) => p.habitId !== habitId
      );
      updatedPreferences.push({ habitId, frequency });
      return updatedPreferences;
    });
  };

  const handleSave = () => {
    saveNotificationPreferences(preferences);
    localStorage.setItem(
      "notificationPreferences",
      JSON.stringify(preferences)
    );
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
      {habits.map((habit) => (
        <div key={habit.id} className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            {habit.name}
          </label>
          <select
            value={
              preferences.find((p) => p.habitId === habit.id)?.frequency || 0
            }
            onChange={(e) =>
              handleFrequencyChange(habit.id, parseInt(e.target.value))
            }
            className="border p-2 rounded"
          >
            <option value={0}>No Notifications</option>
            <option value={30}>Every 30 seconds</option>
            <option value={60}>Every 1 minute</option>
            <option value={3600}>Every 1 hour</option>
            <option value={86400}>Every 24 hours</option>
          </select>
        </div>
      ))}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default NotificationSettings;
