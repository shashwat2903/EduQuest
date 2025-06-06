import React, { useContext, useEffect } from 'react'
import { Context, server } from '../main'
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import logo from '../assets/logo.jpg';


export const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const [cookieName, cookieValue] = cookies[i].split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return "";
};

function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function Header() {
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {

            axios.get(`${server}/users/me`, { withCredentials: true }).then((res) => {
                // console.log(res.data.user)
                setUser(res.data.user)
                setIsAuthenticated(true)

            }).catch((err) => {
                // toast.error(err.response.data.message) 
                console.log(err)
                setIsAuthenticated(false)
                delete_cookie("loggedIn")
            })

       
    }, [])

    if (isAuthenticated) {
        document.cookie = "loggedIn=true";
    }


    const loggedIn = getCookie("loggedIn");
    console.log(loggedIn);

    const logoutHandler = async () => {
        try {
            await axios.get(`${server}/users/logout`, {
                withCredentials: true,
            });

            toast.success("Logged Out Successfully");
            setIsAuthenticated(false);
            navigate("/login");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
            setIsAuthenticated(true);
        }

    };

    let active = "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
    let pending = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"



    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EduQuest </span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {isAuthenticated ? (<button onClick={logoutHandler} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>) : (<NavLink to={"/login"} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</NavLink>)}
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to="/" className={({ isActive, isPending }) =>isPending ? pending : isActive ? active : pending} aria-current="page">Home</NavLink>
                            </li>
                           
                            <li>
                                <NavLink to="/quiz" className={({ isActive, isPending }) =>isPending ? pending : isActive ? active : pending} >Quiz</NavLink>
                            </li>
                            <li>
                                <NavLink to="/gyan" className={({ isActive, isPending }) =>isPending ? pending : isActive ? active : pending} >Ask any doubt</NavLink>
                            </li>
                            <li>
                                <NavLink to="/todo" className={({ isActive, isPending }) =>isPending ? pending : isActive ? active : pending} >To-Do List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" className={({ isActive, isPending }) =>isPending ? pending : isActive ? active : pending} >Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/study" className={({ isActive, isPending }) =>isPending ? pending : isActive ? active : pending} >Study Material</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className={({ isActive, isPending }) =>isPending ? pending : isActive ? active : pending} >About</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={({ isActive, isPending }) =>isPending ? pending : isActive ? active : pending} >Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header