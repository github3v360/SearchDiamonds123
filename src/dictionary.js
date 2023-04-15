import { db } from './firebase';

const dictionary = {};

db.collection('prefix')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      dictionary[doc.id] = doc.data().words;
    });
  })
  .catch((error) => {
    console.log('Error getting dictionary:', error);
  });

export default dictionary;
