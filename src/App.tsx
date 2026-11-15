import './App.css'
import WorkoutForm from './components/WorkoutForm'

function App() {

  return (
    <>
        <header className='h-30 flex flex-col justify-end items-end pr-5 bg-[url(/header.jpg)] bg-cover bg-center text-shadow-md'>
          <h1 className="text-2xl font-bold text-orange-600 "><span className="text-3xl font-allura" > Plan B with</span> AI</h1>
          <p className='font-serif italic text-lg text-orange-600'>your own workout generator</p>
        </header>
      <main className="max-w-3xl mx-auto">
        <WorkoutForm />
      </main>
    </>
  )
}

export default App
