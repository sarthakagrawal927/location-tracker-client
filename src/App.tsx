import { useEffect, useState } from 'react'
import './App.css';
import SimpleDatePicker from './components/DatePicker';
import Dropdown from './components/Dropdown';
import Header from './components/Header';
import MapContainerOP from './components/MapContainerOP';
import { User, LocationObject } from './helpers/types';

function App() {
  const [activeEmployee, setActiveEmployee] = useState<User | null>(null)
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [polylines, setActivePolylines] = useState<[number, number][]>([]);

  useEffect(() => {
    (async () => await fetchAndSetData())()

    // if date today
    window.dispatchEvent(new CustomEvent('subscribe', { detail: activeEmployee?.phone }))
  }, [activeDate, activeEmployee])

  const fetchAndSetData = async () => {
    if (!activeDate || !activeEmployee) return;
    const stringDate = activeDate.toISOString().slice(0, 10)
    const data = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/locations?phone=${activeEmployee.phone}&date=${stringDate}`)).json();
    const newPolylines = data?.locations?.map((dataObj: LocationObject) => [dataObj.lat, dataObj.lng]);
    console.log({ newPolylines })
    setActivePolylines(newPolylines);
  }

  return (
    <div style={{ display: "flex", flexDirection: 'row' }}>
      <Header />
      <div>
        <h1>
          People
        </h1>
        <SimpleDatePicker activeDate={activeDate} setActiveDate={setActiveDate} />
        <Dropdown activeEmployee={activeEmployee} setActiveEmployee={setActiveEmployee} />
      </div>
      {activeEmployee && <MapContainerOP user={activeEmployee} polylines={polylines} />}
    </div>
  );
}

export default App;
