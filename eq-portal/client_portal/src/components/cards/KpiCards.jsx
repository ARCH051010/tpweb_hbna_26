import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./kpi-cards.css";

export default function KpiCard({ title, value, icon, trendText, trendType = "positive" }) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <div className="kpi-icon-wrapper">
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
      
      <p className="kpi-number">{value}</p>
      
      {trendText && (
        <span className={`kpi-trend ${trendType}`}>
          {trendType === "positive" ? "↗ " : ""} {trendText}
        </span>
      )}
    </div>
  );
}