"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ContextComponent from "@/utils/context";
import ShortcutTable from "@/components/root/main/shortcutTable/shortcutTable";
import Sidebar from "@/components/root/sidebar/sidebar";
import "./page.scss";
import apiClient from "@/utils/apiClient";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    apiClient.get("/logged_in")
    .then(function (response) {
      if (!response.data["logged_in"]) {
        router.push("/login");
      }
    })
    .catch(function (error) {
    });
  }, []);

  return (
    <ContextComponent>
      <Sidebar/>
      <div className="main">
        <div className="main-container">
          <div className="shortcut-table-area">
            <ShortcutTable/>
          </div>
        </div>
      </div>
    </ContextComponent>
  );
}