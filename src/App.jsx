import React, { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { usePWA } from './hooks/usePWA'

function App() {
  // PWA update hook
  const { needRefresh, offlineReady, handleRefresh, close } = usePWA()
  
  // Persistent todos using local storage
  const [todos, setTodos, clearTodos] = useLocalStorage('todos', [])
  
  // New todo input state
  const [newTodo, setNewTodo] = useState('')

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false
      }
      setTodos([...todos, newTodoItem])
      setNewTodo('')
    }
  }

  // Toggle todo completion
  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
  }

  // Delete todo
  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id)
    setTodos(filteredTodos)
  }

  return (
    <div className="container mx-auto max-w-xl px-4 py-8">
      {/* PWA Update Banner */}
      {(offlineReady || needRefresh) && (
        <div className="bg-blue-100 p-4 mb-6 rounded-lg shadow-md flex justify-between items-center">
          <div className="text-blue-800">
            {offlineReady 
              ? 'App is ready to work offline' 
              : 'New content is available'}
          </div>
          <div className="space-x-2">
            {needRefresh && (
              <button 
                onClick={handleRefresh} 
                className="btn-primary"
              >
                Reload
              </button>
            )}
            <button 
              onClick={close} 
              className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-custom rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-brand-600">
          Offline Todo App
        </h1>
        
        {/* Todo Input */}
        <div className="flex mb-6">
          <input 
            type="text" 
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new todo"
            className="input-primary flex-grow mr-2"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button 
            onClick={addTodo}
            className="btn-primary whitespace-nowrap"
          >
            Add Todo
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.map(todo => (
            <div 
              key={todo.id} 
              className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <div 
                onClick={() => toggleTodo(todo.id)}
                className={`flex-grow cursor-pointer transition-all duration-200 ${
                  todo.completed 
                    ? 'text-gray-400 line-through' 
                    : 'text-gray-800'
                }`}
              >
                {todo.text}
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Clear All Todos */}
        {todos.length > 0 && (
          <div className="mt-6 text-center">
            <button 
              onClick={clearTodos}
              className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Clear All Todos
            </button>
          </div>
        )}

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p>No todos yet. Add your first todo!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App