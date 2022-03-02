import React,{useState} from "react";
import {
    Typography,
    Button,
    Box,
    } from '@mui/material';

const Tasks = ({loading, setLoading, tasks, setTask}) =>{

    

    const deleteTask = (id) =>{
        setLoading(true);
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
        })
        
        fetch(
            "http://localhost:3000/tasks")
            .then((res) => res.json())
            .then((tasks) => {
                setLoading(false);
                setTask(tasks);
                //console.log(tasks);
        })
    }

    const Item = ({title, description, num, id, deadline}) =>{
        const [expanded, setExpanded] = useState(false);
        const current = new Date();
        return(
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper', 
                    width: '100% ',
                    borderRadius: 1,
                    m:1,
                    p:1,
                    boxShadow: 2,
                }}
            >
                <Box onClick={()=>{setExpanded(!expanded)}}  sx={{ display: 'flex', flexWrap: 'wrap',justifyContent: 'space-between', }}>
                    <Typography  sx={{fontWeight: '500', color:'textCus.primary'}} variant="h6" gutterBottom component="div">
                        {num}. {expanded?title:<>{title.slice(0, 20)}...</>}<br/>
                    </Typography>
                    <div>
                        <Button
                            onClick={()=>{deleteTask(id)}}
                            sx={{
                                ':hover': {
                                    color: 'textCus.secondary' ,
                                    backgroundColor: 'backgroundCus.primary',
                                },
                                color: 'textCus.secondary' ,
                                backgroundColor: 'backgroundCus.primary',
                                marginRight:'10px',
                                boxShadow: 2,
                            }}
                        >Completed</Button>
                        <Button onClick={()=>{deleteTask(id)}}
                            sx={{
                                ':hover': {
                                    color: 'textCus.secondary' ,
                                    backgroundColor: 'backgroundCus.danger',
                                },
                                color: 'textCus.secondary' ,
                                backgroundColor: 'backgroundCus.danger',
                                boxShadow: 2,
                            }}
                        >Delete</Button>
                    </div>
                </Box>
                <Typography sx={{fontSize:'13px'}}>{`Due by ${deadline}`}</Typography>
                <div>
                    {expanded && <Typography variant="subtitle1" sx={{marginTop:'5px'}} gutterBottom component="div">
                                    {description}
                                </Typography>
                    }
                </div>
            </Box>
        );
    }

    if(loading){
        return<>Loading...</>;
    }else{
        if(tasks.length === 0){
            return <>No Tasks left :) </>
        }
        return(
            <Box
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                    m:1,
                }}
            >
                    {tasks.map((data,i )=>{
                        console.log(data);
                        return <Item deadline={data.deadline} id={data.id} key={i} num={i+1} title={data.title} description={data.description} />
                    })}
            </Box>
        );
    }    
}

export default Tasks;