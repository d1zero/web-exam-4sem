import React from 'react'
import {Container, Grid, Pagination, PaginationItem, Typography} from "@mui/material";
import instance from "../../../utils/axios";
import Loader from "../../../components/Loader/Loader";
import PlaylistCard from "../../../components/PlaylistCard/PlaylistCard";
import TrackCard from "../../../components/TrackCard/TrackCard";
import {Link, useSearchParams} from "react-router-dom";

const TracksListPage = () => {
    const [tracks, setTracks] = React.useState()
    const [count, setCount] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [showErr, setShowErr] = React.useState(false)
    let [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        setLoading(true)
        instance
            .get("api/tracks/")
            .then((res) => res.data)
            .catch(() => {
                setShowErr(true)
            })
            .then((data) => {
                    console.log(data?.results)
                    setCount(data?.count)
                    setTracks(data?.results)
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
            {tracks?.map(({id, title, date_of_release, cover, description, artists_data}) => (
                <Grid item key={id} xs={12} sm={6} md={4}>
                    <TrackCard id={id} title={title} date_of_release={date_of_release} cover={cover}
                               description={description}
                               artists_data={artists_data}/>
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
                                to={`/tracks${item.page === 1 ? '' : `?page=${item.page}`}`}
                                {...item}
                            />
                        )}
            />
        </Grid>
    </Container>;
}

export default TracksListPage