import { Button } from "../components/ui/button";

type ButtonVariant = "number" | "operation" | "equals" | "destructive" | "outline";

interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  variant: ButtonVariant;
  span?: number;
  ariaLabel: string;
}

export function CalculatorButton({
  label,
  onClick,
  variant,
  span = 1,
  ariaLabel,
}: CalculatorButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "number":
        return "bg-slate-700 text-white hover:bg-slate-600";
      case "operation":
        return "bg-blue-500 text-white hover:bg-blue-400";
      case "equals":
        return "bg-emerald-600 text-white hover:bg-emerald-500";
      case "destructive":
        return "bg-red-600 text-white hover:bg-red-500";
      case "outline":
        return "bg-slate-600 text-white hover:bg-slate-500 border-slate-500";
      default:
        return "bg-slate-700 text-white hover:bg-slate-600";
    }
  };

  return (
    <Button
      onClick={onClick}
      className={`h-12 ${span === 2 ? "col-span-2" : ""} ${getVariantClasses()} focus:ring-2 focus:ring-blue-500 font-semibold text-lg`}
      aria-label={ariaLabel}
    >
      {label}
    </Button>
  );
}