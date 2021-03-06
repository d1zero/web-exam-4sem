import React from 'react';
import {Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const TrackCard = ({id, title, date_of_release, cover, description, artists_data}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                style={{lineBreak: "anywhere"}}
                title={<Link to={`/tracks/${id}`}>{title}</Link>}
                subheader={date_of_release}
            />
            <CardMedia
                component="img"
                height="194"
                width="194"
                image={cover}
                alt={title}
                style={{objectFit: "cover"}}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default TrackCard;