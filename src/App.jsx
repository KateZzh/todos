import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import style from './App.module.css';

function App() {
    const [arr, setArr] = useState([]);
    const [inpVal, setInpVal] = useState('');
    const [inpValModal, setInpValModal] = useState('');
    const [updatedTask, setUpdatedTask] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        const { data } = await axios.get('https://dummyjson.com/todos');
        setArr(data.todos);
    };

    const addTask = async () => {
        const { data } = await axios.post('https://dummyjson.com/todos/add', {
            todo: inpVal,
            completed: false,
            userId: 5,
        });
        setArr([...arr, data]);
        setInpVal('');
    };

    const updateTask = async () => {
        console.log(inpValModal);

        const { data } = await axios.put(`https://dummyjson.com/todos/${updatedTask.id}`, {
            todo: inpValModal,
        });

        const updatedArr = arr.map((el) => (el.id === data.id ? data : el));
        setArr(updatedArr);

        setOpen(false);
    };

    const deleteTask = async (taskId) => {
        const { data } = await axios.delete(`https://dummyjson.com/todos/${taskId}`);

        const newArr = arr.filter((el) => el.id !== data.id);
        setArr(newArr);
    };

    console.log(arr);
    return (
        <div className={style.contain}>
            <div className={style.wrapperTaskForm}>
                <TextField
                    value={inpVal}
                    sx={{ width: 450 }}
                    id='standard-basic'
                    label='Name task'
                    variant='standard'
                    onChange={(e) => setInpVal(e.target.value)}
                />
                <Button variant='contained' onClick={addTask}>
                    add task
                </Button>
            </div>

            <div className={style.wrapperTaskList}>
                {arr.map((el, i) => (
                    <div className={style.wrapperTask} key={i}>
                        <p>{el.todo} </p>
                        <div className={style.icons}>
                            <CreateIcon onClick={() => (setOpen(true), setInpValModal(el.todo), setUpdatedTask(el))} />
                            <DeleteIcon onClick={() => deleteTask(el.id)} />
                        </div>
                    </div>
                ))}
            </div>

            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
                <Box className={style.styleBox}>
                    <h1>Update Task</h1>
                    <TextField
                        id='standard-basic'
                        label='Name test'
                        variant='standard'
                        value={inpValModal}
                        onChange={(e) => setInpValModal(e.target.value)}
                    />
                    <Button variant='contained' onClick={updateTask}>
                        Update Task
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default App;
