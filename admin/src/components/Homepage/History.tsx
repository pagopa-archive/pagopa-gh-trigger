import React from "react";

import { Badge, Box, Typography } from "@strapi/design-system";
import { useIntl } from "react-intl";

const History: React.FC<any> = (props: any) => {
  const getDate = (stringDate: string) => {
    const date = new Date(stringDate);
    const dateFormatted = new Intl.DateTimeFormat("it-IT", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
    return dateFormatted;
  };

  return (
    <Box>
      {props.workflow_runs && (
        <>
          <Typography variant="delta" style={{ padding: "8px 0" }} as="div">
            <a
              href={props.workflow_runs[0].repository.html_url}
              target="_blank"
            >
              {props.workflow_runs[0].repository.html_url}
            </a>
          </Typography>
        </>
      )}
      {props.workflow_runs &&
        props.workflow_runs.map((run: any, index: number) => {
          return (
            <Box style={{ padding: "8px 0" }} key={index}>
              <Box>
                <Typography variant="sigma" as="div" padding={4}>
                  {`#${index + 1} `}
                  {index == 0 && `Last run,  `}
                  {getDate(run.run_started_at)}, ID {run.id}
                </Typography>
                <Typography variant="sigma" as="div" padding={4}>
                  Status&nbsp;
                  <Badge size="M" style={{ marginRight: 5 }} active>
                    {run.status}
                  </Badge>
                  Conclusion&nbsp;
                  <Badge size="M" active>
                    {run.conclusion}
                  </Badge>
                </Typography>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default History;
