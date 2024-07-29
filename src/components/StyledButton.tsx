// components/StyledButton.tsx
import React from "react";

interface StyledButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary-color text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default StyledButton;
