import Nendoroid from "Frontend/generated/com/example/application/model/Nendoroid.js";

import './styles.css';

import { useState } from "react";
import { CardActions, CardContent, CardHeader, CardMedia, Card as CardMui, IconButton, Typography, } from "@mui/material";
import { MoreVert, Link } from '@mui/icons-material';


const Card: React.FC<{ nendoroid: Nendoroid, showSelection: boolean, addOrRemove: (number?: string, remove?: boolean) => void }> = ({ nendoroid, showSelection, addOrRemove }) => {

  const { image_url, name, number, year, url } = nendoroid;

  const [selected, setSelected] = useState(false);

  const onClick = () => {
    addOrRemove(number, selected);
    setSelected((s) => !s);

  }

  return (

    <CardMui sx={{ maxWidth: 345 }} className="card-container">
      <CardHeader

        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={`#${number}`}
        subheader={year}
      />
      <CardMedia
        component="img"
        height="194"
        width="100"
        image={image_url}
        alt={number}
        className="card-img"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <a href={url} target="_blank">
          <IconButton aria-label="details" >

            <Link />
          </IconButton>
        </a>


      </CardActions>

    </CardMui>


  );
}

export default Card;