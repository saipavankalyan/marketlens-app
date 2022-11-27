import {useQuery} from "react-query";
import classes from "./tc.module.scss";
import {getAllTupleRows} from "../../service/tuplerows/TupleCounts";

const TupleCountsPage = () => {
    const {data, isLoading, isError} = useQuery("tuple_counts", getAllTupleRows);

    if(isLoading) {
        return null;
    }

    return (
        <div className={classes.tupleCountsContaint}>
            <ul>
            {
                Object.keys(data).map((tableName, _idx) =>
                    <li key={_idx}>
                        {tableName} - {data[tableName]}
                    </li>
                )
            }
            </ul>
        </div>
    )

}

export default TupleCountsPage;