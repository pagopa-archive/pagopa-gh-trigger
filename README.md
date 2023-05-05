# Strapi plugin pagopa-gh-trigger

This Strapi plugin was created to run (and list) multiple GithubActions using a simply dashboard.

### How install

- Add this package to Packages.json and install via `yarn install`.
- Set in the `plugin.ts(.js)`of the Strapi instance this conf:

```
... other plugins,
"pagopa-gh-trigger": {
    enabled: true,
    config: {
      /* an Array of GithubActions configurations */
      enviroments: [
        {
          eventType: "YOUR_EVENT_TYPE_NAME_IN_GH_ACTION",
          ghOrg: "YOUR_ORG",
          ghRepo: "YOUR_REPO",
          ghToken: "<SECRET____GH_TOKEN>",
          ghWorflowFile: "NAME_OF_YAML_FILE_OF_WORKFLOW_ACTION",
          id: "PREFERRED_SHORT_NAME_ONLY_CHARS_AND_NUMBER",
          name: "A_FRIENDLY_NAME",
          userAgent: "CUSTOM_NAME_TO_PASS_TO_GH_ACTION",
          description: "OPTIONAL__DESCRIPTION_TO_HELP_EDITORS_WHEN_IN_DASHBOARD"
        },
      ]
    }
  },
```

### Notes

There are a lot of enhancements to do ... feel free to contribute
