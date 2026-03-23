import { useState, useRef, useEffect } from "react"
import "./Todoo.css"
import { RiEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { IoCloudDoneSharp } from "react-icons/io5";



export const Todoo = () => {

    //states
    const [input, setInput] = useState("")

    //id for editing state
    const [editid, setEditid] = useState(0)


    //list state, loading the intial list from local storage
    const [list, setList] = useState(()=>{
    const stored = localStorage.getItem("list")
    return stored ? JSON.parse(stored) : []
})
    
    //using ref
    const inputref = useRef(null)

    //use effect for focusing on input box,rendering only on mounting
    useEffect(() => {
        inputref.current.focus()
    }, [])

    //stores data into localstorage everytime list renders
    useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
}, [list])


    //function for handling the form
    function submitHandle() {
        if (editid) {
            const updated = list.map(item =>
                item.id == editid
                    ? { ...item, name: input }
                    : item
            )
            setList(updated)
            setEditid(0)
            setInput("")
        } else if (input !== "") {
            const newList = [...list, {
                id: list.length + 1,
                name: input,
                status: false
            }]
            setList(newList)
            setInput("")
        }
    }

    //deleting function
    function handle(id) {
        setList(prev => prev.filter(item => id != item.id))
    }

    //updating function
    function updateMethod(name, id) {
        setInput(name)
        setEditid(id)
    }

    //alldone function
    function allDone(id) {
        setList(prev => prev.map((item) => {
            if (item.id === id) {
                return { ...item, status: !item.status }
            }
            return item
        }))
    }


    //maping the list for rendering 
    const listItems = list.map((items) => (
        <li key={items.id} className="list-item">
            <span className={items.status ? "alldone-name" : "item-name"}>{items.name}</span>
            <button className="delete-btn" onClick={() => allDone(items.id)}><IoCloudDoneSharp /></button>
            <button className="delete-btn" onClick={() => updateMethod(items.name, items.id)}><RiEditFill /></button>
            <button className="delete-btn" onClick={() => handle(items.id)}><MdDeleteForever /></button>
        </li>
    ))


    //returning jsx
    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <h1 className="title">TODO</h1>
                    <p className="subtitle">things to do</p>
                    <form className="form" onSubmit={(e) => { e.preventDefault(); submitHandle(); }}>
                        <input type="text" ref={inputref} value={input} onChange={(e) => setInput(e.target.value)} />
                        <button className="add-btn">{editid ? 'UPDATE' : "ADD"}</button>
                    </form>
                    <p className="count">Total: <span>{list.length}</span></p>
                    {list.length === 0
                        ? <p className="empty">no tasks yet</p>
                        : <ol className="list">{listItems}</ol>
                    }
                </div>
            </div>
        </>
    )
}