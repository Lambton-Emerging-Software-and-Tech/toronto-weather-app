import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="text-white">
      <div className="w-100 h-fit bg-emerald-600 flex justify-between px-10">
        {/* logo */}
        <div className="flex items-center justify-evenly w-fit gap-x-2 py-3 ">
            <div className="text-white">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <div className="text-white font-bold text-xl">
              Toronto Weather App
            </div>
        </div>
        {/* main nav */}
        <div className="flex items-center justify-evenly">
        <div className="flex gap-x-6 items-center justify-evenly mr-20">
          <div className="">About Us</div>
          <div className="">Contact Us</div>
          <div className="">Toronto Weather</div>
          <div className="">Clock</div>
        </div>

        <div className="flex gap-x-6 items-center justify-evenly">
          <div className="font-bold">Login</div>
          <div className="bg-emerald-800 font-bold px-5 py-3 rounded-md">Signup</div>
        </div>
        </div>
        {/* login / logout  */}
      </div>
    </div>
  );
}

export default App;
