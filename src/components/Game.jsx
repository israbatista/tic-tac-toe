import Square from "./Square"
import "./Game.css"
import { useState } from "react"

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //colunas
    [0, 4, 8], [2, 4, 6] //diagonais
  ]

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [scorex, setScorex] = useState(0)
  const [scoreo, setScoreo] = useState(0)
  let newRound = false

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "Vencedor " + winner
    newRound = true
  } else if (!squares.includes(null)) {
    status = "Empate!"
    newRound = true
  } else {
    status = "Próxima jogada: " + (xIsNext ? "X" : "O")
    newRound = false
  }

  function handleSquareClick(i) {
    if (squares[i] || winner)
      return
    const nextSquares = [...squares]
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  function resetGame() {
    if (winner === "X") {
      setScorex(scorex + 1)
    }
    else if (winner === "O") {
      setScoreo(scoreo + 1)
    }
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }
  return (
    <div className="game">
      <h1 className="title">Jogo da Velha</h1>
      <div className={winner ? "status winner" : "status"}>{status}</div>
      <div className="board">
        <div className="row"> {[0, 1, 2].map((i) => <Square value={squares[i]} onClick={() => handleSquareClick(i)} key={i} />)}</div>
        <div className="row"> {[3, 4, 5].map((i) => <Square value={squares[i]} onClick={() => handleSquareClick(i)} key={i} />)}</div>
        <div className="row"> {[6, 7, 8].map((i) => <Square value={squares[i]} onClick={() => handleSquareClick(i)} key={i} />)}</div>
      </div>
      {newRound && <button className="reset" onClick={resetGame} >
        Novo Jogo</button>}
      <h2 className="score">
        X:{scorex}  O:{scoreo}
      </h2>




    </div>
  )
}

export default Game