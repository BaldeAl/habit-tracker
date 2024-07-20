import React from "react";

interface BadgeCustomizationProps {
  badgeColor: string;
  setBadgeColor: (color: string) => void;
}

const BadgeCustomization: React.FC<BadgeCustomizationProps> = ({
  badgeColor,
  setBadgeColor,
}) => {
  return (
    <div className="mb-4">
      <label>Badge Color: </label>
      <input
        type="color"
        value={badgeColor}
        onChange={(e) => setBadgeColor(e.target.value)}
        className="border p-2 rounded mr-2"
      />
    </div>
  );
};

export default BadgeCustomization;
