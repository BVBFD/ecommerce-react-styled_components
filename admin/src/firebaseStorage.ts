import { FirebaseApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { ProductType } from './redux/productRedux';
import { UserType } from './redux/userRedux';

class ImgStorage {
  private storage;

  constructor(firebaseApp: FirebaseApp) {
    this.storage = getStorage(firebaseApp);
  }

  async uploadImg(
    file: File,
    cb: React.Dispatch<React.SetStateAction<string | undefined>>
  ) {
    const fileName = new Date().getTime() + file!.name;
    const storageRef = ref(this.storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file!);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        window.alert(`파일 업로드 실패 ${error}`);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          cb(downloadURL);
        });
      }
    );
  }
}

export default ImgStorage;
