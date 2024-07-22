import React, { ComponentType, useState } from "react";
import styles from "./withTooltip.module.scss";

interface WithTooltipProps {
  tooltipText?: string;
}

const withTooltip = <P extends object>(
  WrappedComponent: ComponentType<P>,
  tooltipText: string,
) => {
  const WithTooltip: React.FC<P & WithTooltipProps> = (props) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
      setShowTooltip(true);
    };

    const handleMouseLeave = () => {
      setShowTooltip(false);
    };

    return (
      <div
        className={styles["tooltip-container"]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <WrappedComponent {...(props as P)} />
        {showTooltip && tooltipText && (
          <div className={styles["tooltip"]}>{tooltipText}</div>
        )}
      </div>
    );
  };

  return WithTooltip;
};

export default withTooltip;
