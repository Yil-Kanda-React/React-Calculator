import { useState, useEffect } from "react";
import { CalculatorButton } from "./CalculatorButton";
import { calculate } from "../utils/calculate";
import { Trash } from "lucide-react";

type Operation = "+" | "-" | "×" | "÷" | null;

interface CalculatorState {
  display: string;
  currentValue: string;
  previousValue: string;
  operation: Operation;
  waitingForOperand: boolean;
}

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    currentValue: "0",
    previousValue: "",
    operation: null,
    waitingForOperand: false,
  });

  const [error, setError] = useState(false);

  const handleDigit = (digit: string) => {
    if (error) {
      setError(false);
      setState({
        display: digit,
        currentValue: digit,
        previousValue: "",
        operation: null,
        waitingForOperand: false,
      });
      return;
    }

    setState((prev) => {
      let newValue = prev.waitingForOperand ? digit : prev.currentValue + digit;
      
      if (newValue === "00") newValue = "0";
      if (newValue.startsWith("0") && newValue.length > 1 && !newValue.includes(".")) {
        newValue = newValue.slice(1);
      }

      return {
        ...prev,
        currentValue: newValue,
        display: newValue,
        waitingForOperand: false,
      };
    });
  };

  const handleDecimal = () => {
    if (error) {
      setError(false);
      setState({
        display: "0.",
        currentValue: "0.",
        previousValue: "",
        operation: null,
        waitingForOperand: false,
      });
      return;
    }

    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          currentValue: "0.",
          display: "0.",
          waitingForOperand: false,
        };
      }

      if (prev.currentValue.includes(".")) return prev;

      return {
        ...prev,
        currentValue: prev.currentValue + ".",
        display: prev.currentValue + ".",
      };
    });
  };

  const handleOperation = (nextOperation: Operation) => {
    if (error) return;

    setState((prev) => {
      const prevValue = parseFloat(prev.previousValue);
      const currValue = parseFloat(prev.currentValue);

      if (prev.operation && !prev.waitingForOperand) {
        const result = calculate(prevValue, currValue, prev.operation);
        
        if (result === "Error") {
          setError(true);
          return {
            ...prev,
            display: "Error",
            currentValue: "0",
            previousValue: "",
            operation: null,
            waitingForOperand: true,
          };
        }

        return {
          display: result,
          currentValue: result,
          previousValue: result,
          operation: nextOperation,
          waitingForOperand: true,
        };
      }

      return {
        ...prev,
        previousValue: prev.currentValue,
        operation: nextOperation,
        waitingForOperand: true,
      };
    });
  };

  const handleEquals = () => {
    if (error || !state.operation) return;

    setState((prev) => {
      const prevValue = parseFloat(prev.previousValue);
      const currValue = parseFloat(prev.currentValue);

      const result = calculate(prevValue, currValue, prev.operation);

      if (result === "Error") {
        setError(true);
        return {
          ...prev,
          display: "Error",
          currentValue: "0",
          previousValue: "",
          operation: null,
          waitingForOperand: true,
        };
      }

      return {
        display: result,
        currentValue: result,
        previousValue: "",
        operation: null,
        waitingForOperand: true,
      };
    });
  };

  const handleClear = () => {
    setError(false);
    setState({
      display: "0",
      currentValue: "0",
      previousValue: "",
      operation: null,
      waitingForOperand: false,
    });
  };

  const handleBackspace = () => {
    if (error) {
      handleClear();
      return;
    }

    setState((prev) => {
      if (prev.currentValue.length === 1) {
        return {
          ...prev,
          currentValue: "0",
          display: "0",
        };
      }

      const newValue = prev.currentValue.slice(0, -1);
      return {
        ...prev,
        currentValue: newValue,
        display: newValue,
      };
    });
  };

  const handleToggleSign = () => {
    if (error) return;
    setState((prev) => {
      const newValue = String(-parseFloat(prev.currentValue));
      return {
        ...prev,
        currentValue: newValue,
        display: newValue,
      };
    });
  };

  const handlePercentage = () => {
    if (error) return;
    setState((prev) => {
      const newValue = String(parseFloat(prev.currentValue) / 100);
      return {
        ...prev,
        currentValue: newValue,
        display: newValue,
      };
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleDigit(e.key);
      } else if (e.key === ".") {
        handleDecimal();
      } else if (e.key === "+") {
        handleOperation("+");
      } else if (e.key === "-") {
        handleOperation("-");
      } else if (e.key === "*") {
        handleOperation("×");
      } else if (e.key === "/") {
        handleOperation("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (e.key === "Escape") {
        handleClear();
      } else if (e.key === "Backspace") {
        handleBackspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const formatDisplay = (value: string) => {
    if (value.length > 12) {
      return value.slice(0, 12) + "...";
    }
    return value;
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
      <div className="bg-slate-900 rounded-xl p-4 mb-4">
        <div className="text-right text-slate-400 text-sm h-6 font-mono">
          {state.previousValue && state.operation
            ? `${state.previousValue} ${state.operation}`
            : ""}
        </div>
        <div className="text-right text-white text-4xl font-mono font-bold truncate">
          {formatDisplay(state.display)}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <CalculatorButton
          label="C"
          onClick={handleClear}
          variant="destructive"
          ariaLabel="Clear"
        />
        <CalculatorButton
          label="±"
          onClick={handleToggleSign}
          variant="outline"
          ariaLabel="Toggle sign"
        />
        <CalculatorButton
          label="%"
          onClick={handlePercentage}
          variant="outline"
          ariaLabel="Percentage"
        />
        <CalculatorButton
          label="÷"
          onClick={() => handleOperation("÷")}
          variant="operation"
          ariaLabel="Divide"
        />

        <CalculatorButton
          label="7"
          onClick={() => handleDigit("7")}
          variant="number"
          ariaLabel="7"
        />
        <CalculatorButton
          label="8"
          onClick={() => handleDigit("8")}
          variant="number"
          ariaLabel="8"
        />
        <CalculatorButton
          label="9"
          onClick={() => handleDigit("9")}
          variant="number"
          ariaLabel="9"
        />
        <CalculatorButton
          label="×"
          onClick={() => handleOperation("×")}
          variant="operation"
          ariaLabel="Multiply"
        />

        <CalculatorButton
          label="4"
          onClick={() => handleDigit("4")}
          variant="number"
          ariaLabel="4"
        />
        <CalculatorButton
          label="5"
          onClick={() => handleDigit("5")}
          variant="number"
          ariaLabel="5"
        />
        <CalculatorButton
          label="6"
          onClick={() => handleDigit("6")}
          variant="number"
          ariaLabel="6"
        />
        <CalculatorButton
          label="-"
          onClick={() => handleOperation("-")}
          variant="operation"
          ariaLabel="Subtract"
        />

        <CalculatorButton
          label="1"
          onClick={() => handleDigit("1")}
          variant="number"
          ariaLabel="1"
        />
        <CalculatorButton
          label="2"
          onClick={() => handleDigit("2")}
          variant="number"
          ariaLabel="2"
        />
        <CalculatorButton
          label="3"
          onClick={() => handleDigit("3")}
          variant="number"
          ariaLabel="3"
        />
        <CalculatorButton
          label="+"
          onClick={() => handleOperation("+")}
          variant="operation"
          ariaLabel="Add"
        />

        <CalculatorButton
          label="0"
          onClick={() => handleDigit("0")}
          variant="number"
          span={2}
          ariaLabel="0"
        />
        <CalculatorButton
          label="."
          onClick={handleDecimal}
          variant="number"
          ariaLabel="Decimal point"
        />
        <CalculatorButton
          label="="
          onClick={handleEquals}
          variant="equals"
          ariaLabel="Equals"
        />
      </div>

      <button
        onClick={handleBackspace}
        className="mt-4 w-full h-10 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg flex items-center justify-center transition-colors focus:ring-2 focus:ring-blue-500"
        aria-label="Backspace"
      >
        <Trash className="w-4 h-4 mr-2" />
        <span className="text-sm">Borrar último dígito</span>
      </button>
    </div>
  );
}