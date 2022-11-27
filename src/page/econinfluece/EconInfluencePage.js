import classes from "../pagestyles.module.scss";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../../service/GraphDataService";
import {Area, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis} from "recharts";
import _ from "lodash";
import EconInfluenceForm from "../../form/EconInfluenceForm";
import {getEconInfluenceData} from "../../service/EconInfluence/EconInfluece";

const EconInfluencePage = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [sectorSymbols, setSectorSymbols] = useState([]);
    const [indicatorSymbols, setIndicatorSymbols] = useState([]);

    const handleFormSubmit = async (formData) => {
        setLoading(true);
        console.log(`Passing request with ${JSON.stringify(formData)}`);
        const econInfluenceData = await getEconInfluenceData(formData);

        const data = _.groupBy(econInfluenceData, ({type}) => type);

        console.log("data", data);

        const indicatorSymbols = Object.keys(_.groupBy(data['ECON_IND'], ({symbol}) => symbol));
        const sectorSymbols = Object.keys(_.groupBy(data['SECTOR'], ({symbol}) => symbol));

        setSectorSymbols(sectorSymbols);
        setIndicatorSymbols(indicatorSymbols);

        const perfectedData = rePivotGraphData(econInfluenceData, 'symbol', 'value', (datum) => `${datum.year} - ${datum.subYear}`);
        // const sectorPerfectedData = rePivotGraphData(data['SECTOR'], 'sector', 'value', (datum) => `${datum.year} - ${datum.subYear}`);

        setData(perfectedData);
        setLoading(false);
        setInitiated(true);
    }

    const colors = ['blue', 'green', 'red', 'orange', 'violet']

    return (
        <div>
            <EconInfluenceForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <ComposedChart width={800} height={500} data={data}
                               margin={{top: 20, right: 20, left: 80, bottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={'xAxis'}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        {/*{symbols.map((symbol, _idx) => <Line*/}
                        {/*    dataKey={symbol}*/}
                        {/*    stroke={colors[_idx % colors.length]}*/}
                        {/*    type={'monotone'}*/}
                        {/*/>)}*/}
                        {
                            sectorSymbols.map(
                                (symbol, _idx) => <Line
                                    dataKey={symbol}
                                    stroke={colors[_idx % colors.length]}
                                    type={'monotone'}
                                />
                            )
                        }
                        {
                            indicatorSymbols.map(
                                (symbol, _idx) => <Area
                                    dataKey={symbol}
                                    fillOpacity={0.25}
                                    fill={colors[_idx % colors.length]}
                                    stroke={colors[_idx % colors.length]}
                                    type={'monotone'}
                                    />
                            )
                        }
                    </ComposedChart>
                </div>
            )}
        </div>
    )
}

export default EconInfluencePage;