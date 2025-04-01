import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';
import Note from './pages/Note';
import CreateNoteCard from './components/createNoteCard';
import EditNote from './components/EditNote';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/user/register' element={<RegisterForm />} />
          <Route path='/user/login' element={<LoginForm />} />
          <Route path='/note' element={<Note />} />
          <Route path='/note/create' element={<CreateNoteCard />} />
          <Route path='/note/edit' element={<EditNote />} />
          <Route path='/note/delete' element={<CreateNoteCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
