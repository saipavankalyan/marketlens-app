import Select from "react-select";

const MultiSelect = ({options, setValue, value}) => {

    return (
        <Select
            closeMenuOnSelect={true}
            styles={{
                multiValueLabel: (base, rest) => {
                    value = rest.value;
                    return (
                        {
                            ...base,
                            //TODO Change the color according to type of selected input.
                            backgroundColor: "$fff",
                            color: 'white',
                        }
                    )
                },
            }}
            defaultValue={[]}
            isMulti={true}
            options={options}
        />
    )
}

export default MultiSelect;