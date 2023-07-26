
import { Select, SelectItem } from '@hilla/react-components/Select.js';
import { Button, InputAdornment, TextField } from '@mui/material';
import { NendoroidEndpoint } from 'Frontend/generated/endpoints.js';
import { FC, useEffect, useState } from "react";
import {Search as SearchIcon} from "@mui/icons-material";

import './Filter.style.css';

interface Props {
   selectYear: (year: string) => void;
   year: string;
   onSubmitSearch: (value: string) => void;
}


 const Filter: FC<Props> = ({selectYear, year, onSubmitSearch}) => {

  const [searchValue, setSearchValue] = useState("");

  const [years, setYears] = useState<SelectItem[]>([{
    label: 'All',
    value: 'all'
   }]);

   
  useEffect(() => {
    (async () => {
      
      const yearsRaw = await NendoroidEndpoint.findAllYears();
      const yearsConverted = yearsRaw.map((y) => {
        return {
          label: `${y}`,
          value: `${y}`
        } 
      });

      setYears([{
        label: 'All',
        value: 'all'
       }, ...yearsConverted]);
    })();
  
    return () => { };
  }, []);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  
const onClickSearchButton = () => {

    onSubmitSearch(searchValue);
    setSearchValue("");
}

    return (<div className='filter-container'>
     <Select
      label="Select Year"
      items={years}
      value={year}
      onChange={(e) => selectYear(e.target.value)}
      />

<TextField className='search'
      id="search"
      type="search"
      label="Search"
      value={searchValue}
      onChange={handleSearchChange}
      size='small'
      margin='none'
  
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button onClick={onClickSearchButton}>
            <SearchIcon />
            </Button>
            
          </InputAdornment>
        ),
      }}
    />
    </div>)

}


export default Filter;