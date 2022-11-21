export function genreateGroupID() {
   const digit = Math.floor(100000 + Math.random() * 900000);
   console.log(digit)
   return digit
  }