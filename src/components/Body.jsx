import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid";


const Body = () => {
    const ref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const [hidden, sethidden] = useState(true)

    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        // console.log(passwords)
        setpasswordArray(passwords)

    }


    useEffect(() => {
        getPassword()
    }, [])

    const savePassword = async (e) => {
        e.preventDefault();
        const exists = passwordArray.some(
            (item) =>
                item.site === form.site &&
                item.username === form.username &&
                item.password === form.password);



        if (form.site == "" || form.password == "" || form.username == "") {
            note1();
        } else if (exists) {
            note2();
        } else {
            const newItem = { ...form, id: uuidv4() };
            setpasswordArray([...passwordArray, newItem])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify(newItem) })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, newItem]))

            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
        }
    }
    const deletePass = async (id) => {
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-type": "application/json" }, body: JSON.stringify({ id }) })

    }
    const editPass = (id) => {

        setform({ ...passwordArray.filter(item => item.id === id)[0], id: id });
        deletePass(id)


    }


    const showPassword = () => {
        let curr = ref.current.src;
        ref.current.src = curr.includes("/assests/eye.png") ? "/assests/noeye.png" : "/assests/eye.png";
        sethidden(!hidden);
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const note1 = () => toast.error("Field(s) cannot be empty");
    const note2 = () => toast.error("Already exixts.");
    const notify1 = () => toast.success('Username copied', { position: "bottom-right" });
    const notify2 = () => toast.success('Password copied', { position: "bottom-right" });




    return (
        <>
            <div className=" flex flex-col w-full lg:w-[70%] m-auto mb-5">
                <div className="">
                    <div className="flex flex-col justify-center items-center mt-8 ">
                        <div className="flex  justify-center items-center">
                            <div className="flex gap-2"> <span className='text-3xl font-bold'>Your's </span><div className="name text-white text-2xl font-semibold bg-[#0b2e33] rounded-3xl p-1 ">
                                <span className="text-green-400">&lt;</span>
                                Pass
                                <span className="text-green-400">Manager/&gt;</span>
                            </div>
                            </div>
                        </div>
                        <div className="font-semibold text-xl ">Personalized Password-Manager for <span className=''>You</span>. </div>
                    </div>
                </div>
                <div className="input flex flex-col mt-6">
                    <div className="m-auto">
                        <form className=' ' action="input">
                            <input value={form.site} onChange={handleChange} className='border border-b-gray-700 w-[90vw] md:w-[70vw] lg:w-[50vw] bg-amber-50  h-10 rounded-2xl pl-3 pr-3' type="search" name="site" id="" placeholder='Enter Website Url' />
                        </form>
                    </div>
                    <div className=" flex m-auto gap-3">
                        <form action="input">
                            <input value={form.username} onChange={handleChange} className='border border-b-gray-700 w-[45vw] md:w-[35vw] lg:w-[25vw] bg-amber-50  h-10 rounded-2xl pl-3 mt-4 ' type="text" name="username" id="" placeholder='Enter Username' />
                        </form>
                        <form className='flex items-center' action="input ">
                            <div className=" flex relative">
                                <input value={form.password} onChange={handleChange} className='border border-b-gray-700 bg-amber-50  h-10 rounded-2xl pl-3 w-[43vw] md:w-[33vw] lg:w-[24vw] mt-4' type={hidden ? "password" : "text"} name="password" id="" placeholder='Enter Password'
                                />
                                <img className=' h-6  md:h-7 absolute right-3 top-6 cursor-pointer' onClick={showPassword} ref={ref} src='/assests/eye.png' />
                            </div>

                        </form>
                    </div>
                    <div className="save flex flex-col m-auto cursor-pointer bg-green-400 hover:bg-green-500 rounded-2xl px-3 h-8 items-center mt-5 border-2">
                        <form className='flex justify-center items-center' onClick={savePassword} action="">
                            <input className='border-0 w-20 text-xl cursor-pointer' type="submit" name="" id="" />
                            <img className='h-5 cursor-pointer ' src='assests/save.png' />
                        </form>
                    </div>
                </div>
                <div className="w-[90vw] md:w-[70vw] lg:w-[50vw] m-auto mt-6">
                    <div>
                        {Array.isArray(passwordArray) && passwordArray.length > 0 ? (
                            <div>
                                <div className="font-semibold text-2xl mb-2">Your Passwords :</div>
                                <table className="w-full border border-gray-300 rounded-lg overflow-hidden bg-transparent ">
                                    <thead className="bg-[#0b2e33] text-white">
                                        <tr>
                                            <th className="p-3 text-left">Site
                                            </th>
                                            <th className="p-3 text-left">Username</th>
                                            <th className="p-3 text-left">Password</th>
                                            <th className="p-3 text-left flex justify-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {passwordArray.map((item, index) => (
                                            <tr key={item.id} className="border-2  ">
                                                <td className="p-3 mb-2 border-x border-gray-400">
                                                    <a href={item.site}>
                                                        <img
                                                            className="h-10"
                                                            src={`https://www.google.com/s2/favicons?sz=64&domain=${item.site}`}
                                                            alt="Click here."
                                                        />
                                                    </a>
                                                </td>
                                                <td className="p-3  border-x border-gray-400"><span>{item.username}</span> <span><img onClick={() => { navigator.clipboard.writeText(item.username); notify1(); }} className='h-5 inline-block cursor-pointer' src='/assests/copy.png' /></span> </td>
                                                <td className="p-3  border-x border-gray-400">{"*".repeat(item.password.length)}<img onClick={() => { navigator.clipboard.writeText(item.password); notify2(); }} className='h-5 inline-block cursor-pointer' src='/assests/copy.png' /></td>
                                                <td className="p-5 flex gap-4 items-center justify-center">
                                                    <img onClick={() => editPass(item.id)} className="h-5 cursor-pointer" src="/assests/edit.png" alt="edit" />
                                                    <img onClick={() => deletePass(item.id)} className="h-5 cursor-pointer" src="/assests/delete.png" alt="delete" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table></div>) : (<div className='font-bold text-2xl text-center mt-4'>No Passwords to display.</div>)}
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                hideProgressBar={true}
                autoClose={2000}
                theme="dark"
                transition={Bounce}
            />
        </>
    )
}

export default Body;




