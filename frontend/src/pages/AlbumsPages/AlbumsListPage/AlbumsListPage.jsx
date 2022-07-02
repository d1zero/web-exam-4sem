import React from "react";
import { Container } from "@mui/material";
import instance from "../../../utils/axios";

const AlbumsListPage = () => {
    React.useEffect(() => {
        instance
            .get("api/albums/")
            .then((res) => res.data)
            .then((data) => console.log(data));
    }, []);
    return <Container></Container>;
};

export default AlbumsListPage;
