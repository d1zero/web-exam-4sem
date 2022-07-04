import React from "react";
import {Link, useSearchParams} from 'react-router-dom'
import {Container, Typography, Grid, Pagination, PaginationItem, Button, Menu, MenuItem} from "@mui/material";
import instance from "../../../utils/axios";
import Loader from "../../../components/Loader/Loader";
import AlbumCard from "../../../components/AlbumCard/AlbumCard";

const AlbumsListPage = () => {
    const [albums, setAlbums] = React.useState([])
    const [allAlbums, setAllAlbums] = React.useState([])
    const [count, setCount] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [showErr, setShowErr] = React.useState(false)
    let [searchParams, setSearchParams] = useSearchParams();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        setLoading(true)
        let url = searchParams.get('page') ? `api/albums/?limit=5&offset=${searchParams.get('page') * 5 - 5}` : 'api/albums/'
        instance
            .get(url)
            .then((res) => res.data)
            .catch(() => {
                setShowErr(true)
            })
            .then((data) => {
                    console.log(data?.results)
                    setCount(data?.count)
                    setAlbums(data?.results)
                    setAllAlbums(data?.results)
                }
            )
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            })
    }, [searchParams]);

    const filterSingles = () => {
        let new_albums = allAlbums.filter(album => album.type_of_album === 'Сингл')
        setAlbums(new_albums)
        handleClose()
    }

    const filterEPs = () => {
        let new_albums = allAlbums.filter(album => album.type_of_album === 'EP')
        setAlbums(new_albums)
        handleClose()
    }

    const filterAlbums = () => {
        let new_albums = allAlbums.filter(album => album.type_of_album === 'Альбом')
        setAlbums(new_albums)
        handleClose()
    }

    const showAll = () => {
        setAlbums(allAlbums)
    }

    if (loading) return <Container style={{textAlign: 'center', marginTop: '100px'}}><Loader/></Container>

    if (showErr) return <Container style={{textAlign: 'center', marginTop: '100px'}}>
        <Typography variant="h3">
            Произошла
            ошибка
        </Typography>
    </Container>

    return <Container>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{marginBottom: '20px'}}
        >
            Тип альбома
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={showAll}>Любой</MenuItem>
            <MenuItem onClick={filterSingles}>Синглы</MenuItem>
            <MenuItem onClick={filterEPs}>EP</MenuItem>
            <MenuItem onClick={filterAlbums}>Альбомы</MenuItem>
        </Menu>
        <Grid container spacing={4}>
            {albums?.map(({id, cover, type_of_album, name, date_of_release, description}) => (
                <Grid item key={id} xs={12} sm={6} md={4}>
                    <AlbumCard id={id} cover={cover} type_of_album={type_of_album} name={name}
                               date_of_release={date_of_release}
                               description={description}/>
                </Grid>
            ))}
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
                                to={`/albums${item.page === 1 ? '' : `?page=${item.page}`}`}
                                {...item}
                            />
                        )}
            />
        </Grid>
    </Container>;
};

export default AlbumsListPage;
