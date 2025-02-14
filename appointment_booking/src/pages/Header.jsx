
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
       
       <div className='flex justify-between items-center w-full px-4 p-3'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Appointments</span>
                    <span className='text-slate-700'>Booking</span>
            </h1>
            </Link>
           
            <ul className="flex gap-4 ">
                
                <Link to='/appointment'>
                    <li className="hidden sm:inline text-slate-700 hover:underline">Appointments</li>
                </Link>
                <Link to='/login'>
                    <li className=" text-slate-700 hover:underline">{''}
                        Sign in
                    </li>
                </Link>
            </ul>
       </div>
    </header>
  )
}
