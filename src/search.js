import React, {useState} from 'react';
//import dictionary from './dictionary';
import {db} from './firebase';
import "./style.css"
import firebase from 'firebase/compat/app';
// import { useHistory } from 'react-router-dom';


function Search() {
  const [prefix, setPrefix] = useState('');
  const [results, setResults] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedFile2, setSelectedFile2] = useState('');
  const [selectedFile3, setSelectedFile3] = useState('');
  // const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;


  const handlePrefixChange = (event) => {
    setPrefix(event.target.value);
  };



    const handleSearch = (e) => {
      if(prefix.length>=4)
      {
        e.preventDefault();
        db.collection("prefix")
        .get()
        .then((snapshot)=>{
        if(snapshot.docs.length>0){
            const files = [];
            snapshot.docs.forEach((doc)=>{
              //console.log(prefix.substring(0,4))
            if(doc.id===prefix.substring(0,4)) {
              const diamonds = doc.data().diamonds;
              let len=prefix.length;
              diamonds.forEach((file) => {
              if(file.substring(0,len)===prefix)  
              files.push(file);
              
              }); 
              
              
            }
            });
            if(files.length<=100)
            setResults(files);
            else
            setResults(files.slice(0,100));
        }
        });
      }
    }

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    

    const handleLogout = () => {
      
      firebase.auth().signOut().then(() => {
        window.location.href = '/login';
      });
    }

    const handleFileClick = (file) => {
      // const file1 = file.target.innerText;
      setSelectedFile(file);
      // console.log(file);
      window.open(`https://d360.tech/imaged/${file}/still.jpg`,"_blank");
    };

    const handleFileClick2 = (file) => {
      // const file1 = file.target.innerText;
      setSelectedFile2(file);
      // console.log(file);
      window.open(`https://d360.tech/detail.html?d=${file}`);
    };

    const handleFileClick3 = (file) => {
      // const file1 = file.target.innerText;
      setSelectedFile3(file);
      // console.log(file);
      window.open(`https://d360.tech/view.html?d=${file}`);
    };

    const indexOfLastFile = currentPage * rowsPerPage;
    const indexOfFirstFile = indexOfLastFile - rowsPerPage;
    const currentFiles = results.slice(indexOfFirstFile, indexOfLastFile);



    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <h1>Fetch Prefix</h1>
        <input type="text" id="prefix-input" value={prefix} onChange={handlePrefixChange}/>
        <button onClick={handleSearch}>Search</button>
        <div className="table-container">
          <table className='file-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Imaged</th>
                <th>Detail</th>
                <th>360 viewer</th>
                <th>Created At</th>
                <th>Small Image</th>
              </tr>
            </thead>
            <tbody>
              {currentFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file}</td>
                  <td><button onClick={() => handleFileClick(file)}>View Full Image</button></td>
                  <td><button onClick={() => handleFileClick2(file)}>More</button></td>
                  <td><button onClick={() => handleFileClick3(file)}>360 viewer</button></td>

                  <td>{/* Replace this with the created at date for the file */}</td>
                  <td><img style={{ width: '20px', height: '20px' }} src={`https://d360.tech/imaged/${file}/still.jpg`} alt={file} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {selectedFile && (
            <div className="image-container">
              <img src={`https://d360.tech/imaged/${selectedFile}/still.jpg`} alt={selectedFile} />
            </div>
          )} */}
        </div>
        {results.length > 0 && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(results.length / rowsPerPage) }, (_, i) => (
              <button key={i} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>{i + 1}</button>
            ))}
          </div>
        )}
      </div>
    );
    
    
}

export default Search;
