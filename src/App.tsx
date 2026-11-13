import './App.css'
import WorkoutForm from './components/WorkoutForm'

function App() {

  return (
    <>
      <main className="max-w-3xl mx-auto">
        <header className='py-10 text-center'>
          <h1 className="mt-20 text-3xl font-bold text-orange-600">Plan B w/ AI</h1>
          <h3 className='text-orange-500'>your own workout generator</h3>
        </header>
        <WorkoutForm />
      </main>
    </>
  )
}

export default App
