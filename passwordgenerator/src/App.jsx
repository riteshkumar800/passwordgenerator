import { useCallback, useState ,useEffect, useRef} from 'react'
import './App.css'

function App() {
  
  const [password, setpassword] = useState('')
  const [length, setLength] = useState(8)
  const [charallowed, setcharallowed] = useState(false)
  const [numallowed, setnumallowed] = useState(false)

  const passwordref=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if (numallowed) str += "1234567890"
    if (charallowed) str += "!@#$%^&*-_+=[]{}~`"

   
    for (let i = 1; i <= length; i++) {

      
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setpassword(pass)

  
  }, [length, charallowed, numallowed])

  const copyPassword=useCallback(()=>{
    window.navigator.clipboard.writeText(password)


  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numallowed, charallowed, passwordGenerator])

  return (
    <div className='h-screen w-screen bg-gray-950 flex justify-center items-center'>
      
      <div className='h-[300px] w-[700px] bg-gray-800 border-4 rounded-2xl p-6 flex flex-col items-center'>
        
        <h1 className='text-3xl text-white mb-5'>
          Password Generator
        </h1>

        <div className='flex w-full shadow rounded-lg overflow-hidden mb-4'>
          <input
            value={password}
            type="text"
            placeholder='Password'
            className="outline-none w-full py-2 px-3 bg-amber-50 text-black"
          />
          <button className='bg-blue-700 px-4 text-white cursor-pointer'>
            Copy
          </button>
        </div>

        <div className='flex text-2xl gap-x-4'>

          <div className='flex text-amber-600 items-center gap-x-2'>
            <input 
              type="range" 
              min={6} 
              max={100} 
              value={length} 
              className='cursor-pointer'
              onChange={(e)=>{ 
                
                setLength(Number(e.target.value))
              }}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1 text-amber-600'>
            <input 
              type="checkbox"  
              checked={numallowed}
              className='cursor-pointer'
              onChange={()=>setnumallowed(prev => !prev)}
            />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1 text-amber-600'>
            <input 
              type="checkbox"
              checked={charallowed}
              className='cursor-pointer'
              onChange={() => {
                setcharallowed(prev => !prev)
              }}
            />
            <label>Characters</label>
          </div>

        </div>

      </div>

    </div>
  )
}

export default App
