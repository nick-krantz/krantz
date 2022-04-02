export const ColorIncrement: React.FC<{ color: string }> = ({ color }) => (
  <div className="grid grid-cols-[100px_minmax(100px,_1fr)]">
    <p className="mb-0">{color}</p>
    <div className="w-full h-8" style={{ backgroundColor: color }}></div>
  </div>
)
