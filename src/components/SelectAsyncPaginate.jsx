import { AsyncPaginate } from "react-select-async-paginate";

const AsyncMultiSelectTagDropdown = ({
	defaultValue = [],
	loadOptions,
	onChange,
	placeholder,
}) => {
	return (
		<AsyncPaginate
			defaultValue={defaultValue}
			placeholder={placeholder}
			defaultOptions
			isMulti
			loadOptions={loadOptions}
			className="relative z-20"
			onChange={onChange}
			additional={{
				page: 1,
			}}
		/>
	);
};

export default AsyncMultiSelectTagDropdown;
