import { useState, useCallback } from 'react';

interface CalculatorProps {
  onCalculation: (result: number, operation: string) => void;
  onButtonPress: () => void;
}

type ButtonType = 'number' | 'operator' | 'equals' | 'clear' | 'special';

interface ButtonConfig {
  label: string;
  type: ButtonType;
  value: string;
  span?: number;
}

const buttons: ButtonConfig[] = [
  { label: 'C', type: 'clear', value: 'clear' },
  { label: '±', type: 'special', value: 'negate' },
  { label: '%', type: 'special', value: 'percent' },
  { label: '÷', type: 'operator', value: '/' },
  { label: '7', type: 'number', value: '7' },
  { label: '8', type: 'number', value: '8' },
  { label: '9', type: 'number', value: '9' },
  { label: '×', type: 'operator', value: '*' },
  { label: '4', type: 'number', value: '4' },
  { label: '5', type: 'number', value: '5' },
  { label: '6', type: 'number', value: '6' },
  { label: '−', type: 'operator', value: '-' },
  { label: '1', type: 'number', value: '1' },
  { label: '2', type: 'number', value: '2' },
  { label: '3', type: 'number', value: '3' },
  { label: '+', type: 'operator', value: '+' },
  { label: '0', type: 'number', value: '0', span: 2 },
  { label: '.', type: 'number', value: '.' },
  { label: '=', type: 'equals', value: '=' },
];

function Calculator({ onCalculation, onButtonPress }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit === '.' ? '0.' : digit);
      setWaitingForOperand(false);
    } else {
      if (digit === '.' && display.includes('.')) return;
      if (display === '0' && digit !== '.') {
        setDisplay(digit);
      } else {
        setDisplay(display + digit);
      }
    }
  }, [display, waitingForOperand]);

  const calculate = useCallback((leftOperand: number, rightOperand: number, op: string): number => {
    switch (op) {
      case '+': return leftOperand + rightOperand;
      case '-': return leftOperand - rightOperand;
      case '*': return leftOperand * rightOperand;
      case '/': return leftOperand / rightOperand;
      default: return rightOperand;
    }
  }, []);

  const performOperation = useCallback((nextOp: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
      onCalculation(result, nextOp);
    }

    setWaitingForOperand(true);
    setOperation(nextOp);
  }, [display, previousValue, operation, calculate, onCalculation]);

  const handleEquals = useCallback(() => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
      onCalculation(result, '=');
    }
  }, [display, previousValue, operation, calculate, onCalculation]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const handleNegate = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  }, [display]);

  const handlePercent = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  }, [display]);

  const handleButtonClick = useCallback((button: ButtonConfig) => {
    onButtonPress();

    switch (button.type) {
      case 'number':
        inputNumber(button.value);
        break;
      case 'operator':
        performOperation(button.value);
        break;
      case 'equals':
        handleEquals();
        break;
      case 'clear':
        clear();
        break;
      case 'special':
        if (button.value === 'negate') handleNegate();
        if (button.value === 'percent') handlePercent();
        break;
    }
  }, [onButtonPress, inputNumber, performOperation, handleEquals, clear, handleNegate, handlePercent]);

  const getButtonStyles = (type: ButtonType): string => {
    const base = 'min-h-[52px] md:min-h-[64px] rounded-2xl font-semibold text-lg md:text-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg hover:-translate-y-0.5';

    switch (type) {
      case 'number':
        return `${base} bg-white/90 text-gray-700 hover:bg-white border-2 border-pink-100`;
      case 'operator':
        return `${base} bg-gradient-to-br from-pink-300 to-pink-400 text-white hover:from-pink-400 hover:to-pink-500 border-2 border-pink-200`;
      case 'equals':
        return `${base} bg-gradient-to-br from-rose-400 to-pink-500 text-white hover:from-rose-500 hover:to-pink-600 border-2 border-rose-300`;
      case 'clear':
        return `${base} bg-gradient-to-br from-red-300 to-rose-400 text-white hover:from-red-400 hover:to-rose-500 border-2 border-red-200`;
      case 'special':
        return `${base} bg-gradient-to-br from-purple-200 to-pink-200 text-purple-600 hover:from-purple-300 hover:to-pink-300 border-2 border-purple-100`;
      default:
        return base;
    }
  };

  const formatDisplay = (value: string): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return 'Error';
    if (!isFinite(num)) return '∞';
    if (value.includes('.') && !value.includes('e')) {
      return value.length > 12 ? num.toPrecision(8) : value;
    }
    if (Math.abs(num) >= 1e10) return num.toExponential(4);
    return value.length > 12 ? num.toPrecision(8) : value;
  };

  return (
    <div className="w-full max-w-[280px] md:max-w-[320px]">
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-4 md:p-5 shadow-2xl border-2 border-pink-100/50">
        {/* Decorative top accent */}
        <div className="flex justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-pink-300 animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-rose-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Display */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 mb-4 border-2 border-pink-100/50">
          <div className="text-right">
            {operation && previousValue !== null && (
              <div className="text-pink-300 text-xs md:text-sm mb-1 font-medium truncate">
                {previousValue} {operation === '*' ? '×' : operation === '/' ? '÷' : operation === '-' ? '−' : operation}
              </div>
            )}
            <div className="text-gray-700 text-3xl md:text-4xl font-bold tracking-tight truncate">
              {formatDisplay(display)}
            </div>
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(button)}
              className={`${getButtonStyles(button.type)} ${button.span === 2 ? 'col-span-2' : ''}`}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Decorative bottom */}
        <div className="flex justify-center mt-3">
          <div className="text-pink-300 text-xs tracking-widest">✿ ✿ ✿</div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
