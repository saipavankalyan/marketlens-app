import Select from "react-select";
import {SELECT_LABEL_COLOR_MAP} from "../../constant/constants";
import {useField} from "formik";
import classes from "../../form/form.module.scss";

const MultiSelect = ({options, setValue, value}) => {

    const getColor = (value) => {
        if(value) {
            const valueType = value.split(':')[0];
            return SELECT_LABEL_COLOR_MAP[valueType]
        } else {
            return SELECT_LABEL_COLOR_MAP['stocks']
        }
    }

    return (
        <Select
            closeMenuOnSelect={true}
            styles={{
                multiValueLabel: (base, rest) => {
                    return (
                        {
                            ...base,
                            // //TODO Change the color according to type of selected input.
                            backgroundColor: getColor(rest.data.value),
                            // color: 'white',
                        }
                    )
                },
            }}
            defaultValue={[]}
            isMulti={true}
            options={options}
            onChange={setValue}
            value={value}
        />
    )
}

const FEMultiElementSelect = ({name, options}) => {
    const [field, meta, helper] = useField(name);

    return (
        <div className={classes.formElement}>
            <MultiSelect value={field.value}
                         setValue={(newValues) => helper.setValue(newValues)}
                         options={options}/>
        </div>
    )
}

export default FEMultiElementSelect;