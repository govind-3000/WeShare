import React from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import { useState } from 'react';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../actions/posts';
import { useEffect } from 'react';


const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({creator:'', title:'', message:'', tags:'', selectedFile:''});
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state)=>currentId ? state.posts.find((p)=>p._id===currentId) : null);

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, postData));
        }
        else{
            dispatch(createPost(postData));
        }
        clear();
    };
    
    const clear = () => {
        setCurrentId(null);
        setPostData({creator:'', title:'', message:'', tags:'', selectedFile:''});
    };
    //setting a post obj in state

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Edit your' : 'Create your'} post</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e)=> setPostData({...postData, creator:e.target.value})}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title:e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e)=> setPostData({...postData, message:e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData, tags:e.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile:base64})}
                    />
                </div>
                <Button style={{borderRadius: 35, backgroundColor: "#338EFF",}} className={classes.bottonSubmit} variant="container" size="small" color="primary"  type="submit" fullWidth bottomSpace="2">Submit</Button>
                <Button style={{borderRadius: 35, backgroundColor: "#F02B2B",}} variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form; 