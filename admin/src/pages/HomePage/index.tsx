/*
 *
 * HomePage
 *
 */

import React, { useEffect, useRef, useState } from "react";
import pluginId from "../../pluginId";
import Header from "../../components/Homepage/Header";
import ConfPanel, { ConfPanelProps } from "../../components/Homepage/ConfPanel";
import { request } from "@strapi/helper-plugin";
import { Box, ContentLayout, Main, Stack } from "@strapi/design-system";

const HomePage = () => {
  const [confButtons, setConfButtons] = useState<ConfPanelProps[]>([]);

  const getConfs = async (): Promise<ConfPanelProps[] | null> => {
    try {
      const resp = await request(`/${pluginId}/config`, { method: "GET" });
      setConfButtons(resp.data);
      return resp.data;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    getConfs();
  }, []);

  return (
    <Main>
      <Header />
      <ContentLayout>
        <Stack spacing={4} vertical padding={0}>
          {confButtons &&
            confButtons.map((confButton, index) => {
              return <ConfPanel {...confButton} key={index}></ConfPanel>;
            })}
        </Stack>
      </ContentLayout>
    </Main>
  );
};

export default HomePage;
