const FilterIcon = ({
  className = '',
  width = 24,
  height = 24,
  fill = 'white',
  stroke = 'black',
  strokeWidth = '1.5',
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 31 32"
    >
      <path d="M8.552 7.84h13.616c1.012 0 1.832 0.82 1.832 1.832 0 0.468-0.179 0.918-0.5 1.258l-6.146 6.511v4.507c0 1.469-1.535 2.434-2.859 1.796-0.69-0.332-1.129-1.031-1.129-1.796v-4.507l-6.146-6.511c-0.321-0.34-0.5-0.79-0.5-1.258 0-1.012 0.82-1.832 1.832-1.832z"></path>
    </svg>
  );
};

export default FilterIcon;
