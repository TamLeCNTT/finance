import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Header from '../layout/Header'
import StudentService from '../../service/StudentService'
import io from "socket.io-client";
const StudentList = () => {

    const [list, setlist] = useState([])
    const addStudentByImport = (listStudent) => {
        toast.success("you have click me!")
        let arr = [{ name: "tins", pass: "ddd", sl: 1 }, { name: "tdams", pass: "ddd", sl: 2 }]
        let name = "y"
        StudentService.getAll().then(res => {
            let ab = []
            ab = Object.values(res.data).filter(e => e.name == name)[0].data ? Object.values(res.data).filter(e => e.name == name)[0].data : []
            arr.map((item, index) => {
                let vt = ab.findIndex(e => e.name == item.name)
                if (vt > -1)
                    ab[vt].sl = ab[vt].sl + item.sl
                else
                    ab.push(item)
            })
            console.log(ab)
            StudentService.update({ name: "y", data: ab }).then(
                ress => {

                }
            )
            setlist(ab)
        })




    }
    useEffect(() => {
        // StudentService.getAll().then(res => {
        //     let ab = Object.values(res.data)
        //     console.log(ab)
        //     setlist(ab)
        // })

    }, [])



    return (
        <>
            <Header />
            <input type='button' value={"click me!"} onClick={(e) => addStudentByImport(e)} />
            <div>StudentList</div>
            {
                list.map((item, index) => {
                    return (
                        <li>
                            {item.name}
                        </li>
                    )
                })
            }
        </>

    )
}

export default StudentList