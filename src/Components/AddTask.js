import React,{useState, useEffect} from "react";
import {
    TextField,
    Modal,
    Typography,
    Box, 
    Button,
} from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import Tasks from "./Tasks"
const styles = {
    'modal':{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth:500,
        bgcolor: 'background.paper',
        boxShadow: 540,
        borderRadius: 2,
        p: 4,
        mt:10,
    }   
};
const AddTask = () =>{

    const [loading, setLoading] = useState(false);

    const [tasks, setTask] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // form handling

    const [taskTitle, setTaskTitle] = useState("");
    const [date, setDate] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    

    const fetchTasks = () =>{
        setLoading(true);
        fetch("http://localhost:3000/tasks")
            .then((res) => res.json())
            .then((tasks) => {
                setLoading(false);
                setTask(tasks);
                //console.log(tasks);
            })
    }

    const addTask = (e) =>{
        e.preventDefault();
        console.log(taskTitle, date, taskDesc);
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id:uuidv4(),
                title: taskTitle,
                description: taskDesc,
                deadline: date,
            })
        })
            .then(response => response.json())
            .then(data => console.log(data));
        fetchTasks();
        fetchTasks();
        setOpen(false);
        setTaskTitle("");
        setTaskDesc("");
        setDate("");
        return;
    }
    
    useEffect(() => {
        fetchTasks();
    }, []);

    return(
        <>
            <Box sx={{marginTop:'20px'}}>
                <Button alignCenter onClick={handleOpen} variant="contained" sx={{backgroundColor:'backgroundCus.primary', color:'textCus.secondary'}}>Add a Task</Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={styles['modal']}>
                <Typography sx={{fontWeight: 'bold', color:'textCus.primary'}} variant="h5" gutterBottom align={'center'}>Task Manager</Typography><br />
                <form onSubmit={addTask}>
                    <TextField 
                        sx={{ marginTop:1 }} 
                        type="text" 
                        fullWidth 
                        label="Task Title" 
                        id="taskTitle"
                        value={taskTitle}
                        onChange={(e)=>{
                            setTaskTitle(e.target.value);
                        }}
                    />
                    <TextField sx={{ marginTop:3 }}  fullWidth label="Task Description" id="taskDescription"
                        placeholder="Add task description"
                        multiline
                        rows={2}
                        maxRows={4}
                        value={taskDesc}
                        onChange={(e)=>{
                            setTaskDesc(e.target.value);
                        }}
                    />
                    <TextField 
                        sx={{ marginTop:3 }} 
                        type="date" 
                        fullWidth 
                        label="Task Deadline" 
                        id="taskDeadline"
                        value={date}
                        onChange={(e)=>{
                            setDate(e.target.value);
                        }}
                    />
                    <Button 
                        sx={{backgroundColor:'backgroundCus.primary', color:'textCus.secondary',  marginTop:3}}  
                        fullWidth 
                        variant="contained"
                        type="submit"
                    >Add Task</Button>
                </form>
            </Box>
            </Modal>
            <br/ >

            <div>
            <Typography sx={{fontWeight: 'bold', color:'textCus.primary'}} variant="h5" gutterBottom align={'center'}>Your Tasks</Typography>
                <Tasks 
                    loading={loading}
                    setLoading={setLoading}
                    setTask={setTask}
                    tasks={tasks}
                />
            </div>
        </>
    );
}

export default AddTask;