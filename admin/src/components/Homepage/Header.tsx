import React from "react";

import { Box } from "@strapi/design-system";
import { BaseHeaderLayout } from "@strapi/design-system";

import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";

const Header = () => {
  const { formatMessage } = useIntl();
  return (
    <Box background="neutral100">
      <BaseHeaderLayout
        title={formatMessage({
          id: getTrad("pagopa-gh-trigger.header.title"),
          defaultMessage: "Github Triggers",
        })}
        subtitle={formatMessage({
          id: getTrad("pagopa-gh-trigger.header.subtitle"),
          defaultMessage: "Run GH Actions simply",
        })}
        as="h2"
      />
    </Box>
  );
};

export default Header;
