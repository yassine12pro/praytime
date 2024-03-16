import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Prayer({name , time , img}) {
  return (
    <Card sx={{ width:"14%" }}>
      <CardMedia
        sx={{ height: 150 }}
        image={img}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h2" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
      
    </Card>
  );
}