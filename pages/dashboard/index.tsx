import React, { useEffect } from "react";
import InnerLayout from "@/components/innerLayout";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import requireAuth from "@/components/common/requireAuth";

const Dashboard = dynamic(
  async () => import("@/components/dashboard/Dashboard"),
  {
    ssr: false,
  }
);
const DashBoard = () => {
  const router = useRouter();

  useEffect(() => {
    window.onpopstate = () => {
      router.push('/');
    };
    return () => {
      window.onpopstate = null;
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Dashboard | Powercozmo</title>
      </Head>
      <InnerLayout>
        <Dashboard />
      </InnerLayout>
    </>
  );
};

export default requireAuth(DashBoard);
