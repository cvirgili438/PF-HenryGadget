import React, { useState, useEffect } from 'react';
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
import { Box, Rating } from '@mui/material';

// import { getUserById } from '../../Redux/Actions/users'

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

export default function RecipeReviewCard({ review }) {
    const [expanded, setExpanded] = useState(false);
    // const user = useSelector(state => state.userFromDb)


    // console.log(Object(user));
    console.log(review);
    const date = new Date(review.created)
    console.log(date);


    // useEffect(() => {
    //     review.userUid && dispatch(getUserById(review.userUid))
    // })

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: '100%', marginBottom: '1rem', border: 'black 1px' }}>
            <CardHeader
                avatar={
                    <Rating
                        sx={{ padding: 'auto', fontSize: 20 }}
                        name="read-only"
                        value={Number(review.score)}
                        precision={0.5}
                        readOnly
                    />

                }
                title={
                    <Box sx={{ display: 'flex', position: 'relative', left: '35rem' }}>
                        {date.toLocaleDateString()}
                    </Box>
                }
            // subheader="September 14, 2016"
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {
                        // titulo que resume la review 
                        review.titleComment
                    }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {
                    review.comment && 
                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                }
                
            </CardActions>
            {
                review.comment &&
                <Collapse in={expanded} timeout="auto" unmountOnExit >
                    <CardContent >
                        <Typography paragraph>
                            {
                                // cuerpo del comentario
                                review.comment
                            }
                        </Typography>
                    </CardContent>
                </Collapse>
            }

        </Card>
    );
}