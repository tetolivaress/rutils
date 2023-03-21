import { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Box, Slider } from '@mui/material';
import { readFilesAsync } from '../src/utils/FileReader';
import resizeImage from '../src/utils/ImageReader';

export default function Images() {
  const [readedImages, setReadedImages] = useState<any[]>([])

  const [quality, setQuality] = useState(100)
  const [size, setSize] = useState(100)

  const handleChangeQuality = async (event: Event, newValue: number | number[]) => {
    console.log(readedImages);
    if (typeof newValue === 'number') {
      setQuality(newValue);
      readedImages.forEach(async (file) => {
        console.log('file: ', file);
        const image = await resizeImage(file, size, quality)
        console.log('image: ', image);
        setReadedImages((prev) => [...prev, image])
      })
    } else {
      console.log('not a number')
    }
  };

  const handleChangeSize = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSize(newValue);
      readedImages.forEach(async (file) => {
        const image = await resizeImage(file, size, quality)
        console.log('image: ', image);
        setReadedImages((prev) => [...prev, image])
      })
    }
  };

  const handleReadImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = await readFilesAsync(e)
    setReadedImages((prev) => [...prev, ...files])
  }

  return (
    <Box sx={{ margin: '32px' }}>
      <Box>
        <Button
          component='label'
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
          htmlFor="upload"
        >
          Upload
        </Button>
        <input
          type='file'
          id='upload'
          style={{ display: 'none' }}
          onChange={handleReadImages}
          multiple
        />
      </Box>
      <Box>Images</Box>
      {readedImages.map((image, index) => (
        <Box key={index}>
          <img src={image.base64} alt='image' />
        </Box>
      ))}
      <Slider
        value={quality}
        min={1}
        step={1}
        max={100}
        onChange={handleChangeQuality}
      />
      <Slider
        value={size}
        min={1}
        step={1}
        max={3840}
        onChange={handleChangeSize}
      />
    </Box>
  )
}