import React from 'react'
import Logo from '../../icons/rtu-icon.png'
import Profile from '../../icons/profile-icon.png'
import SVGHome from "../../svg/Home";
import SVGCommunity from "../../svg/Community";

function NavBar() {
    return (
        <div className={"NavBar"}>
            <nav className={"sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md"}>
                <div className={"flex justify-between mx-10 items-center w-full"}>
                    <div className={"flex items-center"}>
                        <a href={"/home"} className={"mr-3"}>
                            <img src={Logo} width={40} height={40} style={{layout: "fixed"}}/>
                        </a>
                        <div className={"flex ml-2 items-center rounded-full bg-gray-100 p-2"}>
                            <button className={"outline-none focus:outline-none"}>
                                <svg className={"w-5 text-gray-600 h-5 cursor-pointer"} fill="none"
                                     stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                     stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                            <input
                                className={"w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"}
                                placeholder={"Search"}
                                type={"search"}
                            />
                        </div>
                    </div>
                    <ul className={"flex justify-center items-center"}>
                        <li className={"mx-4"}>
                            <span>
                                <SVGHome/>
                            </span>
                        </li>
                        <li className={"mx-4"}>
                            <span className="om3e55n1">
                                <SVGCommunity />
                            </span>
                        </li>
                        <li className={"mx-4"}>
                            <span className="om3e55n1">

                            </span>
                        </li>
                    </ul>
                    <div className={"flex items-center sm:space-2 justify-end"}>
                        <img src={Profile} width={40} height={40} style={{layout: "fixed"}}/>
                    </div>


                </div>
            </nav>
        </div>
    )
}

export default NavBar;
