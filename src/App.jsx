import './App.css';
import {useEffect, useRef, useState} from 'react'

function App() {
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const loading = useRef(false)
  // const getNextPage = () => {
  //   const nextPage = page
  //   console.log("Next page is " + nextPage)
  //   setTimeout(()=>{
  //     setPage(prev=>prev+1)
  //   }, 500)
  // }


  const getNextPage = () => {
      if (loading.current) 
        return

      const nextPage = page;
      console.log("로드될 페이지", page);
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${nextPage}&sort_by=popularity.desc&vote_average.gte=2.5`;
      
      const options = {
          method: 'GET',
          headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmVlZjY1MTM4MTBmMTRmYmJjMzljNTQ1MzIzNzkxZSIsIm5iZiI6MTcyMTQ2MzI3OS44MzM5OTk5LCJzdWIiOiI2NjliNzFlZjU1N2QxMjJlODUxODFmYjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xCyd-F_0snlSKX3t4LgkZ4yL55lY-r_bVUKNP5SoxhI'
          }
      };
      loading.current = true
      fetch(url, options)
          .then(res => res.json())
          .then(res => {
              setMovies((curMovies) => [...curMovies, ...res.results]);
              loading.current = false
              setPage(prev => prev+1);
              console.log("test", res.results);
      }).catch(err => {
        console.error(err)
        loading.current = false
      });            
  }

    useEffect(() => {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        console.log(scrollTop, clientHeight, scrollHeight)
        if (scrollTop + clientHeight >= scrollHeight - 120) {
          if (loading.current) 
            return
    
          const nextPage = page;
          console.log("로드될 페이지", page);
          const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${nextPage}&sort_by=popularity.desc&vote_average.gte=2.5`;
          
          const options = {
              method: 'GET',
              headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmVlZjY1MTM4MTBmMTRmYmJjMzljNTQ1MzIzNzkxZSIsIm5iZiI6MTcyMTQ2MzI3OS44MzM5OTk5LCJzdWIiOiI2NjliNzFlZjU1N2QxMjJlODUxODFmYjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xCyd-F_0snlSKX3t4LgkZ4yL55lY-r_bVUKNP5SoxhI'
              }
          };
          loading.current = true
          fetch(url, options)
              .then(res => res.json())
              .then(res => {
                  setMovies((curMovies) => [...curMovies, ...res.results]);
                  loading.current = false
                  setPage(prev => prev+1);
                  console.log("test", res.results);
          }).catch(err => {
            console.error(err)
            loading.current = false
          });    
        }
      }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page]);



  return (
    <div className="App">
      <ul>
        {movies.map((movie)=>{
          return <li>{movie.title}</li>
        })}
      </ul>
      <h1>{page}</h1>
      <button onClick={getNextPage}>next page</button>

    </div>
  );
}

export default App;
