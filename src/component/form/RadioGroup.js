import classes from "./formComp.module.scss";
import {useField} from "formik";

const RadioGroup = ({name, options}) => {
    const [field, meta, helper] = useField(name);

    const handleClick = (e) => {
        helper.setValue(e.target.value);
    }

    return (
        <div className={classes.radioGroup}>
            <p className={classes.radioGroupLabel}>Temporal Granularity</p>
            {options.map(({label, value}) => <label htmlFor={value} className={classes.radioLabel} key={value}>
                {label} <input
                    checked={field.value === value}
                    type={'radio'}
                    name={name}
                    id={value}
                    value={value}
                    onChange={handleClick}
            />
            </label> )}
        </div>
    );

}

export default RadioGroup;