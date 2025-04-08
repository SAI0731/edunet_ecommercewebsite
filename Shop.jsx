import React, { useEffect, useState } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

const Shop = () => {
  const [popular, setPopular] = useState([]);
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const popularRes = await fetch('http://localhost:4000/popularinwomen');
        const popularData = await popularRes.json();
        setPopular(popularData);

        const newColRes = await fetch('http://localhost:4000/newcollections');
        const newColData = await newColRes.json();
        setNewCollection(newColData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div>
      <Hero />
      <Popular data={popular} />
      <Offers />
      <NewCollections data={newCollection} />
      <NewsLetter />
    </div>
  );
};

export default Shop;
