import React from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    Collapse,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Link
} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {styled} from '@mui/material/styles';

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

const AlbumCard = ({id, cover, name, type_of_album, date_of_release, description}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (


        <Card sx={{maxWidth: 345}}>
            <CardHeader
                style={{lineBreak: "anywhere"}}
                title={<Link to={`/albums/${id}`} component={RouterLink}
                             style={{color: '#000', textDecoration: 'none'}}>{name}</Link>}
                subheader={date_of_release}
            />
            <CardMedia
                component="img"
                height="194"
                width="194"
                image={cover}
                alt={name}
                style={{objectFit: "cover"}}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {type_of_album}
                </Typography>
            </CardContent>
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

export default AlbumCard;