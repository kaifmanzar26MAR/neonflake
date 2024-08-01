import React from 'react'

const NavBar = () => {
  return (
    <div className="navbar bg-slate-300 max-w-full sticky top-0 left-0 z-50">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl" href='/'>NeoFlake</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a href='/'>Upload Video</a></li>
      <li><a href='/videolist'>Video List</a></li>
    </ul>
  </div>
</div>
  )
}

export default NavBar