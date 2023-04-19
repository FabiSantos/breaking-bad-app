import { useState, useEffect } from "react"
import { Pacmanspinner } from "./components/Pacmanspinner";
import { Quote } from "./components/Quote";

const initialQuote = {
  text: "Quote",
  author: "Author :)"
}

const App = () => {

  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(false);


  //llamada asincrona con fetch, el useeffect no acepta parametro async directamente
  const uppDateQuote = async () => {
    setLoading(true)
    const url = "https://api.breakingbadquotes.xyz/v1/quotes"
    const response = await fetch(url)

    //desestruturacción de informacion
    const [newQuote] = await response.json()

    //desestruturacción del objeto, alias a quote, renombralo a text
    const { quote: text, author } = newQuote

    setQuote({
      text,
      author
    })
    setLoading(false)
  }


  const spinner = () => {
    const time = loading ? <Pacmanspinner /> : <Quote quote={quote} />
    setTimeout(() => {
      spinner()
    }, 3000);
    return time
  }


  useEffect(() => {
    uppDateQuote()

  }, [])
  return (
    <div className='app'>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
        alt="logo"
      />
      <button onClick={() => uppDateQuote()} >Get Another</button>
      {spinner()}

    </div>
  )
}

export default App