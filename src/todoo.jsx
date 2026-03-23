import { useState } from "react"
import "./Todoo.css"

export const Todoo = () => {
    const heros = [{
        id: 1,
        name: "superMan"
    },
    {
        id: 2,
        name: "Batman"
    },
    {
        id: 3,
        name: "Ironman"
    }]

    const [input, setInput] = useState("")
    const [list, setList] = useState(heros)

    function submitHandle() {
        setList([...list, {
            id: list.length + 1,
            name: input
        }])
        setInput("")
    }

    function handle(id) {
        setList(prev => prev.filter(item => id != item.id))
    }

    const listItems = list.map((items, index) => (
        <li key={items.id} className="list-item">
            <span className="item-name">{items.name}</span>
            <button className="delete-btn" onClick={() => handle(items.id)}>delete</button>
        </li>
    ))

    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <h1 className="title">TODO</h1>
                    <p className="subtitle">things to do</p>
                    <form className="form" onSubmit={(e) => { e.preventDefault(); submitHandle(); }}>
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                        <input type="submit" value="ADD" />
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