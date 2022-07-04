import React from "react";
import {Container, Typography, List, ListItem, ListItemButton, ListItemText, Grid} from "@mui/material";
import {useParams} from "react-router-dom";
import instance from "../../../utils/axios";
import Loader from "../../../components/Loader/Loader";


const AlbumsDetailPage = () => {
    let {albumId} = useParams()

    const [album, setAlbum] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [showErr, setShowErr] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        instance
            .get(`api/albums/${albumId}`)
            .then((res) => res.data)
            .catch(() => {
                setShowErr(true)
            })
            .then((data) => {
                    console.log(data)
                    setAlbum(data)
                }
            )
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            })
    }, []);

    if (loading) return <Container style={{textAlign: 'center', marginTop: '100px'}}><Loader/></Container>

    if (showErr) return <Container><Typography variant="h3">Произошла ошибка</Typography></Container>


    return <Container style={{textAlign: 'center'}}>
        <Typography variant="h2" style={{lineBreak: "anywhere"}} gutterBottom>
            {album?.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            {album?.date_of_release}
        </Typography>
        <img src={`${import.meta.env.VITE_API_URL}${album?.cover}`} alt={album?.name} width="300px" height="300px"
             style={{objectFit: 'cover', margin: "30px 0"}}/>
        <Typography variant="h4" gutterBottom>Исполнители</Typography>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
        >
            <List style={{maxWidth: "200px", minWidth: '200px'}}>
                {album?.artists_data.map(
                    artist => (
                        <ListItem disablePadding>
                            {/* TODO оживить ссылку*/}
                            <ListItemButton>
                                <ListItemText style={{textAlign: 'center'}} primary={artist?.nickname}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Grid>

        <Typography variant="h4" gutterBottom>Список треков</Typography>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
        >
            <List style={{maxWidth: "200px", minWidth: '200px'}}>
                {album?.tracks_data.map(
                    track => (
                        <ListItem disablePadding>
                            {/* TODO оживить ссылку*/}
                            <ListItemButton>
                                <ListItemText style={{textAlign: 'center'}} primary={track?.title}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Grid>
        <Typography variant="h4" gutterBottom>Об альбоме</Typography>
        <Typography variant="body1" style={{lineBreak: "normal", textAlign: "left"}}>
            {album?.description}
        </Typography>

    </Container>;
};

export default AlbumsDetailPage;
