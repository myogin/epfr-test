import Image from "next/image";
import React from "react";
import Ellipse7e from "../../../../public/assets/people/Ellipse7e.png";
import Ellipse7b from "../../../../public/assets/people/Ellipse7b.png";
import Ellipse7c from "../../../../public/assets/people/Ellipse7c.png";
import Ellipse7d from "../../../../public/assets/people/Ellipse7d.png";
import Ellipse7f from "../../../../public/assets/people/Ellipse7f.png";

const GlobalTable = () => {
  let dataRecentEpfr = [
    { photo: Ellipse7e, name: "Ellen Wilson", type: "Single", progress: "13" },
    { photo: Ellipse7b, name: "Margo Madison", type: "Single", progress: "9" },
    { photo: Ellipse7c, name: "Rahul Monaz", type: "Multiple", progress: "6" },
    { photo: Ellipse7d, name: "Steven Ray", type: "Multiple", progress: "5" },
    { photo: Ellipse7f, name: "Agnes Stone", type: "Single", progress: "4" },
  ];

  return (
    <div>
      <table className="w-full border-separate table-auto border-spacing-y-6">
        <thead className="text-sm font-bold text-left text-gray-light">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-left text-gray-light">
          {dataRecentEpfr.map((val, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="flex justify-start gap-3">
                  <Image src={val.photo} alt="image" /> <span>{val.name}</span>
                  </div>
                </td>
                <td>{val.type}</td>
                <td>{val.progress}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GlobalTable;
