import SectionCardSingleGrid from "@/components/Attributes/Cards/SectionCardSingleGrid";
import RowDoubleGrid from "@/components/Attributes/Rows/Grids/RowDoubleGrid";
import TextSmall from "@/components/Attributes/Typography/TextSmall";
import Input from "@/components/Forms/Input";
import React from "react";

const AssetBalance = () => {
  const setData = (params: any) => {
    console.log(params);
  };

  return (
    <SectionCardSingleGrid className="mx-8 2xl:mx-60">
      
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">Property</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Residence</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Investment</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">Investment</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Bond</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Investment</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Unit Trust</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Other</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>
      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">Savings</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Saving Account</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Fixed Deposit</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>

      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">CPF</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
                Ordinary Account
              </TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Special Account</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Medisave</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">
                Retirement Account
              </TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>

      <RowDoubleGrid>
        <div>
          <TextSmall className="text-gray-light">SRS</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div>
              <TextSmall className="text-gray-light">Account Balance</TextSmall>
            </div>
            <div className="text-right">
              <TextSmall>$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>

      <RowDoubleGrid>
        <div>
          <TextSmall className="text-green-deep">TOTAL</TextSmall>
        </div>
        <div>
          <RowDoubleGrid>
            <div></div>
            <div className="text-right">
              <TextSmall className="text-green-deep">$0.00</TextSmall>
            </div>
          </RowDoubleGrid>
        </div>
      </RowDoubleGrid>
    </SectionCardSingleGrid>
  );
};

export default AssetBalance;
