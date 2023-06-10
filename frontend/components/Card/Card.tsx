import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import Nendoroid from "Frontend/generated/com/example/application/model/Nendoroid.js";

import './styles.css';
import { Checkbox } from "@hilla/react-components/Checkbox.js";
import { useState } from "react";



const Card: React.FC<{ nendoroid: Nendoroid, showSelection: boolean, addOrRemove: (number?: string, remove?: boolean) => void }> = ({ nendoroid, showSelection, addOrRemove }) => {

  const { image_url, name, number, year, url } = nendoroid;

  const [selected, setSelected ] = useState(false);

  const onClick = () => {
    addOrRemove(number, selected);
    setSelected((s) => !s);
   
  }

  return (

    <div className="card-div" onClick={onClick}>
      <div className="card-header"> <div>{number} </div> {showSelection && <input type="checkbox" checked={selected} readOnly  />}</div>
      <div>{year}</div>
      <img src={image_url} className={"card-img"} />

      <div className="card-content">
        <p>
          {name}
        </p>
        <p> <a href={url}>Details</a></p>
      </div>
    </div>


  );
}

export default Card;