import React from 'react';
import {Avatar, Button, Grid, TextField, Typography} from "@material-ui/core";
import {useFormik} from "formik";

import SendIcon from '@material-ui/icons/Send';
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";
import {getMessages} from "../../redux/selectors/chatSelectors";

const ChatPage = () => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <>
            <Messages/>
            <ChatForm/>
        </>
    );
};

const Messages: React.FC = () => {
    const messages = useSelector(getMessages)

    return (
        <Grid container style={{height: 'calc(100vh - 150px)', overflow: 'auto'}}>
            {messages.map((message, index) => {
                return <Grid style={{marginBottom: '20px'}} key={index} container alignItems={"center"}>
                    <Avatar src={message.photo}/>
                    <Grid style={{marginLeft: '10px'}}>
                        <Typography style={{fontWeight: 'bold'}}>{message.userName}</Typography>
                        <Typography>{message.message}</Typography>
                    </Grid>
                </Grid>
            })}

            {messages.length === 0 && <Typography>Сообщений нету</Typography>}
        </Grid>
    )
}

const ChatForm: React.FC = () => {
    const dispatch = useDispatch()

    const formik = useFormik<{ message: string }>({
        initialValues: {
            message: ''
        },
        onSubmit: (values, {setValues}) => {
            if (values.message.length !== 0) {
                dispatch(sendMessage(values.message))
                setValues({message: ''})
            }
        }
    });

    return (
        <Grid container>
            <TextField
                id="outlined-basic"
                variant="outlined"
                name="message"
                placeholder="Message"
                style={{resize: 'none', width: '90%', height: 50, fontSize: '22px', outline: 'none'}}
                onChange={formik.handleChange}
                value={formik.values.message}/>
            <Button disabled={false} style={{flex: 1}} color="primary"
                    onClick={formik.submitForm}>
                Submit <SendIcon/>
            </Button>
        </Grid>
    )
}

export default ChatPage;