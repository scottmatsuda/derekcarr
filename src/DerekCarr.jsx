import React, { Component } from "react";
import { Card, Grid, Button, Box } from '@mui/material';
import { getAllPlayers }from "./services";
import { BrowserRouter as Link } from "react-router-dom";
import PropTypes from 'prop-types';

class DerekCarr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerId: 0,
      fullName: '',
      playerImage: '',
      teamImage: ''
    };
  }

  componentDidMount() {
    getAllPlayers()
      .then(this.onGetAllPlayersSuccess)
      .catch(this.onGetAllPlayersError);
  }

  onGetAllPlayersSuccess = (response) => {
    let { playerId, fullName, playerImage, teamImage } = response[1];
    this.setState(() => {
      return {
        playerId, fullName, playerImage, teamImage
      };
    });
  };

  onGetAllPlayersError = (error) => {
    console.error(error);
  };

  onYesClick = () => {
    this.props.history.push("/yes");
  };

  
  onNoClick = () => {
    this.props.history.push("/no");
  };
  
  render() {


    return (
        <React.Fragment>
            <h1 align="center">Based on his 2018 stats, is {this.state.fullName || "current Raiders quarterback Derek Carr"} the man in Las Vegas?</h1>
            <Grid columnSpacing={3} align="center" item xs={2} padding={10} >
                <Card className="mb-4" style={{ width: '36vh', height: '40vh' }} >
                    <div className="card-img-wrapper">
                        <img alt="..." className="card-img-top mt-3" src={this.state.playerImage} style={{ height: '40vh' }} />
                    </div>
                </Card>
            </Grid >
            <Box display="flex" justifyContent="space-between" padding={4}>
                <Grid item xs={6}>
                  <Link to="/yes" underline="none">
                    <Button 
                      onClick={this.onYesClick} color="success" variant="contained">Yes, he's worth every penny
                      <img alt="..." className="card-img-top mt-3" src={this.state.teamImage} style={{ height: '10vh' }} />
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link to="/no" underline="none">
                    <Button onClick={this.onNoClick} color="error" variant="contained">No, he's trash
                        <img alt="..." className="card-img-top mt-3" src={this.state.teamImage} style={{ height: '10vh' }} />
                    </Button>
                  </Link>
                    
                </Grid>
            </Box>
      </React.Fragment>
    );
  }
}

DerekCarr.propTypes = {
  history: PropTypes.shape({
  push: PropTypes.func,
  })
};

export default DerekCarr;
