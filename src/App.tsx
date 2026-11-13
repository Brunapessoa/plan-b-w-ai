import './App.css'
import WorkoutForm from './components/WorkoutForm'

function App() {

  return (
    <>
      <main className="bg-mauve-800 h-auto py-10 px-20">
        <h1 className="py-10 text-3xl font-bold text-orange-600">Workout Generator</h1>
        <WorkoutForm />
      </main>
    </>
  )
}

export default App
