import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// TODO: Migrate fetch logic to api-route
// Blocker is that Node does not gracefully handle formData parsing and multipart/form-data encoding out of the box. 
// Need to find a new lib or write one
export default function UploadForm() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    
  }, [errorMessage]);

  const handleFileChange = (event) => {
    if(event.currentTarget.files){
        setSelectedFile(event.currentTarget.files[0]);
    }
    else{
      setSelectedFile(undefined);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    const init = {
            headers: {
            //    'Content-Type': 'multipart/form-data',
                'x-api-key': 'live_Si8nMRhQsHfEqpYMKbZ0ieoiwqvSGBkJYjejkqbYsK2GHqt07ACpM86Y9tgeAB2x' 
            },
            method: 'POST',
            body: formData,
          }
    
     const url = 'https://api.thecatapi.com/v1/images/upload';
     const response = await fetch(url, init);

    if (response.ok && response.status === 201) {
      //Redirect to home
      router.replace('/');
    } else {
      // Handle common status codes
      switch(response.status){
        case 400: setErrorMessage("Invalid Request, please ensure you are uploading an image");
          break;
        default: setErrorMessage("Oops, unhandled error, please contact customer support");
      }
      const parsedResponse = await response.json();
      console.error('Error uploading file');
      console.log("Error Details: " + JSON.stringify(parsedResponse));
    }
  };

  return (
    <form className="max-w-sm mx-auto pt-5" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="fileUpload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please Select a Photogrpah of your <i>best cats</i></label>
      </div>
      <div className="mb-5">
        <input  type="file" onChange={handleFileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>
      </div>
      <div className="flex items-start mb-5 pt-1">
        <label>{errorMessage}</label>
      </div>  
  </form>
  );
}