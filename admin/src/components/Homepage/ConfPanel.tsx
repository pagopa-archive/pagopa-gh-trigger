import React, { useEffect, useState } from "react";
import { Play, Spinner } from "@strapi/icons";
import History from "./History";
import { useIntl } from "react-intl";
import {
  Alert,
  Box,
  Flex,
  Typography,
  Divider,
  Button,
} from "@strapi/design-system";
import { useFetchClient } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import getTrad from "../../utils/getTrad";

export interface ConfPanelProps {
  id: string;
  name: string;
  token: string;
  description?: string;
  loading?: boolean;
}

const ConfPanel: React.FC<ConfPanelProps> = (props: ConfPanelProps) => {
  const { formatMessage } = useIntl();
  const [runError, setRunError] = useState(false);
  const [isLoadingPipeline, setIsLoadingPipeline] = useState(false);
  const [runs, setRuns] = useState<[]>();
  const { post, get } = useFetchClient();

  const startRun = async (id: string): Promise<void> => {
    setIsLoadingPipeline(true);
    const resp = await post(`/${pluginId}/run/${id}`);
    if (resp.status < 300) {
      setRunError(false);
      setIsLoadingPipeline(false);
      setTimeout(getRuns, 3000);
    } else {
      setRunError(true);
      setIsLoadingPipeline(false);
    }
  };
  async function getRuns(): Promise<void> {
    setRuns([]);
    const resp = await get(`/${pluginId}/runs/${props.id}`, {
      method: "GET",
    });
    if (resp.status < 300) {
      setRuns(resp.data);
    }
  }

  useEffect(() => {
    getRuns();
  }, []);

  return (
    <Box background="white" padding={4} shadow="filterShadow">
      <Typography variant="beta" as="h2" style={{ display: "inline" }}>
        {props.id}
      </Typography>
      <Typography
        variant="delta"
        as="h2"
        style={{
          display: "inline",
          marginLeft: 8,
        }}
      >
        {props.name}
      </Typography>
      <Divider style={{ margin: "10px 0" }} />
      {props.description && (
        <Typography variant="epsilon" as="h4" style={{ padding: "10px 0" }}>
          {props.description}
        </Typography>
      )}
      <Flex>
        <Button
          startIcon={<Play />}
          loading={isLoadingPipeline}
          disabled={isLoadingPipeline}
          style={{ marginRight: 4 }}
          onClick={() => startRun(props.id)}
        >
          Run {props.id}
        </Button>
        <Button
          startIcon={<Spinner />}
          variant="tertiary"
          onClick={() => getRuns()}
        >
          {formatMessage({
            id: getTrad("pagopa-gh-trigger.confpanel.refresh"),
            defaultMessage: "Refresh history",
          })}
        </Button>
      </Flex>
      {runError && (
        <Alert
          closeLabel="Close alert"
          title="Alert"
          variant="warning"
          as="div"
          margin={3}
        >
          Problem in run (server error)
        </Alert>
      )}
      {runs && <History {...runs}></History>}
    </Box>
  );
};

export default ConfPanel;
