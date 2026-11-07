import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

import "./chart-cards.css";

export default function AreaChartCard({ title, subtitle, badgeText, data, dataKeyX, dataKeyY }) {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">{title}</h3>
          <p className="chart-subtitle">{subtitle}</p>
        </div>
        {badgeText && <span className="chart-badge">{badgeText}</span>}
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey={dataKeyX} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
          <YAxis tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
          <Tooltip cursor={{stroke: 'var(--color-primary)', strokeWidth: 1, strokeDasharray: '5 5'}} />
          <Area type="monotone" dataKey={dataKeyY} stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}