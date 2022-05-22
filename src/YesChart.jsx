import React, { Component } from "react";
import { Button } from '@mui/material';
import { getPlayerById }from "./services";
import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";

class YesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        int: [], 
        TDtoIntRatio: 0, 
        week: [], 
        totalTDs: 0, 
        totalTDsArray: [],
        totalSacks: 0,
        seasonYear: 2018
    }    
  }

  componentDidMount() {
    
    let playerId = 2543499;
    getPlayerById(playerId)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  }

  onGetAllSuccess = (response) => {
    
    let sack = response.map((sack) => sack.Sack)
    let week = response.map((week) => week.week)
    let int = response.map((int) => int.Int)
    let rshTD = response.map((rush) => rush.RshTD)
    let psTD = response.map((pass) => pass.PsTD)
    let totalTDsArray = psTD.map( (val, i) => val + rshTD[i] );
    let seasonYear = response.map((season) => season.seasonYear)

    let totalSacks = sack.reduce((a, b) => {
        return a + b;
    })
    let totalTDs = totalTDsArray.reduce((a, b) => {
        return a + b;
    })
    let totalInts = int.reduce((a, b) => {
        return a + b;
    })
    
    let TDtoIntRatio = totalTDs / totalInts;
   
    this.setState(() => {
        return {
            int,
            week,
            TDtoIntRatio,
            totalTDs,
            totalTDsArray,
            totalSacks,
            seasonYear
        };
    });
  }

  onGetAllError = (error) => {
    console.error(error);
  };

  render() {
    return (
        <React.Fragment>
          <h2>In {this.state.seasonYear[0] || "2018"} despite a 4-12 record and being sacked {this.state.totalSacks} times, Derek Carr compiled a total TD:Int ratio of {this.state.TDtoIntRatio}.0</h2>
          <p>Week 7: Bye</p>
          <div>
            <Line
              width={"80%"}
              height={"200%"}
              options={{ maintainAspectRatio: false }}
              datasetIdKey='id'
              data={{
                // eslint-disable-next-line no-sparse-arrays
                labels: [this.state.week[0], this.state.week[1], this.state.week[2], this.state.week[3], this.state.week[4], this.state.week[5], this.state.week[6], this.state.week[7], this.state.week[8],this.state.week[9], this.state.week[10], this.state.week[11], this.state.week[12], this.state.week[13], this.state.week[14], this.state.week[15]],
                datasets: [
                  {
                    label: "Passing Touchdowns",
                    data: this.state.totalTDsArray,
                    fill: false,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                  },
                  {
                    label: "Interceptions",
                    data: this.state.int,
                    fill: false,
                    borderColor: "#742774"
                  },
                ],
              }}
            />
          </div>
          <Button 
            onClick={() => {
              this.props.history.push("/");
            }}
            color="secondary" variant="contained">Back
          </Button>
      </React.Fragment>
    );
  }
}  

  YesChart.propTypes = {
    history: PropTypes.shape({
    push: PropTypes.func,
    })
  };

export default YesChart;
