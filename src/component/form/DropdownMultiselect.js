import classes from "../../form/form.module.scss";
import {useField} from "formik";
import Select from "react-select";

const MultiSelect = ({options, setValue, value, placeholder}) => {

    return (
        <Select
            closeMenuOnSelect={true}
            defaultValue={[]}
            isMulti={true}
            options={options}
            onChange={setValue}
            placeholder={placeholder}
            value={value}
            isSearchable={false}
        />
    )
}

const DropDownMultiSelect = ({name, options, placeholder}) => {
    const [field, meta, helper] = useField(name);


    return (
        <div className={classes.formElement}>
            <MultiSelect value={field.value ? options.filter((option) => field.value.includes(option.value)) : field.value}
                         setValue={(values) => helper.setValue(values.map(({value}) => value))}
                         placeholder={placeholder}
                         options={options}/>
        </div>
    );

}

export default DropDownMultiSelect;