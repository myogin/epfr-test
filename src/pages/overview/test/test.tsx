async function getData() {
  await new Promise<void>((resolve, reject) => setTimeout(resolve, 2000));
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return "loaded";
}

export default async function TestLoad() {
  const name = await getData();

  return "...";
}
