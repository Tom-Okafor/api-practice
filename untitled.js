

const DATA = async () => {
  const RESPONSE = await fetch("https://api.spacexdata.com/v4/launches");
  const DATA = await RESPONSE.json();
  console.log(DATA);
}

DATA()