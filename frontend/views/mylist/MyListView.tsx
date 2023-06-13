
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import Card from 'Frontend/components/Card/Card.js';
import Nendoroid from 'Frontend/generated/com/example/application/model/Nendoroid.js';

import { NendoroidEndpoint } from 'Frontend/generated/endpoints.js';
import { useEffect, useState } from 'react';

import './styles.css';
import { Button } from '@hilla/react-components/Button.js';
import { Select, SelectItem } from '@hilla/react-components/Select.js';

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

  useEffect(() => {
    (async () => {
      const nendos = await NendoroidEndpoint.findAll();
      setNendoroids(nendos);

      const yearset = new Set<number>();
      nendos.forEach((n ) => { 
        if(n.year)
        yearset.add(n.year) })
      
      const yN =  Array.from(yearset);
      const yn1 = yN.map((y) => {
        return {
          label: `${y}`,
          value: `${y}`
        } 
      });
      
      setYears([...years, ...yn1]);
    })();
  
    return () => { };
  }, []);


  const onChangeSelect = (yearVal: string) => {
    console.log(yearVal);
    setSelectedYear(yearVal)
      if(yearVal === 'all') { setFilteredNendoroids(nendoroids); 
         return;
      }
      setFilteredNendoroids(nendoroids.filter((item) => item.year?.toString() === yearVal));
    
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
   return [...mapArr].slice(0,100).map((nendo, number) => <Card key={number} nendoroid={nendo} showSelection={showSelection} addOrRemove={addOrRemove}/> )
 }
  
 const onClickSelection = () => setShowSelection((sel) => !sel);
  
  return (
    <>
     <Button onClick={onClickSelection}>Start Selecting</Button>
      <Select
      label="Sort by"
      items={years}
      value={selectedYear}
      onChange={(e) => onChangeSelect(e.target.value)}
      />
      <section className='section-container'>
     
   
    {renderNendoroids()}
       
      </section>
    </>
  );
}
