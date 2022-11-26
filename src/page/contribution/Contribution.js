import classes from "../pagestyles.module.scss";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../../service/GraphDataService";
import {Area, CartesianGrid, Legend, Line, AreaChart, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {getContributionDetails} from "../../service/contribution/ContributionService";
import ContributionForm from "../../form/ContributionForm";
import _ from "lodash";

const ContributionPage = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [symbols, setSymbols] = useState([]);

    const handleFormSubmit = async ({minYear, maxYear, sector, n}) => {
        setLoading(true);
        console.log(`Passing request with ${{minYear, maxYear, sector, n}}`);
        const contributionsData = await getContributionDetails(minYear, maxYear, sector, n);

        const symbols = Object.keys(_.groupBy(contributionsData, ({symbol}) => symbol));
        console.log(symbols)
        setSymbols(symbols);

        const contributionDataPivoted = rePivotGraphData(contributionsData, 'symbol', 'marketCap', (datum) => `${datum.year} - ${datum.subYear}`)
        console.log(`Received response as [ ${contributionDataPivoted} ]`);

        setData(contributionDataPivoted);
        setLoading(false);
        setInitiated(true);
    }

    const colors = ['blue', 'green', 'red', 'orange', 'violet']

    return (
        <div>
            <ContributionForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <AreaChart width={800} height={500} data={data}
                               margin={{top: 20, right: 20, left: 80, bottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={'xAxis'}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        {symbols.map((symbol, _idx) => <Area
                            dataKey={symbol}
                            fillOpacity={0.25}
                            fill={colors[_idx % colors.length]}
                            stackId={1}
                            stroke={colors[_idx % colors.length]}
                            type={'monotone'}/>)}
                    </AreaChart>
                </div>
            )}
        </div>
    )
}

export default ContributionPage;