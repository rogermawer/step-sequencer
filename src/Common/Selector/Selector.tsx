import "./SelectorStyle.scss";

interface SelectorProps {
  label: string;
  value: string | number;
  items: { name: string | number }[];
  onChange: (v: string) => void;
}

export const Selector: React.FC<SelectorProps> = ({
  label,
  value,
  items,
  onChange,
}) => (
  <div className="selector">
    <label>{`${label}: `}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {items.map((item, index) => (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
);
