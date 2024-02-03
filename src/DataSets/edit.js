import { readFile, writeFile } from 'fs';
const filePath = 'college_list.json'; // Replace with the actual file path
items = [];
readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return false;
  }
  try {
    const jsonData = JSON.parse(data);
    var i = 1 ; 
    for (clg of jsonData.College_list){
        items.push({
            "id":i,
            "college":clg
        })
        i++;
    }
    writeFile("new_College_list.json", JSON.stringify(items), 'utf8', (err) => {
          if (err) {
            console.error('Error writing to the file:', err);
            return;
          }
          console.log('Data has been written to the file.');
        });
  } catch (error) {
    console.error('Error parsing JSON:', error);
  } 
});