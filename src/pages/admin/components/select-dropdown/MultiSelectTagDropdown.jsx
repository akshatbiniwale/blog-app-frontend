import AsyncSelect from "react-select/async";

const MultiSelectTagDropdown = ({
	defaultValue = [],
	loadOptions,
	onChange,
	value
}) => {
	return (
		<AsyncSelect
			defaultValue={defaultValue}
			defaultOptions
			isMulti
			loadOptions={loadOptions}
			className="relative z-20"
			onChange={onChange}
			value={value}
		/>
	);
};

export default MultiSelectTagDropdown;
