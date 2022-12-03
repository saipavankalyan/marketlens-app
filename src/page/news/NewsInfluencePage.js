import classes from "../pagestyles.module.scss";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../../service/GraphDataService";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import _ from "lodash";
import {getNewsInfluenceDetails} from "../../service/newsInflluence/NewsInfluenceService";
import NewsInfluenceForm from "../../form/NewsInfluenceForm";
import {SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_PROPERTIES, YLABEL_PROPERTIES} from "../../constant/constants";

const NewsInfluencePage = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [symbols, setSymbols] = useState([]);

    const handleFormSubmit = async ({event}) => {
        setLoading(true);
        console.log(`Passing request with ${{event}}`);
        const newsInfluenceSectorData = await getNewsInfluenceDetails(event);

        const symbols = Object.keys(_.groupBy(newsInfluenceSectorData, ({sector}) => sector));

        setSymbols(symbols);

        const newsInfluencePivotedData = rePivotGraphData(newsInfluenceSectorData, 'sector', 'value', (datum) => `${datum.year} - ${datum.subYear}`)
        console.log(`Received response as [ ${newsInfluencePivotedData} ]`);

        setData(newsInfluencePivotedData);
        setLoading(false);
        setInitiated(true);
    }

    const colors = ['blue', 'green', 'red', 'orange', 'violet']

    const tooltipFormatter = (value) => {
        return `${value.toFixed(2)} %`;
    }

    const yTickFormatter = (value) => {
        return `${parseInt(value)} %`;
    }

    return (
        <div>
            <NewsInfluenceForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <LineChart data={data}
                               {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis label={XLABEL_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis tickFormatter={yTickFormatter} label={{...YLABEL_PROPERTIES, value: 'Growth %'}}/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend layout={"vertical"} verticalAlign={"top"} align={"right"}/>
                        {symbols.map((symbol, _idx) => <Line
                            dataKey={symbol}
                            stroke={colors[_idx % colors.length]}
                            type={'monotone'}
                        />)}
                    </LineChart>
                </div>
            )}
        </div>
    )
}

export default NewsInfluencePage;