import { getPfr } from '@/services/pfrService';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Review = () => {
  const [pdfLink, setPdfLink] = useState("");
  const { push } = useRouter();

  const fetchData = async () => {
    const section1 = JSON.parse(localStorage.getItem('section1')?? '{}');
    const pfrId = section1?.state?.id;
    // const pfrId = 11966;
    if (pfrId === 0) {
      push("/");
    }

    const res: any = await getPfr(pfrId);
    // setSigners(res['signers']);
    const pdfPath = res['pfr']['pdf_1'];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace("/api", "");
    setPdfLink(`${baseUrl}/storage/${pdfPath}#toolbar=0`);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{backgroundColor: 'gray', overflow: 'auto', position: 'relative', height: '100vh'}}>
        <iframe allowFullScreen id="esignIframe" width='100%' height='100%' src={pdfLink}></iframe>
    </div>
  )
}

export default Review;