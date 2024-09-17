// facade custom hook: useData.js
// here you can use any state management approach
// could be as well Redux, MobX, useState - component does not know the implementation!
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from './slices';
import { useEffect } from 'react';

const useData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return {
    data,
    loading,
    error,
  };
};

// usage: MyComponent.js
import React from 'react';
import useData from './useData';

const MyComponent = () => {
  const { data, loading, error } = useData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
