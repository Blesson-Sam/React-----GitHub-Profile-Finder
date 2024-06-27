
import { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import React from 'react'
import "./Card.css";


const Card = () => {
    
    const Baseurl = "https://api.github.com/users/";
    const [activate, setActivate] = useState(false);
    const [found, setFound] = useState(true);
    const [formData, setFormData] = useState("blesson-sam")
    const [loading, setLoading] = useState(false);
    const [userData,setUserData] = useState(null);
    
    function changeHandler(event) {
        setFormData(event.target.value)
        setFound(true);
    }
    
    function submitHandler(event) {
        fetchData(`${Baseurl}${formData}`)
        event.preventDefault();
    }
    async function fetchData(url) {
        setLoading(true);

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.message === "Not Found") {
                setFound(false);
                setUserData(null);
            } else {
                setFound(true);
                setUserData(data);
            }
            setLoading(false);
        }
        catch (error) {
            setFound(false);
            setLoading(false);
            console.log("Not Data Found");
        }
    }
    useEffect(() => {
        fetchData(`${Baseurl}${formData}`);
    }, []);

    useEffect(() => {
        document.body.className = activate ? "dark-mode" : "light-mode";
    }, [activate]);

    return (
        <div className=" w-2/6 h-auto flex flex-col justify-center items-center">
            {/*Top Bar  */}
            <div className="flex flex-row w-full justify-between max-w-xl mt-5" >
                <p className="text-3xl ">Find Github</p>
                <div className="flex flex-row gap-5 justify-center items-center">
                    <div className=" cursor-pointer ">
                        {
                            activate ? (<p  onClick={() => setActivate(false)} >LIGHT</p>) : (<p onClick={() => setActivate(true)}>DARK</p>)
                        }
                    </div>
                    <div className=" cursor-pointer ">
                        {
                            activate ? (<IoSunny onClick={() => setActivate(false)} />) : (<IoMdMoon onClick={() => setActivate(true)} />)
                        }
                    </div>

                </div>
            </div>

            {/* Search Button */}

            <form onSubmit={submitHandler} className="flex flex-row mt-5 w-11/12 border rounded-lg h-16  justify-between items-center">
                <div className=" flex flex-row gap-5 justify-center items-center  m-5">
                    <CiSearch />
                    <input className=" h-10 w-[300px] border-white" type="search" name='search' placeholder="Enter a GitHub username..." onChange={changeHandler} value={FormData.search} />
                    {
                        !found && (<span className="text-red-600">no search result</span>)
                    }
                
                </div>
                
                <button className="mr-5">Search</button>


            </form>

            {/* Fetch Data */}

            <div className="  w-11/12 mt-10">
                {
                    loading ? (<p>Loading...</p>) :
                        (
                            userData&&
                            <div className="flex flex-row  justify-evenly items-center">
                                <img src={userData.avatar_url} alt="" width="150px" className="rounded-full" />
                                <div>
                                    <p>{userData.login}</p>
                                    <p>Joined 05 May 2020</p>
                                </div>
                        </div>
                        )
                }
            </div>

        </div>
    )
}

export default Card
