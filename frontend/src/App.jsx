import {Routes, Route} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import {AlbumsDetailPage, AlbumsListPage} from "./pages/AlbumsPages";
import {ArtistsDetailPage, ArtistsListPage} from "./pages/ArtistsPages";
import {GenresDetailPage, GenresListPage} from "./pages/GenresPages";
import HomePage from "./pages/HomePages/HomePage";
import {PlaylistsDetailPage, PlaylistsListPage} from "./pages/PlaylistsPages";
import {TracksDetailPage, TracksListPage} from "./pages/TracksPages";
import {Box} from "@mui/material";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>

                <Route path="/albums/:albumId" element={<AlbumsDetailPage/>}/>
                <Route path="/albums" end element={<AlbumsListPage/>}/>

                <Route path="/artists/:artistId" element={<ArtistsDetailPage/>}/>
                <Route path="/artists" element={<ArtistsListPage/>}/>

                <Route path="/genres/:genreId" element={<GenresDetailPage/>}/>
                <Route path="/genres" element={<GenresListPage/>}/>

                <Route
                    path="/playlists/:playlistId"
                    element={<PlaylistsDetailPage/>}
                />
                <Route path="/playlists" element={<PlaylistsListPage/>}/>

                <Route path="/tracks/:trackId" element={<TracksDetailPage/>}/>
                <Route path="/tracks" element={<TracksListPage/>}/>

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>

                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
            <Footer/>
        </Box>
    );
}

export default App;
