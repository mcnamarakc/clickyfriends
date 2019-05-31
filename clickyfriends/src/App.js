import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state={
    clickedFriends: [],
    win: false,
    score: 0,
    roundEnd: false,
    friends: [
      {
        photo: require('./images/sillly.jpg'),
        id: 1
      },
      {
        photo: require('./images/durham-glas.jpg'),
        id: 2
      },
      {
        photo: require('./images/5874.jpg'),
        id: 3
      }
    ]
  }

  roundReset = () => {
    let {clickedFriends, score, roundEnd } = this.state

    clickedFriends = []
    score = 0
    roundEnd = false

    this.setState({
      clickedFriends,
      score,
      roundEnd
    })
  }

 onClick = (id) => {
   let { clickedFriends, score, friends, roundEnd, win } = this.state;
   let friendCount = friends.length;
   let friendSelected;
   let temp;
   if (clickedFriends.includes(id)){
     roundEnd = true
     setTimeout(this.roundReset, 2000)
     console.log("you lost")
    clickedFriends = []
    score = 0
    } else {
      score++
      clickedFriends.push(id)
      if (score === friendCount) {
        win = true
        roundEnd = true
        setTimeout(this.roundReset, 2000)
        console.log("Winner!")
      }
    }

    

    while (friendCount > 0) {
      friendSelected = Math.floor(Math.random() * friendCount);
      friendCount--;
      temp = friends[friendCount];
      friends[friendCount] = friends[friendSelected]
      friends[friendSelected] = temp;
    }

    this.setState({
      clickedFriends,
      score,
      friends,
      roundEnd,
      win
    })
 }

render() {
  return (
    <div className="App">
      <h1> Clicky Friends</h1>
      <p>Click all the friends, with no duplicates, to win!</p>
      <p>Score: {this.state.score}</p>
      <div className="friend-zone">
        {(this.state.roundEnd && !this.state.win) ? (<h1>You lose</h1>) 
        :
        (this.state.roundEnd && this.state.win) ? (<h1>You Win!</h1>)
        :
        (this.state.friends.map(friend => <img onClick={() => this.onClick(friend.id)} key={friend.id} src={friend.photo} alt="place holder" />))}
      </div>    
    </div>
  );
}

}
export default App;
