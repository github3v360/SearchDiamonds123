
const bucketName = 'dev_d360us';

const prefix='132-'

const {Storage} = require('@google-cloud/storage');


const storage = new Storage();

async function listFilesByPrefix() {

  const options = {
    prefix: prefix,
  };


  const [files] = await storage.bucket(bucketName).getFiles(options);


  console.log('Files:');
  files.forEach(file => {
    if(file.name.endsWith('metadata.json')){
        const file_path_arr = file.name.split("/");
        console.log(file_path_arr[file_path_arr.length-2]);
    }
    
  });
}

listFilesByPrefix().catch(console.error);

export default listFilesByPrefix