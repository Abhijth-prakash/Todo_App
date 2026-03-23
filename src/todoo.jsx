import { useState,useRef,useEffect } from "react"
import "./Todoo.css"
import { RiEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { IoCloudDoneSharp } from "react-icons/io5";


export const Todoo = () => {
    const heros = [
]

    const [input, setInput] = useState("")
    const [list, setList] = useState(heros)
    const [editid,setEditid] = useState(0)

    const inputref = useRef(null)

    useEffect(()=>{
        inputref.current.focus()
    },[])

    function submitHandle() {
        if(input !==""){
            setList([...list, {
            id: list.length + 1,
            name: input,
            status:false
        }])
        setInput("")
        }
    
        if(editid){
            const Taskid = list.find(item=> editid == item.id)
           const updated = list.map(item=> item.id ==  Taskid.id
            ?(item={id:item.id,name:input,status:false}):
            (item ={id:item.id,name:item.name,status:false})
           )
           setList(updated)
           setEditid()
            
        }

    }

    function handle(id) {
        setList(prev => prev.filter(item => id != item.id))
    }

    function updateMethod(name,id){
        setInput(name)
        setEditid(id)    
    }

    function allDone(id){
   setList(prev => prev.map((item) => {
    if(item.id === id){
        return { ...item, status: !item.status } 
    }
    return item  
}))
    }

    const listItems = list.map((items) => (
        <li key={items.id} className="list-item">
            <span className={items.status?"alldone-name":"item-name"} >{items.name}</span>
            <button className= "delete-btn" onClick={() => allDone(items.id)} ><IoCloudDoneSharp /></button>
            <button className="delete-btn" onClick={() => updateMethod(items.name,items.id)}><RiEditFill /></button>
            <button className="delete-btn" onClick={() => handle(items.id)}><MdDeleteForever /></button>
        </li>
    ))

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