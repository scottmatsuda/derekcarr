import React, { Component } from "react";
import { Button } from '@mui/material';
import { getPlayerById }from "./services";
import PropTypes from 'prop-types';
import { Bar } from "react-chartjs-2";

class NoChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fullNameBaker: '',
        fullNameCarr: '',
        weekCarr: [], 
        weekBaker: [], 
        totalCarrTDs: 0, 
        totalCarrTDsArray: [],
        totalBakerTDs: 0,
        totalBakerTDsArray: [],
        seasonYearCarr: 0
    }
  }
  
  componentDidMount() {
    
    let playerIDCarr = 2543499;
    getPlayerById(playerIDCarr)
      .then(this.onGetAllSuccessCarr)
      .catch(this.onGetAllError)

    let playerIDBaker = 2560800;
    getPlayerById(playerIDBaker)
      .then(this.onGetAllSuccessBaker)
      .catch(this.onGetAllError)
  }

  onGetAllSuccessCarr = (response) => {
    
    let weekCarr = response.map((weekCarr) => weekCarr.week)
    let rshTDCarr = response.map((rushCarr) => rushCarr.RshTD)
    let psTDCarr = response.map((passCarr) => passCarr.PsTD)
    let totalCarrTDsArray = psTDCarr.map( (val, i) => val + rshTDCarr[i] );
    let fullNameCarr = response.map((name) => name.fullName);
    let seasonYearCarr = response.map((season) => season.seasonYear)

    let totalCarrTDs = totalCarrTDsArray.reduce((a, b) => {
        return a + b;
    })
   console.log('totalCarrTDs', totalCarrTDs)
    this.setState(() => {
        return {
            weekCarr,
            totalCarrTDs,
            totalCarrTDsArray,
            fullNameCarr,
            seasonYearCarr
        };
    });
  }

  onGetAllSuccessBaker = (response) => {
    
    let weekBaker = response.map((weekBaker) => weekBaker.week)
    let rshTDBaker = response.map((rushBaker) => rushBaker.RshTD)
    let psTDBaker = response.map((passBaker) => passBaker.PsTD)
    let totalBakerTDsArray = psTDBaker.map( (val, i) => val + rshTDBaker[i] );
    let fullNameBaker = response.map((name) => name.fullName);

    let totalBakerTDs = totalBakerTDsArray.reduce((a, b) => {
        return a + b;
    })
    
    this.setState(() => {
        return {
            weekBaker,
            totalBakerTDs,
            totalBakerTDsArray,
            fullNameBaker
        };
    });
  }

  render() {
    return (
        <React.Fragment>  
          <h2>{this.state.fullNameBaker[0] || "Baker Mayfield"} had {this.state.totalBakerTDs - this.state.totalCarrTDs} more TD's than {this.state.fullNameCarr[0] || "Derek Carr"} in {this.state.seasonYearCarr[0] || "2018"} and {this.state.fullNameBaker[0] || "Baker Mayfield"} is no longer a starting quarterback in the NFL</h2>
          <div>
            <Bar
              height={"350%"}
              options={{ maintainAspectRatio: false }}
              datasetIdKey='id'
              data={{
                // labels: [this.state.weekBaker[0], this.state.weekBaker[1], this.state.weekBaker[2], this.state.weekBaker[3], this.state.weekBaker[4], this.state.weekBaker[5], this.state.weekBaker[6], this.state.weekBaker[7], this.state.weekBaker[8],this.state.weekBaker[9], this.state.weekBaker[10], this.state.weekBaker[11], this.state.weekBaker[12], this.state.weekBaker[13], this.state.weekBaker[14], this.state.weekBaker[15]],
                labels: [0, 1, 2, 3,4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                datasets: [
                  {
                    label: "Carr's Touchdowns",
                    data: this.state.totalCarrTDsArray,
                    fill: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  },
                  {
                    label: "Baker's Touchdowns",
                    data: this.state.totalBakerTDsArray,
                    fill: true,
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                  },
                ],
              }}
            />
          </div>
          <Button 
          onClick={() => {
            this.props.history.push("/");
          }}
          color="error" variant="contained">Back</Button>
      </React.Fragment>
    );
  }
}  

NoChart.propTypes = {
  history: PropTypes.shape({
  push: PropTypes.func,
  })
};

export default NoChart;
