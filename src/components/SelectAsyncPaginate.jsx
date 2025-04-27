import { AsyncPaginate } from "react-select-async-paginate";

const AsyncMultiSelectTagDropdown = ({
	defaultValue = [],
	loadOptions,
	onChange,
	placeholder,
}) => {
	return (
		<AsyncPaginate
			className="w-full max-w-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 relative z-20"
			defaultValue={defaultValue}
			placeholder={placeholder}
			defaultOptions
			isMulti
			loadOptions={loadOptions}
			onChange={onChange}
			additional={{
				page: 1,
			}}
		/>
	);
};

export default AsyncMultiSelectTagDropdown;
