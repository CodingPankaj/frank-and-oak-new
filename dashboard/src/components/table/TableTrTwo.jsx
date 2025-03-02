export const TableTrTwo = ({
  title = "",
  text = "",
  className = "text-text-primary-color",
}) => {
  return (
    <tr>
      <td className="px-4 py-1">
        <span className="text-sm font-semibold text-text-primary-color">
          {title}
        </span>
      </td>
      <td className="px-4 py-1 text-right">
        <span className={`text-xs font-semibold ${className}`}>{text}</span>
      </td>
    </tr>
  );
};
