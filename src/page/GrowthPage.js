import classes from "./pagestyles.module.scss";
import GrowthForm from "../form/GrowthForm";
import {useState} from "react";
import getGrowthDetails from "../service/GrowthService";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../service/GraphDataService";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const GrowthPage = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [symbols, setSymbols] = useState([]);

    const handleFormSubmit = async (submitValues) => {
        setLoading(true);
        console.log(`Passing request with ${submitValues}`);
        const growthData = await getGrowthDetails(submitValues);

        setSymbols(submitValues.symbol.map(symbol => symbol.split(':')[1]));

        const growthDataModified = rePivotGraphData(growthData, 'symbol', 'percent', (datum) => `${datum.year} - ${datum.subYear}`)
        console.log(`Received response as [ ${growthDataModified} ]`);

        setData(growthDataModified);
        setLoading(false);
        setInitiated(true);
    }

    const colors = ['blue', 'green', 'red', 'orange', 'violet']

    return (
        <div>
            <GrowthForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <LineChart width={800} height={500} data={data}
                               margin={{top: 20, right: 20, left: 20, bottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={'xAxis'}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        {symbols.map((symbol, _idx) => <Line dataKey={symbol} stroke={colors[_idx]} type={'monotone'}/>)}
                    </LineChart>
                </div>
            )}
        </div>
    )
}

export default GrowthPage;