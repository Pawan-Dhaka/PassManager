function Nav() {
  return (
    <>
    <div className="nav bg-[#0b2e33] flex justify-between px-5 items-center h-12 ">
      <div className="name text-white text-xl font-semibold ">
        <span  className="text-green-400">&lt;</span>
        Pass
        <span className="text-green-400">Manager/&gt;</span>
      </div>
      <div className="">
        <a className="text-white flex items-center bg-green-600 px-1.5 rounded-2xl hover:scale-105" href="https://github.com/Pawan-Dhaka"><img className="h-8" src="/assests/github.svg"/> <span className="text-black font-bold hidden md:block">Github</span></a>
      </div>
    </div> 
    </>
  );
}

export default Nav;
