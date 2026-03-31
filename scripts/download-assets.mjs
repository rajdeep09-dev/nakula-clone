import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  "https://framerusercontent.com/images/fG5uqOgl43qhhiPH56hF84UrTs.png?width=1300&height=336",
  "https://framerusercontent.com/images/zePNmwKsJJlIjKuawASK80nPtk.png?width=1761&height=336",
  "https://framerusercontent.com/images/Za3YaKBZ4ieum1B0ieifAFdPik.png?width=1535&height=336",
  "https://framerusercontent.com/images/VdZYGP1aARcAIODj5sWnjn1vDac.png?width=1770&height=323",
  "https://framerusercontent.com/images/cKWxePeq3jR2Saj0Xn8To9npdU.png?width=1322&height=329",
  "https://framerusercontent.com/images/O9GTVSOp5qfdcnPZ0RpGBtAKd4.png?width=1604&height=1340",
  "https://framerusercontent.com/images/x1W4oQBvmcvuOt4GlWOEKQMUUOc.jpg?width=1604&height=1340",
  "https://framerusercontent.com/images/x0UofRTrUvAlzREUlGFku7Owqc.jpg?width=1604&height=1340",
  "https://framerusercontent.com/images/zoIInaosVMRrQmmsA0vfTGt9I.png?width=2880&height=1786",
  "https://framerusercontent.com/images/rRCiFBniYamhH6UXCg7Cb7fzzo.jpg?width=892&height=892",
  "https://framerusercontent.com/images/CprFQpdlgfGUGdRsyoRT8csrg8.jpg?width=1604&height=1340",
  "https://framerusercontent.com/images/WHJ25LMPF20UPONd4Jk6zTwGdE.png",
  "https://framerusercontent.com/images/5gdCjJzgixF9dWQNM1ZXXuoFXps.jpg",
  "https://framerusercontent.com/images/JoawA6wu1SFIPzmCF597rJrbupM.jpg",
  "https://framerusercontent.com/images/KpQeXJpZxptK8NdC8jxdO20oCB4.png",
  "https://framerusercontent.com/images/2K3pqY5fDeFlk3Gs05TpVcAUmQ.jpg?width=1278&height=1278",
  "https://framerusercontent.com/images/xX3vlRx8jOVEsRxEAehYoPko.jpg?width=1278&height=1278",
  "https://framerusercontent.com/images/jlFduzJpcfTpzS7mUXE8QheMYqI.jpg?width=1278&height=1278",
  "https://framerusercontent.com/images/gec3rPHHT3UKFQYkzoz4k2XJc0.png",
  "https://framerusercontent.com/images/3pJBuNa37kKdPPcJernPyqUxNoI.png",
  "https://framerusercontent.com/images/gw7yOZT8GcZrnBoQYlpBdZmC1s.png",
  "https://framerusercontent.com/images/3X1HO3X74cUE2rChqeNy9aFq20.jpg",
  "https://framerusercontent.com/images/fByRJnifHpxJBPPalEfESi6BrE.png",
  "https://framerusercontent.com/images/CQA5T3Vhi3GK8vZJPeYCoOXi1k.png",
  "https://framerusercontent.com/assets/Qc6dhglAiYjaI04EEF5RsqHBU.mp4"
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function main() {
  const imgDir = path.join(process.cwd(), 'public/images');
  const videoDir = path.join(process.cwd(), 'public/videos');
  
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
  if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });

  for (const url of assets) {
    const fileName = path.basename(url.split('?')[0]);
    const isVideo = url.endsWith('.mp4');
    const dest = path.join(isVideo ? videoDir : imgDir, fileName);
    console.log(`Downloading ${url} to ${dest}...`);
    try {
      await download(url, dest);
    } catch (e) {
      console.error(`Failed to download ${url}: ${e.message}`);
    }
  }
}

main();
