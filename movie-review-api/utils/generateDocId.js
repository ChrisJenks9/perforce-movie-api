// Generates Unique Document ID for movies and reviews within the DB
const generateDocId = () => new Date().getTime().toString();

export default generateDocId;
