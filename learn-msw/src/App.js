import { useCallback, useEffect, useState } from 'react';

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const getTodos = useCallback(async () => {
    const res = await fetch('/todos');
    const data = await res.json();
    return data;
  }, []);

  useEffect(() => {
    const setInitial = async () => {
      const data = await getTodos();
      setTodos(prev => data);
    };

    setInitial();

  },[getTodos, setTodos]);

  console.log(todos);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: todo
    })

    await fetch("/todos")
        .then((res) => res.json())
        .then((data) => {
          setTodo("");
          setTodos(data);
        });
    
  };

  return (
    <div className="App">
      <h2>할 일</h2>
      <ul>
        {
          todos?.map((todo, index) => <li key={index}>{todo}</li>)
        }
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="새로운 할일"
          value={todo}
          onChange={({ target: { value } }) => setTodo(value)}
        />
        <button disabled={!todo}>추가</button>
      </form>
    </div>
  );
}

export default App;
