type Operation = "+" | "-" | "×" | "÷";

export function calculate(
  a: number,
  b: number,
  operation: Operation
): string {
  let result: number;

  switch (operation) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "×":
      result = a * b;
      break;
    case "÷":
      if (b === 0) return "Error";
      result = a / b;
      break;
    default:
      return "0";
  }

  const rounded = Math.round(result * 100000000) / 100000000;
  
  return String(parseFloat(rounded.toFixed(8)));
}