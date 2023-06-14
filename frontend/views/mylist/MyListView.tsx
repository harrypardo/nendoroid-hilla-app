import Card from 'Frontend/components/Card/Card.js';
import Nendoroid from 'Frontend/generated/com/example/application/model/Nendoroid.js';

import { NendoroidEndpoint } from 'Frontend/generated/endpoints.js';
import { useEffect, useState } from 'react';

import './styles.css';
import { Button } from '@hilla/react-components/Button.js';
import { Select, SelectItem } from '@hilla/react-components/Select.js';
import { Pagination } from '@mui/material';
import { getCount } from 'Frontend/generated/NendoroidEndpoint.js';

export default function MyListView() {
  const [nendoroids, setNendoroids] = useState(Array<Nendoroid>());
  const [filteredNendoroids, setFilteredNendoroids] = useState(Array<Nendoroid>());
 const [selectedNendoroids, setSelectedNendoroids] = useState(Array<string>());
 const [showSelection, setShowSelection] = useState(false);
 const [selectedYear, setSelectedYear] = useState('all');
 const [years, setYears] = useState<SelectItem[]>([{
  label: 'All',
  value: 'all'
 }]);
 const size = 50;
 const [total, setTotal] = useState(0);

 const [page, setPage] = useState(1);


  useEffect(() => {
    (async () => {
       await getNendoroids();


      const yearsRaw = await NendoroidEndpoint.findAllYears();
      const totalCount = await NendoroidEndpoint.getCount('all');
      setTotal(Math.ceil(totalCount / size));
     
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

  useEffect( () => {
   (async () => {getNendoroids();

    setTotal(Math.floor(await getCount(selectedYear)  / size));
  })();

  }, [page, selectedYear])


  const getNendoroids = async () => {
    const nendos = await NendoroidEndpoint.findAllByYear(page, size, selectedYear);
    setNendoroids(nendos);
    return nendos;
  }


  const onChangeSelect = (yearVal: string) => {
    setSelectedYear(yearVal);
    setPage(1);
    
  }
 


 const addOrRemove =(number?: string, remove?: boolean) => {
    if(remove) setSelectedNendoroids((sn) => sn.filter((item) => item !== number));
   else {
      if(number) {
        setSelectedNendoroids([...selectedNendoroids, number]);
      }
     
    }
 }

  
 const renderNendoroids = () => {
  const mapArr = selectedYear === 'all' ? nendoroids : filteredNendoroids;
   return [...nendoroids].slice(0,100).map((nendo, number) => <Card key={number} nendoroid={nendo} showSelection={showSelection} addOrRemove={addOrRemove}/> )
 }
  
 const onClickSelection = () => { 

  setShowSelection((sel) => !sel); 
                                  
}

const onChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
     setPage(page);
    
}
  
  return (
    <>
     <Button onClick={onClickSelection}>{showSelection ? "Stop Selecting" : "Start Selecting" } </Button>
      <Select
      label="Sort by"
      items={years}
      value={selectedYear}
      onChange={(e) => onChangeSelect(e.target.value)}
      />
      
     
   <div className='nendoroid-list'>
   {renderNendoroids()}
   

   </div>
   <Pagination 
      page={page}
      className='pagination'
      count={total}
      color="primary" onChange={onChangePagination} />
    
    </>
  );
}
