import ReactDOM from 'react-dom';
import Papa from 'papaparse';
import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import printTable from './printTable.js';

export default function App() {
  const [data, setData] = useState([]);
  const [xOffset, setxOffset] = useState(1);
  const [loading, setLoading] = useState(true);
  const viewportElement = useRef();

  useEffect(() => {
    Papa.parse('data.csv', {
      header: true,
      download: true,
      dynamicTyping: true,
      complete(results) {
        setData([...data, ...results.data]);
        setLoading(false);
      },
    });
  }, []);

  const options = {
    root: viewportElement.current,
    rootMargin: '0px',
    threshold: 1.0
  }
  const observeLastCol = useRef();
  const lastVisColRef = useCallback(() => {
    if (loading) return;
    if (observeLastCol.current) observeLastCol.current.disconnect();

    observeLastCol.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setxOffset((xOffset) => xOffset + 1);
        viewportElement.current.scrollLeft = 0;
        viewportElement.current.scrollLeft += 200; // otherwise, scrollbar stays in position that continuously reveals next intersectionObeserver target el
      }
    }, options);

    const rows = document.querySelectorAll('.lastVisCol');
    rows.forEach((row) => {
      observeLastCol.current.observe(row);
    });
  }, [loading]);

  const observeFirstCol = useRef();
  const firstVisColRef = useCallback(() => {
    if (observeFirstCol.current) observeFirstCol.current.disconnect();

    observeFirstCol.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setxOffset((xOffset) => xOffset - 1);
        viewportElement.current.scrollLeft = 0; // need this bc otherwise scrollbar stays in position that continuously reveals next intersectionObeserver ref
        viewportElement.current.scrollLeft += 1800; // use last scroll position instead of this
      }
    });

    const rows = document.querySelectorAll('.firstVisCol');
    rows.forEach((row) => {
      observeFirstCol.current.observe(row);
    });
  }, [loading]);

  if (loading) {
    return (
      <div id="table-container"> loading data...</div>
    );
  }
  return (
    <div>
      <div
        ref={viewportElement}
        id="table-container"
      >
        {printTable(xOffset, data, lastVisColRef, firstVisColRef)}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
