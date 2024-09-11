import { useState } from "react";

function App() {
  const [newItem, setNewItem] = useState([]);

  // New Items
  function handleNewItem(item) {
    setNewItem((newItem) => [...newItem, item]);
  }

  // Delete Items
  function handleDeleteItem(id) {
    console.log(id);
    setNewItem((items) => items.filter((item) => item.id !== id));
  }

  // Toggle Items
  function handleToggleItems(id) {
    setNewItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // Clear List Items
  function handleClearItem() {
    const confirmed = window.confirm("Are you sur to Delete All the Items!");
    if (confirmed) setNewItem([]);
  }

  return (
    <div className="main-container">
      <Heading newItem={newItem} onClear={handleClearItem} />
      <div className="center-container">
        <FormInput onAddItem={handleNewItem} />
        <TodoList
          newItem={newItem}
          onDeleteItem={handleDeleteItem}
          onToggleItems={handleToggleItems}
        />
      </div>
    </div>
  );
}

// Heading...
function Heading({ newItem, onClear }) {
  const numItems = newItem.length;
  const packed = newItem.filter((item) => item.packed).length;

  return (
    <>
      <div className="left-side">
        <h1 className="app-heading">Todo List</h1>
        <p className="sample">Simple Todo list app design</p>
        <div className="welcome">
          {!newItem.length ? (
            <p>👋 Start Adding List items 🙂</p>
          ) : (
            <p>Continue Adding List items 😍</p>
          )}
        </div>

        {numItems > 0 && (
          <p className="items">
            You have {numItems} items in your list, and You Completed {packed}{" "}
            items.
            <br />
            <button className="clear" onClick={onClear}>
              Clear List
            </button>
          </p>
        )}
      </div>
    </>
  );
}

// Input Form
function FormInput({ onAddItem }) {
  const [item, setItem] = useState("");

  // New Item Controled Input Form
  function handleSubmit(e) {
    e.preventDefault();

    if (!item) return;

    const newItem = { item, id: Date.now(), packed: false };
    onAddItem(newItem);

    setItem("");
  }

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Item..."
        className="input-box-todo"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button className="add-btn">+</button>
    </form>
  );
}

// TodoList...
function TodoList({ newItem, onDeleteItem, onToggleItems }) {
  return (
    <ul className="list-container">
      {newItem.map((list) => (
        <ListItem
          list={list}
          key={list.id}
          onDeleteItem={onDeleteItem}
          onToggleItems={onToggleItems}
        />
      ))}
    </ul>
  );
}

// ListItems...
function ListItem({ list, onDeleteItem, onToggleItems }) {
  return (
    <div>
      <li className="list-item">
        <input
          type="checkbox"
          value={list.packed}
          onChange={() => onToggleItems(list.id)}
        />
        <span
          className="list-content"
          style={list.packed ? { textDecoration: "line-through" } : {}}
        >
          {list.item}
        </span>

        <span className="icons">
          <button className="close" onClick={() => onDeleteItem(list.id)}>
            ❌
          </button>
        </span>
      </li>
    </div>
  );
}

export default App;
