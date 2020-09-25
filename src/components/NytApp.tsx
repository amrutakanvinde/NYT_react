import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { NytResults } from './NytResults';

type NytData = {
    search: string,
    startDate?: string,
    endDate?: string,
    results: [],
    // pageNumber: number
}

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; 
const key = 'TP959a2kbRzA2l2ge8CRMoGStCNf1vFk';
let pageNumber = 0;

class NytApp extends Component<{}, NytData> {
    constructor(props: {}){
        super(props)
        this.state = {
            search: "",
            startDate: "", //new Date(),
            endDate: "", //new Date(),
            results: [],
            // pageNumber: 0
        }
    }



    fetchResults = () => {
        let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${this.state.search}`;
        // console.log("Fetch Results",pageNumber)
        url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
        url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;
        console.log("Fetch Results");

        fetch(url)
        .then(res => res.json())
        .then(data => {
            this.setState({
                results: data.response.docs
            })
            // console.log("Data",data)
        })
        .catch(err => console.log(err));
    }

     handleSubmit = (event: any) => {
        // this.setState({
        //     pageNumber: 0
        // })
        pageNumber = 0;
        event.preventDefault();
        // console.log("Hande Submit");
        this.fetchResults();
    }

     changePageNumber = (event: any, direction: string) => {
        event.preventDefault();

        console.log("Change Page", direction,pageNumber)
        if(direction === 'down') {
            if(pageNumber > 0){
                // this.setState({
                    pageNumber = pageNumber - 1 ;
                // })
                this.fetchResults();
            }
        }
        if(direction === 'up'){
            // this.setState({
                pageNumber = pageNumber + 1
            // })
            this.fetchResults();
        }
    }

    render() {
        return(
            <div>
                <Form onSubmit={e => this.handleSubmit(e) }>
                <span>Enter a single search term (required) : </span>
                    <input type="text" name="search"  
                    onChange={(e) => {
                        this.setState({
                            search: e.target.value
                        })
                    }} required 
                    />
                    <br />
                    <br/>
                    <span>Enter a start date: </span>
                    <input type="date" name="startDate" pattern="[0-9]{8}" 
                    onChange={e => {
                        this.setState({
                            startDate: e.target.value
                        })
                    }} 
                    />
                    <br />
                    <span>Enter an end date: </span>
                    <input type="date" name="endDate" pattern="[0-9]{8}" 
                    onChange={e => {
                        this.setState({
                            endDate: e.target.value
                        })
                    }} 
                    />
                    <br />
                    <button className="submit">Submit search</button>
                </Form>

                {
                    this.state.results.length > 0 ? <NytResults results = {this.state.results} 
                    changePage={this.changePageNumber} 
                    /> : null
                }
            </div>
        )
    }
}


export default NytApp;