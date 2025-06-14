const SidebarItem = ({ icon, text, active = false, expanded }) => {
  return (
    <div
      className={`flex items-center p-4 ${
        expanded ? "px-6" : "justify-center"
      } ${
        active
          ? "bg-indigo-700 text-white"
          : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
      } cursor-pointer transition-colors duration-200`}
    >
      <div>{icon}</div>
      {expanded && <span className="ml-3 text-sm font-medium">{text}</span>}
    </div>
  );
};

export default SidebarItem;
