import './App.css'
import CRUD from './components/CRUD'
import React, { useState } from 'react'



function App() {
  
  const [newItem, setNewItem] =useState("")
  const [items, setItems] = useState([]);

  function addItem() {

    if(!newItem) {
      alert("boş veri!!");
      return;
    }

    const item = {
      id: Math.floor(Math.random()*1000),
      value: newItem
    }
    setItems(oldItems => [...oldItems, item])
    setNewItem("");

  }

  function deleteItem(id) {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }

  return (

    <div className="container">
      <div className="row">

        <div className="col-12">
          <div className="App main-container">
            <div className="center-container">
               <CRUD />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="todo-list text-center">
          <h1>Todo List </h1><br/>

            <input type='text'
               className='todo-input' 
               placeholder='ToDo Ekleyiniz: '
               value={newItem}
               onChange={(e) => setNewItem(e.target.value)}
            />

            <button type='submit' 
            className='todo-btn'
            onClick={() => addItem()}
            
            >Ekle</button>

              <ul>
                {items.map(item => {
                  return(
                    <li key={item.id}>{item.value}<button className='ekle-btn' onClick={() =>deleteItem(item.id)}>X</button></li>
                    
                  )
                })}
              </ul>


          </div>
        </div>



      </div>
    </div>
    
  )
}

export default App
