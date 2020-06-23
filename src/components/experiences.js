import React from 'react';
import { Container, Box, Grid, List, Paper, Divider, ListItem, Typography, Modal, Button, FormControl, InputLabel, Input, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SendIcon from '@material-ui/icons/Send';

import axios from 'axios';

import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';

import './experiences.css';


const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#ffffff',
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "20px",
        paddingRight: "20px"

    },
    button: {
        margin: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        marginTop: 40,
        marginBottom: 40,
        flexGrow: 1,
        textAlign: 'center'
    },
    avatar: {
        width: "90px"
    },
    large: {
        width: "70px",
        height: "70px",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    icons: {
        '& > *': {
            marginRight: "20px",
        }
    },
    uploadButton: {
        backgroundColor: '#4F7CAC',
        color: '#ffffff'
    },
    leadText: {
        color: "#101935",
    }
}));


export function Experiences() {
    const classes = useStyles();

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState('');
    const [story, setStory] = React.useState('');
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/api/posts`);

            setData(result.data);
            setLoading(false);
        };

        fetchData();
    }, []);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

            

    function handleInputChange(event) {
        setSelectedFile(event.target.files[0]);
    }


    function submit() {
        const formData = new FormData()
        formData.append('image', selectedFile);
        formData.append('name', name);
        formData.append('story', story);
        console.warn(selectedFile);
        
        let url = "/api/posts";

        axios.post(url, formData, { // receive two parameter endpoint url ,form data 
        }).then(res => { // then print response status
            console.warn(res);
        })
    }




    return (
        <Container maxWidth="md" className={classes.root} disableGutters={true}>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleOpen}
                startIcon={<PostAddOutlinedIcon />}
            >
                Add your Experience
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Container maxWidth="sm" className={classes.paper}>
                        <Typography variant="h1" className={classes.leadText} style={{ margin: 10 }}>Share your experience</Typography>
                        <form noValidate autoComplete="off">
                            <Grid item>
                                <Grid container direction="column">

                                    <FormControl className="form-items">
                                        <TextField
                                            id="story"
                                            label="Name"
                                            variant="outlined"
                                            required={true}
                                            value={name}
                                            style={{ margin: 10 }}
                                            onChange={(e) => { setName(e.target.value)}}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <TextField
                                            id="story"
                                            label="Your story"
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            style={{ margin: 10 }}
                                            required={true}
                                            value={story}
                                            onChange={(e)=>{setStory(e.target.value)}}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <div
                                            style={{ margin: 10 }}
                                        >

                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                type="file"
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="raised-button-file">
                                                <Button variant="raised" className={classes.uploadButton} component="span">
                                                    <ImageOutlinedIcon />
                                                &nbsp; Upload
  </Button>
                                            </label>
                                        </div>
                                    </FormControl>
                                    <Button variant="raised" className={classes.uploadButton} 
                                    onClick={submit}>
                                        Submit &nbsp;
                                        <SendIcon />
  </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Fade>
            </Modal>
            <Paper>
                <Typography variant="h1" style={{ marginTop: 50 }} className={classes.leadText}>Experiences so far...</Typography>
                <List>
                    {loading === true ? (<p>Loading</p>)
                        : (data.map(item => <Experience data={item} />))}
                </List>
            </Paper>
        </Container>
    );
}

function Experience(props) {
    const classes = useStyles();
    const [like, setLike] = React.useState(false);
    const data = props.data;

    const handleLike = async () => {
        const url = `/api/posts/${data.id}/like`;
        await axios.post(url, { id: data.id })
            .then(res => {
                console.log(res.data);
                setLike(!like);
            });

        // not really useful for anything
    }

    const handleShare = async (e) => {
        e.preventDefault();
        await axios.post(`api/posts/${data.id}/like`, {})
            .then(res => {
                console.log(res.data);
                setLike(!like);
            });
        const encoded = encodeURI("A platform to share your covid-19 experience with the world in order to encourage every one that we're together in this. Stay strong!");

        window.location.href ="https://wa.me/+2349061279158?text=" + encoded;
        
    }

    return (
        <ListItem key={props.id} button>
            <Grid container spacing={1} style={{
                paddingTop: 15,
                paddingBottom: 15,
            }}>
                <Grid item className={classes.avatar}>
                    <Avatar alt="Profile image" src={'/uploads/' + data.image_uri} className={classes.large} />
                </Grid>
                <Grid item xs>
                    <Grid container direction='column'>
                        <Grid item>
                            <span><b>{data.name}</b></span>
                        </Grid>
                        <Grid item>
                            {data.story}
                        </Grid>
                        <Grid item style={{
                            paddingTop: 15
                        }}>
                            <Grid container justify="flex-end" className={classes.icons}>

                                <Typography component="button" variant="body2" style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                    onClick={handleLike}
                                >
                                    {data.likes} &nbsp; {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </Typography>
                                <Typography component="button" variant="body2" style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                    onClick={handleShare}
                                >
                                    {data.shares} &nbsp; <ShareOutlinedIcon />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </ListItem>
    );
}