import React, { Component } from 'react';
import ApiService from '../../services/api-service/api-service';
import CanvasJSReact from '../../utils/canvas-js/canvasjs.react';
import { Grid, CardMedia, Card, Typography, Link } from '@material-ui/core';
import BodyContainer from '../body-container/body-container'
import Title from '../title/title';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ohlc: [],
            company: null
        };
    }

    componentDidMount() {
        const symbol = this.props.match.params.symbol;
        ApiService.getCompanyBySymbol(symbol).then((res) => {
            this.setState({
                company: res.data
            })
        })
        ApiService.getAllOhlcForCompany(symbol).then((res) => {
            this.setState({
                ohlc: res.data
            })
        })
    }

    render() {
        const dateFormatter = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        })

        const options = {
            height: 260,
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            exportFileName: this.state.company && this.state.company.symbol + '-stock-chart',
            title: {
                text: "OHLC"
            },
            axisX: {
                intervalType: "day",
                valueFormatString: "DD MMM"
            },
            axisY: {
                prefix: "$",
                title: "Price (in USD)"
            },
            data: [{
                type: "ohlc",
                yValueFormatString: "$####.00",
                xValueFormatString: "DD MMM",
                dataPoints: this.state.ohlc && this.state.ohlc.map(o => { return { "x": new Date(o.date), "y": [o.open, o.high, o.low, o.close] } })
            }]
        }

        const optionsSpline = {
            height: 260,
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: "Volume"
            },
            axisX: {
                valueFormatString: "DD MMM"
            },
            axisY: {
                title: "Number of shares traded"
            },
            data: [{
                yValueFormatString: "###",
                xValueFormatString: "DD MMM",
                type: "spline",
                dataPoints: this.state.ohlc && this.state.ohlc.map(o => { return { "x": new Date(o.date), "y": o.volume } })
            }]
        }

        return (
            <BodyContainer>
                <Card variant="outlined" style={{ padding: 15 }}>
                    <Grid container spacing={2}>
                        <Grid item container sm={6}>
                            <Grid item sm={12} style={{ paddingLeft: 4, marginLeft: 8}}>
                                <Link href={this.state.company && this.state.company.weburl}><Title>{this.state.company && this.state.company.name}</Title></Link>
                            </Grid>
                            <Grid item sm={6} style={{marginBottom: 0, paddingBottom: 0}}>
                                <Card variant="outlined" style={{ padding: 4, margin: 8, height: 180, width: 180 }}>
                                    <CardMedia
                                        variant="outlined"
                                        style={{ height: 180, width: 180 }}
                                        image={this.state.company && this.state.company.logo}
                                    />
                                </Card>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography variant="h6">
                                    Symbol: <b>{this.state.company && this.state.company.symbol}</b>
                                    <br />Country: <b>{this.state.company && this.state.company.country}</b>
                                    <br />Currency: <b>{this.state.company && this.state.company.currency}</b>
                                    <br />Phone: <b>{this.state.company && this.state.company.phone}</b>
                                </Typography>
                            </Grid>
                            <Typography variant="h6" style={{ paddingLeft: 4, marginLeft: 8, marginTop: 0, paddingTop: 0}}>
                                Exchange: <b>{this.state.company && this.state.company.exchange}</b>
                                <br />Initial public offering: <b>{this.state.company && dateFormatter.format(new Date(this.state.company.ipo))}</b>
                                <br />Market capitalization: <b>{this.state.company && this.state.company.marketCapitalization}</b>
                                <br />Share outstanding: <b>{this.state.company && this.state.company.shareOutstanding}</b>
                                <br />Industry: <b>{this.state.company && this.state.company.finnhubIndustry}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card variant="outlined">
                                <CanvasJSChart options={options} />
                            </Card>
                            <Card variant="outlined" style={{ marginTop: 10 }}>
                                <CanvasJSChart options={optionsSpline} />
                            </Card>
                        </Grid>
                    </Grid>
                </Card>
            </BodyContainer>
        )
    }
}