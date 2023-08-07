export function pfrMethod(method: string) {
  const newMethod = method.split(",");
}

export function pfrProgress(pfr: any): number {
  const progress = [
    pfr.section1,
    pfr.section2,
    pfr.section3,
    pfr.section4,
    pfr.section5,
    pfr.section6,
    pfr.section7,
    pfr.section8,
    pfr.section9,
    pfr.section10,
    pfr.section11,
    pfr.section12,
  ];

  let count = 0;
  progress.forEach((e) => {
    e == 1 ? (count = count + 1) : (count = count);
  });
  count = Math.round((count / 12) * 100);
  return count;
}
