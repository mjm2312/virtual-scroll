//import React from "react";
import ReactDOM from "react-dom";
import Papa from "papaparse";
//import mockData from './mockData';

//console.log('what is mockdata', mockData)



import React, { useState, useRef, useCallback, useEffect } from 'react'
import printTable from './printTable.js'
import { CSVDownloader } from "react-papaparse";

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [data, setData] = useState([]);
  const [xOffset, setxOffset] = useState(1);
  const [loading, setLoading] = useState(true)

  const [x, setX] = useState(0);

  //const [scrollsLeft, setScrollsLeft] = useState(false);
  //const [scrollsRight, setScrollsRight] = useState(true);
  const [scrollDir, setScrollDir] = useState('right');

  const viewportElement = useRef();


  const handleNavigation = useCallback(
    (e) => {
      const container = e.currentTarget;
      //console.log(x - container.scrollLeft);    
      if (x > container.scrollLeft && x < 600) {
        setScrollDir('left');
      } else if (x < container.scrollLeft) {
        setScrollDir('right');
      } else if (x === 0) {
      }
      //console.log(container.scrollLeftMax);
      //console.log(container.scrollLeft);
      //console.log('width,', container.scrollWidth);
      //console.log(container.scrollWidth - container.scrollLeft)
      console.log(container.scrollWidth - 600);
      setX(container.scrollLeft);
    },
    [x]
  );





    
  const observer = useRef()
  const lastVisColRef = useCallback(node => {

    if (loading) return
    
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      //console.log('entries', entries);
      //console.log('entries[0]', entries[0]);
      if (entries[0].isIntersecting) {
        setxOffset(xOffset => xOffset + 1);
        //console.log('what is x during intersection', x);

        viewportElement.current.scrollLeft = 0; //need this bc otherwise scrollbar stays in position that continuously reveals next intersectionObeserver ref
        viewportElement.current.scrollLeft += 80;
      }
    })
    if (node) observer.current.observe(node)
  }, [loading])

  const observer2 = useRef()

  const firstVisColRef = useCallback(node => {
    console.log('node', node);
    //if (loading) return
    
    if (observer2.current) observer2.current.disconnect()
    observer2.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
      //console.log('what is x during new intersection', x);

        // if (scrollDir ==='left') {
        //   console.log('LEFT we are intersecting with new while left ref')
        // }

        // console.log('new ref visible')
        setxOffset(xOffset => xOffset - 1)
        viewportElement.current.scrollLeft = 0; //need this bc otherwise scrollbar stays in position that continuously reveals next intersectionObeserver ref
        viewportElement.current.scrollLeft += 600; //use last scroll position instead of this
      }
    })
    if (node) observer2.current.observe(node)
  }, [loading])


  useEffect(() => {  
    //const context = this;
    Papa.parse('data.csv', {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        setData([...data, ...results.data]);
        setLoading(false);

      }
    })
  }, [])

  if (data.length === 0) { //OR BETTER, USE, IF LOADING
    return (<div> loading data ...</div>)
  } else {
    return (
      <div>
        <div ref = {viewportElement}
            id = "table-container"
            onScroll = {handleNavigation}
        >
        {printTable(xOffset, data, lastVisColRef, scrollDir, firstVisColRef)}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))












































