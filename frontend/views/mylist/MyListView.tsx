import Card from 'Frontend/components/Card/Card.js';
import Nendoroid from 'Frontend/generated/com/example/application/model/Nendoroid.js';

import { NendoroidEndpoint } from 'Frontend/generated/endpoints.js';
import { useEffect, useState } from 'react';

import './styles.css';

import { Pagination } from '@mui/material';
import { getCount } from 'Frontend/generated/NendoroidEndpoint.js';
import Filter from './components/Filter.js';

export default function MyListView() {
  const [nendoroids, setNendoroids] = useState(Array<Nendoroid>());
 const [selectedNendoroids, setSelectedNendoroids] = useState(Array<string>());
 const [showSelection, setShowSelection] = useState(false);
 const [selectedYear, setSelectedYear] = useState('all');
 const size = 50;
 const [total, setTotal] = useState(0);

 const [page, setPage] = useState(1);


  useEffect(() => {
    (async () => {
       await getNendoroids();
      const totalCount = await NendoroidEndpoint.getCount('all', undefined);
  
      setTotal(Math.ceil(totalCount / size));
     
    })();
  
    return () => { };
  }, []);

  useEffect( () => {
    updatePage();
  }, [page, selectedYear])


  const updatePage = (async (name?: string) => {
    await getNendoroids(selectedYear, page, name);
    const t = await getCount(selectedYear, name);
    const pages = Math.floor(t  / size);
    setTotal(pages > 0 ? pages : 1);
  });


  const getNendoroids = async (yearParam = selectedYear, pageParam = page, name?: string) => {
    const nendos = await NendoroidEndpoint.findAllBy(pageParam, size, yearParam, name);
    setNendoroids(nendos);
    return nendos;
  }


  const onChangeYear = (yearVal: string) => {
    setSelectedYear(yearVal);
    setPage(1);
  }


  const onSubmitSearch = (value:string) => {
    updatePage(value);
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
  
   return [...nendoroids].slice(0,100).map((nendo, number) => <Card key={number} nendoroid={nendo} showSelection={showSelection} addOrRemove={addOrRemove}/> )
 }
  


const onChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
     setPage(page);
    
}
  
  return (
    <div className='container'>
   
     <Filter selectYear={onChangeYear} year={selectedYear} onSubmitSearch={onSubmitSearch}/>
   <div className='nendoroid-list'>
    
   {renderNendoroids()}
   

   </div>
   <Pagination 
      page={page}
      className='pagination'
      count={total}
      color="primary" onChange={onChangePagination} />
    
    </div>
  );
}
