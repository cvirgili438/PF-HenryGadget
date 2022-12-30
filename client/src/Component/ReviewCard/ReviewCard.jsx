import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../Redux/Actions/users'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',    
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({review}) {
    const [expanded, setExpanded] = useState(false);
    const user = useSelector(state => state.userFromDb)
    const dispatch = useDispatch();

    console.log(user);

    useEffect(() => {
        review.userUid && dispatch(getUserById(review.userUid))
    })

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: '100%', marginBottom: '1rem', border: 'black 1px' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {!user ? 'N/D' : user.name}
                    </Avatar>
                }                
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {review.comment}
                    <p>...titulo que resuma la opinion...</p>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>                
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit >
                <CardContent >
                    <Typography paragraph>  
                    <p>...opinion...</p>                  
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Alias assumenda neque, cupiditate soluta amet illum. Nam provident nobis reiciendis consequatur 
                        soluta impedit magni aliquam sapiente, voluptates eveniet ab deserunt molestiae.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, maxime eum. Expedita ipsum in 
                        qui hic, praesentium ad laboriosam libero ea veritatis? Nesciunt blanditiis excepturi cumque nisi, quidem tempore id.
                    </Typography>                    
                </CardContent>
            </Collapse>
        </Card>
    );
}