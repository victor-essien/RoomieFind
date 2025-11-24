

const Badge = ({ children, color = "bg-slate-100 text-slate-600" }: any) => (
  <span className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>
    {children}
  </span>
);

export default Badge;