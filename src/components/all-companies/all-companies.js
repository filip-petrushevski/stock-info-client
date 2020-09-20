import React, { Component } from 'react';
import ApiService from '../../services/api-service/api-service';
import Pagination from "@material-ui/lab/Pagination";
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper, TableHead, TextField, Button, Box, IconButton, Tooltip, Typography } from '@material-ui/core';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import ComponentsSwitch from '../components-switch/components-switch';
import ViewQuiltRoundedIcon from '@material-ui/icons/ViewQuiltRounded';
import BodyContainer from '../body-container/body-container';
import AuthService from '../../services/auth-service/auth-service';

export default class extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchString = this.onChangeSearchString.bind(this);
        this.retrieveCompanies = this.retrieveCompanies.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.addToMyCompanies = this.addToMyCompanies.bind(this);
        this.removeFromMyCompanies = this.removeFromMyCompanies.bind(this);
        this.applySearch = this.applySearch.bind(this);
        this.textFieldKeyPress = this.textFieldKeyPress.bind(this);

        this.state = {
            companies: [],
            searchString: "",
            page: 0,
            count: 0,
            pageSize: 5,
            userCompanySymbols: [],
            userId: null,
            searchStringField: ""
        };
    }

    componentDidMount() {
        this.retrieveCompanies();
        this.retrieveUserCompanySymbols();
    }

    onChangeSearchString(e) {
        const search = e.target.value;

        this.setState({
            searchStringField: search,
        });
    }

    getRequestParams(searchString, page, pageSize) {
        let params = {};

        if (searchString) {
            params["query"] = searchString;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    }

    retrieveCompanies() {
        const { searchString, page, pageSize } = this.state;
        const params = this.getRequestParams(searchString ? searchString : "", page, pageSize);

        ApiService.getAllCompanies(params)
            .then((response) => {
                const { companies, totalPages } = response.data;

                this.setState({
                    companies: companies,
                    count: totalPages,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    retrieveUserCompanySymbols() {
        const userId = AuthService.getCurrentUser().id;
        this.setState({ userId: userId });
        ApiService.getAllCompanySymbolsForUser(userId).then((res) => {
            this.setState({ userCompanySymbols: res.data })
        });
    }

    addToMyCompanies(companySymbol) {
        if (!this.state.userCompanySymbols) {
            return;
        }
        this.setState({ userCompanySymbols: [...this.state.userCompanySymbols, companySymbol] });
        ApiService.addToMyCompanies(this.state.userId, companySymbol);
    }

    removeFromMyCompanies(companySymbol) {
        if (!this.state.userCompanySymbols) {
            return;
        }
        this.setState({ userCompanySymbols: this.state.userCompanySymbols.filter(c => c !== companySymbol) });
        ApiService.removeFromMyCompanies(this.state.userId, companySymbol);
    }

    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
            () => {
                this.retrieveCompanies();
            }
        );
    }

    applySearch() {
        this.setState(
            {
                page: 1,
                searchString: this.state.searchStringField
            },
            () => {
                this.retrieveCompanies();
            }
        );
    }
    
    textFieldKeyPress(e) {
        if (e.keyCode === 13) {
            this.applySearch();
        }
    }

    render() {
        const {
            companies,
            page,
            count,
            userCompanySymbols,
            searchStringField
        } = this.state;

        const tableHeadCellStyle = {
            fontWeight: "bold"
        }
        const lastTableHeadCellStyle = {
            fontWeight: "bold",
            marginRight: 15

        }
        const rootStyle = {
            width: "100%",
            marginLeft: 3,
            marginRight: 3
        }
        const buttonWrapperStyle = {
            marginTop: 18,
            float: "right"
        }
        const searchFieldWrapperStyle = {
            marginRight: 15,
            float: "right"
        }
        
        return (
            <BodyContainer>
                <div style={rootStyle}>
                    <Box style={{ width: "100%" }}>
                        <div>
                            <div style={buttonWrapperStyle}>
                                <Tooltip title="Apply search">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        onClick={this.applySearch}>
                                        Apply
                                    </Button>
                                </Tooltip>
                            </div>
                            <div style={searchFieldWrapperStyle}>
                                <TextField
                                    id="search-field"
                                    label="Search by symbol or name"
                                    type="search"
                                    value={searchStringField}
                                    onChange={this.onChangeSearchString}
                                    onKeyDown={this.textFieldKeyPress}
                                />
                            </div>
                        </div>
                    </Box>
                    <div>
                        <Typography variant="h4" style={{display: "inline"}}>All Companies</Typography>
                        <Typography variant="h6" style={{display: "inline"}}>{this.state.searchString ? " with filter applied: '" + this.state.searchString + "'" : ''}</Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeadCellStyle}>Symbol</TableCell>
                                        <TableCell style={tableHeadCellStyle}>Name</TableCell>
                                        <TableCell style={tableHeadCellStyle}>Exchange market</TableCell>
                                        <TableCell style={tableHeadCellStyle} align="right"><div style={lastTableHeadCellStyle}>Actions</div></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {companies &&
                                        companies.map((company, index) => (
                                            <TableRow key={company.symbol}>
                                                <TableCell component="th" scope="row" style={{ width: 100 }}>
                                                    {company.symbol}
                                                </TableCell>
                                                <TableCell>
                                                    {company.name}
                                                </TableCell>
                                                <TableCell>
                                                    {company.exchange}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="Open company profile">
                                                        <IconButton
                                                            color="primary"
                                                            aria-label="open company profile"
                                                            href={"/companies/" + company.symbol}>
                                                            <ViewQuiltRoundedIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <ComponentsSwitch active={userCompanySymbols && userCompanySymbols.includes(company.symbol) ? "turnedIn" : "turnedInNot"}>
                                                        <Tooltip name="turnedIn" title="Remove from My companies">
                                                            <IconButton color="primary" aria-label="remove from my companies" onClick={e => this.removeFromMyCompanies(company.symbol)}>
                                                                <TurnedInIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip name="turnedInNot" title="Add to My companies">
                                                            <IconButton color="primary" aria-label="add to my companies" onClick={e => this.addToMyCompanies(company.symbol)}>
                                                                <TurnedInNotIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </ComponentsSwitch>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <Pagination
                                count={count}
                                page={page}
                                variant="outlined"
                                shape="rounded"
                                onChange={this.handlePageChange}
                            ></Pagination>
                        </TableContainer>
                    </div>
                </div>
            </BodyContainer>
        );
    }
} 