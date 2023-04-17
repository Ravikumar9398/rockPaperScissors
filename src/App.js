import {Component} from 'react'
import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import './App.css'
import 'reactjs-popup/dist/index.css'
import PlayerItems from './component/playerItems'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    isShow: false,
    randomItem: '',
    score: 0,
    selectedImageUrl: '',
    result: '',
  }

  componentDidMount() {
    this.getRandomImages()
  }

  getRandomImages = () => {
    const number = Math.floor(Math.random() * 3)
    console.log(number)
    this.setState({
      randomItem: choicesList[number],
    })
  }

  onClickPlayAgain = () => {
    this.getRandomImages()
    this.setState({
      isShow: false,
    })
  }

  selectedChoice = id => {
    const {randomItem} = this.state
    const chooseImage = choicesList.filter(each => each.id === id)

    this.setState({
      selectedImageUrl: chooseImage[0].imageUrl,
      isShow: true,
    })

    if (id === randomItem.id) {
      this.setState(prevState => ({
        score: prevState.score + 0,
        result: 'IT IS DRAW',
      }))
    } else if (id === 'PAPER' && randomItem.id === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        result: 'YOU LOSE',
      }))
    } else if (id === 'PAPER' && randomItem.id === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        result: 'YOU WON',
      }))
    } else if (id === 'SCISSORS' && randomItem.id === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        result: 'YOU WON',
      }))
    } else if (id === 'SCISSORS' && randomItem.id === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        result: 'YOU LOSE',
      }))
    } else if (id === 'ROCK' && randomItem.id === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        result: 'YOU WON',
      }))
    } else if (id === 'ROCK' && randomItem.id === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        result: 'YOU LOSE',
      }))
    }
  }

  onClickRulesBtn = () => (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="rules-btn">
            RULES
          </button>
        }
      >
        {close => (
          <div className="popup-elements">
            <button
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              <RiCloseLine />
            </button>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png "
                alt="rules"
                className="rules-image"
              />
            </div>
          </div>
        )}
      </Popup>
    </div>
  )

  renderResults = () => {
    const {randomItem, selectedImageUrl, result} = this.state

    return (
      <div className="result-container">
        <div className="results-images">
          <img src={selectedImageUrl} alt="your choice" className="image" />
          <img
            src={randomItem.imageUrl}
            alt="opponent choice"
            className="image"
          />
        </div>
        <p className="names size">{result}</p>
        <button
          type="button"
          className="play-btn"
          onClick={this.onClickPlayAgain}
        >
          {' '}
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {isShow, score} = this.state

    return (
      <div className="app-container">
        <div className="header">
          <div>
            <h1 className="names">Rock Paper Scissors</h1>
          </div>
          <div className="score-item">
            <p className="score">SCORE</p>

            <p className="score">{score}</p>
          </div>
        </div>
        {isShow ? (
          this.renderResults()
        ) : (
          <div className="img-bg">
            {choicesList.map(each => (
              <PlayerItems
                itemDetails={each}
                key={each.id}
                selectedChoice={this.selectedChoice}
              />
            ))}
          </div>
        )}

        <div className="popup-container">{this.onClickRulesBtn()}</div>
      </div>
    )
  }
}

export default App
