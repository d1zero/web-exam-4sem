import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { AlbumsDetailPage, AlbumsListPage} from "./pages/AlbumsPages";
import { ArtistsDetailPage, ArtistsListPage } from "./pages/ArtistsPages";
import { GenresDetailPage, GenresListPage } from "./pages/GenresPages";
import HomePage from "./pages/HomePages/HomePage";
import { PlaylistsDetailPage, PlaylistsListPage } from "./pages/PlaylistsPages";
import { TracksDetailPage, TracksListPage } from "./pages/TracksPages";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" end element={<HomePage />} />
                <Route path="/albums" element={<AlbumsListPage />}>
                    <Route path=":albumId" element={<AlbumsDetailPage />} />
                </Route>
                <Route path="/artists" element={<ArtistsListPage />}>
                    <Route path=":artistId" element={<ArtistsDetailPage />} />
                </Route>
                <Route path="/genres" element={<GenresListPage />}>
                    <Route path=":genreId" element={<GenresDetailPage />} />
                </Route>
                <Route path="/playlists" element={<PlaylistsListPage />}>
                    <Route
                        path=":playlistId"
                        element={<PlaylistsDetailPage />}
                    />
                </Route>
                <Route path="/tracks" element={<TracksListPage />}>
                    <Route path=":trackId" element={<TracksDetailPage />} />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
