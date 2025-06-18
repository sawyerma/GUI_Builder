interface DataContainerProps {
  children: React.ReactNode;
  className?: string;
}

const DataContainer = ({ children, className = "" }: DataContainerProps) => {
  return (
    <div
      className={`h-full overflow-y-auto ${className}`}
      style={{
        fontFamily: "'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'",
      }}
    >
      {children}
    </div>
  );
};

// Individual row component for easy data injection
interface DataRowProps {
  data: {
    col1: string | number;
    col2: string | number;
    col3: string | number;
    col1Color?: string;
    col2Color?: string;
    col3Color?: string;
    arrow?: "up" | "down" | null;
    backgroundColor?: string;
    volumeWidth?: number; // For orderbook volume bars
  };
  onClick?: () => void;
  layout?: "orderbook" | "trades";
}

export const DataRow = ({ data, onClick, layout = "trades" }: DataRowProps) => {
  return (
    <div
      className="relative cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={onClick}
      style={{
        fontFamily: "'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'",
      }}
    >
      {/* Volume background for orderbook */}
      {layout === "orderbook" && data.volumeWidth && (
        <div
          className={`absolute right-0 top-0 h-full ${data.backgroundColor || "bg-gray-100"}`}
          style={{ width: `${data.volumeWidth}%` }}
        ></div>
      )}

      {/* Data Row */}
      <div className="relative grid grid-cols-3 text-xs py-1 px-4">
        <div
          className={`font-medium ${data.col1Color || "text-gray-600 dark:text-white"}`}
        >
          {layout === "trades" && data.arrow && (
            <span className="flex items-center">
              <span>{data.col1}</span>
              <span className="ml-1 text-xs">
                {data.arrow === "up" ? "↑" : "↓"}
              </span>
            </span>
          )}
          {(layout === "orderbook" || !data.arrow) && <span>{data.col1}</span>}
        </div>
        <div
          className={`text-center font-medium ${data.col2Color || "text-gray-600 dark:text-white"}`}
        >
          {data.col2}
        </div>
        <div
          className={`text-right ${data.col3Color || "text-gray-600 dark:text-white"} ${layout === "orderbook" ? "font-medium" : "text-xs font-medium"}`}
        >
          {data.col3}
        </div>
      </div>
    </div>
  );
};

export default DataContainer;
