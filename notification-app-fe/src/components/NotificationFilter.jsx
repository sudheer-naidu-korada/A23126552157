import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export function NotificationFilter({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, val) => onChange(val)}
      size="small"
    >
      <ToggleButton value="">All</ToggleButton>
      <ToggleButton value="unread">Unread</ToggleButton>
      <ToggleButton value="read">Read</ToggleButton>
    </ToggleButtonGroup>
  );
}