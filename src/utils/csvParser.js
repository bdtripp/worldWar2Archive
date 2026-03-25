import Papa from 'papaparse';

export function parseFile(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => resolve(results.data),
      error: (err => reject(err))
    });
  });
} 