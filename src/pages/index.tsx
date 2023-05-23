import { Inter } from "next/font/google";
import { Page } from "./_app";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import GlobalCard from "@/components/Attributes/Cards/GlobalCard";
import TitleMedium from "@/components/Attributes/Typography/TitleMedium";
import Link from "next/link";
import File3FillIcon from "remixicon-react/File3FillIcon";

const inter = Inter({ subsets: ["latin"] });

const EpfrPage: Page = () => {
  return (
    <>
      <Head>
        <title>Epfr Apps</title>
      </Head>
      <main className="flex-1 bg-white md:ml-64">
        <section className={`grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1`}>
          <GlobalCard className="min-h-screen pt-16">
            <div className="flex flex-row items-center justify-between mx-8">
              <TitleMedium>EPFR Documents</TitleMedium>
            </div>
            <div className="mt-2">
              <div className="flex justify-between gap-10">
                <div className="p-10 text-center border rounded-lg cursor-pointer border-gray-light hover:border-green-deep hover:bg-green-light">
                  <Link href="/epfrs/create/single">
                    <button>
                      <File3FillIcon className="text-green-deep" size={30} />
                    </button>
                    <h2>Single EPFR Document</h2>
                    <span className="text-sm text-gray-light">
                      This EPFR for one person
                    </span>
                  </Link>
                </div>
                <div className="p-10 text-center border rounded-lg cursor-pointer border-gray-light hover:border-green-deep hover:bg-green-light">
                  <Link href="/epfrs/create/join">
                    <button>
                      <File3FillIcon className="text-green-deep" size={30} />
                    </button>
                    <h2>Joint EPFR Document</h2>
                    <span className="text-sm text-gray-light">
                      This EPFR for two persons
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </GlobalCard>
        </section>
      </main>
    </>
  );
};

EpfrPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default EpfrPage;
