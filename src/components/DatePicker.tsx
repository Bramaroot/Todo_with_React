import { Calendar, Clock, X } from "lucide-react";
import { formatDate, getRelativeDateLabel, isOverdue } from "../utils/dateUtils";

interface DatePickerProps {
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  showTime?: boolean;
  placeholder?: string;
}

export const DatePicker = ({
  label,
  value,
  onChange,
  showTime = false,
  placeholder = "Sélectionner une date",
}: DatePickerProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onChange(new Date(e.target.value));
    } else {
      onChange(undefined);
    }
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const formatInputValue = (date: Date | undefined): string => {
    if (!date) return "";

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    if (showTime) {
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    return `${year}-${month}-${day}`;
  };

  const getDateBadgeColor = () => {
    if (!value) return "";
    if (isOverdue(value)) return "bg-[hsl(var(--destructive)/0.15)] text-[hsl(var(--destructive))] border-[hsl(var(--destructive)/0.3)]";
    return "bg-[hsl(var(--hype-neonBlue)/0.15)] text-[hsl(var(--hype-neonBlue))] border-[hsl(var(--hype-neonBlue)/0.3)]";
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        {showTime ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
        {label}
      </label>
      <div className="relative flex items-center gap-2">
        <input
          type={showTime ? "datetime-local" : "date"}
          value={formatInputValue(value)}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-[hsl(var(--input))] border border-[hsl(var(--border))] rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--hype-blue))] transition-all duration-300"
        />
        {value && (
          <button
            onClick={handleClear}
            className="p-2 text-muted-foreground hover:text-[hsl(var(--destructive))] transition-colors"
            title="Effacer la date"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {value && (
        <span className={`text-xs px-2 py-1 rounded-full border ${getDateBadgeColor()} inline-flex items-center gap-1 w-fit`}>
          {getRelativeDateLabel(value)}
        </span>
      )}
    </div>
  );
};
