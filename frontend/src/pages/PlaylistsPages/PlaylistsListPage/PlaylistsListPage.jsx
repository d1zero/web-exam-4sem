import React from 'react'
import {Container, Grid, Pagination, PaginationItem, Typography} from "@mui/material";
import instance from "../../../utils/axios";
import Loader from "../../../components/Loader/Loader";
import PlaylistCard from "../../../components/PlaylistCard/PlaylistCard";
import {Link, useSearchParams} from "react-router-dom";

const PlaylistsListPage = () => {
    const [playlists, setPlaylists] = React.useState()
    const [count, setCount] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [showErr, setShowErr] = React.useState(false)
    let [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        setLoading(true)
        let url = searchParams.get('page') ? `api/playlists/?limit=5&offset=${searchParams.get('page') * 5 - 5}` : 'api/playlists/'
        instance
            .get(url)
            .then((res) => res.data)
            .catch(() => {
                setShowErr(true)
            })
            .then((data) => {
                    console.log(data?.results)
                setCount(data?.count)
                setPlaylists(data?.results)
                }
            )
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            })
    }, []);

    if (loading) return <Container style={{textAlign: 'center', marginTop: '100px'}}><Loader/></Container>

    if (showErr) return <Container style={{textAlign: 'center', marginTop: '100px'}}>
        <Typography variant="h3">
            Произошла
            ошибка
        </Typography>
    </Container>

    return <Container>
        <Grid container spacing={4}>
            {playlists?.map(({id, name, photo, description}) => (
                <Grid item key={id} xs={12} sm={6} md={4}>
                    <PlaylistCard id={id} name={name} photo={photo} description={description}/>
                </Grid>))}
        </Grid>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
        >
            <Pagination style={{marginTop: '50px'}} count={Math.floor(count / 5) + 1}
                        defaultPage={searchParams.get('page') ? parseInt(searchParams.get('page')) : 1}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/playlists${item.page === 1 ? '' : `?page=${item.page}`}`}
                                {...item}
                            />
                        )}
            />
        </Grid>
    </Container>;
}

export default PlaylistsListPage