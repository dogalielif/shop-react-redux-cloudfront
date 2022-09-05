import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import axios, { AxiosError } from 'axios';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

type CSVFileImportProps = {
  url: string,
  title: string
};

export default function CSVFileImport({url, title}: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<any>();

  const onFileChange = (e: any) => {
    console.log(e);
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    setFile(files.item(0));
  };

  const removeFile = () => {
    setFile('');
  };

  const uploadFile = async (e: any) => {
    const token = localStorage.getItem("authorization_token");
    const username = 'dogalielif';
    const password = 'TEST_PASSWORD'

    // const token = `${username}:${password}`;
    // const encodedToken = Buffer.from(token).toString('base64');
      // Get the presigned URL

    const authHeader = token 
    ? {headers: {
        Authorization: `Basic ${Buffer.from(token).toString('base64')}`
      }} 
    : {auth: {
          username: username,
          password: password
        }}
    try {
      const response = await axios({
        method: 'GET',
        url,
        ...authHeader,
        params: {
          name: encodeURIComponent(file.name)
        }
      })
      console.log('File to upload: ', file.name)
      console.log('Uploading to: ', response.data)
      const result = await fetch(response.data, {
        method: 'PUT',
        body: file
      })
      console.log('Result: ', result)
      setFile('');
    } catch(error) {
      console.log('error', error);
    }
  };

  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
          <input type="file" onChange={onFileChange}/>
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
